import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from "uuid";

type Todo = {
    id: string;
    title: string;
    completed: boolean;
    creationDate: string;
    expirationDate: string;
}

type addTodoAction = {
    title: string;
    creationDate: string;
    expirationDate: string;
}

type TodosState = {
    list: Todo[];
}

const initialState: TodosState = {
    list: []
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<addTodoAction>) {
            const {title, creationDate, expirationDate} = action.payload;
            state.list.push({
                id: uuidv4(),
                title,
                completed: false,
                creationDate,
                expirationDate,
            });
        },
        toggleComplete(state, action: PayloadAction<string>) {
            const toggledTodo = state.list.find(todo => todo.id === action.payload);
            if (toggledTodo) {
                toggledTodo.completed = !toggledTodo.completed;
            }
        }
    },
});


export const { addTodo, toggleComplete } = todoSlice.actions;
export default todoSlice.reducer;
