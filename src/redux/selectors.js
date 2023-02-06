import { createSelector } from "@reduxjs/toolkit"

export const todoListsSelector = state => state.todoList.data;
export const filterSearchSelector = state => state.filters.search;
export const filterStatusSelector = state => state.filters.status;
export const filterPrioritySelector = state => state.filters.priority;

export const todosRemainningSelector = createSelector(
    todoListsSelector,
    filterSearchSelector,
    filterStatusSelector,
    filterPrioritySelector,
    (todoLists, searchText, statusText, prioritySearch) => {

        return todoLists.filter(todo => {
            if (statusText === "All") {
                return prioritySearch.length
                    ? todo.name.includes(searchText) && prioritySearch.includes(todo.priority)
                    : todo.name.includes(searchText)
            }
            return todo.name.includes(searchText) &&
                (statusText === "Completed" ? todo.completed : !todo.completed)
                && (prioritySearch.length
                    ? prioritySearch.includes(todo.priority)
                    : true)

        })
    }
)