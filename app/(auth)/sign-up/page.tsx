"use client"

import { signUpSchema } from '@/lib/validations'
import React from 'react'
import AuthForm from '../_components/AuthForm'

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
            // TODO: replace with real sign-in logic (API call, auth, etc.)
            console.log("sign-in data:", data);
            return { success: true };
        }}
    />
  )
}

export default SignUpPage
