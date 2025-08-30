import { connectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import cloudinary from "@/lib/cloudinary";
const { NextResponse } = require("next/server");

const LoadDB = async () => {
    await connectDB();
}

// Connect Database
LoadDB();


// API Endpoint to GET all blogs --------- GET METHOD
export async function GET(request) {

    const blogId = request.nextUrl.searchParams.get("id");
    // If GET request contains "?id=something" in the URL, return single blog i.e, at the time of clicking a blog to open
    if(blogId){
        const blog = await BlogModel.findById(blogId);
        return NextResponse.json(blog);
    }else{
        // If there is no ID, return all the blogs
        const blogs = await BlogModel.find({})
        return NextResponse.json({blogs})
    }    
}


// API Endpoint for Uploading Blogs -------- POST METHOD

export async function POST(request){
    //getting blogData as formData which will store in this variable
    const formData = await request.formData();
  
    //we will get image from the formData in this variable
    const image = formData.get('image');
    if (!image) {
        return NextResponse.json({ success: false, msg: "No image uploaded" }, { status: 400 });
    }

    // Convert this image into Byte Data before storing in public folder
    const arrayBuffer  = await image.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "blogs" }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
        }).end(buffer);
    });


    const imgURL = uploadResult.secure_url;


    // use this blogData and blog model to store data in Database
    const blogData = {
        title: formData.get("title"),
        description: formData.get("description"),
        category: formData.get("category"),
        author: formData.get("author"),
        image: imgURL,
        authorImg: formData.get("authorImg"),
      };

      try {
        await BlogModel.create(blogData);
        // console.log("Blog Saved");
        return NextResponse.json({ success: true, msg: "Blog Added" });
      } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ success: false, msg: "Database error", error: error.message }, { status: 500 });
      }
    }



//Creating API Endpoint to delete Blog

export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, msg: "Blog ID is required" }, { status: 400 });
    }

    const blog = await BlogModel.findById(id);
    if (!blog) {
      return NextResponse.json({ success: false, msg: "Blog not found" }, { status: 404 });
    }

    // Delete image from Cloudinary
    if (blog.image) {
      const publicId = extractPublicId(blog.image);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    // Delete blog from DB
    await BlogModel.findByIdAndDelete(id);

    return NextResponse.json({ success: true, msg: "Blog Deleted" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ success: false, msg: "Internal Server Error", error: error.message }, { status: 500 });
  }
}


// Helper function to extract Cloudinary public ID
function extractPublicId(url) {
    try {
      const parts = url.split("/");
      const filename = parts[parts.length - 1]; // last part (e.g., abc123.png)
      const publicIdWithExtension = filename.split(".")[0]; // remove .jpg or .png
      return `blogs/${publicIdWithExtension}`; // uploaded inside 'blogs' folder
    } catch (error) {
      console.error("Error extracting public ID:", error);
      return null;
    }
  }