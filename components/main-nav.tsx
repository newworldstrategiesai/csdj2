"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Mail,
  MessageSquare,
  Phone,
  Settings,
  Mic,
  Music,
  PieChart,
  Inbox,
  Bot,
  Megaphone,
} from "lucide-react";

const mainNavItems = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
      },
      {
        title: "Analytics",
        href: "/analytics",
        icon: PieChart,
      },
    ],
  },
  {
    title: "Business",
    items: [
      {
        title: "Leads",
        href: "/leads",
        icon: Users,
      },
      {
        title: "Events",
        href: "/events",
        icon: Calendar,
      },
      {
        title: "Contracts",
        href: "/contracts",
        icon: FileText,
      },
    ],
  },
  {
    title: "Communications",
    items: [
      {
        title: "Inbox",
        href: "/emails",
        icon: Inbox,
      },
      {
        title: "SMS",
        href: "/sms",
        icon: MessageSquare,
      },
      {
        title: "Calls",
        href: "/calls",
        icon: Phone,
      },
      {
        title: "Marketing",
        href: "/marketing",
        icon: Megaphone,
      },
    ],
  },
  {
    title: "AI Assistants",
    items: [
      {
        title: "Voice Agents",
        href: "/agents",
        icon: Mic,
      },
      {
        title: "Automations",
        href: "/leads/pipeline/automation",
        icon: Bot,
      },
    ],
  },
  {
    title: "Event Tools",
    items: [
      {
        title: "Song Requests",
        href: "/requests",
        icon: Music,
      },
      {
        title: "Playlists",
        href: "/playlists",
        icon: Music,
      },
    ],
  },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col flex-1">
      <nav className="flex flex-col gap-2 p-4 flex-1">
        {mainNavItems.map((group) => (
          <div key={group.title} className="mb-6">
            <h3 className="mb-2 px-3 text-xs font-semibold text-muted-foreground tracking-wider uppercase">
              {group.title}
            </h3>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      <div className="p-4 border-t">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors mb-2",
            "hover:bg-accent hover:text-accent-foreground",
            pathname === "/settings"
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground"
          )}
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
        <ThemeToggle />
      </div>
    </div>
  );
}