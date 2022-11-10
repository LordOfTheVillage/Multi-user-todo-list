import { Suspense, useCallback, useState } from "react"
import { Await, defer, useLoaderData, useNavigate } from "react-router-dom"
import { getData, patchData } from "../api/api"
import { getUser } from "../App"

export const loader = async ({ params: { id } }) => {
  const user = getUser()
  return defer({
    note: getData(`notes/${id}?userId=${user.id}`),
    id,
  })
}

export default function Edit(props) {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const { note, id } = useLoaderData()
  const navigate = useNavigate()

  const handleSetTitle = useCallback(
    ({ target: { value } }) => setTitle(value),
    []
  )

  const handleSetBody = useCallback(
    ({ target: { value } }) => setBody(value),
    []
  )

  const handleEditNote = () => {
    const user = getUser()
    const note = {
      title,
      body,
    }
    patchData(`notes/${id}?userId=${user.id}`, note).then(() =>
      navigate("/notes")
    )
  }

  const goBack = () => navigate(-1)

  return (
    <Suspense fallback={<h3>Loading...</h3>}>
      <Await resolve={note}>
        {(resolved) => {
          return (
            <div className="flex flex-col items-center gap-8 p-5">
              <div className="grid w-full grid-cols-[1fr_7fr_1fr] justify-between">
                <button
                  className="border border-gray-400 mr-0 px-3 pb-1 rounded-sm md:mr-8 hover:border-blue-600 hover:text-blue-600"
                  onClick={goBack}
                >
                  Go back
                </button>
                <h1 className="text-6xl font-medium text-center">Edit note</h1>
              </div>
              <div className="flex flex-col w-full gap-4">
                <input
                  placeholder={resolved.title}
                  className=" border border-gray-400 text-2xl px-10 pt-2 pb-3 rounded-sm"
                  value={title}
                  onChange={handleSetTitle}
                />
                <textarea
                  name="text"
                  placeholder={resolved.body}
                  value={body}
                  className=" border border-gray-400 text-2xl px-10 pt-2 pb-3 h-72 w-full rounded-sm resize-none"
                  onChange={handleSetBody}
                ></textarea>
              </div>
              <button
                onClick={handleEditNote}
                disabled={title === "" || body === ""}
                className="border border-gray-400 text-2xl px-10 pt-2 pb-3 rounded-sm hover:border-blue-600 hover:text-blue-600"
              >
                Save
              </button>
            </div>
          )
        }}
      </Await>
    </Suspense>
  )
}
