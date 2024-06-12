import "./main-style.scss"

// import { heroElement } from "./components/hero.ts"
// import { contentElement } from "./components/content.ts"

const oiElement = document.createElement("div")
oiElement.innerText = "Oi"

const mainElement = document.createElement("main")
// mainElement?.appendChild(heroElement)
// mainElement?.appendChild(contentElement)
mainElement?.appendChild(oiElement)

const App = document.querySelector<HTMLDivElement>('[data-js="app"]')
App?.appendChild(mainElement)