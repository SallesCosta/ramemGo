import "./main-style.scss"

import { heroElement } from "./components/hero.ts"
import { contentElement } from "./components/content.ts"

const mainElement = document.createElement("main")
mainElement?.appendChild(heroElement)
mainElement?.appendChild(contentElement)

const App = document.querySelector<HTMLDivElement>('[data-js="app"]')
App?.appendChild(mainElement)
