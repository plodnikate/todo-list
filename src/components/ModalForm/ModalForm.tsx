import { useState, FC, SyntheticEvent, ChangeEvent } from 'react';
import { useAppDispatch } from '../../hooks';
import { format, addMinutes } from 'date-fns';
import { addTodo, editTodo } from '../../store/todoSlice';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import { Grid } from '@material-ui/core';
import { DATE_FORMAT, FORM_DATE_FORMAT, SPECIAL_SYMBOLS_REGEX } from '../../constants/constants';

interface Modal {
    showModal: (isShowModule: boolean) => void;
    title: string;
    setTitle?: (title: string) => void;
    id?: string;
    creationDate?: Date;
    expirationDate?: Date;
}

const Modal: FC<Modal> = ({ showModal, title, setTitle, id, creationDate, expirationDate }) => {
    const dispatch = useAppDispatch();

    const [text, setText] = useState(title);
    const [dateCreation, setDateCreation] = useState(creationDate ? creationDate : new Date());
    const [dateExpiration, setDateExpiration] = useState(expirationDate ? expirationDate : addMinutes(dateCreation, 5));
    const minExpirationDate = format(addMinutes(dateCreation, 5), FORM_DATE_FORMAT);
    const [error, setError] = useState("");

    const changeHandleText = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!e.target.value.match(SPECIAL_SYMBOLS_REGEX)) {
            setError("");
        } else {
            setError("no special symbols allowed");
        }
        setText(e.target.value);
    }

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(error){
            return;
        }
        if (text.trim()) {
            if (id) {
                dispatch(editTodo({
                    id: id, title: text, creationDate: format(dateCreation, DATE_FORMAT),
                    expirationDate: format(dateExpiration, DATE_FORMAT)
                }));
                showModal(false);
                return;
            }
            dispatch(addTodo({
                title: text, creationDate: format(dateCreation, DATE_FORMAT),
                expirationDate: format(dateExpiration, DATE_FORMAT)
            }));
            setText('');
            if (setTitle) {
                setTitle('');
            }
            showModal(false);
        }
    };

    const changeHandlerCreationDate = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setDateCreation(new Date(e.target.value));
    }

    const changeHandlerExpirationDate = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setDateExpiration(new Date(e.target.value));
    }

    return (
        <Grid container justifyContent="center" alignItems='center'>
            <Dialog open={true} fullWidth>
                <Stack component="form" onSubmit={handleSubmit}>
                    <DialogContent>
                        <Stack spacing={3}>
                            <TextField
                                helperText={error}
                                error={!!error}
                                required
                                placeholder='new todo' value={text} fullWidth
                                onChange={changeHandleText}
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
                                onChange={changeHandlerCreationDate}
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
                                onChange={changeHandlerExpirationDate}
                            />
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { showModal(false) }}> Cancel </Button>
                        <Button type="submit"> Save </Button>
                    </DialogActions>
                </Stack>
            </Dialog>
        </Grid>
    );
};

export default Modal;
