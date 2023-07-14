import { NextResponse } from "next/server";

import userData from "@/app/model/userData";
import dbConnect from "@/app/utils/dbConnect";
dbConnect();
export async function POST(request) {
  const { name, email, phoneNumber } = await request.json();
  let newUser = new userData({
    name,
    email,
    phoneNumber,
  })
  await newUser.save()
  return NextResponse.json({ message: "Dataa savedd" });
}


export async function GET(request){
  let user=await userData.find({})
  return NextResponse.json(user)
}