import { Router } from "express";
import { AppointmentController } from "./appointment.controller";

const router = Router();

router.post("/book-appointment", AppointmentController.bookAppointement);

router.get("/book-appointment/payment/callback", AppointmentController.bookAppointmentCallback);

export const AppointmentRoutes = router;
