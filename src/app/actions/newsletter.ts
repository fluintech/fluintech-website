"use server"

export async function subscribeToNewsletter(email: string) {
  try {
    const response = await fetch(process.env.WEBHOOK_URL || "https://n8nwh.fluintech.com.br/webhook/subscriptions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.JWT_TOKEN}`,
      },
      body: JSON.stringify({ email }),
    })

    if (response.ok) {
      return { success: true, message: "Inscrição realizada com sucesso!" }
    } else {
      return { success: false, message: "Erro ao processar inscrição. Tente novamente." }
    }
  } catch (error) {
    return { success: false, message: "Erro de conexão. Tente novamente." }
  }
}
