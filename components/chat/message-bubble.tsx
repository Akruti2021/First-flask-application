"use client"

import { cn } from "@/lib/utils"

type MessageBubbleProps = {
  role: "user" | "system"
  content: string
}

export function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === "user"

  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-3",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground"
        )}
      >
        <div className="text-sm break-words whitespace-pre-wrap">
          {content}
        </div>
      </div>
    </div>
  )
}