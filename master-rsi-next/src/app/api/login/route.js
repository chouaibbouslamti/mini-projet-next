import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { login, pass } = await request.json();

    const [rows] = await db.query(
      "SELECT * FROM etudiants WHERE login = ? AND pass = ?",
      [login, pass]
    );

    if (rows.length > 0) {
      return NextResponse.json({
        success: true,
        user: rows[0],
      });
    }

    return NextResponse.json({
      success: false,
      message: "Login ou mot de passe incorrect",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Erreur serveur",
      error: error.message,
    });
  }
}