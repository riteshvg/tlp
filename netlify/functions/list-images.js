const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');

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
    const { password } = JSON.parse(event.body);

    if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
      return { statusCode: 401, headers: CORS, body: JSON.stringify({ error: 'Unauthorized' }) };
    }

    const folders = ['tools', 'blog', 'hero'];
    const cdnDomain = process.env.CDN_DOMAIN;
    const bucket = process.env.S3_BUCKET || 'tlp-tools-cdn';
    const images = [];

    for (const folder of folders) {
      let continuationToken;
      do {
        const command = new ListObjectsV2Command({
          Bucket: bucket,
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
            url: `https://${cdnDomain}/${obj.Key}`,
          });
        }
        continuationToken = res.NextContinuationToken;
      } while (continuationToken);
    }

    images.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));

    return { statusCode: 200, headers: CORS, body: JSON.stringify({ images }) };
  } catch (err) {
    return { statusCode: 500, headers: CORS, body: JSON.stringify({ error: err.message }) };
  }
};
