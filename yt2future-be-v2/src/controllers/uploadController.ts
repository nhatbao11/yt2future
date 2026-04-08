import type { NextFunction, Request, Response } from 'express';
import type { UploadedFile } from 'express-fileupload';
import { AppError } from '../utils/AppError.js';
import { getErrorMessage } from '../utils/errors.js';
import * as uploadService from '../modules/upload/uploadService.js';

function getSinglePdf(files: Request['files']): UploadedFile | undefined {
  if (!files || !('pdfFile' in files)) return undefined;
  const pdfFile = files.pdfFile;
  if (pdfFile == null) return undefined;
  return Array.isArray(pdfFile) ? pdfFile[0] : pdfFile;
}

export const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.files) {
      return next(new AppError('Server không nhận được file nào!', 400, 'UPLOAD_NO_FILES'));
    }

    const pdfFile = getSinglePdf(req.files);
    if (!pdfFile) {
      return next(new AppError('Thiếu file PDF báo cáo sếp ơi!', 400, 'UPLOAD_NO_PDF'));
    }

    const { url, public_id } = await uploadService.uploadStandalonePdf(pdfFile);

    res.json({
      success: true,
      url,
      public_id,
    });
  } catch (error: unknown) {
    console.error('[UploadController]', getErrorMessage(error));
    next(
      new AppError(`Lỗi xử lý file tại server: ${getErrorMessage(error)}`, 500, 'UPLOAD_FAILED')
    );
  }
};
