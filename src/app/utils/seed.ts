import bcrypt from "bcryptjs";
import { Role } from "../../generated/prisma/enums";
import { prisma } from "../lib/prisma";
import config from "../config";

export const seedSuperAdmin = async () => {
  try {
    const seedSuperAdmin = await prisma.user.findFirst({
      where: {
        role: Role.SUPER_ADMIN,
      },
    });

    if (seedSuperAdmin) {
      console.log(`Super admin exitsts`);
    }
    const name = config.super_admin_name;
    const email = config.super_admin_email;
    const password = config.super_admin_password;

    if(!name || !email || !password){
      throw new Error("Super admin credentials are not set in the environment variables");
    }

    const hashPassword = await bcrypt.hash(
      password,
      Number(config.bcrypt_salt_rounds),
    );

    const superAdmin = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        role: Role.SUPER_ADMIN,
        needPasswordChange: false,
        emailVerified: true,
      },
    });

    console.log("Super admin created", superAdmin);
  } catch (error) {
    console.log("Error seeding super admin", error);

    await prisma.user.delete({
      where:{
        email: config.super_admin_email
      }
    })
  }
};
