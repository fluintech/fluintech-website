"use client"

import { useState, useEffect } from "react"
import { Bot, Mic, Check, CheckCheck, MoreVertical, Phone, Video, Play } from "lucide-react"

interface Message {
  type: "user" | "bot"
  text: string
  time: string
  isAudio?: boolean
  duration?: string
  status?: "sent" | "delivered" | "read"
}

export function WhatsAppChat() {
  const [chatMessages, setChatMessages] = useState<Message[]>([
    { type: "user", text: "Preciso agendar uma consulta", time: "14:30", status: "read" },
  ])
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [typingText, setTypingText] = useState("")
  const [headerStatus, setHeaderStatus] = useState("online")
  const [inputText, setInputText] = useState("")
  const [isUserTyping, setIsUserTyping] = useState(false)

  useEffect(() => {
    const messages: Message[] = [
      { type: "user", text: "Preciso agendar uma consulta", time: "14:30", status: "read" },
      {
        type: "bot",
        text: "Olá! Posso ajudar com o agendamento. Qual especialidade você precisa?",
        time: "14:31",
        status: "read",
      },
      { type: "user", text: "Cardiologia", time: "14:31", isAudio: true, duration: "0:03", status: "read" },
      {
        type: "bot",
        text: "Perfeito! Tenho disponibilidade para amanhã às 15h ou quinta às 10h. Qual prefere?",
        time: "14:32",
        status: "read",
      },
      { type: "user", text: "Amanhã às 15h", time: "14:32", status: "read" },
      {
        type: "bot",
        text: "✅ Agendado! Dr. Silva, amanhã 15h. Confirmação enviada por SMS.",
        time: "14:33",
        status: "delivered",
      },
    ]

    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => {
        if (prev < messages.length - 1) {
          const nextMessage = messages[prev + 1]

          if (nextMessage.type === "user") {
            setIsUserTyping(true)
            setHeaderStatus("online")

            if (nextMessage.isAudio) {
              setInputText("🎤 Gravando áudio...")
              setTimeout(() => {
                setInputText("")
                setIsUserTyping(false)
                setChatMessages(messages.slice(0, prev + 2))
              }, 2000)
            } else {
              // Simulate typing the actual message
              const messageText = nextMessage.text
              let currentChar = 0

              const typingInterval = setInterval(() => {
                if (currentChar <= messageText.length) {
                  setInputText(messageText.slice(0, currentChar))
                  currentChar++
                } else {
                  clearInterval(typingInterval)
                  setTimeout(() => {
                    setInputText("")
                    setIsUserTyping(false)
                    setChatMessages(messages.slice(0, prev + 2))
                  }, 500)
                }
              }, 100)
            }
          } else {
            setHeaderStatus("digitando...")
            setIsTyping(true)

            setTimeout(() => {
              setIsTyping(false)
              setHeaderStatus("online")
              setChatMessages(messages.slice(0, prev + 2))
            }, 2500)
          }

          return prev + 1
        } else {
          // Reset animation
          setChatMessages([messages[0]])
          setHeaderStatus("online")
          setInputText("")
          setIsUserTyping(false)
          return 0
        }
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-purple-500/20 transition-all duration-300 hover:border-purple-400/30 overflow-hidden shadow-2xl">
      {/* WhatsApp Header */}
      <div className="bg-[#2a2f32] p-4 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center overflow-hidden shadow-lg">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-medium text-sm">Assistente IA - Fluintech</h3>
            <div className="text-xs flex items-center">
              <div
                className={`w-2 h-2 rounded-full mr-2 ${headerStatus === "online" ? "bg-green-400" : "bg-orange-400"}`}
              ></div>
              <span className={headerStatus === "digitando..." ? "text-green-400" : "text-gray-300"}>
                {headerStatus}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Video className="w-5 h-5 text-white/70 hover:text-white cursor-pointer transition-colors" />
          <Phone className="w-5 h-5 text-white/70 hover:text-white cursor-pointer transition-colors" />
          <MoreVertical className="w-5 h-5 text-white/70 hover:text-white cursor-pointer transition-colors" />
        </div>
      </div>

      {/* Chat Messages */}
      <div className="h-80 overflow-y-auto p-4 space-y-3 bg-[#0b141a] relative">
        {chatMessages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom duration-500`}
          >
            <div
              className={`max-w-[75%] px-3 py-2 rounded-lg shadow-lg relative ${
                message.type === "user"
                  ? "bg-[#005c4b] text-white rounded-br-sm"
                  : "bg-[#202c33] text-white rounded-bl-sm"
              }`}
            >
              {message.isAudio ? (
                <div className="flex items-center space-x-3 min-w-[200px] py-1">
                  {/* Profile picture for audio messages */}
                  <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center overflow-hidden shrink-0">
                    <img src="/user-profile-illustration.png" alt="User" className="w-full h-full object-cover" />
                  </div>

                  {/* Play button */}
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shadow-sm cursor-pointer hover:bg-white/30 transition-colors">
                    <Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" />
                  </div>

                  {/* Waveform visualization */}
                  <div className="flex items-center space-x-0.5 flex-1">
                    {[3, 6, 9, 4, 7, 11, 6, 3, 8, 10, 5, 12, 4, 6, 9, 3, 11, 5, 8, 4].map((height, i) => (
                      <div
                        key={i}
                        className="w-0.5 bg-[#53bdeb] rounded-full transition-all duration-200"
                        style={{
                          height: `${height}px`,
                          opacity: i < 6 ? 1 : 0.4,
                        }}
                      />
                    ))}
                  </div>

                  {/* Duration */}
                  <span className="text-xs text-white/70 font-mono">{message.duration}</span>
                </div>
              ) : (
                <div className="text-sm leading-relaxed">{message.text}</div>
              )}

              <div className="flex items-center justify-end mt-1 space-x-1">
                <span className="text-xs text-white/50">{message.time}</span>
                {message.type === "user" && (
                  <div className="flex">
                    {message.status === "read" ? (
                      <CheckCheck className="w-3 h-3 text-[#53bdeb]" />
                    ) : message.status === "delivered" ? (
                      <CheckCheck className="w-3 h-3 text-white/50" />
                    ) : (
                      <Check className="w-3 h-3 text-white/50" />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start animate-in slide-in-from-bottom duration-300">
            <div className="bg-[#202c33] text-white px-3 py-2 rounded-lg rounded-bl-sm max-w-[75%] shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-[#2a2f32] p-3 flex items-center space-x-3 border-t border-white/5">
        <div className="flex-1 bg-[#40454a] rounded-full px-4 py-2.5 flex items-center space-x-2 min-h-[40px]">
          {isUserTyping && inputText ? (
            <span className="text-white text-sm animate-pulse">{inputText}</span>
          ) : (
            <span className="text-white/50 text-sm">Digite uma mensagem</span>
          )}
        </div>
        <div className="w-10 h-10 bg-[#00a884] rounded-full flex items-center justify-center hover:bg-[#008f72] transition-colors cursor-pointer shadow-lg">
          <Mic className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  )
}