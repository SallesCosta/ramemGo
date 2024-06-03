import "../_global.scss"
import { dc } from "../helpers/helpers.ts"

type ButtonProps<T extends () => void> = {
  text: string
  onClick: T
  icon?: Promise<string>
}

export const Button = <T extends () => void>({
  text,
  onClick,
  icon,
}: ButtonProps<T>) => {
  const b = dc("button")
  b.classList.add("button")
  b.textContent = text
  b.addEventListener("click", onClick)

  icon
    ?.then((svgContent) => {
      b.insertAdjacentHTML("beforeend", svgContent)
    })
    .catch(() => {
      console.error("Error loading icon")
      b.appendChild(dc("span") as HTMLSpanElement).textContent = "→"
    })

  return b
}
