import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box'; 

export default function UserCombobox({ selectedUser, handleChangeSelectedUser, users }) {

    return (
        <Box sx={{
            my: 1, display: 'flex', alignItems: 'center', width: '100%',
            borderRadius: 1, bgcolor: 'background.paper'
        }} >
            <FormControl fullWidth >
                <InputLabel id="user-to-show-label">User to show</InputLabel>
                <Select
                    labelId="user-to-show-label"
                    id="user-to-show"
                    value={selectedUser}
                    label="User to show"
                    onChange={handleChangeSelectedUser}>
                    {users.map((user) => (
                        <MenuItem key={user} value={user} >
                            {user}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}