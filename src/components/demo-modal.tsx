"use client"

import { useState, useEffect, useRef } from "react"
import { X, Phone, Video, MoreVertical, Paperclip, Mic, Send, Check, CheckCheck, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DemoModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [currentConversation, setCurrentConversation] = useState(0)
  const [messages, setMessages] = useState<any[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [typingText, setTypingText] = useState("")
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const chatAreaRef = useRef<HTMLDivElement>(null)
  const [isRecording, setIsRecording] = useState(false)

  const conversations = [
    {
      title: "Agendamento de Consulta",
      contact: "Dr. Silva - Clínica Médica",
      messages: [
        { type: "user", text: "Oi! Gostaria de agendar uma consulta", time: "14:30", status: "read" },
        {
          type: "bot",
          text: "Olá! Claro, vou te ajudar com o agendamento. Qual especialidade você precisa?",
          time: "14:30",
          status: "read",
        },
        {
          type: "bot",
          text: "Aqui estão nossas especialidades disponíveis:",
          time: "14:31",
          status: "read",
          options: ["🩺 Clínico Geral", "❤️ Cardiologia", "🦴 Ortopedia", "👁️ Oftalmologia"],
        },
        { type: "user", text: "Clínico Geral", time: "14:32", status: "read" },
        {
          type: "bot",
          text: "Perfeito! Temos horários disponíveis esta semana. Qual dia prefere?",
          time: "14:32",
          status: "read",
        },
        {
          type: "bot",
          text: "Horários disponíveis:",
          time: "14:33",
          status: "read",
          buttons: [
            { text: "Hoje 16:00", id: "today" },
            { text: "Amanhã 09:30", id: "tomorrow" },
            { text: "Sexta 14:00", id: "friday" },
          ],
        },
        { type: "user", text: "Amanhã 09:30", time: "14:34", status: "read" },
        {
          type: "bot",
          text: "Agendamento confirmado! ✅\n\n📅 Data: Amanhã\n🕘 Horário: 09:30\n👨‍⚕️ Dr. Silva - Clínico Geral\n📍 Rua das Flores, 123\n\nVocê receberá um lembrete 1 hora antes.",
          time: "14:34",
          status: "read",
        },
      ],
    },
    {
      title: "Suporte com Áudio",
      contact: "TechHelp - Assistente IA",
      messages: [
        { type: "user", text: "Olá, preciso de ajuda com meu sistema", time: "15:20", status: "read" },
        {
          type: "bot",
          text: "Olá! Sou o assistente virtual da TechHelp. Como posso ajudar você hoje?",
          time: "15:20",
          status: "read",
        },
        {
          type: "user",
          audio: true,
          duration: "0:15",
          text: "Áudio: Explicando o problema do sistema...",
          time: "15:21",
          status: "read",
        },
        {
          type: "bot",
          text: "Entendi perfeitamente seu problema! Vou te explicar a solução em áudio para ficar mais claro:",
          time: "15:22",
          status: "read",
        },
        {
          type: "bot",
          audio: true,
          duration: "0:23",
          text: "Áudio: Instruções detalhadas para resolver...",
          time: "15:22",
          status: "read",
        },
        { type: "user", text: "Perfeito! Funcionou! Muito obrigado!", time: "15:25", status: "read" },
        {
          type: "bot",
          text: "Fico feliz em ter ajudado! Se precisar de mais alguma coisa, estarei aqui! 😊",
          time: "15:25",
          status: "read",
        },
      ],
    },
    {
      title: "Análise de Erro por Imagem",
      contact: "SoftwareSupport Pro",
      messages: [
        { type: "user", text: "Oi, estou com um erro no sistema", time: "16:10", status: "read" },
        {
          type: "bot",
          text: "Olá! Sou o assistente de suporte. Pode me enviar uma captura de tela do erro?",
          time: "16:10",
          status: "read",
        },
        {
          type: "user",
          image: true,
          text: "📷 Imagem: Tela de erro do sistema",
          time: "16:11",
          status: "read",
        },
        {
          type: "bot",
          text: "Analisando a imagem... 🔍",
          time: "16:11",
          status: "read",
        },
        {
          type: "bot",
          text: "Identifiquei o problema! É um erro de conexão com o banco de dados. Aqui está a solução:",
          time: "16:12",
          status: "read",
        },
        {
          type: "bot",
          text: "🔧 **Solução:**\n\n1️⃣ Verifique sua conexão com a internet\n2️⃣ Reinicie o serviço do banco\n3️⃣ Limpe o cache da aplicação\n\nSe o problema persistir, posso conectar você com um técnico especializado.",
          time: "16:13",
          status: "read",
        },
        { type: "user", text: "Funcionou! O erro sumiu. Muito obrigado!", time: "16:15", status: "read" },
        {
          type: "bot",
          text: "Excelente! Fico feliz que tenha resolvido. Nossa IA está sempre aprendendo para oferecer soluções mais precisas! 🤖✨",
          time: "16:15",
          status: "read",
        },
      ],
    },
    {
      title: "Pedido de Delivery",
      contact: "Pizzaria Bella Vista",
      messages: [
        { type: "user", text: "Boa noite! Gostaria de fazer um pedido", time: "19:15", status: "read" },
        { type: "bot", text: "Boa noite! Seja bem-vindo à Pizzaria Bella Vista! 🍕", time: "19:15", status: "read" },
        {
          type: "bot",
          text: "Nosso cardápio:",
          time: "19:16",
          status: "read",
          products: [
            { name: "Pizza Margherita", price: "R$ 35,00", image: "🍕" },
            { name: "Pizza Calabresa", price: "R$ 38,00", image: "🍕" },
            { name: "Pizza Portuguesa", price: "R$ 42,00", image: "🍕" },
            { name: "Refrigerante 2L", price: "R$ 8,00", image: "🥤" },
          ],
        },
        { type: "user", text: "Quero uma Pizza Margherita", time: "19:17", status: "read" },
        {
          type: "bot",
          text: "Ótima escolha! Pizza Margherita adicionada ao carrinho 🛒\n\nDeseja mais alguma coisa?",
          time: "19:17",
          status: "read",
        },
        { type: "user", text: "Um refrigerante também", time: "19:18", status: "read" },
        {
          type: "bot",
          text: "Perfeito! Seu pedido:\n\n🍕 Pizza Margherita - R$ 35,00\n🥤 Refrigerante 2L - R$ 8,00\n\n💰 Total: R$ 43,00\n\nConfirma o pedido?",
          time: "19:18",
          status: "read",
        },
        {
          type: "bot",
          text: "",
          time: "19:19",
          status: "read",
          buttons: [
            { text: "✅ Confirmar Pedido", id: "confirm" },
            { text: "🛒 Adicionar Mais", id: "add_more" },
            { text: "❌ Cancelar", id: "cancel" },
          ],
        },
      ],
    },
  ]

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTo({
        top: chatAreaRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [messages])

  useEffect(() => {
    if (isOpen) {
      setMessages([])
      setCurrentMessageIndex(0)
      setIsTyping(false)
      setTypingText("")

      const timer = setTimeout(() => {
        playConversation()
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [isOpen, currentConversation])

  const playConversation = () => {
    const conversation = conversations[currentConversation]
    let messageIndex = 0

    const showNextMessage = () => {
      if (messageIndex >= conversation.messages.length) {
        setTimeout(() => {
          setCurrentConversation((prev) => (prev + 1) % conversations.length)
        }, 3000)
        return
      }

      const message = conversation.messages[messageIndex]

      if (message.type === "bot") {
        if (message.audio) {
          setIsTyping(true)
          setTypingText("gravando áudio...")
          setIsRecording(true)
        } else {
          setIsTyping(true)
          setTypingText("digitando...")
          setIsRecording(false)
        }

        setTimeout(
          () => {
            setIsTyping(false)
            setIsRecording(false)
            setMessages((prev) => [...prev, message])
            messageIndex++
            setTimeout(showNextMessage, 1500)
          },
          message.audio ? 3000 : 2000,
        )
      } else {
        setMessages((prev) => [...prev, message])
        messageIndex++
        setTimeout(showNextMessage, 1000)
      }
    }

    showNextMessage()
  }

  if (!isOpen) return null

  const currentConv = conversations[currentConversation]

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-[#075e54] text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-sm font-semibold">{currentConv.contact.charAt(0)}</span>
            </div>
            <div>
              <h3 className="font-semibold">{currentConv.contact}</h3>
              {isTyping && (
                <p className="text-sm text-green-300 animate-pulse flex items-center gap-1">
                  {isRecording && <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>}
                  {typingText}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Video className="w-5 h-5 cursor-pointer hover:bg-white/10 rounded p-1 transition-colors" />
            <Phone className="w-5 h-5 cursor-pointer hover:bg-white/10 rounded p-1 transition-colors" />
            <MoreVertical className="w-5 h-5 cursor-pointer hover:bg-white/10 rounded p-1 transition-colors" />
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/10 p-1">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Chat Area */}
        <div ref={chatAreaRef} className="flex-1 bg-[#0b141a] p-4 overflow-y-auto">
          <div className="space-y-3">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === "user" ? "bg-[#005c4b] text-white" : "bg-[#1f2937] text-white"
                  }`}
                >
                  {message.audio ? (
                    <div className="flex items-center space-x-3 py-1">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-600 text-xs font-semibold">
                          {message.type === "user" ? "U" : "AI"}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 flex-1">
                        <Play className="w-4 h-4 text-blue-400" />
                        <div className="flex-1 h-6 bg-blue-400/20 rounded-full relative overflow-hidden">
                          <div className="h-full bg-blue-400 rounded-full animate-pulse" style={{ width: "60%" }}></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex space-x-0.5">
                              {Array.from({ length: 20 }).map((_, i) => (
                                <div
                                  key={i}
                                  className="w-0.5 bg-blue-400 rounded-full animate-pulse"
                                  style={{
                                    height: `${Math.random() * 16 + 4}px`,
                                    animationDelay: `${i * 0.1}s`,
                                  }}
                                ></div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400">{message.duration}</span>
                      </div>
                    </div>
                  ) : message.image ? (
                    <div className="space-y-2">
                      <div className="w-48 h-32 bg-gray-700 rounded-lg flex items-center justify-center border-2 border-red-400">
                        <div className="text-center">
                          <div className="text-red-400 text-2xl mb-1">⚠️</div>
                          <div className="text-xs text-gray-300">Error Screenshot</div>
                          <div className="text-xs text-red-400">Database Connection Failed</div>
                        </div>
                      </div>
                      <p className="text-sm">{message.text}</p>
                    </div>
                  ) : (
                    message.text && <p className="text-sm">{message.text}</p>
                  )}

                  {message.options && (
                    <div className="mt-2 space-y-1">
                      {message.options.map((option, i) => (
                        <div
                          key={i}
                          className="bg-[#374151] p-2 rounded cursor-pointer hover:bg-[#4b5563] transition-colors"
                        >
                          <span className="text-sm">{option}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {message.buttons && (
                    <div className="mt-2 space-y-1">
                      {message.buttons.map((button, i) => (
                        <button
                          key={i}
                          className="w-full bg-[#005c4b] text-white p-2 rounded text-sm hover:bg-[#004a3d] transition-colors"
                        >
                          {button.text}
                        </button>
                      ))}
                    </div>
                  )}

                  {message.products && (
                    <div className="mt-2 space-y-2">
                      {message.products.map((product, i) => (
                        <div key={i} className="bg-[#374151] p-3 rounded flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl">{product.image}</span>
                            <div>
                              <p className="text-sm font-semibold">{product.name}</p>
                              <p className="text-xs text-gray-300">{product.price}</p>
                            </div>
                          </div>
                          <button className="bg-[#005c4b] text-white px-3 py-1 rounded text-xs hover:bg-[#004a3d] transition-colors">
                            Adicionar
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-end mt-1 space-x-1">
                    <span className="text-xs text-gray-400">{message.time}</span>
                    {message.type === "user" && (
                      <div className="text-blue-400">
                        {message.status === "read" ? <CheckCheck className="w-3 h-3" /> : <Check className="w-3 h-3" />}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#1f2937] text-white px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-[#1e293b] p-4 flex items-center space-x-3">
          <Paperclip className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white transition-colors" />
          <div className="flex-1 bg-[#374151] rounded-full px-4 py-2 flex items-center">
            <input
              type="text"
              placeholder="Digite uma mensagem"
              className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-sm"
              disabled
            />
            <Mic className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white transition-colors ml-2" />
          </div>
          <Send className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white transition-colors" />
        </div>

        {/* Conversation Indicator */}
        <div className="bg-[#075e54] p-2 text-center">
          <div className="flex justify-center space-x-2">
            {conversations.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentConversation ? "bg-white" : "bg-white/30"
                }`}
              />
            ))}
          </div>
          <p className="text-white text-xs mt-1">{currentConv.title}</p>
        </div>
      </div>
    </div>
  )
}
