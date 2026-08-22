import { NextFunction, Request, Response, Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/checkAuth";
import { AuthController } from "./auth.controller";
import { LoginZodSchema, PatientRegistrationZodSchema, VerifyEmailSchema } from "./auth.validation";
import { validateRequest } from "../../middleware/validateRequest";

const router = Router();

router.post("/register", validateRequest(PatientRegistrationZodSchema), AuthController.registerPatient);
router.post("/verify-email", validateRequest(VerifyEmailSchema), AuthController.verifyEmail);
router.post("/login", validateRequest(LoginZodSchema) , AuthController.loginUser);
router.get(
  "/me",
  auth(Role.ADMIN, Role.DOCTOR, Role.PATIENT, Role.SUPER_ADMIN),
  AuthController.getMe,
);
router.post("/refresh-token", AuthController.refreshToken);
router.post("/reset-password", AuthController.resetPassword);
router.post("/forgot-password", AuthController.forgetPassword);
router.post("/google", AuthController.googleLogin);
export const AuthRoutes = router;

