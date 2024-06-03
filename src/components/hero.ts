import "./hero.style.scss"

import { arrowIcon } from "./arowIcon.ts"
import { dc, navigateTo } from "../helpers/helpers.ts"
import { Button } from "./button.ts"

const mobileName = dc("p")
mobileName.classList.add("header-content__name")
mobileName.textContent = "ramenGO!"

const desktopName = mobileName.cloneNode(true) as HTMLParagraphElement

const mobileChineeseText = dc("p")
mobileChineeseText.classList.add("header-content__chineese-text")
mobileChineeseText.textContent = "ラーメン"

const desktopChineeseText = mobileChineeseText.cloneNode(
  true,
) as HTMLParagraphElement

const mobileGoText = dc("h1")
mobileGoText.classList.add("header-content__go-text")
mobileGoText.textContent = "GO!"

const desktopGoText = mobileGoText.cloneNode(true) as HTMLHeadingElement

const mobileDescriptionText = dc("p")
mobileDescriptionText.classList.add("header-content__description-text")
mobileDescriptionText.textContent =
  "Enjoy a good ramen in the comfort of your house. Create your own ramen and choose your favorite flavour combination!"

const desktopDescriptionText = mobileDescriptionText.cloneNode(
  true,
) as HTMLSpanElement

const orderButton = Button<() => void>({
  text: "ORDER NOW",
  onClick: () => {
    const wrapperElement = document.querySelector(`[data-js="wrapper"]`)
    navigateTo(wrapperElement)
  },
  icon: arrowIcon,
})

const balaoAmareloImg = dc("img") as HTMLImageElement
balaoAmareloImg.src = "src/assets/png/balao-amarelo.png"
balaoAmareloImg.alt = "balão amarelo image"
balaoAmareloImg.classList.add("header-content__balao-amarelo")

const balaoAzulImg = dc("img") as HTMLImageElement
balaoAzulImg.src = "src/assets/png/balao-azul.png"
balaoAzulImg.alt = "balão azul image"
balaoAzulImg.classList.add("header-content__balao-azul")

const entregadoraImg = dc("img") as HTMLImageElement
entregadoraImg.src = "src/assets/png/entregadora.png"
entregadoraImg.alt = "entregadora image"
entregadoraImg.classList.add("header-content__entregadora")

const circle = dc("div")
circle.classList.add("header-content__circle")

const mobileImagesWrapper = dc("div")
mobileImagesWrapper.classList.add("header-content__imagesWrapper")
mobileImagesWrapper?.appendChild(balaoAmareloImg)
mobileImagesWrapper?.appendChild(entregadoraImg)
mobileImagesWrapper?.appendChild(balaoAzulImg)
mobileImagesWrapper?.appendChild(circle)

const desktopImagesWrapper = mobileImagesWrapper.cloneNode(
  true,
) as HTMLDivElement

const mobileWrapper = dc("div")
mobileWrapper.classList.add("header-content__mobile-wrapper")
mobileWrapper?.appendChild(mobileName)
mobileWrapper?.appendChild(mobileImagesWrapper)
mobileWrapper?.appendChild(mobileChineeseText)
mobileWrapper?.appendChild(mobileGoText)
mobileWrapper?.appendChild(mobileDescriptionText)

const textWrapperInternal = dc("div")
textWrapperInternal.classList.add("header-content__text-wrapper-internal")
textWrapperInternal?.appendChild(desktopChineeseText)
textWrapperInternal?.appendChild(desktopGoText)

const textWrapper = dc("div")
textWrapper.classList.add("header-content__text-wrapper")
textWrapper?.appendChild(textWrapperInternal)
textWrapper?.appendChild(desktopDescriptionText)
textWrapper?.appendChild(orderButton)

const contentSection = dc("section")
contentSection.classList.add("header-content__content-section")
contentSection?.appendChild(textWrapper)
contentSection?.appendChild(desktopImagesWrapper)

const desktopWrapper = dc("div")
desktopWrapper.classList.add("header-content__desktop-wrapper")
desktopWrapper?.appendChild(desktopName)
desktopWrapper?.appendChild(contentSection)

export const heroElement = dc("header")
heroElement.setAttribute("data-js", "hero")
heroElement.classList.add("header-content")
heroElement?.appendChild(mobileWrapper)
heroElement?.appendChild(desktopWrapper)
