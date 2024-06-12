import "./success.style.scss"
import { dc, navigateTo } from "../helpers/helpers.ts"
import { Button } from "./button.ts"
import { arrowIcon } from "./arowIcon.ts"
import { resetSelectedOptions } from "./content.ts"

type SuccessProps = {
  id: string
  description: string
  image: string
}

const reset = (resetImages: any) => {
  resetImages()
  resetSelectedOptions()

  const activeCards = document.querySelectorAll(".activeCard")
  const activeDots = document.querySelectorAll(".activeDot")

  activeCards.forEach((card) => card.classList.remove("activeCard"))

  activeDots.forEach((dot) => dot.classList.remove("activeDot"))

  const successComponent = document.querySelector('[data-js="success"]')
  if (successComponent) {
    successComponent.remove()
  }
}

export const Success = (data: SuccessProps, resetImages: any) => {
  const name = dc("h1")
  name.textContent = "ramenGO!"
  name.classList.add("success__name")

  const productImage = dc("img") as HTMLImageElement
  productImage.src = data.image
  productImage.alt = data.description
  productImage.classList.add("success__image")

  const text = dc("p")
  text.textContent = "Your Order:"
  text.classList.add("success__text")

  const orderText = dc("p")
  orderText.classList.add("success__order-text")
  orderText.textContent = data.description

  const finalizationImage = dc("img") as HTMLImageElement
  finalizationImage.src = "/assets/png/bowing.png"
  finalizationImage.alt = "bowing image"
  finalizationImage.classList.add("success__finalization-image")

  const chineeseText = dc("p")
  chineeseText.textContent = "どもありがとうございます。"
  chineeseText.classList.add("success__chineese-text")

  const finalizationText = dc("p")
  finalizationText.textContent = "Your order is being prepared"
  finalizationText.classList.add("success__finalization-text")

  const holdOnText = dc("span")
  holdOnText.textContent =
    "Hold on, when you least expect you will be eating your rámen. "
  holdOnText.classList.add("success__holdon-text")

  const placeNewOrderButton = Button<() => void>({
    text: "PLACE NEW ORDER",
    onClick: () => {
      const hero = document.querySelector(`[data-js="hero"]`)
      reset(resetImages)
      navigateTo(hero)
    },
  })
  placeNewOrderButton.setAttribute("data-js", "placeNewOrderButton")

  const finalization = dc("div")
  finalization.classList.add("success__finalization-wrapper")
  finalization.append(finalizationImage)
  finalization.append(chineeseText)
  finalization.append(finalizationText)
  finalization.append(holdOnText)
  finalization.append(placeNewOrderButton)

  const elements: HTMLElement[] = [name, productImage, text, orderText]

  const hero: HTMLElement = dc("section")
  hero.classList.add("success__hero")
  hero.setAttribute("data-js", "hero")
  hero.append(...elements)

  const stack: HTMLElement = dc("div")
  stack.classList.add("success__stack")
  stack.appendChild(hero)
  stack.appendChild(finalization)

  const success: HTMLElement = dc("section")
  success.classList.add("success")
  success.setAttribute("data-js", "success")
  success.appendChild(stack)

  return success
}