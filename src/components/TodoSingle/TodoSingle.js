"use strict"

import {formatRelative} from "date-fns"
import {todos, todoSection} from "../../index"
import {ENTER_KEY_CODE} from "../../utils/constants"
import {deleteFromTodos, getByDataAttribute, updateTodos} from "../../utils/functions"

export function createTodo(todoContent) {
  const currentDate = new Date()

  return {
    id: currentDate.valueOf(),
    title: todoContent,
    date: currentDate,
    selected: false
  }
}

/**
 * @description render single todoElement and return it
 *
 * @example
 * <div class="single" data-id="1658325170310" data-index="0">
 *     <input type="checkbox" class="checkbox">
 *     <div class="content">
 *         <p class="title">Do something</p>
 *         <p class="date">today at 4:52 PM</p>
 *     </div>
 *     <div class="actions">
 *         <i class="fas fa-edit"></i>
 *         <i class="fas fa-trash-alt"></i>
 *     </div>
 * </div>
 *
 * @param {Object} todo
 * @param {Number} todo.id
 * @param {String} todo.title
 * @param {Date} todo.date
 * @param {Boolean} todo.selected
 * @param {Number} todo.index index of todo in todos array
 *
 * @returns {HTMLDivElement} todoElement html
 */

export function renderSingleTodo({id, title, date, selected, index}) {
  const wrapper = document.createElement("div")
  wrapper.classList.add("single")
  wrapper.setAttribute("data-id", id)
  wrapper.setAttribute("data-index", index)

  const checkbox = document.createElement("input")
  checkbox.type = "checkbox"
  checkbox.classList.add("checkbox")
  checkbox.checked = selected
  wrapper.append(checkbox)

  checkbox.addEventListener("change", e => {
    updateCheckedState(index, e.target.checked)
  })

  const content = document.createElement("div")
  content.classList.add("content")

  const titleElement = document.createElement("p")
  titleElement.classList.add("title")
  titleElement.textContent = title
  content.append(titleElement)

  const dateElement = document.createElement("p")
  dateElement.classList.add("date")
  dateElement.textContent = formatRelative(new Date(date), new Date())
  content.append(dateElement)

  wrapper.append(content)
  wrapper.append(createActionsBlock(id))

  todoSection.append(wrapper)
  return wrapper
}

function createActionsBlock(id) {
  const actions = document.createElement("div")
  actions.classList.add("actions")

  const editElement = document.createElement("i")
  editElement.classList.add("fas", "fa-edit")
  actions.append(editElement)
  editElement.addEventListener("click", () => startEditTodo(id))

  const deleteElement = document.createElement("i")
  deleteElement.classList.add("fas", "fa-trash-alt")
  actions.append(deleteElement)
  deleteElement.addEventListener("click", () => removeTodo(id))

  return actions
}

function updateCheckedState(index, selected) {
  todos[index].selected = selected
  updateTodos(todos)
}

function removeTodo(id) {
  const indexTodoToDelete = getByDataAttribute("id", id).getAttribute("data-index")
  deleteFromTodos(indexTodoToDelete)
}

/**
 * hide title, add edit input and update actions
 *
 * @example
 * <div class="single" data-id="1658325170310" data-index="0">
 *     <input type="checkbox" class="checkbox">
 *     <div class="content">
 *         <input class="edit-field" type="text">
 *         <p class="title" style="display: none;">Old todo text</p>
 *         <p class="date">today at 4:52 PM</p>
 *     </div>
 *     <div class="actions">
 *         <i class="fas fa-save"></i>
 *         <i class="fas fa-times"></i>
 *     </div>
 * </div>
 * @param id {number}
 */

function startEditTodo(id) {
  const todo = getByDataAttribute("id", id)

  const content = todo.querySelector(".content")

  const title = content.querySelector(".title")
  title.style.display = "none"

  const editField = document.createElement("input")
  editField.classList.add("edit-field")
  editField.type = "text"
  editField.value = title.textContent
  content.insertBefore(editField, content.firstChild).focus()

  editField.addEventListener("keydown", e => {
    if (e.key === ENTER_KEY_CODE) confirmEditTodo(id)
  })
  editField.addEventListener("blur", () => cancelEditTodo(id))

  const saveButton = document.createElement("i")
  saveButton.classList.add("fas", "fa-save")
  saveButton.addEventListener("click", () => confirmEditTodo(id))

  const cancelButton = document.createElement("i")
  cancelButton.classList.add("fas", "fa-times")
  cancelButton.addEventListener("click", () => cancelEditTodo(id))

  const actions = todo.querySelector(".actions")

  actions.textContent = ""
  actions.append(saveButton)
  actions.append(cancelButton)
}

function confirmEditTodo(id) {
  const todo = getByDataAttribute("id", id)

  const content = todo.querySelector(".content")
  const editField = content.querySelector(".edit-field")

  const title = content.querySelector(".title")
  title.textContent = editField.value
  title.style.display = "inline-block"

  todo.removeChild(todo.querySelector(".actions"))
  todo.appendChild(createActionsBlock(id))

  updateTodo(todo.getAttribute("data-index"), editField.value)
}

function updateTodo(index, title) {
  todos[index].title = title
  todos[index].date = new Date()

  updateTodos(todos)
}

function cancelEditTodo(id) {
  const todo = getByDataAttribute("id", id)

  const content = todo.querySelector(".content")

  content.removeChild(content.querySelector(".edit-field"))

  const title = content.querySelector(".title")
  title.style.display = "inline-block"

  todo.removeChild(todo.querySelector(".actions"))
  todo.appendChild(createActionsBlock(id))
}
