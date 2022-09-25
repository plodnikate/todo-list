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
            state.list.push({
                id: uuidv4(),
                title: action.payload.title,
                completed: false,
                creationDate: action.payload.creationDate,
                expirationDate: action.payload.expirationDate,
            });
        },
    },
});


export const { addTodo } = todoSlice.actions;
export default todoSlice.reducer;
