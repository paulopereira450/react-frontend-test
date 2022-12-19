import { createStyles } from "@mui/styles";

export const styles = () => createStyles({
    card: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexFlow: 'column'
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '16px !important'
    }
})