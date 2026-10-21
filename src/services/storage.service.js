
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../config/s3.js";

export const uploadOrderMission = async (pdfBuffer, s3Key) => {
    const command = new PutObjectCommand({
        Bucket: process.env.MINIO_BUCKET,
        Key: s3Key,
        Body: pdfBuffer,
        ContentType: "application/pdf",
    });

    await s3Client.send(command);

    return {
        bucket: process.env.MINIO_BUCKET,
        s3Key,
        sizeBytes: pdfBuffer.length,
    };
};
