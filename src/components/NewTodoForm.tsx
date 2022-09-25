import { useState } from 'react';
import { useAppDispatch } from '../hooks';
import { format, addDays } from 'date-fns';
import { addTodo } from '../store/todoSlice';
import { TextField, Paper, Button, Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Modal from './Modal';
import { DATE_FORMAT } from '../constants';
import '../style.css'

const NewTodoForm: React.FC = () => {
    const [text, setText] = useState('');
    const [showModal, setShowModal] = useState(false);
    const dispatch = useAppDispatch();

    const handleCloseModule = () => {
        setShowModal(false)
    }

    const handleKeyPress = () => {
        if (text.trim().length) {
            const date = new Date();
            dispatch(addTodo({ title: text, creationDate: format(date, DATE_FORMAT), expirationDate: format(addDays(date, 1), DATE_FORMAT) }));
            setText('');
        }
    };

    return (
        <Grid container justifyContent="center" >
            <Grid xs={12} sm={9} md={6} item >
                <Paper className="paper">
                    <Grid container>
                        <Grid xs={9} md={10} item className="grid">
                            <TextField
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
                    {showModal && <Modal closeModal={handleCloseModule} title={text} setTitle={setText} />}
                </Paper>
            </Grid>
        </Grid>
    );
};

export default NewTodoForm;
