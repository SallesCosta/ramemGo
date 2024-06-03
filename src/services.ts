import { SelectedOptionsProps } from "./components/content.ts"
import { Data } from "./helpers/loadData.ts"

const config = {
  baseUrl: "https://api.tech.redventures.com.br",
  headers: {
    "x-api-key": "ZtVdh8XQ2U8pWI2gmZ7f796Vh8GllXoN7mr0djNf",
  },
}

const get = async (endpoint: string) => {
  const response = await fetch(`${config.baseUrl}/${endpoint}`, {
    method: "GET",
    headers: config.headers,
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return await response.json()
}

export async function postOrder({ brothId, proteinId }: SelectedOptionsProps) {
  const response = await fetch(`${config.baseUrl}/order`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      brothId,
      proteinId,
    }),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return await response.json()
}

export const fetchData = async (): Promise<Data | undefined> => {
  try {
    const [brothData, proteinsData] = await Promise.all([
      get("broths"),
      get("proteins"),
    ])

    return { brothData, proteinsData }
  } catch (error) {
    console.error("Error fetching data:", error)
  }
}
