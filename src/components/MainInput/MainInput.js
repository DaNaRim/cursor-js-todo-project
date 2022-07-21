import {todos} from "../../index.js"
import {ENTER_KEY_CODE} from "../../utils/constants"
import {getByDataAttribute, updateTodos} from "../../utils/functions"
import {createTodo} from "../TodoSingle/TodoSingle"

const input = getByDataAttribute("main-input")

let todoContent = ""

input.addEventListener("input", e => {
  todoContent = e.target.value
})

input.addEventListener("keydown", e => {
  if (e.key === ENTER_KEY_CODE) {
    todos.push(createTodo(todoContent))

    updateTodos(todos)

    todoContent = ""
    input.value = ""
  }
})