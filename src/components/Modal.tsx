import { useState } from 'react';
import { useAppDispatch } from '../hooks';
import { format, addDays } from 'date-fns';
import { addTodo } from '../store/todoSlice';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import { Grid } from '@material-ui/core';
import { DATE_FORMAT, FORM_DATE_FORMAT } from '../constants';

interface Modal {
    closeModal: () => void;
    title: string;
    setTitle: (title:string) => void;
}

const Modal: React.FC<Modal> = ({ closeModal, title, setTitle }) => {
    const dispatch = useAppDispatch();

    const [text, setText] = useState(title);
    const [dateCreation, setDateCreation] = useState(new Date());
    const [dateExpiration, setDateExpiration] = useState(addDays(dateCreation, 1));

    const minExpirationDate = format(addDays(dateCreation, 1), FORM_DATE_FORMAT);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (text.trim().length) {
            dispatch(addTodo({ title: text, creationDate: format(dateCreation, DATE_FORMAT), expirationDate: format(dateExpiration, DATE_FORMAT) }));
            setText('');
            setTitle('');
            closeModal();
        }
    };

    return (
        <Grid container justifyContent="center" alignItems='center'>
            <Dialog open={true} fullWidth>
                <Stack component="form" onSubmit={handleSubmit}>
                    <DialogContent>
                        <Stack spacing={3}>
                            <TextField
                                required
                                placeholder='new todo' value={text} fullWidth
                                onChange={(e) => setText(e.target.value)}
                            />
                                <TextField
                                    required fullWidth
                                    id="datetime-local"
                                    label="Creation Date"
                                    type="datetime-local"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(event) => { setDateCreation(new Date(event.target.value));}}
                                />
                            <TextField
                                required fullWidth
                                id="datetime-local"
                                label="Expiration Date"
                                type="datetime-local"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    min: minExpirationDate,
                                }}
                                onChange={(event) => { setDateExpiration(new Date(event.target.value)) }}
                            />
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeModal}>Cancel</Button>
                        <Button type="submit">Save</Button>
                    </DialogActions>
                </Stack>
            </Dialog>
        </Grid>
    );
};

export default Modal;
