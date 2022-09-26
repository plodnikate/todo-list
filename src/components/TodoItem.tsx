import { ListItem, ListItemText } from '@material-ui/core';
import { FC } from 'react';

interface TodoItemProps {
    id: string,
    title: string,
    completed: boolean,
    creationDate: string,
    expirationDate: string,
}

const TodoItem: FC<TodoItemProps> = ({ title, creationDate, expirationDate }) => {

    return (
        <ListItem divider>
            <ListItemText primary= {title} secondary={`${creationDate} - ${expirationDate}`}  />
        </ListItem>
    );
};


export default TodoItem;
