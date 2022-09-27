import { useAppSelector } from '../hooks';
import TodoItem from './TodoItem';
import { List, Paper, Grid, ListItem, ListItemText } from '@material-ui/core';
import AdditionalButtons from './AdditionalButtons';
import { SELECTED_ACTIVE, SELECTED_COMPLITED } from '../constants';
import { Typography } from '@mui/material';


const TodoList = () => {
    const todos = useAppSelector(state => state.todos.list);
    const showTab = useAppSelector(state => state.todos.selectedTab);
    let showTodos;

    switch (showTab) {
        case SELECTED_ACTIVE:
            showTodos = todos.filter(todo => todo.completed === false);
            break;
        case SELECTED_COMPLITED:
            showTodos = todos.filter(todo => todo.completed === true);
            break;
        default:
            showTodos = todos;
    }

    return (
        <Grid container justifyContent="center" >
            <Grid xs={12} sm={9} md={6} item >
                <Paper className='list_paper'>
                    <List style={{ overflow: 'scroll' }}>
                        {showTodos.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                {...todo}
                            />
                        ))}
                        {showTodos.length === 0 && <ListItem>
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
