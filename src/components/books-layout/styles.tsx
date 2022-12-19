import { Theme } from "@mui/material";
import { createStyles } from "@mui/styles";

export const styles = (theme: Theme) => createStyles({
    root: {
        display: 'contents',
        height: '100%'
    },
    rootGrid: {
        height: 'auto',
        overflow: 'hidden auto',
        paddingRight: '16px',
        paddingBottom: '2px',
        margin: '0px 0px auto 0px !important',
        position: 'relative',
        
        '&::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.3)',
            borderRadius: '8px',
            backgroundColor: '#F5F5F5'
        },
        '&::-webkit-scrollbar': {
            width: '8px',
            backgroundColor: '#F5F5F5'
        },
        '&::-webkit-scrollbar-thumb': {
            borderRadius: '8px',
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,.3)',
            backgroundColor: '#b3b3b3'
        },

        [theme.breakpoints.up('md')]: {
            '&>*:nth-child(-n+4)': {
                paddingTop: '0px !important'
            },
        },
        [theme.breakpoints.up('sm')]: {
            '&>*:nth-child(-n+2)': {
                paddingTop: '0px !important'
            },
        },
        [theme.breakpoints.up('xs')]: {
            '&>*:first-child': {
                paddingTop: '0px !important'
            },
        }
    },
    rootGridTipping: {
        opacity: 0.3
    },
    loading: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        margin: 'auto',
        color: '#000000 !important',
        zIndex: 1
    },
    book: {
        display: 'flex'
    },
    noBooksFoundTexts: {
        textDecoration: 'underline',
        fontWeight: '700 !important'
    }
})