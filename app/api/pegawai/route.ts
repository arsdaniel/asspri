import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const pegawai = await db.pegawai.findMany();
    return NextResponse.json(pegawai);
  } catch (err) {
    return NextResponse.json({ message: "error", success: false });
  }
}
