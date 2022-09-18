import { useRouter } from 'next/router';
import React, { useState } from "react";
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';
import { setSignIn } from '../../../services/auth';
import { LoginTypes } from '../../../services/data-types'

export default function SigninForm() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async () => {
    const data = { email, password }

    if (email === '' || password === '') {
      toast.error('Field wajib diisi!')
    } else {
      const response = await setSignIn(data)

      if (response?.error) {
        toast.error(response.message)
      } else {
        toast.success('Sign In berhasil')
        const { token } = response.data
        const tokenBase64 = btoa(token)
        Cookies.set('token', tokenBase64, { expires: 1 })
        router.push('/')
      }
    }
  }

  return (
    <>
      <div className="pt-50">
        <label
          className="form-label text-lg fw-medium color-palette-1 mb-10"
        >
          Email Address
        </label>
        <input
          type="email"
          className="form-control rounded-pill text-lg"
          aria-describedby="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="pt-30">
        <label
          className="form-label text-lg fw-medium color-palette-1 mb-10"
        >
          Password
        </label>
        <input
          type="password"
          className="form-control rounded-pill text-lg"
          aria-describedby="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="button-group d-flex flex-column mx-auto pt-50">
        <button
          onClick={onSubmit}
          className="btn btn-sign-in fw-medium text-lg text-white rounded-pill mb-16"
          type="button"
        >
          Continue to Sign In
        </button>

        <a
          className="btn btn-sign-up fw-medium text-lg color-palette-1 rounded-pill"
          href="/sign-up"
          role="button"
        >
          Sign Up
        </a>
      </div>
    </>
  );
}
