import {S3} from 'aws-sdk';
import {NextResponse} from "next/server";

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY
const AWS_REGION = process.env.AWS_REGION

const BUCKET_NAME = "trimadminstoragenew"
const FOLDER = "sitemaps/"

export async function GET(req, {params}) {
  const {filename} = params

  const s3 = new S3({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION,
  });

  try {
    const s3Response = await s3.getObject({
      Bucket: BUCKET_NAME,
      Key: FOLDER + filename,
    }).promise();

    console.log(s3Response)
    return new Response(s3Response.Body.toString(), {
      status: 200,
      headers: {
        "Content-Type": 'application/xml'
      }
    })
  } catch (error) {
    console.log(error, filename)
    return NextResponse.error()
  }
}
