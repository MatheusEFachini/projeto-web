
import React from "react"

import { Home, Network, PersonStanding } from "lucide-react"
 
import {   Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem } from "./sidebar"

export function AppSidebar() {
const items = [
    {
        title: "Pagina Inicial",
        url: "/",
        icon: Home,
    },
    {
        title: "Desenvolvedores",
        url: "/desenvolvedores",
        icon: PersonStanding,
    },
    {
        title: "Nivel",
        url: "/nivel",
        icon: Network,
    },
]

  return (
    <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>CRUD Desenvolvedores</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
  )
}
