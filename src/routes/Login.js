import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getData } from "../api/api"
import { useUserContext } from "../components/userContext"

export default function Login() {
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [invalid, setInvalid] = useState(false)
  const userContext = useUserContext()
  const navigate = useNavigate()

  const handleSetEmail = useCallback((e) => setEmail(e.target.value), [])

  const handleSetPassword = useCallback((e) => setPassword(e.target.value), [])

  const handleLogin = useCallback(() => {
    getData(`users?email=${email}&password=${password}`).then((users) => {
      if (users.length === 1) {
        userContext.setUser(users[0])
        setTimeout(() => navigate("/"), 500)
      } else {
        setInvalid(true)
      }
    })
  }, [email, navigate, password, userContext])

  const goToRegister = () => navigate("/register")

  useEffect(() => {
    if (userContext.user?.email) {
      navigate("/")
    }
  }, [navigate, userContext.user])

  return (
    <div className="my-10">
      <div className="flex w-1/3 gap-10 justify-between mx-auto flex-col">
        <input
          placeholder="email"
          value={email}
          onChange={handleSetEmail}
          className={`${
            invalid ? "invalid" : ""
          } border border-gray-400 mr-0 px-3 pb-1 rounded-sm md:mr-8`}
          onFocus={() => setInvalid(false)}
        ></input>
        <input
          placeholder="password"
          type="password"
          value={password}
          onChange={handleSetPassword}
          className={`${
            invalid ? "invalid" : ""
          } border border-gray-400 mr-0 px-3 pb-1 rounded-sm md:mr-8`}
          onFocus={() => setInvalid(false)}
        ></input>
        <button
          onClick={handleLogin}
          className="border border-gray-400 mr-0 px-3 pb-1 rounded-sm md:mr-8 hover:border-blue-600 hover:text-blue-600"
        >
          Log in
        </button>
        <button
          onClick={goToRegister}
          className="text-center hover:text-blue-600 md:mr-8 underline cursor-pointer"
        >
          Don't have an account?
        </button>
      </div>
    </div>
  )
}
