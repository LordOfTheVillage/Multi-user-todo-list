const BASE_URL = "http://localhost:5000/"

const changeServerData = async (url, data, method) => {
  await fetch(BASE_URL + url, {
    method,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(console.log("jee"))
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
