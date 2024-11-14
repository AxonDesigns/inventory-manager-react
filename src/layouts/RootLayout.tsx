import { useAuth } from '@/components/AuthProvider'
import { Outlet } from 'react-router-dom'

function RootLayout() {
  const { isLoading } = useAuth();

  return (
    <>
      <Outlet />
      {isLoading && (
        <div className='absolute top-0 left-0 w-full h-dvh flex items-center justify-center'>
          <img src="/favicon.svg" className="w-32 h-32" />
        </div>
      )}
    </>
  )
}

export default RootLayout