import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    status: "idle",
    data: []
}
export const todoSlice = createSlice({
    name: 'todoList',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.data.push(action.payload)
        },
        toggleCompleted: (state, action) => {
            state.data.map(todo => todo.id === action.payload ? todo.completed = !todo.completed : todo)

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state, action) => {
                state.status = "Loading. . ."
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = "idle"
                state.data = action.payload
            })
            .addCase(addNewTodo.fulfilled, (state, action) => {
                state.data.push(action.payload)
            })
            .addCase(toggleComplete.fulfilled, (state, action) => {
                state.data.map(todo =>
                    todo.id === action.payload.id
                        ? todo.completed = !todo.completed
                        : todo)
            })
    }
})

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async () => {
        const res = await fetch('/api/todos')
        const data = await res.json();
        return data.todos;
    }
)

export const addNewTodo = createAsyncThunk(
    'todos/addNewTodo',
    async (newTodo) => {
        const res = await fetch('/api/todos',
            { method: 'POST', body: JSON.stringify(newTodo) })
        const data = await res.json();
        return data.todos;
    }
)

export const toggleComplete = createAsyncThunk(
    'todos/toggleCompleted',
    async (id) => {
        const res = await fetch(`/api/toggleCompleted`,
            { method: 'POST', body: JSON.stringify(id) })
        const data = await res.json();
        return data.todos;
    }
)





export const { addTodo, toggleCompleted } = todoSlice.actions
export default todoSlice.reducer






