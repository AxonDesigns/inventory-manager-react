import { AppSidebar } from '@/components/AppSidebar'
import { ModeToggle } from '@/components/mode-toggle'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { useIsMobile } from '@/hooks/use-mobile'
import { capitalize } from '@/lib/utils'
import { Link, Outlet, useLocation } from 'react-router-dom'

function TablesLayout() {
  const isMobile = useIsMobile()
  const location = useLocation()

  return (
    <SidebarProvider open={true} className='items-stretch'>
      <AppSidebar />
      <div className='flex-1'>
        <header className='flex items-center  gap-2 p-4'>
          {isMobile && <SidebarTrigger className='' />}
          {isMobile && <Separator orientation='vertical' className='h-5 mx-2' />}
          <Breadcrumb className='ml-1'>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/tables">Tables</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{capitalize(location.pathname.split('/').pop()!)}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className='flex-1' />
          <ModeToggle />
        </header>
        <main className='flex-1 animate-fade-in-up duration-200 ease-out'>
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}

export default TablesLayout