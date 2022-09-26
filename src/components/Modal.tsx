import { useState, FC, SyntheticEvent } from 'react';
import { useAppDispatch } from '../hooks';
import { format, addMinutes } from 'date-fns';
import { addTodo, editTodo } from '../store/todoSlice';


import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import { Grid } from '@material-ui/core';
import { DATE_FORMAT, FORM_DATE_FORMAT } from '../constants';

interface Modal {
    showModal: (isShowModule:boolean) => void;
    title: string;
    setTitle?: (title: string) => void;
    id?:string;
    creationDate?: Date,
    expirationDate?: Date,
}

const Modal: FC<Modal> = ({ showModal, title, setTitle, id, creationDate, expirationDate }) => {
    const dispatch = useAppDispatch();

    const [text, setText] = useState(title);
    const [dateCreation, setDateCreation] = useState(creationDate ? creationDate : new Date());
    const [dateExpiration, setDateExpiration] = useState(expirationDate ? expirationDate : addMinutes(dateCreation, 5));


    const minExpirationDate = format(addMinutes(dateCreation, 5), FORM_DATE_FORMAT);

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (text.trim().length) {
            if(id){
                dispatch(editTodo({ id: id, title: text, creationDate: format(dateCreation, DATE_FORMAT), expirationDate: format(dateExpiration, DATE_FORMAT) }))
                showModal(false);
                return;
            }
            dispatch(addTodo({ title: text, creationDate: format(dateCreation, DATE_FORMAT), expirationDate: format(dateExpiration, DATE_FORMAT) }));
            setText('');
            if (setTitle) {
                setTitle('')
            }
            showModal(false);

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
                                defaultValue={creationDate ? format(creationDate, FORM_DATE_FORMAT) : ''}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(event) => { setDateCreation(new Date(event.target.value)); }}
                            />

                            <TextField
                                required fullWidth
                                id="datetime-local"
                                label="Expiration Date"
                                type="datetime-local"
                                defaultValue={expirationDate ? format(expirationDate, FORM_DATE_FORMAT) : ''}
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
                        <Button onClick={() => { showModal(false) }}>Cancel</Button>
                        <Button type="submit">Save</Button>
                    </DialogActions>
                </Stack>
            </Dialog>
        </Grid>
    );
};

export default Modal;
