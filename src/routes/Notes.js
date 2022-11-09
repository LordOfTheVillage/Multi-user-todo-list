import { Suspense } from "react"
import { Await, defer, useLoaderData, useNavigate } from "react-router-dom"
import { get } from "../api/api"
import { getUser } from '../App'
import Todo from "../components/Todo"

export const loader = async () => {
  const { id } = getUser()
  return defer({
    notes: get(`notes?userId=${id}`),
  })
}

export default function Notes() {
  const { notes } = useLoaderData()
  const navigate = useNavigate()
  const goToCreate = () => navigate("./create")
  return (
    <div className="p-5 flex flex-col items-center gap-7">
      <h1 className="text-6xl font-medium">Notes</h1>
      <button
        onClick={goToCreate}
        className="border border-gray-400 font-medium text-2xl px-10 pt-2 pb-3 rounded-sm hover:border-blue-600 hover:text-blue-600"
      >
        Add new note
      </button>
      <div className="flex flex-col gap-4 w-4/5">
        <Suspense fallback={<h3>Loading...</h3>}>
          <Await resolve={notes}>
            {(resolved) =>
              resolved.map((note) => (
                <Todo
                  key={note.id}
                  id={note.id}
                  title={note.title}
                  body={note.body}
                  time={note.createdAt}
                />
              ))
            }
          </Await>
        </Suspense>
      </div>
    </div>
  )
}
