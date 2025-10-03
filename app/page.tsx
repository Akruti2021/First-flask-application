"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MessageBubble } from "@/components/chat/message-bubble"
import { cn } from "@/lib/utils"

type ChatMessage = {
  id: string
  role: "user" | "system"
  content: string
}

export default function Page() {
  const [input, setInput] = React.useState("")
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "system",
      content:
        "Welcome! Type math with delimiters like $e^{i\\pi}+1=0$, $$\\int_{-\\infty}^{\\infty} e^{-x^2}\\,dx = \\sqrt{\\pi}$$ or \\[ f(x) = \\int_{-\\infty}^{\\infty} \\hat f(\\xi) e^{2\\pi i \\xi x} \\, d\\xi \\].",
    },
  ])

  const [dark, setDark] = React.useState(false)
  const chatContainerRef = React.useRef<HTMLDivElement | null>(null)
  const renderTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  React.useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [dark])

  React.useEffect(() => {
    if (renderTimeoutRef.current) {
      clearTimeout(renderTimeoutRef.current)
    }

    const el = chatContainerRef.current
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
    }

    renderTimeoutRef.current = setTimeout(() => {
      const win = window as any

      if (win.renderMathInElement && el) {
        try {
          win.renderMathInElement(el, {
            delimiters: [
              { left: "$$", right: "$$", display: true },
              { left: "$", right: "$", display: false },
              { left: "\\[", right: "\\]", display: true },
              { left: "\\(", right: "\\)", display: false },
            ],
            throwOnError: false,
          })
        } catch (error) {
          console.error("KaTeX render error:", error)
        }
      }
    }, 100)

    return () => {
      if (renderTimeoutRef.current) {
        clearTimeout(renderTimeoutRef.current)
      }
    }
  }, [messages])

  function addMessage(role: ChatMessage["role"], content: string) {
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role, content }])
  }

  async function handleSend() {
    const text = input.trim()
    if (!text) return

    addMessage("user", text)
    setInput("")

    setTimeout(() => {
      addMessage("system", `You wrote: ${text}`)
    }, 300)
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <header className="w-full border-b">
        <div className="mx-auto w-full max-w-4xl px-4 py-4 flex items-center justify-between">
          <h1 className="text-lg md:text-xl font-semibold">
            Math Chat with KaTeX
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Dark mode</span>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setDark((d) => !d)}
            >
              {dark ? "On" : "Off"}
            </Button>
          </div>
        </div>
      </header>

      <section className="flex-1">
        <div className="mx-auto w-full max-w-4xl px-4 py-4">
          <div
            ref={chatContainerRef}
            className={cn(
              "rounded-lg border bg-card",
              "h-[60vh] md:h-[70vh] overflow-y-auto px-3 py-4",
              "shadow-sm"
            )}
          >
            <div className="flex flex-col gap-3">
              {messages.map((m) => (
                <MessageBubble key={m.id} role={m.role} content={m.content} />
              ))}
            </div>
          </div>

          <div className="mt-4">
            <div className="rounded-lg border bg-card p-3 shadow-sm">
              <Textarea
                id="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder='Type a message. Use math like "$e^{i\\pi}+1=0$"'
                className="min-h-24 resize-y bg-background"
              />
              <div className="mt-3 flex items-center justify-end">
                <Button onClick={handleSend}>Send</Button>
              </div>
            </div>
          </div>

          <p className="mt-3 text-xs text-muted-foreground">
            Tip: Press Enter to send, Shift+Enter for a new line.
          </p>
        </div>
      </section>
    </main>
  )
}