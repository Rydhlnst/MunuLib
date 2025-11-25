import React from 'react'
import Header from './_components/Header'

type Props = {
    children: React.ReactNode
}

const RootLayout = ({children}: Props) => {
  return (
    <main className='root-container'>
        <div className='mx-auto max-w-7xl'>
            <Header/>
            <div className='mt-20 pb-20'>
                {children}
            </div>
        </div>
    </main>
  )
}

export default RootLayout