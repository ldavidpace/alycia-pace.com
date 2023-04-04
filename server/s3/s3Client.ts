import {
  GetObjectCommand, PutObjectCommand, S3Client,
} from '@aws-sdk/client-s3';
import {
  createReadStream, fsync, readFileSync,
  writeFileSync,
} from 'fs';


const awsAccessKey = process.env.AWS_ACCESS_KEY;
const awsSecretKey = process.env.AWS_SECRET_KEY;


const client = new S3Client({
    region: 'us-west-1',
});

export const putObject = async (targetFileName: string, file, contentType?: string ) => {
    const s3Params = new PutObjectCommand({
        Bucket: "quiz-central",
        Key: targetFileName,
        Body: file,
        ContentType: contentType,
    });
    return await client.send(s3Params);
}


export const putFile = async (targetFileName: string, file, contentType?: string ) => {
    const s3Params = new PutObjectCommand({
        Bucket: "quiz-central",
        Key: targetFileName,
        Body: file.buffer,
        ContentType: contentType,
    });
    return await client.send(s3Params);
}



export const getDatabase = async (targetFileName: string, writeToFileSystem) => {
    const response = await getObject(targetFileName);
    const database = await response.Body.transformToByteArray()
    if (writeToFileSystem) {
        writeFileSync(targetFileName, database);
    }
    return response;
}

export const getObject = async (targetFileName: string) => {
    const s3Params = new GetObjectCommand({
        Bucket: "quiz-central",
        Key: targetFileName,
    });
    return await client.send(s3Params);
}


