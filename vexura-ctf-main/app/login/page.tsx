export const dynamic = 'force-dynamic'

import React, { Suspense } from 'react'
import LoginForm from './LoginForm'

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      {/* Client component handles search params and router */}
      <LoginForm />
    </Suspense>
  )
}

