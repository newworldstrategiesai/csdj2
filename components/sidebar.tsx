"use client";

import { Calendar, Users, Music, FileText, Mail, MessageSquare, Settings, PhoneCall } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: Calendar },
  { name: "Leads", href: "/leads", icon: Users },
  { name: "Events", href: "/events", icon: Music },
  { name: "Contracts", href: "/contracts", icon: FileText },
  { name: "Communications", href: "/communications", icon: Mail },
  { name: "SMS", href: "/sms", icon: MessageSquare },
  { name: "Calls", href: "/calls", icon: PhoneCall },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-card">
      <div className="flex h-16 items-center px-6">
        <h1 className="text-xl font-bold text-primary">DJ Management</h1>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}