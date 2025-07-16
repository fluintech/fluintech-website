"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, Calendar, MessageCircle, CheckCircle, Users, Zap } from "lucide-react"
import { useState, useEffect } from "react"

interface Node {
  id: number
  icon: React.ComponentType<{ className?: string }>
  label: string
  x: number
  y: number
  color: string
  mobileX: number
  mobileY: number
}

interface Connection {
  from: number
  to: number
  id: string
}

interface AnimationStep {
  connection: string
  from: number
  to: number
}

interface Position {
  x: string
  y: string | number
}

interface ConnectionCoords {
  x1: string
  y1: string | number
  x2: string
  y2: string | number
}

export function AutomationFlow() {
  const [activeConnections, setActiveConnections] = useState<Set<string>>(new Set())
  const [completedConnections, setCompletedConnections] = useState<Set<string>>(new Set())
  const [completedNodes, setCompletedNodes] = useState<Set<number>>(new Set())
  const [currentAnimationStep, setCurrentAnimationStep] = useState<number>(0)
  const [isAnimating, setIsAnimating] = useState<boolean>(false)

  const nodes: Node[] = [
    { id: 1, icon: MessageCircle, label: "Cliente inicia conversa", x: 10, y: 30, color: "from-blue-500 to-cyan-500", mobileX: 50, mobileY: 50 },
    { id: 2, icon: Bot, label: "IA analisa solicitação", x: 50, y: 15, color: "from-purple-500 to-pink-500", mobileX: 50, mobileY: 120 },
    { id: 3, icon: Calendar, label: "Agenda automaticamente", x: 85, y: 30, color: "from-green-500 to-emerald-500", mobileX: 50, mobileY: 190 },
    { id: 4, icon: Users, label: "Notifica equipe", x: 50, y: 60, color: "from-orange-500 to-red-500", mobileX: 50, mobileY: 260 },
    { id: 5, icon: CheckCircle, label: "Confirma agendamento", x: 15, y: 75, color: "from-indigo-500 to-purple-500", mobileX: 50, mobileY: 330 },
    { id: 6, icon: Zap, label: "Processo concluído", x: 85, y: 75, color: "from-yellow-500 to-orange-500", mobileX: 50, mobileY: 400 },
  ]

  const connections: Connection[] = [
    { from: 1, to: 2, id: 'conn1' },
    { from: 2, to: 3, id: 'conn2' },
    { from: 2, to: 4, id: 'conn3' },
    { from: 4, to: 5, id: 'conn4' },
    { from: 3, to: 6, id: 'conn5' },
    { from: 5, to: 6, id: 'conn6' },
  ]

  const animationSequence: AnimationStep[] = [
    { connection: 'conn1', from: 1, to: 2 },
    { connection: 'conn2', from: 2, to: 3 },
    { connection: 'conn3', from: 2, to: 4 },
    { connection: 'conn4', from: 4, to: 5 },
    { connection: 'conn5', from: 3, to: 6 },
    { connection: 'conn6', from: 5, to: 6 },
  ]

  const startAnimation = (): void => {
    setIsAnimating(true)
    setCurrentAnimationStep(0)
    setActiveConnections(new Set())
    setCompletedConnections(new Set())
    setCompletedNodes(new Set([1])) // Nó inicial já está "ativo"
  }

  useEffect(() => {
    if (isAnimating && currentAnimationStep < animationSequence.length) {
      const currentStep = animationSequence[currentAnimationStep]
      
      // Inicia a animação da conexão
      setTimeout(() => {
        setActiveConnections(prev => new Set([...prev, currentStep.connection]))
      }, 100)

      // Quando a linha chega no destino, marca como completada e ativa o próximo nó
      setTimeout(() => {
        setCompletedNodes(prev => new Set([...prev, currentStep.to]))
        setCompletedConnections(prev => new Set([...prev, currentStep.connection]))
        setActiveConnections(prev => {
          const newSet = new Set(prev)
          newSet.delete(currentStep.connection)
          return newSet
        })
        setCurrentAnimationStep(prev => prev + 1)
      }, 1800)

    } else if (currentAnimationStep >= animationSequence.length) {
      // Reset após completar
      setTimeout(() => {
        setIsAnimating(false)
        setActiveConnections(new Set())
        setCompletedConnections(new Set())
        setCompletedNodes(new Set())
      }, 2000)
    }
  }, [currentAnimationStep, isAnimating])

  useEffect(() => {
    // Auto-start animation
    const interval = setInterval(() => {
      if (!isAnimating) {
        startAnimation()
      }
    }, 8000) // Aumentei o intervalo para dar mais tempo

    // Initial start
    setTimeout(() => {
      startAnimation()
    }, 1000)

    return () => clearInterval(interval)
  }, [isAnimating])

  const getNodePosition = (node: Node, isMobile: boolean): Position => {
    if (isMobile) {
      return { x: `${node.mobileX}%`, y: `${node.mobileY}px` }
    }
    return { x: `${node.x}%`, y: `${node.y}%` }
  }

  const getConnectionCoords = (from: number, to: number, isMobile: boolean): ConnectionCoords => {
    const fromNode = nodes.find(n => n.id === from)
    const toNode = nodes.find(n => n.id === to)
    
    if (!fromNode || !toNode) return { x1: "0%", y1: 0, x2: "0%", y2: 0 }

    if (isMobile) {
      // Para mobile, usar as coordenadas centrais dos nós
      return {
        x1: `${fromNode.mobileX}%`,
        y1: fromNode.mobileY + 20, // 20px é metade da altura do nó (40px/2)
        x2: `${toNode.mobileX}%`,
        y2: toNode.mobileY + 20
      }
    }

    // Para desktop, usar as coordenadas centrais dos nós
    return {
      x1: `${fromNode.x}%`,
      y1: `${fromNode.y}%`,
      x2: `${toNode.x}%`,
      y2: `${toNode.y}%`
    }
  }

  return (
    <div className="relative w-full bg-gradient-to-br from-slate-900/50 to-purple-900/50 rounded-2xl border border-purple-500/20 backdrop-blur-sm overflow-hidden">
      {/* Desktop View */}
      <div className="hidden md:block h-80">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=40 height=40 viewBox=0 0 40 40 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%23ffffff fillOpacity=0.03%3E%3Ccircle cx=20 cy=20 r=1/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>

        {/* Connections */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          <defs>
            <linearGradient id="defaultGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6b7280" />
              <stop offset="100%" stopColor="#4b5563" />
            </linearGradient>
            <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          
          {connections.map((connection) => {
            const isActive = activeConnections.has(connection.id)
            const isCompleted = completedConnections.has(connection.id)
            const coords = getConnectionCoords(connection.from, connection.to, false)
            
            return (
              <g key={connection.id}>
                {/* Base line */}
                <line
                  x1={coords.x1}
                  y1={coords.y1}
                  x2={coords.x2}
                  y2={coords.y2}
                  stroke="#374151"
                  strokeWidth="2"
                  strokeDasharray="4,4"
                  opacity="0.3"
                />
                
                {/* Completed line - sempre visível quando completada */}
                {isCompleted && (
                  <line
                    x1={coords.x1}
                    y1={coords.y1}
                    x2={coords.x2}
                    y2={coords.y2}
                    stroke="url(#activeGradient)"
                    strokeWidth="3"
                    strokeDasharray="0"
                    style={{ filter: "drop-shadow(0 0 6px #10b981)" }}
                  />
                )}
                
                {/* Animated line - apenas durante a animação */}
                <AnimatePresence>
                  {isActive && (
                    <motion.line
                      x1={coords.x1}
                      y1={coords.y1}
                      x2={coords.x2}
                      y2={coords.y2}
                      stroke="url(#activeGradient)"
                      strokeWidth="3"
                      strokeDasharray="0"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                      style={{ filter: "drop-shadow(0 0 6px #10b981)" }}
                    />
                  )}
                </AnimatePresence>
              </g>
            )
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((node) => {
          const isCompleted = completedNodes.has(node.id)
          const position = getNodePosition(node, false)

          return (
            <motion.div
              key={node.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: position.x, top: position.y, zIndex: 10 }}
              initial={{ scale: 0.8, opacity: 0.6 }}
              animate={{ 
                scale: isCompleted ? 1.1 : 0.8,
                opacity: isCompleted ? 1 : 0.6
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg relative z-10 transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                      : `bg-gradient-to-r ${node.color}`
                  }`}
                >
                  <node.icon className="w-6 h-6 text-white" />
                </div>
                
                {/* Success glow */}
                {isCompleted && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-green-400/20 blur-md"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.3, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                )}

                {/* Label */}
                <motion.div
                  className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap shadow-lg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {node.label}
                </motion.div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Mobile View */}
      <div className="md:hidden h-[500px]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=40 height=40 viewBox=0 0 40 40 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%23ffffff fillOpacity=0.03%3E%3Ccircle cx=20 cy=20 r=1/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>

        {/* Mobile Connections */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          <defs>
            <linearGradient id="mobileDefaultGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6b7280" />
              <stop offset="100%" stopColor="#4b5563" />
            </linearGradient>
            <linearGradient id="mobileActiveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          
          {connections.map((connection) => {
            const isActive = activeConnections.has(connection.id)
            const isCompleted = completedConnections.has(connection.id)
            const coords = getConnectionCoords(connection.from, connection.to, true)
            
            return (
              <g key={connection.id}>
                {/* Base line */}
                <line
                  x1={coords.x1}
                  y1={coords.y1}
                  x2={coords.x2}
                  y2={coords.y2}
                  stroke="#374151"
                  strokeWidth="2"
                  strokeDasharray="4,4"
                  opacity="0.3"
                />
                
                {/* Completed line - sempre visível quando completada */}
                {isCompleted && (
                  <line
                    x1={coords.x1}
                    y1={coords.y1}
                    x2={coords.x2}
                    y2={coords.y2}
                    stroke="url(#mobileActiveGradient)"
                    strokeWidth="3"
                    strokeDasharray="0"
                    style={{ filter: "drop-shadow(0 0 6px #10b981)" }}
                  />
                )}
                
                {/* Animated line - apenas durante a animação */}
                <AnimatePresence>
                  {isActive && (
                    <motion.line
                      x1={coords.x1}
                      y1={coords.y1}
                      x2={coords.x2}
                      y2={coords.y2}
                      stroke="url(#mobileActiveGradient)"
                      strokeWidth="3"
                      strokeDasharray="0"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                      style={{ filter: "drop-shadow(0 0 6px #10b981)" }}
                    />
                  )}
                </AnimatePresence>
              </g>
            )
          })}
        </svg>

        {/* Mobile Nodes */}
        {nodes.map((node) => {
          const isCompleted = completedNodes.has(node.id)
          const position = getNodePosition(node, true)

          return (
            <motion.div
              key={node.id}
              className="absolute transform -translate-x-1/2"
              style={{ left: position.x, top: position.y, zIndex: 10 }}
              initial={{ scale: 0.8, opacity: 0.6 }}
              animate={{ 
                scale: isCompleted ? 1.05 : 0.8,
                opacity: isCompleted ? 1 : 0.6
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg relative z-10 transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                      : `bg-gradient-to-r ${node.color}`
                  }`}
                >
                  <node.icon className="w-5 h-5 text-white" />
                </div>
                
                {/* Success glow */}
                {isCompleted && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-green-400/20 blur-md"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.3, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                )}

                {/* Mobile Label */}
                <motion.div
                  className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap max-w-32 text-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {node.label}
                </motion.div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Floating particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-400/40 rounded-full"
          style={{
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 0.4, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            delay: Math.random() * 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      ))}
    </div>
  )
}