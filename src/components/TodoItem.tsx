import { useAppDispatch } from '../hooks';
import { toggleComplete, removeTodo } from '../store/todoSlice';
import { ListItem, Checkbox, IconButton, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import Edit from '@material-ui/icons/Edit';
import { useState } from 'react';
import Modal from './Modal';
import { format, toDate, parse } from 'date-fns';
import { DATE_FORMAT, FORM_DATE_FORMAT } from '../constants';

interface TodoItemProps {
    id: string,
    title: string,
    completed: boolean,
    creationDate: string,
    expirationDate: string,
}

const TodoItem: React.FC<TodoItemProps> = ({ id, title, completed, creationDate, expirationDate }) => {
    const dispatch = useAppDispatch();
    const [showModal, setShowModal] = useState(false);
    const handleCloseModule = () => {
        setShowModal(false)
    }
    return (
        <div>
            <ListItem divider>
                <Checkbox color="primary"
                    checked={completed}
                    onChange={() => dispatch(toggleComplete(id))}
                />
                <ListItemText
                    primaryTypographyProps={{
                        style: {
                            wordWrap: 'break-word'
                        }
                    }}
                    primary={title}
                    secondary={`${creationDate} - ${expirationDate}`} className={(completed ? "done_item " : "") + "text"}
                />
                <ListItemSecondaryAction>
                    <IconButton aria-label="Delete Todo" onClick={() => setShowModal(true)}>
                        <Edit />
                    </IconButton>
                    <IconButton aria-label="Delete Todo" onClick={() => dispatch(removeTodo(id))}>
                        <DeleteOutlined />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            {showModal && <Modal closeModal={handleCloseModule} title={title} id={id} creationDate={parse(creationDate, DATE_FORMAT, new Date())} expirationDate={parse(expirationDate, DATE_FORMAT, new Date())}/>}
        </div>
    );
};


export default TodoItem;
