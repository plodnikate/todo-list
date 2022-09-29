import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from "uuid";
import { SELECTED_ALL, EXP_DATE_DOWN } from '../constants';

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
    selectedTab: string,
    sortBy:string
}

const initialState: TodosState = {
    list: [],
    selectedTab: SELECTED_ALL,
    sortBy: EXP_DATE_DOWN
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
            state.selectedTab = SELECTED_ALL;
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
            state.list = state.list.filter(todo => !todo.completed);
            state.selectedTab = SELECTED_ALL;
        },
        changeTab(state, action: PayloadAction<string>){
            state.selectedTab = action.payload;
        },
        sortBy(state, action: PayloadAction<string>){
            state.sortBy = action.payload;
        }
    },
});


export const { addTodo, toggleComplete, removeTodo, editTodo, removeCompletedTodo, changeTab, sortBy } = todoSlice.actions;
export default todoSlice.reducer;
