import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { UserService } from "./user.service";

const uploadProfileImage = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body
  // console.log(req.file, "req.file");
  if(!req.file){
    throw new Error("No file was provided")
  }

  const userId = req.user?.userId as string
  const user = await UserService.uploadProfileImage(req.file?.buffer , userId)



  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Image Uploaded Successfully!!",
    data: {
      user
    },
  });
});


export const  UserController = {
  uploadProfileImage
}
