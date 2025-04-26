import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dxo00eua8",    // Replace with your Cloudinary cloud name
  api_key: "377265236248421",           // Replace with your Cloudinary API key
  api_secret: "5IaOUy3r-EHd4cnhzhrzlacqKw4",     // Replace with your Cloudinary API secret
});

export default cloudinary;
