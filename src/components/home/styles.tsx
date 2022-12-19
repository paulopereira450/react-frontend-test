import { Theme } from "@mui/material";
import { createStyles } from "@mui/styles";

export const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        width: '100%',
        maxWidth: '100%',
        maxHeight: '100%',
        padding: '20px 40px',
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
            padding: '20px 20px',
        },
        flexDirection: 'column',
        backgroundColor: theme.palette.background.default
    },
    header: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        marginBottom: '10px',
        [theme.breakpoints.down('sm')]: {
            flexFlow: 'column'
        },
    },
    searchInput: {
        minWidth: 310,
        [theme.breakpoints.down('sm')]: {
            minWidth: 'unset'
        },
    },
    footer: {
        display: 'flex',
        width: '100%',
        marginTop: '15px',
        alignItems: 'center',
        justifyContent: 'right'
    },
    errorRoot: {
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
})