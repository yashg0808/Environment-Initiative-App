import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dfyhkvgpw",
  api_key: "634175571871343",
  api_secret: "jdt73meDyRoRMw4hwYzNWhovV9Q",
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
