import { useAppSelector } from '../../hooks';
import { useState } from 'react';
import TodoItem from './TodoItem';
import { List, Paper, Grid } from '@material-ui/core';
import AdditionalButtons from './ButtonsBar/AdditionalButtons';
import { SELECTED_ACTIVE, SELECTED_COMPLITED, TEXT_UP, TEXT_DOWN, EXP_DATE_UP, EXP_DATE_DOWN, DATE_FORMAT } from '../../constants/constants';
import { differenceInMinutes, parse } from 'date-fns';
import SearchBar from './SearchBar';
import InformItem from './InformItem';

const TodoList = () => {
    const todos = useAppSelector(state => state.todos.list);
    const showTab = useAppSelector(state => state.todos.selectedTab);
    const sortBy = useAppSelector(state => state.todos.sortBy);
    const [searchText, setSearchText] = useState('');
    let showTodos;
    const searchTextHandler = (text: string) => {
        setSearchText(text);
    }

    switch (showTab) {
        case SELECTED_ACTIVE:
            showTodos = todos.filter(todo => !todo.completed);
            break;
        case SELECTED_COMPLITED:
            showTodos = todos.filter(todo => todo.completed);
            break;
        default:
            showTodos = [...todos];
    }

    switch (sortBy) {
        case TEXT_UP:
            showTodos.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case TEXT_DOWN:
            showTodos.sort((a, b) => b.title.localeCompare(a.title));
            break;
        case EXP_DATE_UP:
            showTodos.sort((a, b) => differenceInMinutes(parse(b.expirationDate, DATE_FORMAT, new Date()),
                parse(a.expirationDate, DATE_FORMAT, new Date())));
            break;
        case EXP_DATE_DOWN:
            showTodos.sort((a, b) => differenceInMinutes(parse(a.expirationDate, DATE_FORMAT, new Date()),
                parse(b.expirationDate, DATE_FORMAT, new Date())));
            break;
        default:
            showTodos = showTodos;
    }
    
    if (searchText.length) {
        showTodos = showTodos.filter(todo => todo.title.toLocaleLowerCase().includes(searchText.trim().toLocaleLowerCase()));
    }
   
    return (
        <Grid container justifyContent="center">
            <Grid xs={12} sm={9} md={6} item>
                <Paper className='list_paper'>
                    <SearchBar searchText={searchText} setText={searchTextHandler} />
                    <List style={{ overflow: 'scroll' }}>
                        {showTodos.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                {...todo}
                            />
                        ))}
                        {!showTodos.length && <InformItem />}
                    </List>
                    <AdditionalButtons showTab={showTab} />
                </Paper>
            </Grid>
        </Grid>
    );
};

export default TodoList;
