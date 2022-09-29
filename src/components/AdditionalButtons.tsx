import { Button, Grid } from '@material-ui/core';
import { FC } from 'react';
import { useAppDispatch } from '../hooks';
import { changeTab, removeCompletedTodo } from '../store/todoSlice';
import { SELECTED_ALL, SELECTED_ACTIVE, SELECTED_COMPLITED } from '../constants';

interface AdditionaButtons {
    showTab: string;
}

const AdditionalButtons: FC<AdditionaButtons> = ({ showTab }) => {
    const dispatch = useAppDispatch();

    const switchTab = (selectItems: string) => {
        dispatch(changeTab(selectItems));
    };

    const removeCompletedItem = () => {
        dispatch(removeCompletedTodo());
    };

    const getColor = (selectItems: string) => {
        return showTab === selectItems ? 'default' : 'primary';
    };

    return (
        <Grid container>
            <Grid xs={2} md={1} item>
                <Button
                    color={getColor(SELECTED_ALL)}
                    fullWidth
                    onClick={() => { switchTab(SELECTED_ALL) }}
                >
                    All
                </Button>
            </Grid>
            <Grid xs={2} md={2} item>
                <Button
                    color={getColor(SELECTED_COMPLITED)}
                    fullWidth
                    onClick={() => { switchTab(SELECTED_COMPLITED) }}
                >
                    Completed
                </Button>
            </Grid>
            <Grid xs={2} md={1} item>
                <Button
                    color={getColor(SELECTED_ACTIVE)}
                    fullWidth
                    onClick={() => { switchTab(SELECTED_ACTIVE) }}>

                    Active
                </Button>
            </Grid>
            <Grid xs={2} md={3} item>
                <Button color='primary'
                    fullWidth
                    onClick={removeCompletedItem}
                >
                    Clear completed
                </Button>
            </Grid>
        </Grid>
    )

}

export default AdditionalButtons;
