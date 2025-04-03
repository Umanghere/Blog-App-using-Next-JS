import { connectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
const { NextResponse } = require("next/server");
import {writeFile} from 'fs/promises'
const fs = require('fs')

const LoadDB = async () => {
    await connectDB();
}

LoadDB();

// API Endpoint to get all blogs
export async function GET(request) {

    const blogId = request.nextUrl.searchParams.get("id");
    if(blogId){
        const blog = await BlogModel.findById(blogId);
        return NextResponse.json(blog);
    }else{
        const blogs = await BlogModel.find({})
        return NextResponse.json({blogs})
    }
    
}

// API Endpoint for Uploading Blogs
export async function POST(request){
    //getting blogData as formData which will store in this variable
    const formData = await request.formData();
     //using this to provide a unique name to the image
    const timeStamp = Date.now();
    //we will get image from the formData in this variable
    const image = formData.get('image');
    if (!image) {
        return NextResponse.json({ success: false, msg: "No image uploaded" }, { status: 400 });
    }
    // Convert this image into Byte Data before storing in public folder
    const imageByteData = await image.arrayBuffer()
    const buffer = Buffer.from(imageByteData)
    // defining path to store file in public.  
    const path = `./public/${timeStamp}_${image.name}`
    //logic to store image in public folder
    await writeFile(path, buffer);
    const imgURL = `/${timeStamp}_${image.name}`;

    // // Testing this function
    // console.log(imgURL);


    // use this blogData and blog model to store data in Database
    const blogData = {
        title: `${formData.get('title')}`,
        description: `${formData.get('description')}`,
        category: `${formData.get('category')}`,
        author: `${formData.get('author')}`,
        image: `${imgURL}`,
        authorImg: `${formData.get('authorImg')}`,
    }

    try {
        await BlogModel.create(blogData);
        console.log("Blog Saved");
        return NextResponse.json({ success: true, msg: "Blog Added" });
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ success: false, msg: "Database error", error: error.message }, { status: 500 });
    }
    
}

//Creating API Endpoint to delete Blog

// export async function DELETE(request){
//     //Storing ID from frontend as the parameter to delete from backend
//     const id = await request.nextUrl.searchParams.get('id');
//     // finding blog using this ID
//     const blog = await BlogModel.findById(id);
//     // Delete image from Public Folder by using file system
//     fs.unlink(`./public${blog.image}`, ()=>{});
//     //Delete blog from Atlas
//     await BlogModel.findByIdAndDelete(id);
//     return NextResponse.json({msg: "Blog Deleted"});
// }


export async function DELETE(request) {
    try {
        await connectDB();
        // Get the blog ID from query parameters
        const id = request.nextUrl.searchParams.get("id");
        if (!id) {
            return NextResponse.json({ success: false, msg: "Blog ID is required" }, { status: 400 });
        }
        // Find the blog in the database
        const blog = await BlogModel.findById(id);
        if (!blog) {
            return NextResponse.json({ success: false, msg: "Blog not found" }, { status: 404 });
        }
        // Delete the image from the public folder if it exists
        if (blog.image) {
            const imagePath = `./public${blog.image}`;
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        // Delete the blog from the database
        await BlogModel.findByIdAndDelete(id);

        return NextResponse.json({ success: true, msg: "Blog Deleted" });
    } catch (error) {
        console.error("Error deleting blog:", error);
        return NextResponse.json({ success: false, msg: "Internal Server Error", error: error.message }, { status: 500 });
    }
}
