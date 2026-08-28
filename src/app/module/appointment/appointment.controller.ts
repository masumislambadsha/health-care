import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { AppointmentService } from "./appointment.service";

const bookAppointement = catchAsync(async(_req: Request, res: Response) =>{


  const result = await AppointmentService.bookAppointment();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking Sucessfull",
    data: result
  })

})

const bookAppointmentCallback = catchAsync(async (req: Request, res: Response) =>{
  const result = await AppointmentService.bookAppointmentCallback(req.query)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Booking Payment Callback',
    success: true,
    data : result
  })
})

export const AppointmentController = {
  bookAppointement,
  bookAppointmentCallback
}
