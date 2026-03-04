"use server"

export async function submitWaitlistForm(formData: { nome: string; email: string; whatsapp: string }) {
  try {
    const response = await fetch("https://n8nwh.fluintech.com.br/webhook/subscriptions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.JWT_TOKEN}`,
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      return { success: false, error: "Erro ao enviar formulário" }
    }

    return { success: true }
  } catch (error) {
    console.error("[v0] Error submitting form:", error)
    return { success: false, error: "Erro ao processar sua inscrição. Tente novamente." }
  }
}
