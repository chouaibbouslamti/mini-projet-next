import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { login, nom, prenom, note1, note2 } = await req.json();

    const moyenne = (Number(note1) + Number(note2)) / 2;

    await db.query(
      `INSERT INTO etudiants 
      (login, pass, nom, prenom, note1, note2, moyenne, longitude, latitude)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [login, "1234", nom, prenom, note1, note2, moyenne, -7.5898, 33.5731]
    );

    return NextResponse.json({
      success: true,
      message: "Étudiant ajouté dans la base de données",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}