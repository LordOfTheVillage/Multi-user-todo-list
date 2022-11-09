import { NavLink, Outlet } from "react-router-dom"
import { useUserContext } from "../components/userContext"

export default function Layout() {
  const userContext = useUserContext()
  const handleLogout = () => {
    userContext.setUser({})
  }
  return (
    <div className="min-h-screen">
      <header className=" p-4 border-b flex flex-row justify-between">
        <div className="">Welcome, {userContext.user.email}</div>
        <div className="flex flex-row justify-end">
          <NavLink
            to="/"
            end={true}
            className=" text-gray-700 w-20 text-center hover:underline"
          >
            Home
          </NavLink>
          <NavLink
            to="/notes"
            className=" text-gray-700 w-20 text-center hover:underline"
          >
            Notes
          </NavLink>
          <button
            className=" text-gray-700 w-20 text-center hover:underline"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </header>
      <main className="text-gray-700">
        <Outlet />
      </main>
      <footer className="sticky top-full p-4 flex flex-row justify-between border-t md:px-20">
        <span className="text-gray-700">
          Created by:{" "}
          <a
            href="https://github.com/LordOfTheVillage"
            className="hover:underline hover:text-blue-700"
          >
            Redzkin M.
          </a>
        </span>
        <div className="text-gray-700">BSU: 2022</div>
      </footer>
    </div>
  )
}
