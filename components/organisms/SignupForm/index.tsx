import React, { useState } from "react";
import cx from 'classnames'
import { useRouter } from 'next/router';

export default function SignupForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const className = {
    label: cx("form-label text-lg fw-medium color-palette-1 mb-10")
  }


  const onSubmit = () => {
    const userForm = {
      email, name, password
    }
    localStorage.setItem('user-form', JSON.stringify(userForm))
    router.push('/sign-up-photo')
  }

  return (
    <>
      <div className="pt-50">
        <label
          htmlFor="name"
          className={className.label}
        >
          Full Name
        </label>
        <input
          type="text"
          className="form-control rounded-pill text-lg"
          aria-describedby="name"
          placeholder="Enter your name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div className="pt-30">
        <label
          htmlFor="email"
          className={className.label}
        >
          Email Address
        </label>
        <input
          type="email"
          className="form-control rounded-pill text-lg"
          aria-describedby="email"
          placeholder="Enter your email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className="pt-30">
        <label
          htmlFor="password"
          className={className.label}
        >
          Password
        </label>
        <input
          type="password"
          className="form-control rounded-pill text-lg"
          aria-describedby="password"
          placeholder="Your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div className="button-group d-flex flex-column mx-auto pt-50">
        <button
          className="btn btn-sign-up fw-medium text-lg text-white rounded-pill mb-16"
          type="button"
          onClick={onSubmit}
        >
          Continue
        </button>

        <a
          className="btn btn-sign-in fw-medium text-lg color-palette-1 rounded-pill"
          href="/sign-in"
          role="button"
        >
          Sign In
        </a>
      </div>
    </>
  );
}
