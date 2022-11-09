import { useCallback, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { get, postData } from "../api/api"
import { getRandomString, getTimeString } from "../App"

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [invalid, setInvalid] = useState(false)
  const navigate = useNavigate()

  const handleSetEmail = useCallback(
    ({ target: { value } }) => setEmail(value),
    []
  )

  const handleSetPassword = useCallback(
    ({ target: { value } }) => setPassword(value),
    []
  )

  const handleSetRepeatPassword = useCallback(
    ({ target: { value } }) => setRepeatPassword(value),
    []
  )
  const verifiedUser = useMemo(() => {
    const temp =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
    return !temp.test(email) || password === "" || password !== repeatPassword
  }, [email, password, repeatPassword])

  const handleRegister = async () => {
    const users = await get(`users?email=${email}`)

    if (users.length === 0) {
      console.log("true")
      const milsec = Date.now()
      const user = {
        id: milsec + getRandomString(),
        email,
        password,
        createdAt: getTimeString(milsec),
      }

      postData("users", user)
        .then(() => navigate("/login"))
        .catch(() => alert("bad"))
    } else {
      console.log("hoo")
      setInvalid(true)
    }
  }
  return (
    <div className="my-10">
      <div className="flex w-1/3 gap-10 justify-between mx-auto flex-col">
        <input
          type="email"
          className={` ${
            invalid ? "invalid" : ""
          } border border-gray-400 mr-0 px-3 pb-1 rounded-sm md:mr-8`}
          placeholder="Type email"
          onChange={handleSetEmail}
          onFocus={() => setInvalid(false)}
          value={email}
        />
        <input
          type="password"
          className="border border-gray-400 mr-0 px-3 pb-1 rounded-sm md:mr-8"
          placeholder="Type password"
          onChange={handleSetPassword}
          value={password}
        />
        <input
          type="password"
          className="border border-gray-400 mr-0 px-3 pb-1 rounded-sm md:mr-8"
          placeholder="Repeat password"
          onChange={handleSetRepeatPassword}
          value={repeatPassword}
        />
        <button
          onClick={handleRegister}
          disabled={verifiedUser}
          className="border border-gray-400 mr-0 px-3 pb-1 rounded-sm md:mr-8 hover:border-blue-600 hover:text-blue-600"
        >
          Sign up
        </button>
      </div>
    </div>
  )
}
