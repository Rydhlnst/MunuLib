"use client"

import { signUpSchema } from '@/lib/validations'
import React from 'react'
import AuthForm from '../_components/AuthForm'
import { signUp } from '@/lib/actions/auth.action'

const SignUpPage = () => {
  return (
    <AuthForm
        type="SIGN_UP"
        schema={signUpSchema}
        defaultValues={{
            email: "",
            password: "",
            fullName: "",
            universityId: 0,
            universityCard: "",
        }}
         onSubmit={async (data) => {
            return await signUp(data); 
          }}
    />
  )
}

export default SignUpPage
