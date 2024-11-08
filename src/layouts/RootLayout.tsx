import { useAuth } from '@/components/AuthProvider'
import { Outlet } from 'react-router-dom'

function RootLayout() {
  const { isLoading } = useAuth();

  if (isLoading) {
    console.log("isLoading");
    return <div className='h-dvh flex items-center justify-center'>
      <img src="/favicon.svg" className="w-32 h-32" />
    </div>
  }

  return (
    <Outlet />
  )
}

export default RootLayout