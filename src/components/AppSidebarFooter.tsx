import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { ChevronsUpDown, LogOut, User } from 'lucide-react'

function AppSidebarFooter() {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className='rounded-lg size-8'>
                  <AvatarImage src="https://avatars.githubusercontent.com/u/29678494?v=4" />
                  <AvatarFallback className='rounded-lg bg-primary text-primary-foreground'>
                    <User className="size-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Username</span>
                  <span className="">email@example.com</span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width]"
              align="start"
            >
              <DropdownMenuItem>
                <LogOut /> Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}

export default AppSidebarFooter