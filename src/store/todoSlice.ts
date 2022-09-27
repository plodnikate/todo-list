import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from "uuid";
import { SelectAll } from '../constants'

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
    list: Todo[],
    selectedTab: string
}

const initialState: TodosState = {
    list: [],
    selectedTab: SelectAll
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
            state.selectedTab = SelectAll;
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
            const {title, creationDate, expirationDate} = action.payload;
            const editTodo = state.list.find(todo => todo.id === action.payload.id);
            if(editTodo){
                editTodo.title = title;
                editTodo.creationDate = creationDate;
                editTodo.expirationDate = expirationDate;
            }
        },
        removeCompletedTodo(state){
            state.list = state.list.filter(todo => todo.completed === false);
            state.selectedTab = SelectAll;
        },
        changeTab(state, action: PayloadAction<string>){
            state.selectedTab = action.payload;
        }
    },
});


export const { addTodo, toggleComplete, removeTodo, editTodo, removeCompletedTodo, changeTab } = todoSlice.actions;
export default todoSlice.reducer;