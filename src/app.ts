import cookieParser from "cookie-parser";
import cors from "cors";
import { randomInt } from "crypto";
import express, {
	type Application,
	type Request,
	type Response,
} from "express";
import httpStatus from "http-status";
import config from "./app/config";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFound";
import { AuthRoutes } from "./app/module/auth/auth.route";
import { redisClient } from "./app/lib/redis";

const app: Application = express();

app.use(
	cors({
		origin: config.frontend_url,
		credentials: true,
	}),
);

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", AuthRoutes);

app.get("/test", async (req: Request, res: Response) => {

	try {

		const otp = randomInt(100000, 999999).toString().padStart(6, "0");

		await redisClient.set("forget-password:user@healthcare.com", otp, {
			expiration:
			{
				type:"EX",
				value: 60 * 5
			}
		})

		res.status(httpStatus.OK).json({
			success: true,
			message: "Test route is working",
			data: otp
		})
	} catch (error) {

	}
})

// Basic route
app.get("/", async (req: Request, res: Response) => {
	res.status(httpStatus.OK).json({
		success: true,
		message: "Welcome to PH Healthcare System Backend",
	});
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
