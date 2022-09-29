import { useAppSelector } from '../hooks';
import TodoItem from './TodoItem';
import { List, Paper, Grid, ListItem, ListItemText } from '@material-ui/core';
import AdditionalButtons from './AdditionalButtons';
import { SELECTED_ACTIVE, SELECTED_COMPLITED, TEXT_UP, TEXT_DOWN, EXP_DATE_UP, EXP_DATE_DOWN, DATE_FORMAT } from '../constants';
import { Typography } from '@mui/material';
import { differenceInMinutes, parse } from 'date-fns';

const TodoList = () => {
    const todos = useAppSelector(state => state.todos.list);
    const showTab = useAppSelector(state => state.todos.selectedTab);
    const sortBy = useAppSelector(state => state.todos.sortBy);
    let showTodos;

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

    return (
        <Grid container justifyContent="center">
            <Grid xs={12} sm={9} md={6} item>
                <Paper className='list_paper'>
                    <List style={{ overflow: 'scroll' }}>
                        {showTodos.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                {...todo}
                            />
                        ))}
                        {!showTodos.length && <ListItem>
                            <ListItemText>
                                <Typography textAlign='center'>
                                    NO ITEMS
                                </Typography>
                            </ListItemText>
                        </ListItem>}
                    </List>
                    <AdditionalButtons showTab={showTab} />
                </Paper>
            </Grid>
        </Grid>
    );
};

export default TodoList;
