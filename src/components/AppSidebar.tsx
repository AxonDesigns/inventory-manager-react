import AppSidebarFooter from "@/components/AppSidebarFooter"
import AppSidebarHeader from "@/components/AppSidebarHeader"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Package, ReceiptText, Users } from "lucide-react"
import { Link } from "react-router-dom"

// Menu items.
const items = [
  {
    title: "Products",
    url: "/tables/products",
    icon: <Package />,
  },
  {
    title: "Users",
    url: "/tables/users",
    icon: <Users />,
  },
  {
    title: "Orders",
    url: "/tables/orders",
    icon: <ReceiptText />,
  },
  {
    title: "Customers",
    url: "/tables/customers",
    icon: <Users />,
  },
]

export function AppSidebar() {

  const { setOpenMobile } = useSidebar()
  return (
    <Sidebar>
      <AppSidebarHeader />
      <SidebarContent >
        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.url === location.pathname}>
                    <Link to={item.url} onClick={() => { setOpenMobile(false) }}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <AppSidebarFooter />
    </Sidebar>
  )
}
