import { Grid } from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import TextField from '@mui/material/TextField';
import { FC, ChangeEvent } from 'react';

interface SearchBar {
    searchText: string,
    setText: (text: string) => void;
}

const SearchBar: FC<SearchBar> = ({ searchText, setText }) => {
    const hangeSearchTextHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setText(e.target.value);
    }

    return (
        <Grid xs={12} md={12} container className="grid search_bar">
            <TextField variant="standard"
                value={searchText} fullWidth
                onChange={hangeSearchTextHandler}
                placeholder='search' InputProps={{
                    startAdornment: (
                        <Search color='primary' />
                    ),
                }}
            />
        </Grid>
    )
}
export default SearchBar;
