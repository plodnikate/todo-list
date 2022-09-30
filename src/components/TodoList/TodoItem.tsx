import { useAppDispatch } from '../../hooks';
import { toggleComplete, removeTodo } from '../../store/todoSlice';
import { ListItem, Checkbox, IconButton, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import Edit from '@material-ui/icons/Edit';
import { useState,  FC } from 'react';
import Modal from '../ModalForm/ModalForm';
import { parse } from 'date-fns';
import { DATE_FORMAT } from '../../constants/constants';


interface TodoItemProps {
    id: string,
    title: string,
    completed: boolean,
    creationDate: string,
    expirationDate: string,
}

const TodoItem: FC<TodoItemProps> = ({ id, title, completed, creationDate, expirationDate }) => {
    const dispatch = useAppDispatch();
    const [showModal, setShowModal] = useState(false);

    const onChangeHandler = () => {
        dispatch(toggleComplete(id))
    }
    const onClickEditButtonHanlder = () =>{
        setShowModal(true);
    }

    const onClickDeleteButtonHanlder = () =>{
        dispatch(removeTodo(id));
    }

    return (
        <div>
            <ListItem divider>
                <Checkbox color="primary"
                    checked={completed}
                    onChange={onChangeHandler}
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
                    <IconButton aria-label="Delete Todo" onClick={onClickEditButtonHanlder}>
                        <Edit />
                    </IconButton>
                    <IconButton aria-label="Delete Todo" onClick={onClickDeleteButtonHanlder}>
                        <DeleteOutlined />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            {showModal && <Modal showModal={setShowModal} title={title} id={id} 
            creationDate={parse(creationDate, DATE_FORMAT, new Date())} 
            expirationDate={parse(expirationDate, DATE_FORMAT, new Date())}
            />}
        </div>
    );
};


export default TodoItem;
