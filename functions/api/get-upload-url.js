import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

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
    const { password, filename, contentType, folder } = await request.json();

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

    const key = `${folder}/${filename}`;
    const command = new PutObjectCommand({
      Bucket: env.S3_BUCKET || 'tlp-tools-cdn',
      Key: key,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 });
    const cdnUrl = `https://${env.CDN_DOMAIN}/${key}`;

    return new Response(JSON.stringify({ uploadUrl, cdnUrl, key }), { status: 200, headers: CORS });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: CORS });
  }
}
