import "./content.style.scss"
import { dc, navigateTo } from "../helpers/helpers.ts"
import { optionSection } from "./options.ts"

import { Button } from "./button.ts"
import { postOrder } from "../services.ts"
import { arrowIcon } from "./arowIcon.ts"
import { Success } from "./success.ts"
import { storageData } from "../helpers/loadData.ts"

export type incomingData = {
  id: string
  imageInactive: string
  imageActive: string
  name: string
  description: string
  price: number
}

export type SelectedOptionsProps = {
  brothId: string
  proteinId: string
}

async function loadData() {
  try {
    const data = await storageData()

    if (data && data.brothData) {
      wrapper.appendChild(
        optionSection(
          data.brothData,
          brothTitle,
          brothSubtitle,
          onBrothSelected,
        ),
      )
    }

    if (data && data.proteinsData) {
      wrapper.appendChild(
        optionSection(
          data.proteinsData,
          meatTitle,
          meatSubtitle,
          onProteinSelected,
        ),
      )
    }
    wrapper.appendChild(placeOrderButton)
    placeOrderButton.classList.add("content__button")
    placeOrderButton.setAttribute("data-js", "placeOrderButton")

    if (isDisabled()) {
      placeOrderButton.classList.add("disabled")
    }
  } catch (error) {
    console.error("Error loading data:", error)
  }
}

loadData()

let selectedOptions: SelectedOptionsProps = {
  brothId: "",
  proteinId: "",
}

export const resetSelectedOptions = () => {
  selectedOptions = {
    brothId: "",
    proteinId: "",
  }
}

const isDisabled = () =>
  selectedOptions.brothId === "" || selectedOptions.proteinId === ""

const restoreButtonProps = () => {
  placeOrderButton.classList.remove("disabled")
  placeOrderButton.addEventListener("click", handleClick)
}

const changeStatusButton = () => {
  isDisabled()
    ? placeOrderButton.classList.add("disabled")
    : restoreButtonProps()
}

const onBrothSelected = (id: string) => {
  selectedOptions.brothId = id
  changeStatusButton()
}

const onProteinSelected = (id: string) => {
  selectedOptions.proteinId = id

  changeStatusButton()
}

const brothTitle = "First things first: select your favorite broth."
const brothSubtitle = "It will give the whole flavor on your ramen soup. "

const meatTitle = "It’s time to choose (or not) your meat!"
const meatSubtitle =
  "Some people love, some don’t. We have options for all" + " tastes."

const sendOrder = async () => {
  try {
    const res = await postOrder(selectedOptions)

    const allImages = document.querySelectorAll(`[data-js="cardImage"]`)

    const resetImages = async () => {
      const data = await storageData()

      if (data) {
        allImages.forEach((img) => {
          const cardId = img.parentElement?.getAttribute("data-id")
          const cardName = img.parentElement?.getAttribute("data-name") // novo

          if (cardId && cardName) {
            const brothData = data.brothData.find(
              (broth) => broth.id === cardId && broth.name === cardName,
            )
            const proteinData = data.proteinsData.find(
              (protein) => protein.id === cardId && protein.name === cardName,
            )

            if (brothData) {
              img.setAttribute("src", brothData.imageInactive)
            } else if (proteinData) {
              img.setAttribute("src", proteinData.imageInactive)
            }
          }
        })
      }
    }

    contentElement.appendChild(Success(res, resetImages))

    const successElement = document.querySelector(`[data-js="success"]`)
    navigateTo(successElement)

    placeOrderButton.classList.add("disabled")
    placeOrderButton.removeEventListener("click", handleClick)
  } catch (error) {
    console.error("Error sending order:", error)
  }
}

const setButtonLoading = (buttonElement: HTMLElement, isLoading: boolean) => {
  buttonElement.textContent = isLoading ? "SENDING..." : "PLACE MY ORDER"
}

const handleClick = async () => {
  if (!isDisabled()) {
    setButtonLoading(placeOrderButton, true)
    await sendOrder()
    setButtonLoading(placeOrderButton, false)
  }
}

const placeOrderButton = Button({
  text: "PLACE MY ORDER",
  onClick: handleClick,
})

const wrapper = dc("div")
wrapper.setAttribute("data-js", "wrapper")
wrapper.classList.add("content__wrapper")

export const contentElement = dc("div")
contentElement.appendChild(wrapper)
contentElement.classList.add("content")