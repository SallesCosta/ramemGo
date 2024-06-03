import { incomingData } from "../components/content.ts"
export const dc = (element: string) => {
  return document.createElement(element)
}

export const toMoney = (value: number): string => {
  return "US$ " + Math.floor(value)
}

export const c = (param: any) => {
  console.log(param)
}

export const navigateTo = (element: Element | null) => {
  if (!element) return
  element.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "center",
  })
}

type ChangeClassProps = {
  element: NodeListOf<Element>
  className: string
  index: number
  brothData: incomingData[]
}

export const changeClass = ({
  element,
  className,
  index,
  brothData,
}: ChangeClassProps) => {
  const newIndex = index - 1
  const srcActive = brothData[newIndex].imageActive

  const setActive = (el: Element) => {
    el.classList.add(className)
    el.querySelector("img")?.setAttribute("src", srcActive)
  }

  const setInactive = (el: Element, i: number) => {
    el.classList.remove(className)
    el.querySelector("img")?.setAttribute("src", brothData[i].imageInactive)
  }

  element.forEach((el, i) => {
    el.classList.remove(className)
    el === element[newIndex] ? setActive(el) : setInactive(el, i)
  })
}
