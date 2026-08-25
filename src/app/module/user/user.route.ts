import { NextFunction, Request, Response, Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/checkAuth"
import { validateRequest } from "../../middleware/validateRequest";
import { UserController } from "./user.controller";
import { upload } from "../../lib/multer";

const router = Router();

router.patch("/profile-image", upload.single("profileImage") ,UserController.uploadProfileImage)

export const UserRoutes = router
