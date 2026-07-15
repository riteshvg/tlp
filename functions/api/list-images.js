import { AwsClient } from 'aws4fetch';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

export async function onRequestOptions() {
  return new Response(null, { status: 200, headers: CORS });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const { password } = await request.json();

    if (!env.ADMIN_PASSWORD || password !== env.ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: CORS });
    }

    const aws = new AwsClient({
      accessKeyId: env.TLP_AWS_ACCESS_KEY_ID,
      secretAccessKey: env.TLP_AWS_SECRET_ACCESS_KEY,
      region: env.TLP_AWS_REGION || 'us-east-1',
    });

    const bucket = env.S3_BUCKET || 'tlp-tools-cdn';
    const region = env.TLP_AWS_REGION || 'us-east-1';
    const cdnDomain = env.CDN_DOMAIN;
    const folders = ['tools', 'blog', 'hero'];
    const images = [];

    for (const folder of folders) {
      let continuationToken;
      do {
        const url = new URL(`https://${bucket}.s3.${region}.amazonaws.com/`);
        url.searchParams.set('list-type', '2');
        url.searchParams.set('prefix', `${folder}/`);
        if (continuationToken) url.searchParams.set('continuation-token', continuationToken);

        const res = await aws.fetch(url.toString());
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`S3 error ${res.status}: ${text.slice(0, 300)}`);
        }

        const xml = await res.text();
        const keyMatches = [...xml.matchAll(/<Key>([^<]+)<\/Key>/g)];
        const sizeMatches = [...xml.matchAll(/<Size>([^<]+)<\/Size>/g)];
        const dateMatches = [...xml.matchAll(/<LastModified>([^<]+)<\/LastModified>/g)];

        keyMatches.forEach((m, i) => {
          const key = m[1];
          if (key.endsWith('/') || key.endsWith('.keep')) return;
          images.push({
            key,
            folder,
            filename: key.replace(`${folder}/`, ''),
            size: sizeMatches[i] ? parseInt(sizeMatches[i][1]) : 0,
            lastModified: dateMatches[i] ? dateMatches[i][1] : new Date().toISOString(),
            url: `https://${cdnDomain}/${key}`,
          });
        });

        const nextToken = xml.match(/<NextContinuationToken>([^<]+)<\/NextContinuationToken>/);
        continuationToken = nextToken ? nextToken[1] : undefined;
      } while (continuationToken);
    }

    images.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
    return new Response(JSON.stringify({ images }), { status: 200, headers: CORS });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: CORS });
  }
}
