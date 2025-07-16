import { NextRequest, NextResponse } from "next/server"
import axios from "axios"

export async function POST(req: NextRequest) {
  const data = await req.json()

  try {
    await axios.post(`${process.env.N8N_WEBHOOK_HOST}/fluintech-leads`, data, {
      headers: {
        Authorization: `Bearer ${process.env.N8N_JWT_TOKEN}`,
        "Content-Type": "application/json",
      },
    })

    return new NextResponse(null, { status: 204 })
  } catch (err) {
    console.error("Erro ao enviar para o n8n:", err)
    return new NextResponse("Erro ao enviar dados", { status: 500 })
  }
}
