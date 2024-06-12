import "../_global.scss"
import { dc } from "../helpers/helpers.ts"
import { arrowIcon } from "./arowIcon.ts";

type ButtonProps<T extends () => void> = {
  text: string
  onClick: T
}

export const Button = <T extends () => void>({
  text,
  onClick,
}: ButtonProps<T>) => {
  const b = dc("button")
  b.classList.add("button")
  b.textContent = text
  b.addEventListener("click", onClick)

  b.insertAdjacentHTML("beforeend", arrowIcon())

  return b
}