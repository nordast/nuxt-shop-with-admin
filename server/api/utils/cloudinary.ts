import { v2 as cloudinary } from "cloudinary";

export const deleteResourceFromCloudinary = async (
  resourceName: string,
  resourceType: string | undefined = "image",
) => {
  const config = useRuntimeConfig();

  cloudinary.config({
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret,
    cloud_name: config.public.cloudinaryCloudName,
  });

  await cloudinary.uploader.destroy(resourceName, { resourceType });
};
