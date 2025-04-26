import { connectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";

// Connect to MongoDB once
const LoadDB = async () => {
    await connectDB();
}

LoadDB();

export async function POST(request) {
  try {
    const formData = await request.formData();
    const email = formData.get('email');

    if (!email) {
      return NextResponse.json({ success: false, msg: "Email is required" }, { status: 400 });
    }

    await EmailModel.create({ email });

    return NextResponse.json({ success: true, msg: "Email Subscribed" });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ success: false, msg: "Server Error", error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const emails = await EmailModel.find({});
    return NextResponse.json({ emails });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ success: false, msg: "Server Error", error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, msg: "Email ID is required" }, { status: 400 });
    }

    await EmailModel.findByIdAndDelete(id);

    return NextResponse.json({ success: true, msg: "Deleted Successfully" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ success: false, msg: "Server Error", error: error.message }, { status: 500 });
  }
}
