import { Suspense } from "react"
import { Await, defer, useLoaderData, useNavigate } from "react-router-dom"
import { deleteData, get } from "../api/api"
import { deleteIcon, editIcon, getUser } from "../App"

// async function getNote(id, userId) {
//   const res = await fetch(
//     `http://localhost:5000/notes?id=${id}&userId=${userId}`
//   )
//   return res.json()
// }

export const loader = async ({ params: { id } }) => {
  const user = getUser()
  return defer({
    note: get(`notes?id=${id}&userId=${user.id}`),
    id,
  })
}

export default function Note(props) {
  const { note, id } = useLoaderData()
  const navigate = useNavigate()
  const goBack = () => navigate(-1)
  const goToNotfoundedpage = () => navigate("/undefined")
  const goToEdit = () => navigate("./change")
  const deleteNote = () => {
    const user = getUser()
    deleteData(`notes/${id}?userId=${user.id}`).then(() => navigate("/notes"))
  }
  return (
    <Suspense fallback={<h3>Loading...</h3>}>
      <Await resolve={note}>
        {(resolved) => (
          <>
            {resolved.length === 0 ? (
              goToNotfoundedpage()
            ) : (
              <div className="flex flex-col items-center gap-8 p-5">
                <div className="grid w-full grid-cols-[1fr_7fr_1fr] justify-between">
                  <button
                    className="border max-h-16 border-gray-400 mr-0 px-3 pb-1 rounded-sm md:mr-8 hover:border-blue-600 hover:text-blue-600"
                    onClick={goBack}
                  >
                    Go back
                  </button>
                  <h1 className="text-6xl font-medium text-center whitespace-normal break-words overflow-hidden">
                    {resolved[0].title}
                  </h1>
                  <div className="flex items-center justify-around">
                    <img
                      className="w-12 h-12 cursor-pointer"
                      src={editIcon}
                      alt="edit"
                      onClick={goToEdit}
                    />
                    <img
                      className="w-12 h-12 cursor-pointer"
                      src={deleteIcon}
                      alt="delete"
                      onClick={deleteNote}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full gap-4">
                  <textarea
                    name="text"
                    disabled
                    value={resolved[0].body}
                    className=" border border-gray-400 text-2xl px-10 pt-2 pb-3 h-96 w-full rounded-sm resize-none"
                  ></textarea>
                </div>
              </div>
            )}
          </>
        )}
      </Await>
    </Suspense>
  )
}
