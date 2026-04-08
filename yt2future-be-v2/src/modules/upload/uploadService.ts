import { v2 as cloudinary } from 'cloudinary';
import type { UploadedFile } from 'express-fileupload';

export async function uploadStandalonePdf(file: UploadedFile) {
  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    folder: 'yt_reports_pdf',
    resource_type: 'raw',
    use_filename: true,
    unique_filename: true,
  });
  return {
    url: result.secure_url,
    public_id: result.public_id,
  };
}
