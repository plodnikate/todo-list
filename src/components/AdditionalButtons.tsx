import { Button, Grid } from '@material-ui/core';
import { FC } from 'react';
import { useAppDispatch } from '../hooks';
import { changeTab, removeCompletedTodo } from '../store/todoSlice';
import { SelectAll, SelectActive, SelectCompleted } from '../constants';

interface AdditionaButtons{
    showTab:string;
}

const AdditionalButtons: FC<AdditionaButtons> = ({showTab}) => {
    const dispatch = useAppDispatch();
    return (
        <Grid container>
            <Grid xs={2} md={1} item>
                <Button color={showTab === SelectAll ? 'default' : 'primary'}
                    fullWidth 
                    onClick={() => {dispatch(changeTab(SelectAll))}}>
                        All
                </Button>
            </Grid>
            <Grid xs={2} md={2} item>
                <Button color={showTab === SelectCompleted ? 'default' : 'primary'}
                    fullWidth 
                    onClick={() => {dispatch(changeTab(SelectCompleted))} }>
                        Completed
                </Button>
            </Grid>
            <Grid xs={2} md={1} item>
                <Button color={showTab === SelectActive ? 'default' : 'primary'}
                    fullWidth 
                    onClick={() => {dispatch(changeTab(SelectActive))}}>
                        Active
                </Button>
            </Grid>
            <Grid xs={2} md={3} item>
                <Button color='primary'
                    fullWidth 
                    onClick={() => {dispatch(removeCompletedTodo())}}>
                        Clear completed
                </Button>
            </Grid>
        </Grid>
    )

}

export default AdditionalButtons;