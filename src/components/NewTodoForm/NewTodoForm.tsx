import { useState, FC } from 'react';
import { useAppDispatch } from '../../hooks';
import { format, addDays } from 'date-fns';
import { addTodo } from '../../store/todoSlice';
import { TextField, Paper, Button, Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Modal from '../ModalForm/ModalForm';
import { DATE_FORMAT } from '../../constants/constants';
import '../Components.css';
import SortItem from './SortItem';

const NewTodoForm: FC = () => {
    const [text, setText] = useState('');
    const [showModal, setShowModal] = useState(false);
    const dispatch = useAppDispatch();
    const [error, setError] = useState("");


    const handleKeyPress = () => {
        if (!text.match(/[@#~^`!-+()_|?{}[\]&*%<>\\$'"]/)) {
            setError("");
        } else {
            setError("no special symbols allowed");
            return;
        }
        if (text.trim()) {
            const date = new Date();
            dispatch(addTodo({ title: text, creationDate: format(date, DATE_FORMAT), 
                expirationDate: format(addDays(date, 1), DATE_FORMAT) }));
            setText('');
        }
    };

    return (
        <Grid container justifyContent="center" >
            <Grid xs={12} sm={9} md={6} item >
                <Paper className="paper">
                    <Grid container>
                    <SortItem />
                        <Grid xs={9} md={8} item className="grid">
                            <TextField
                                helperText={error} 
                                error={!!error}
                                placeholder='new todo' value={text} fullWidth
                                onChange={(e) => setText(e.target.value)}
                                onKeyPress={event => {
                                    if (event.key === 'Enter') {
                                        handleKeyPress()
                                    }
                                }}
                            />
                        </Grid>
                        <Grid xs={2} md={1} item>
                            <Button color='primary'
                                fullWidth variant="outlined"
                                onClick={() => {
                                    setShowModal(true)
                                }}>
                                <AddIcon />
                            </Button>
                        </Grid>
                    </Grid>
                    {showModal && <Modal showModal={setShowModal} title={text} setTitle={setText} />}
                </Paper>
            </Grid>
        </Grid>
    );
};

export default NewTodoForm;
