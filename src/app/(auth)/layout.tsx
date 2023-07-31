import { Metadata } from 'next';
import React, { ReactNode } from 'react'


export const metadata: Metadata = {
    title: "Login",
  };

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex flex-col min-h-screen w-full bg-slate-100'>
        {children}
    </div>
  )
}

export default AuthLayout