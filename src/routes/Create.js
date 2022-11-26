import { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import { postNote } from "../api/api"
import { getRandomString, getTimeString, getUser } from "../App"

export default function Create(props) {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const navigate = useNavigate()

  const handleSetTitle = useCallback(
    ({ target: { value } }) => setTitle(value),
    []
  )

  const handleSetBody = useCallback(
    ({ target: { value } }) => setBody(value),
    []
  )

  const handleSendForm = () => {
    const user = getUser()
    const milsec = Date.now()
    const note = {
      id: milsec + getRandomString(),
      userId: user.id,
      title,
      body,
      createdAt: getTimeString(milsec),
    }
    postNote(note).then(() => navigate("/notes"))
  }

  const goBack = () => navigate(-1)

  return (
    <div className="flex flex-col items-center gap-8 p-5">
      <div className="grid w-full grid-cols-[1fr_7fr_1fr] justify-between">
        <button
          className="border border-gray-400 mr-0 px-3 pb-1 rounded-sm md:mr-8 hover:border-blue-600 hover:text-blue-600"
          onClick={goBack}
        >
          Go back
        </button>
        <h1 className="text-6xl font-medium text-center">Create note</h1>
      </div>
      <div className="flex flex-col w-full gap-4">
        <input
          placeholder="Name"
          className=" border border-gray-400 text-2xl px-10 pt-2 pb-3 rounded-sm"
          value={title}
          onChange={handleSetTitle}
        />
        <textarea
          name="text"
          placeholder="Note text..."
          value={body}
          className=" border border-gray-400 text-2xl px-10 pt-2 pb-3 h-72 w-full rounded-sm resize-none"
          onChange={handleSetBody}
        ></textarea>
      </div>
      <button
        onClick={handleSendForm}
        disabled={title === "" || body === ""}
        className="border border-gray-400 text-2xl px-10 pt-2 pb-3 rounded-sm hover:border-blue-600 hover:text-blue-600"
      >
        Create
      </button>
    </div>
  )
}
