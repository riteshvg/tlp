const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const s3 = new S3Client({
  region: process.env.TLP_AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.TLP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.TLP_AWS_SECRET_ACCESS_KEY,
  },
});

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers: CORS, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers: CORS, body: JSON.stringify({ error: 'Method not allowed' }) };

  try {
    const { password, filename, contentType, folder } = JSON.parse(event.body);

    if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
      return { statusCode: 401, headers: CORS, body: JSON.stringify({ error: 'Unauthorized' }) };
    }

    const key = `${folder}/${filename}`;
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET || 'tlp-tools-cdn',
      Key: key,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 });
    const cdnUrl = `https://${process.env.CDN_DOMAIN}/${key}`;

    return { statusCode: 200, headers: CORS, body: JSON.stringify({ uploadUrl, cdnUrl, key }) };
  } catch (err) {
    return { statusCode: 500, headers: CORS, body: JSON.stringify({ error: err.message }) };
  }
};
