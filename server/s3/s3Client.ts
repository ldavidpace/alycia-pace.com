import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { fsync, writeFileSync } from "fs";

const awsAccessKey = process.env.AWS_ACCESS_KEY;
const awsSecretKey = process.env.AWS_SECRET_KEY;


const client = new S3Client({
    region: 'us-west-1',
});

export const putObject = async (targetFileName: string, file, contentType?: string, ) => {
    const s3Params = new PutObjectCommand({
        Bucket: "quiz-central",
        Key: targetFileName,
        Body: file,
    });
    client.send(s3Params);
}

export const getObject = async (targetFileName: string, writeToFileSystem) => {
    const s3Params = new GetObjectCommand({
        Bucket: "quiz-central",
        Key: targetFileName,
    });
    const response = await client.send(s3Params);
    const database = await response.Body.transformToByteArray()
    if (writeToFileSystem) {
        writeFileSync(targetFileName, database);
    }
    return response;
}
