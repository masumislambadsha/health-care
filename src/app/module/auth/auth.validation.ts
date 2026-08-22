import z, { email } from "zod";

export const PatientRegistrationZodSchema = z.object({
	name: z.string("Not A String").min(3, "Name must be at least 3 characters long").max(10, "Name must be at most 10 characters long"),
	email: z.email(),
	password: z.string().min(8).max(20)
		.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
		.regex(/[a-z]/, "Password must contain at least one lowercase letter")
		.regex(/[0-9@$!%*?&]/, "Password must contain at least one number or special character"),
	patient: z.object({
		contactNumber: z.string().optional(),
	}).optional()
})


export const LoginZodSchema = z.object({
	email: z.email(),
	password: z.string().min(8).max(20)
		.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
		.regex(/[a-z]/, "Password must contain at least one lowercase letter")
		.regex(/[0-9@$!%*?&]/, "Password must contain at least one number or special character"),
})

export const VerifyEmailSchema = z.object({
	email: z.email(),
	otp: z.string()
})
