"use client";

import { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { MessageSquare, Clock, Plus, Scale } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AppSidebar() {
  const [history, setHistory] = useState<any[]>([]);

  const fetchHistory = async () => {
    try {
      const res = await fetch("/api/history");
      if (res.ok) {
        const data = await res.json();
        setHistory(data.sort((a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()));
      }
    } catch (error) {
      console.error("Failed to fetch history:", error);
    }
  };

  useEffect(() => {
    fetchHistory();
    // Refresh history every 10 seconds to keep it updated with main page activity
    const interval = setInterval(fetchHistory, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Sidebar variant="sidebar" className="border-r bg-sidebar/50 backdrop-blur-xl">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3 px-2 py-1 mb-2">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center ring-1 ring-primary/20">
            <Scale className="w-5 h-5 text-primary" />
          </div>
          <span className="font-bold text-sm tracking-tight">Legal AI History</span>
        </div>
        <Button
          variant="outline"
          className="w-full justify-start gap-2 rounded-xl bg-background/50 hover:bg-background border-primary/10"
          onClick={() => window.location.href = "/"}
        >
          <Plus className="w-4 h-4" />
          <span className="text-xs font-semibold">New Consultation</span>
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 flex items-center gap-2">
            <Clock className="w-3 h-3" />
            Recent Cases
          </SidebarGroupLabel>
          <SidebarMenu className="px-2 mt-2 gap-1">
            {history.length === 0 ? (
              <div className="px-4 py-8 text-center opacity-40">
                <p className="text-[10px] font-medium italic">No past sessions found</p>
              </div>
            ) : (
              history.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    asChild
                    className="rounded-xl h-10 px-3 hover:bg-primary/5 group"
                    tooltip={item.title}
                  >
                    <a href={`/?id=${item.id}`} className="flex items-center gap-3 w-full">
                      <MessageSquare className="w-4 h-4 text-primary/40 group-hover:text-primary transition-colors" />
                      <div className="flex flex-col items-start overflow-hidden">
                        <span className="truncate text-xs font-medium">{item.title}</span>
                        <span className="text-[9px] text-muted-foreground/60">{new Date(item.updatedAt).toLocaleDateString('th-TH')}</span>
                      </div>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-sidebar-border/50">
        <div className="flex items-center gap-2 px-2 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default select-none">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold tracking-tighter uppercase">Systems Active</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}