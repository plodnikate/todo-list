import { Grid } from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import TextField from '@mui/material/TextField';
import { FC, ChangeEvent, useState } from 'react';
import { SPECIAL_SYMBOLS_REGEX } from '../../constants/constants';

interface SearchBar {
    searchText: string,
    setText: (text: string) => void;
}

const SearchBar: FC<SearchBar> = ({ searchText, setText }) => {
    const [error, setError] = useState("");

    const hangeSearchTextHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!e.target.value.match(SPECIAL_SYMBOLS_REGEX)) {
            setError("");
        } else {
            setError("no special symbols allowed");
        }
        setText(e.target.value);
    }

    return (
        <Grid item xs={12} md={12} container className="grid search_bar">
            <TextField variant="standard"
                helperText={error}
                error={!!error}
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
