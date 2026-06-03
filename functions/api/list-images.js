import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

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

    const s3 = new S3Client({
      region: env.TLP_AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: env.TLP_AWS_ACCESS_KEY_ID,
        secretAccessKey: env.TLP_AWS_SECRET_ACCESS_KEY,
      },
    });

    const folders = ['tools', 'blog', 'hero'];
    const images = [];

    for (const folder of folders) {
      let continuationToken;
      do {
        const command = new ListObjectsV2Command({
          Bucket: env.S3_BUCKET || 'tlp-tools-cdn',
          Prefix: `${folder}/`,
          ContinuationToken: continuationToken,
        });
        const res = await s3.send(command);
        for (const obj of res.Contents || []) {
          if (obj.Key.endsWith('/') || obj.Key.endsWith('.keep')) continue;
          images.push({
            key: obj.Key,
            folder,
            filename: obj.Key.replace(`${folder}/`, ''),
            size: obj.Size,
            lastModified: obj.LastModified,
            url: `https://${env.CDN_DOMAIN}/${obj.Key}`,
          });
        }
        continuationToken = res.NextContinuationToken;
      } while (continuationToken);
    }

    images.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));

    return new Response(JSON.stringify({ images }), { status: 200, headers: CORS });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: CORS });
  }
}
