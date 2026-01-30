import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { z } from 'zod'

const LoginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const Route = createFileRoute('/login')({
  component: Login,
})

function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [submitted, setSubmitted] = useState(false)

  const result = useMemo(() => LoginSchema.safeParse(form), [form])

  const fieldErrors = result.success
    ? {}
    : Object.fromEntries(
        result.error.issues.map((issue) => [issue.path[0], issue.message]),
      )

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)

    if (!result.success) return
    alert('Login payload is valid. Wire this to your API.')
  }

  return (
    <section className="card auth-card">
      <div className="card-header">
        <div>
          <p className="app-kicker">Welcome back</p>
          <h2>Log in</h2>
          <p>Validate credentials with typed client-side rules.</p>
        </div>
      </div>
      <form className="form" onSubmit={handleSubmit}>
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
        <button className="primary-button" type="submit">
          Log in
        </button>
      </form>
    </section>
  )
}
