export const deleteData = async (url) => {
  await fetch(`http://localhost:5000/${url}`, {
    method: "DELETE",
  })
}

export const patchData = async (url, data) => {
  await fetch(`http://localhost:5000/${url}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export const postData = async (url, data) => {
  await fetch(`http://localhost:5000/${url}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export async function get(url) {
  const res = await fetch(`http://localhost:5000/${url}`)
  return res.json()
}
