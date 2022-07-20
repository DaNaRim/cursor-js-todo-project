"use strict"

import "./components/MainInput/MainInput"
import "./styles/reset.scss"
import "./styles/style.scss"
import {getByDataAttribute, getLocalTodos, updateTodos} from "./utils/functions"

export const todos = getLocalTodos() || []

const root = getByDataAttribute("root")

export const todoSection = document.createElement("div")
todoSection.classList.add("todo-list-container")
root.append(todoSection)

if (todos.length) {
  updateTodos(todos)
}
