import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { SendHorizonal, Bot, User, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function Home() {
  return (
    <div className="flex flex-col h-full w-full relative">
      {/* Chat History Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 scroll-smooth">

        {/* Welcome Section */}
        <div className="flex flex-col items-center justify-center py-10 opacity-70">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 ring-1 ring-primary/20 shadow-inner">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold tracking-tight">How can I help you today?</h2>
        </div>

        {/* User Message */}
        <div className="flex flex-row justify-end items-end gap-3 max-w-[85%] ml-auto group">
          <div className="flex flex-col gap-1 items-end">
            <span className="text-xs text-muted-foreground px-1 font-medium select-none">You</span>
            <div className="bg-primary text-primary-foreground p-4 rounded-2xl rounded-br-sm shadow-sm max-w-xl text-sm leading-relaxed whitespace-pre-wrap font-medium">
              วิเคราะห์โค้คและจัด layout ทั้งหมดให้เหมาะสมกับ web chart ai
            </div>
          </div>
          <Avatar className="w-8 h-8 border shadow-sm select-none">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="bg-muted"><User className="w-4 h-4" /></AvatarFallback>
          </Avatar>
        </div>

        {/* AI Message */}
        <div className="flex flex-row justify-start items-end gap-3 max-w-[85%] mr-auto group">
          <Avatar className="w-8 h-8 border shadow-sm ring-2 ring-primary/20 select-none">
            <AvatarFallback className="bg-primary/5 text-primary"><Bot className="w-5 h-5" /></AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1 items-start">
            <span className="text-xs text-muted-foreground px-1 font-medium select-none flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-amber-500" /> Antigravity AI</span>
            <Card className="bg-card text-card-foreground shadow-sm max-w-2xl border-primary/10 rounded-2xl rounded-bl-sm overflow-hidden backdrop-blur-sm">
              <CardContent className="p-4 text-sm leading-relaxed prose prose-sm dark:prose-invert">
                <p>Hello! I have started restructuring the entire layout to create a beautiful, full-screen AI chat UI experience for you.</p>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  <li>✨ <strong>Glassmorphism overlays</strong> for a premium feel</li>
                  <li>📱 <strong>Responsive Flexbox</strong> so it works on all devices</li>
                  <li>🎨 <strong>Refined Avatars & Bubbles</strong> for distinct messaging</li>
                </ul>
                <p className="mt-3">How does this look? Let me know if you want any specific color tweaks!</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="h-4"></div> {/* Spacer for bottom */}
      </div>

      {/* Input Area (Sticky Bottom) */}
      <div className="p-4 bg-background/80 backdrop-blur-xl border-t shadow-[0_-10px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.2)] z-20">
        <div className="max-w-4xl mx-auto relative group flex items-end gap-2 bg-muted/40 p-2 rounded-2xl border border-input focus-within:ring-2 focus-within:ring-primary/40 focus-within:bg-background transition-all duration-300">
          <Textarea
            id="chat-input"
            placeholder="Message Antigravity AI..."
            className="min-h-[44px] max-h-32 resize-none border-0 focus-visible:ring-0 bg-transparent shadow-none p-3 field-sizing-content text-base sm:text-sm"
            rows={1}
          />
          <div className="flex items-center gap-2 pr-1 pb-1">
            <Button size="icon" className="h-9 w-9 rounded-xl shadow-md transition-transform hover:scale-105 active:scale-95 bg-primary text-primary-foreground">
              <SendHorizonal className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </div>
        <div className="text-center mt-3 mb-1">
          <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">AI can make mistakes. Consider verifying important information.</p>
        </div>
      </div>
    </div>
  );
}
