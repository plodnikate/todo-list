import { useAppSelector } from '../hooks';
import TodoItem from './TodoItem';
import { List, Paper, Grid } from '@material-ui/core';

const TodoList = () => {
    const todos = useAppSelector(state => state.todos.list);

    return (
        <Grid container justifyContent="center" >
            {todos.length > 0 && <Grid xs={12} sm={9} md={6} item >
                <Paper className='list_paper'>
                    <List style={{ overflow: 'scroll' }}>
                        {todos.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                {...todo}
                            />
                        ))}
                    </List>
                </Paper>
            </Grid>}
        </Grid>
    );
};

export default TodoList;