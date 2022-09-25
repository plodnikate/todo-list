import { useAppDispatch } from '../hooks';
import { toggleComplete, removeTodo } from '../store/todoSlice';
import { ListItem, Checkbox, IconButton, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';

interface TodoItemProps {
    id: string,
    title: string,
    completed: boolean,
    creationDate: string,
    expirationDate: string,
}

const TodoItem: React.FC<TodoItemProps> = ({ id, title, completed, creationDate, expirationDate }) => {
    const dispatch = useAppDispatch();

    return (
        <ListItem divider>
            <Checkbox color="primary"
                checked={completed}
                onChange={() => dispatch(toggleComplete(id))}
            />
            <ListItemText primary={title} secondary={`${creationDate} - ${expirationDate}`} className={completed ? "done_item" : ""}/>
            <ListItemSecondaryAction>
            <IconButton aria-label="Delete Todo" onClick={() => dispatch(removeTodo(id))}>
                <DeleteOutlined />
            </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};


export default TodoItem;
