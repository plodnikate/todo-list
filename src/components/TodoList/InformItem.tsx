import { ListItem, ListItemText } from '@material-ui/core';
import { Typography } from '@mui/material';

const InformItem = () => {
    return (
        <ListItem>
            <ListItemText>
                <Typography textAlign='center'>
                    NO ITEMS
                </Typography>
            </ListItemText>
        </ListItem>
    )
}
export default InformItem;
