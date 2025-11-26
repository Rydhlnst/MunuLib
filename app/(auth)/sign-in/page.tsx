"use client"

import React from 'react'
import AuthForm from '../_components/AuthForm'
import { signInSchema } from '@/lib/validations'
import { signIn } from '@/lib/actions/auth.action'

const SignInPage = () => {
  return (
    <AuthForm
        type="SIGN_IN"
        schema={signInSchema}
        defaultValues={{
            email: "",
            password: "",
        }}
        onSubmit={async (data) => {
          return await signIn(data); 
        }}
    />
  )
}

export default SignInPage
