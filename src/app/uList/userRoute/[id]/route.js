import userData from "@/app/model/userData";
import dbConnect from "@/app/utils/dbConnect";
dbConnect()
import { NextResponse } from "next/server";

export async function PUT(request){
    const id = request.url.split('/')[5]
    const { name, email, phoneNumber } = await request.json();
    const updatedUser=await userData.findByIdAndUpdate({_id:id},{name, email, phoneNumber})
    console.log(id);
    return NextResponse.json({message:"putt request"},updatedUser)
}

export async function DELETE(request){
    const id = request.url.split('/')[5]
    const deletedUser=await userData.findByIdAndDelete({_id:id})
    console.log(id);
    return NextResponse.json({message:"user deleted"},deletedUser)
}