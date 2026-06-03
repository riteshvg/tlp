import { CloudFrontClient, CreateInvalidationCommand } from '@aws-sdk/client-cloudfront';

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

    const cf = new CloudFrontClient({
      region: 'us-east-1',
      credentials: {
        accessKeyId: env.TLP_AWS_ACCESS_KEY_ID,
        secretAccessKey: env.TLP_AWS_SECRET_ACCESS_KEY,
      },
    });

    const command = new CreateInvalidationCommand({
      DistributionId: env.CLOUDFRONT_DISTRIBUTION_ID,
      InvalidationBatch: {
        CallerReference: Date.now().toString(),
        Paths: { Quantity: 1, Items: [`/${path}`] },
      },
    });

    await cf.send(command);
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: CORS });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: CORS });
  }
}
