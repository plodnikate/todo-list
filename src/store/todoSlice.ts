import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from "uuid";

type Todo = {
    id: string;
    title: string;
    completed: boolean;
    creationDate: string;
    expirationDate: string;
}

type EditTodo = {
    id: string;
    title: string;
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
        toggleComplete(state, action: PayloadAction<string>) {
            const toggledTodo = state.list.find(todo => todo.id === action.payload);
            if (toggledTodo) {
                toggledTodo.completed = !toggledTodo.completed;
            }
        },
        removeTodo(state, action: PayloadAction<string>) {
            state.list = state.list.filter(todo => todo.id !== action.payload);
        },
        editTodo(state, action: PayloadAction<EditTodo>){
            const editTodo = state.list.find(todo => todo.id === action.payload.id);
            if(editTodo){
                editTodo.title = action.payload.title;
                editTodo.creationDate = action.payload.creationDate;
                editTodo.expirationDate = action.payload.expirationDate
            }
        }
    },
});


export const { addTodo, toggleComplete, removeTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;
