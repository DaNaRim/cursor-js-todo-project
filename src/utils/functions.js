"use strict"

import {renderSingleTodo} from "../components/TodoSingle/TodoSingle"
import {todos, todoSection} from "../index.js"
import {STORAGE_KEY} from "./constants"

export function getByDataAttribute(attribute, value = "") {
  return document.querySelector(`[data-${attribute}="${value}"]`)
}

export function updateTodos(todos) {
  updateLocalTodos(todos)

  todoSection.innerHTML = ""
  todos.forEach((el, index) => renderSingleTodo({...el, index}))
}

export function getLocalTodos() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY))
}

export function updateLocalTodos(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

export function deleteFromTodos(index) {
  todos.splice(index, 1)
  updateTodos(todos)
}
