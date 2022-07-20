import {todos} from "../../index.js"
import {ENTER_KEY_CODE} from "../../utils/constants"
import {getByDataAttribute, updateTodos} from "../../utils/functions"

const input = getByDataAttribute("main-input")

let todoContent = ""

input.addEventListener("input", e => {
  todoContent = e.target.value
})

input.addEventListener("keydown", e => {
  if (e.key === ENTER_KEY_CODE) {
    const currentDate = new Date()

    const todoItem = {
      id: currentDate.valueOf(),
      title: todoContent,
      date: currentDate,
      selected: false
    }

    todos.push(todoItem)

    updateTodos(todos)

    todoContent = ""
    input.value = ""
  }
})