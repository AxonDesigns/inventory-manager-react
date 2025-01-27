import React from 'react'

function ModuleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='animate-fade-in-up duration-200 ease-out'>
      {children}
    </div>
  )
}

export default ModuleLayout