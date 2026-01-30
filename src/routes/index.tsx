import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'
import { todosQueryOptions } from '../queries/todos'

const SearchSchema = z.object({
  limit: z.coerce.number().int().min(1).max(12).default(6),
})

export const Route = createFileRoute('/')({
  validateSearch: SearchSchema,
  loader: ({ context, search }) => {
    return context.queryClient.ensureQueryData(todosQueryOptions(search.limit))
  },
  component: Home,
})

function Home() {
  const { limit } = Route.useSearch()
  const { data, isLoading, isError } = useQuery(todosQueryOptions(limit))

  return (
    <section className="card">
      <div className="card-header">
        <div>
          <h2>Shared query options</h2>
          <p>Route loaders and components use the same typed query helpers.</p>
        </div>
        <div className="button-row">
          {[3, 6, 9, 12].map((value) => (
            <Route.Link
              key={value}
              to="."
              search={{ limit: value }}
              className={limit === value ? 'chip chip-active' : 'chip'}
            >
              {value} todos
            </Route.Link>
          ))}
        </div>
      </div>
      <div className="card-body">
        {isLoading ? <p>Loading todos...</p> : null}
        {isError ? <p>Could not load data.</p> : null}
        {data ? (
          <ul className="todo-grid">
            {data.map((todo) => (
              <li key={todo.id} className="todo-item">
                <div className="todo-title">{todo.title}</div>
                <span className={todo.completed ? 'todo-pill done' : 'todo-pill'}>
                  {todo.completed ? 'Done' : 'Open'}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  )
}
