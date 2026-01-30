import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { z } from 'zod'

const SignupSchema = z
  .object({
    name: z.string().min(2, 'Enter your full name'),
    email: z.email('Enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })

export const Route = createFileRoute('/signup')({
  component: SignUp,
})

function SignUp() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const result = useMemo(() => SignupSchema.safeParse(form), [form])

  const fieldErrors = result.success
    ? {}
    : Object.fromEntries(
        result.error.issues.map((issue) => [issue.path[0], issue.message]),
      )

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)

    if (!result.success) return
    alert('Sign up payload is valid. Wire this to your API.')
  }

  return (
    <section className="card auth-card">
      <div className="card-header">
        <div>
          <p className="app-kicker">Create your account</p>
          <h2>Sign up</h2>
          <p>Typed validation ensures consistent rules across the app.</p>
        </div>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <label className="field">
          <span>Full name</span>
          <input
            type="text"
            name="name"
            placeholder="Jordan Lee"
            value={form.name}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                name: event.target.value,
              }))
            }
          />
          {submitted && fieldErrors.name ? (
            <span className="field-error">{fieldErrors.name}</span>
          ) : null}
        </label>
        <label className="field">
          <span>Email</span>
          <input
            type="email"
            name="email"
            placeholder="you@company.com"
            value={form.email}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                email: event.target.value,
              }))
            }
          />
          {submitted && fieldErrors.email ? (
            <span className="field-error">{fieldErrors.email}</span>
          ) : null}
        </label>
        <label className="field">
          <span>Password</span>
          <input
            type="password"
            name="password"
            placeholder="Minimum 8 characters"
            value={form.password}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                password: event.target.value,
              }))
            }
          />
          {submitted && fieldErrors.password ? (
            <span className="field-error">{fieldErrors.password}</span>
          ) : null}
        </label>
        <label className="field">
          <span>Confirm password</span>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Repeat password"
            value={form.confirmPassword}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                confirmPassword: event.target.value,
              }))
            }
          />
          {submitted && fieldErrors.confirmPassword ? (
            <span className="field-error">{fieldErrors.confirmPassword}</span>
          ) : null}
        </label>
        <button className="primary-button" type="submit">
          Create account
        </button>
      </form>
    </section>
  )
}
