import { useAppDispatch } from '../hooks';
import { toggleComplete } from '../store/todoSlice';
import { ListItem, Checkbox, ListItemText } from '@material-ui/core';
import { FC } from 'react';

interface TodoItemProps {
    id: string,
    title: string,
    completed: boolean,
    creationDate: string,
    expirationDate: string,
}

const TodoItem: FC<TodoItemProps> = ({ id, title, completed, creationDate, expirationDate }) => {
    const dispatch = useAppDispatch();

    return (
        <ListItem divider>
            <Checkbox color="primary"
                checked={completed}
                onChange={() => dispatch(toggleComplete(id))}
            />
            <ListItemText primary= {title} secondary={`${creationDate} - ${expirationDate}`} className={completed ? "done_item" : ""}/>
        </ListItem>
    );
};


export default TodoItem;
