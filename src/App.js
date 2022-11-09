import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ProtectedRoute } from "./components/ProtectedRoute"
import UserContextProvider from "./components/userContext"
import Edit, { loader as editLoader } from "./routes/Edit"
import Layout from "./routes/Layout"
import Login from "./routes/Login"
import Notfoundpage from "./routes/Notdoundpage"
import Note, { loader as noteLoader } from "./routes/Note"
import Notes, { loader as notesLoader } from "./routes/Notes"
import Profile from "./routes/Profile"
import Register from "./routes/Register"
import Create from "./routes/Create"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Profile />,
      },
      {
        path: "/notes",
        loader: notesLoader,
        element: <Notes />,
      },
      {
        path: "/notes/create",
        element: <Create />,
      },
      {
        path: "/notes/:id",
        loader: noteLoader,
        element: <Note />,
      },
      {
        path: "/notes/:id/change",
        loader: editLoader,
        element: <Edit />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <Notfoundpage />,
  },
])

export default function App() {
  return (
    <div className=" text-xl">
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </div>
  )
}

const getRandomString = () => Math.random().toString(36).substring(2)

const normalizeDate = (number) => {
  return (number + "").length !== 1 ? number : "0" + number
}

const getTimeString = (milsec) => {
  const date = new Date(milsec)
  return `${date.getFullYear()}-${normalizeDate(
    date.getMonth() + 1
  )}-${normalizeDate(date.getDate())}T${normalizeDate(
    date.getHours()
  )}:${normalizeDate(date.getMinutes())}:${normalizeDate(
    date.getSeconds()
  )}.${normalizeDate(date.getMilliseconds())}Z`
}

function getUser() {
  return JSON.parse(localStorage.getItem("user"))
}

const deleteIcon =
  "https://img.icons8.com/material-rounded/512/delete-forever.png"
const editIcon = "https://img.icons8.com/ios-glyphs/512/pencil.png"

export {
  getRandomString,
  normalizeDate,
  getTimeString,
  deleteIcon,
  editIcon,
  getUser,
}
