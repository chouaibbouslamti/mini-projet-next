import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.formData();

    const file = data.get("image");

    if (!file) {
      return NextResponse.json({
        success: false,
        message: "Aucune image",
      });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await db.query(
      `INSERT INTO images (name, type, size, bin_img)
       VALUES (?, ?, ?, ?)`,
      [
        file.name,
        file.type,
        file.size,
        buffer,
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Image enregistrée",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}

export async function GET() {
  try {
    const [rows] = await db.query(
      "SELECT * FROM images"
    );

    const images = rows.map((img) => ({
      id: img.id,
      name: img.name,
      type: img.type,
      image: `data:${img.type};base64,${Buffer.from(
        img.bin_img
      ).toString("base64")}`,
    }));

    return NextResponse.json({
      success: true,
      data: images,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}