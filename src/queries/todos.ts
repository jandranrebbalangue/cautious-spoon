import { queryOptions } from '@tanstack/react-query'
import { z } from 'zod'

const TodoSchema = z.object({
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
})

const TodosSchema = z.array(TodoSchema)

export type Todo = z.infer<typeof TodoSchema>

export const todosQueryOptions = (limit: number) =>
  queryOptions({
    queryKey: ['todos', limit],
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`,
      )

      if (!response.ok) {
        throw new Error('Failed to fetch todos')
      }

      const data = await response.json()
      return TodosSchema.parse(data)
    },
  })
