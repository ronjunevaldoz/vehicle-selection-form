import { NextRequest, NextResponse } from "next/server"; 

export async function POST (request: NextRequest) { 
  const formData = await request.formData(); 
  let body = Object.fromEntries(formData);
  const file = formData.get("file") as Blob | null;
  if (!file) {
    return NextResponse.json(
      { error: "File blob is required." },
      { status: 400 }
    );
  } 
  const buffer = Buffer.from(await file.arrayBuffer()); 
  return NextResponse.json({ body: body, file: buffer.toString("utf8"), success: true });
}; 