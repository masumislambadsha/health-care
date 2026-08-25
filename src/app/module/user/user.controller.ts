import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const uploadProfileImage = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body
  console.log(req.file, "req.file");


  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Image Uploaded Successfully!!",
    data: {
    },
  });
});


export const UserController = {
  uploadProfileImage
}
