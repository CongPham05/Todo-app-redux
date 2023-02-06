import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    search: "",
    status: "All",
    priority: []
}
export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        searchText: (state, action) => {
            state.search = action.payload
        },
        status: (state, action) => {
            state.status = action.payload
        },
        priority: (state, action) => {
            state.priority = action.payload
        },
    },
})


// Action creators are generated for each case reducer function
export const { searchText, status, priority } = filtersSlice.actions
export default filtersSlice.reducer