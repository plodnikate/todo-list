import { Grid, MenuItem, FormHelperText } from '@material-ui/core';
import FormControl from '@mui/material/FormControl';
import { TEXT_UP, TEXT_DOWN, EXP_DATE_UP, EXP_DATE_DOWN } from '../../constants/constants';
import { useAppDispatch } from '../../hooks';
import { sortBy } from '../../store/todoSlice';
import { useState } from 'react';
import { Select, SelectChangeEvent } from "@mui/material";


const SortItem = () => {
    const [selected, setSelected] = useState(EXP_DATE_DOWN);

    const dispatch = useAppDispatch();
    const selectionChangeHandler = (event: SelectChangeEvent<string>) => {
        setSelected(event.target.value);
        dispatch(sortBy(event.target.value));
    };

    return (
        <Grid xs={2} md={2} item >
            <FormControl variant="standard" fullWidth sx={{ minWidth: 60 }}>
                <Select value={selected} onChange={selectionChangeHandler}>
                    <MenuItem value={TEXT_DOWN}>text &#8595;</MenuItem>
                    <MenuItem value={TEXT_UP}>text &#8593;</MenuItem>
                    <MenuItem value={EXP_DATE_DOWN}>exp date &#8595;</MenuItem>
                    <MenuItem value={EXP_DATE_UP}>exp date &#8593;</MenuItem>
                </Select>
                <FormHelperText>sort by</FormHelperText>
            </FormControl>
        </Grid>
    )
}

export default SortItem;
