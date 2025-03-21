import { Request, Response } from 'express';
import catchAsync from '@/utils/async';
import * as ApiResponse from '@utils/ApiResponse';

class UploadController {
  public uploadSingleImage = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const endpoint = process.env.STATIC_CONTENT_ENDPOINT;
    const imagePath = `/${req.file['key']}`;
    // const imagePath = req.file['location'].split(endpoint)[1];
    // console.log('req.file', req.file['location'].split(endpoint));

    ApiResponse.successResponseWithData(res, 'Image upload success', { endpoint, imagePath });
  });
}

export default UploadController;
