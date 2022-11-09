import { useNavigate } from "react-router-dom"
import { useUserContext } from "../components/userContext"

export default function Profile() {
  const { user } = useUserContext()
  const navigate = useNavigate()
  const goToNotes = () => navigate("/notes")
  const dateParse = (date) => {
    const res = new Date(date)
    return res.toLocaleString().replace(",", "")
  }
  return (
    <div className="flex w-full justify-center">
      <div className="py-5 flex flex-col items-center gap-10">
        <h1 className=" text-6xl font-medium">About me</h1>
        <div className="text-2xl">
          <p>
            <b className=" font-medium">Email:</b> {user.email}
          </p>
          <p>
            <b className=" font-medium">Date sing up:</b>{" "}
            {dateParse(user.createdAt)}
          </p>
        </div>
        <button
          className="border border-gray-400 text-2xl px-10 pt-2 pb-3 rounded-sm hover:border-blue-600 hover:text-blue-600"
          onClick={goToNotes}
        >
          Go to notes
        </button>
      </div>
    </div>
  )
}
