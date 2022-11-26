const BASE_URL = "http://localhost:5000/"

const changeServerData = async (url, data, method) => {
  await fetch(BASE_URL + url, {
    method,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export const deleteData = async (url) => {
  await fetch(BASE_URL + url, {
    method: "DELETE",
  })
}

export const patchData = async (url, data) => {
  await changeServerData(url, data, "PATCH")
}

export const postData = async (url, data) => {
  await changeServerData(url, data, "POST")
}

export async function getData(url) {
  const res = await fetch(BASE_URL + url)
  return res.json()
}
export async function getUserNotes(id) {
  return getData(`notes?userId=${id}&_sort=createdAt&_order=DESC`)
}

// export async function getNote(id, userId) {
//   return getData(`notes?id=${id}&userId=${userId}`)
// }

export async function getNote(id, userId) {
  return getData(`notes/${id}?userId=${userId}`)
}

export async function deleteNote(id, userId) {
  return deleteData(`notes/${id}?userId=${userId}`)
}

export async function getUserByEmail(email) {
  return getData(`users?email=${email}`)
}

export async function getUserByData(email, password) {
  return getData(`users?email=${email}&password=${password}`)
}

export async function postUser(user) {
  return postData("user", user)
}

export async function postNote(note) {
  return postData("notes", note)
}

export async function patchNote(id, userId, note) {
  return patchData(`notes/${id}?userId=${userId}`, note)
}
