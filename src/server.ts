import { xid } from "zod";
import app from "./app";
import config from "./app/config";
import { prisma } from "./app/lib/prisma";
import { redisClient } from "./app/lib/redis";
import { seedSuperAdmin } from "./app/utils/seed";
import { transporter } from "./app/lib/nodemailer";

const PORT = config.port;

const main = async () => {
	try {
		await prisma.$connect();

		await redisClient.connect();
		console.log("Connected to Redis successfully.");


		await transporter.verify()
		console.log("Node mailer working")
		
		await seedSuperAdmin()
		console.log("Connected to the database successfully.");

		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	} catch (error) {
		console.error("Error starting the server:", error);
		await prisma.$disconnect();
		process.exit(1);
	}
};

main();
