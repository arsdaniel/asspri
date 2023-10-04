import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import { db } from "@/lib/db";
import * as z from "zod";

const userSchema = z.object({
  nama: z.string().min(1, "Nama is Required").max(100),
  username: z.string().min(1, "Username is Required").max(100),
  email: z.string().min(1, " Email is required").email("invalid email"),
  password: z
    .string()
    .min(1, "password required")
    .min(8, "password must have than 8 Character"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nama, email, username, password } = userSchema.parse(body);
    const existingByEmail = await db.user.findUnique({
      where: { email: email },
    });
    if (existingByEmail) {
      return NextResponse.json(
        {
          user: null,
          message: "User With This Email Already Exist",
        },
        { status: 409 }
      );
    }

    const existingByUsername = await db.user.findUnique({
      where: { username: username },
    });
    if (existingByUsername) {
      return NextResponse.json(
        {
          user: null,
          message: "User With This Username Already Exist",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        nama,
        username,
        email,
        password: hashedPassword,
      },
    });

    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      {
        user: rest,
        message: "User Berhasil Dibuat",
      },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "error", success: false });
  }
}
