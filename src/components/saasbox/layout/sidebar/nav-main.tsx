"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Building2Icon,
  ChartPieIcon,
  ChevronRight,
  GaugeIcon,
  KeyIcon,
  type LucideIcon,
  SettingsIcon,
  HomeIcon,
  WrenchIcon,
  BookIcon,
  FileIcon,
  Blocks,
  BugIcon,
} from "lucide-react";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

type NavGroup = {
  title: string;
  items: NavItem;
};

type NavItem = {
  title: string;
  href: string;
  icon?: LucideIcon;
  isComing?: boolean;
  isDataBadge?: string;
  isNew?: boolean;
  newTab?: boolean;
  items?: NavItem;
}[];

export const orgNavItems: NavGroup[] = [
  {
    title: "Dashboards",
    items: [
      {
        title: "Bug Reporter",
        href: "/dashboard/bug-reporter",
        icon: GaugeIcon,
      },
      {
        title: "Usage",
        href: "/dashboard/usage",
        icon: GaugeIcon,
      },
    ]
  },
  {
    title: "Reports",
    items: [
      {
        title: "Bug Reports",
        href: "/report/bug-reporter",
        icon: BugIcon,
      },
      {
        title: "Analytics",
        href: "#",
        icon: ChartPieIcon,
        items: [
          { title: "Conversations", href: "/analytics/conversations" },
          { title: "Agents", href: "/analytics/agents" },
          { title: "Customers", href: "/analytics/customers" },
          { title: "Spend", href: "/analytics/spend" },
        ],
      },
    ],
  },
  {
    title: "Analytics",
    items: [
      {
        title: "Bug Reporter",
        href: "/analytics/bug-reporter",
        icon: BugIcon,
      },
    ],
  },
  {
    title: "Knowledge Base",
    items: [
      { title: "Notes", href: "/knowledge-base/notes", icon: BookIcon },
      {
        title: "Files",
        href: "/knowledge-base/files",
        icon: FileIcon,
      },
    ],
  },
  {
    title: "Developer",
    items: [
      { title: "Credentials", href: "/developer/credentials", icon: KeyIcon },
      {
        title: "Integrations",
        href: "#",
        icon: WrenchIcon,
        items: [
          { title: "Email Notifications", href: "/integrations/email-notifications" },
          { title: "Slack Notifications", href: "/integrations/slack-notifications" },
          { title: "SMS Notifications", href: "/integrations/sms-notifications" },
        ],
      },
    ],
  },
  {
    title: "How to Install",
    items: [{ title: "Bug Reporter", href: "/how-to-install/bug-reporter", icon: Blocks }],
  },
];

export const userNavItems: NavGroup[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Home",
        href: "/dashboard",
        icon: HomeIcon,
      },
    ],
  },
  {
    title: "Organizations",
    items: [
      {
        title: "View All",
        href: "/organizations",
        icon: Building2Icon,
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        title: "Account Settings",
        href: "/account-settings",
        icon: SettingsIcon,
      },
    ],
  },
];

export function NavMain() {
  const pathname = usePathname();
  const { isMobile } = useSidebar();
  const [navItems] = useState(orgNavItems);

  return (
    <>
      {navItems.map((nav) => (
        <SidebarGroup key={nav.title}>
          <SidebarGroupLabel>{nav.title}</SidebarGroupLabel>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              {nav.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {Array.isArray(item.items) && item.items.length > 0 ? (
                    <>
                      <div className="hidden group-data-[collapsible=icon]:block">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <SidebarMenuButton tooltip={item.title}>
                              {item.icon && <item.icon />}
                              <span>{item.title}</span>
                              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            side={isMobile ? "bottom" : "right"}
                            align={isMobile ? "end" : "start"}
                            className="min-w-48 rounded-lg"
                          >
                            <DropdownMenuLabel>{item.title}</DropdownMenuLabel>
                            {item.items?.map((item) => (
                              <DropdownMenuItem
                                className="hover:text-foreground active:text-foreground hover:bg-[var(--primary)]/10! active:bg-[var(--primary)]/10!"
                                asChild
                                key={item.title}
                              >
                                <a href={item.href}>{item.title}</a>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <Collapsible className="group/collapsible block group-data-[collapsible=icon]:hidden">
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            className="hover:text-foreground active:text-foreground hover:bg-[var(--primary)]/10 active:bg-[var(--primary)]/10"
                            tooltip={item.title}
                          >
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item?.items?.map((subItem, key) => (
                              <SidebarMenuSubItem key={key}>
                                <SidebarMenuSubButton
                                  className="hover:text-foreground active:text-foreground hover:bg-[var(--primary)]/10 active:bg-[var(--primary)]/10"
                                  isActive={pathname === subItem.href}
                                  asChild
                                >
                                  <Link
                                    href={`${subItem.href}`}
                                    target={subItem.newTab ? "_blank" : ""}
                                  >
                                    <span>{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </Collapsible>
                    </>
                  ) : (
                    <SidebarMenuButton
                      className="hover:text-foreground active:text-foreground hover:bg-[var(--primary)]/10 active:bg-[var(--primary)]/10"
                      isActive={pathname === item.href}
                      tooltip={item.title}
                      asChild
                    >
                      <Link
                        href={`${item.href}`}
                        target={item.newTab ? "_blank" : ""}
                      >
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                  {!!item.isComing && (
                    <SidebarMenuBadge className="peer-hover/menu-button:text-foreground opacity-50">
                      Coming
                    </SidebarMenuBadge>
                  )}
                  {!!item.isNew && (
                    <SidebarMenuBadge className="border border-green-400 text-green-600 peer-hover/menu-button:text-green-600">
                      New
                    </SidebarMenuBadge>
                  )}
                  {!!item.isDataBadge && (
                    <SidebarMenuBadge className="peer-hover/menu-button:text-foreground">
                      {item.isDataBadge}
                    </SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
}
