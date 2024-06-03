import { changeClass, dc, navigateTo, toMoney } from "../helpers/helpers.ts"
import "./options.sytle.scss"
import { incomingData } from "./content.ts"

export const optionSection = (
  data: incomingData[],
  title: string,
  subtitle: string,
  onOptionSelected: (id: string) => void,
) => {
  let index = 0

  const updateContent = (brothData: incomingData[]) => {
    const eachCard = mobileSection?.querySelectorAll('[data-js="card"]')
    const eachDot = mobileSection?.querySelectorAll('[data-js="dot"]')

    if (index !== 0) {
      changeClass({
        index,
        element: eachCard,
        className: "activeCard",
        brothData,
      })
      changeClass({
        index,
        element: eachDot,
        className: "activeDot",
        brothData,
      })
    }
  }

  const textWrapper = TextWrapper({ title, subtitle })
  const dynamicDataJs = `wrapper-${data[0].name}`
  const wrapper = dc("div")
  wrapper.classList.add("wrapper")
  const navDots = dc("nav")
  navDots.classList.add("navDots")
  navDots.setAttribute("data-js", "navDots")

  const addClickEvent = (
    element: Element,
    i: number,
    brothData: incomingData[],
  ) => {
    element.addEventListener("click", () => {
      index = i
      updateContent(brothData)

      const activeCard = wrapper.querySelector(".activeCard")

      navigateTo(activeCard)

      const idSelected = data[i - 1]?.id
      onOptionSelected(idSelected)
    })
  }

  data.map((d, i) => {
    const card = Card(d)

    const dot = dc("button")

    dot.setAttribute("data-js", "dot")
    dot.classList.add("dot")

    addClickEvent(dot, i + 1, data)
    addClickEvent(card, i + 1, data)

    navDots.appendChild(dot)
    wrapper.appendChild(card)
  })

  const mobileSection = dc("section")
  mobileSection.setAttribute("data-js", dynamicDataJs)
  mobileSection.appendChild(textWrapper)
  mobileSection.appendChild(wrapper)
  mobileSection.appendChild(navDots)

  document.addEventListener("DOMContentLoaded", () => updateContent(data))

  return mobileSection
}

const Card = (brothData: incomingData) => {
  const descriptionCardContent = dc("p")
  descriptionCardContent.textContent = brothData.description
  descriptionCardContent.classList.add("card__description")

  const imageCardContent = dc("img") as HTMLImageElement
  imageCardContent.classList.add("card__image")
  imageCardContent.setAttribute("data-js", "cardImage")
  imageCardContent.src = brothData.imageInactive

  const nameCardContent = dc("h3")
  nameCardContent.textContent = brothData.name
  nameCardContent.classList.add("card__name")

  const priceCardContent = dc("span")
  priceCardContent.textContent = toMoney(brothData.price)
  priceCardContent.classList.add("card__price")

  const card = dc("div")
  card.setAttribute("data-js", "card")
  card.setAttribute("data-id", brothData.id)
  card.setAttribute("data-name", brothData.name)

  card.classList.add("card")

  card.appendChild(imageCardContent)

  card.appendChild(nameCardContent)
  card.appendChild(descriptionCardContent)
  card.appendChild(priceCardContent)

  return card
}

type TextWrapperProps = {
  title: string
  subtitle: string
}

const TextWrapper = ({ title, subtitle }: TextWrapperProps) => {
  const t = dc("h1")
  t.textContent = title
  t.classList.add("title")

  const s = dc("h2")
  s.textContent = subtitle
  s.classList.add("subtitle")

  const textWrapper = dc("div")
  textWrapper.classList.add("textWrapper")
  textWrapper.appendChild(t)
  textWrapper.appendChild(s)

  return textWrapper
}
