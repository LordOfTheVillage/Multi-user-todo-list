import { useNavigate } from "react-router-dom"
import { deleteData } from "../api/api"
import { deleteIcon, editIcon, getUser, normalizeDate } from "../App"

export default function Todo(props) {
  const navigate = useNavigate()
  const handleGetTime = (time) => {
    const date = new Date(time)
    return `
    ${normalizeDate(date.getDate())}.${normalizeDate(date.getMonth() + 1)}.${(
      date.getFullYear() + ""
    ).slice(2)}`
  }

  const goToEdit = () => navigate(`./${props.id}/change`)
  const goToNote = () => navigate(`./${props.id}`)
  const deleteNote = () => {
    const user = getUser()
    deleteData(`notes/${props.id}?userId=${user.id}`).then(() =>
      navigate("/notes")
    )
  }

  return (
    <div className="w-full border cursor-pointer border-gray-400 text-2xl  rounded-sm flex justify-between  hover:border-blue-600 hover:text-blue-600">
      <div onClick={() => goToNote()} className="pl-10 h-auto pt-2 pb-3 w-5/6">
        <span className="font-medium text-2xl h-auto whitespace-normal break-words overflow-hidden">
          {props.title}
        </span>
        <span className=" text-lg px-1 text-gray-500">
          {handleGetTime(props.time)}
        </span>
      </div>
      <div className="w-20 mr-10 flex items-center justify-between">
        <img className="w-8 h-8" src={editIcon} alt="edit" onClick={goToEdit} />
        <img
          className="w-8 h-8"
          src={deleteIcon}
          alt="delete"
          onClick={deleteNote}
        />
      </div>
    </div>
  )
}
