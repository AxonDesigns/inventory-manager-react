import { useAuth } from '@/components/AuthProvider'
import Logo from '@/components/Logo';
import { Outlet } from 'react-router-dom'

function RootLayout() {
  const { isLoading } = useAuth();

  return (
    <>
      <div>
        <Outlet />
      </div>
      {
        <div className={`bg-background fixed top-0 left-0 w-full h-dvh flex items-center justify-center 
        z-50 ${isLoading ? "pointer-events-auto opacity-100 duration-0" : "pointer-events-none opacity-0 delay-150 duration-300"} ease-out 
        overflow-hidden`}
        >
          {/* Margin trick to avoid scrollbar jump */}
          <Logo className="w-32 h-32 mr-0 ml-[calc(100vw-100%)] text-foreground" />

        </div>
      }
    </>
  )
}

export default RootLayout