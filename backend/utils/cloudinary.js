import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadImage(localfilepath, filename) {
  let cloudinaryurl;
  await cloudinary.uploader.upload(
    localfilepath,
    { public_id: filename },
    function (error, result) {
      console.log("Cloudinary URL: ", result.url);
      cloudinaryurl = result.url;
    }
  );
  return cloudinaryurl;
}

export { uploadImage };
