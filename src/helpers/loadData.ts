import localForage from "localforage"
import { fetchData } from "../services.ts"

type BrothData = {
  id: string
  name: string
  description: string
  price: number
  imageInactive: string
  imageActive: string
}

type ProteinData = {
  id: string
  name: string
  description: string
  price: number
  imageInactive: string
  imageActive: string
}

export type Data = {
  brothData: BrothData[]
  proteinsData: ProteinData[]
}

const storageKey = "ramengo"

export const getDataFromStorage = async (): Promise<Data | null> => {
  try {
    const data = await localForage.getItem<Data | null>(storageKey)

    return data
  } catch (error) {
    console.error("Error getting data from storage:", error)
    return null
  }
}

export const setDataToStorage = async (data: Data | null): Promise<void> => {
  if (data !== null) {
    await localForage.setItem<Data>(storageKey, data)
  } else {
    console.error("Error: data is null, cannot set to storage")
  }
}

export const storageData = async (): Promise<Data | null> => {
  let data: Data | undefined | null = await getDataFromStorage()

  if (!data) {
    data = await fetchData()
    if (data !== undefined) {
      await setDataToStorage(data)
    } else {
      console.error("Error: fetched data is undefined")
    }
  }

  return data || null
}
