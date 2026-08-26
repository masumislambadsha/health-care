import { cloudinary } from "../../lib/cloudinary";
import { prisma } from "../../lib/prisma";

const uploadProfileImage = async (buffer: Buffer, userId: string) => {
  const currentUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      imagePublicId: true,
      imageUrl: true,
    },
  });

  const cloudinaryResult = cloudinary.uploader
    .upload_stream(
      {
        resource_type: "auto",
      },
      async (error, result) => {
        if (error) {
          console.log("error", error.message);
          throw new Error(error.message);
        }

        // console.log("result ",result)

        const updatedUser = await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            imageUrl: result?.secure_url,
            imagePublicId: result?.public_id,
          },
        });

        console.log(updatedUser);
      },
    )
    .end(buffer);
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    omit: {
      password: true,
    },
  });

  if(currentUser?.imagePublicId && currentUser?.imageUrl ) {
    await cloudinary.uploader.destroy(currentUser.imagePublicId)
  }

  return user
};

export const UserService = {
  uploadProfileImage,
};
