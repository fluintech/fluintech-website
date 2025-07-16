import { api } from "./api"

export async function sendLeadToN8N(data: any) {
  const response = await api.post("/submit-lead", data)
  return response
}
