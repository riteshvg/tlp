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
    const { password, path } = await request.json();

    if (!env.ADMIN_PASSWORD || password !== env.ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: CORS });
    }

    const aws = new AwsClient({
      accessKeyId: env.TLP_AWS_ACCESS_KEY_ID,
      secretAccessKey: env.TLP_AWS_SECRET_ACCESS_KEY,
      region: 'us-east-1',
    });

    const body = `<?xml version="1.0" encoding="UTF-8"?>
<InvalidationBatch xmlns="http://cloudfront.amazonaws.com/doc/2020-11-20/">
  <CallerReference>${Date.now()}</CallerReference>
  <Paths>
    <Items><Path>/${path}</Path></Items>
    <Quantity>1</Quantity>
  </Paths>
</InvalidationBatch>`;

    const res = await aws.fetch(
      `https://cloudfront.amazonaws.com/2020-11-20/distribution/${env.CLOUDFRONT_DISTRIBUTION_ID}/invalidation`,
      { method: 'POST', headers: { 'Content-Type': 'application/xml' }, body }
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`CloudFront error ${res.status}: ${text.slice(0, 300)}`);
    }

    return new Response(JSON.stringify({ success: true }), { status: 200, headers: CORS });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: CORS });
  }
}
