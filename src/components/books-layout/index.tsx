import { CircularProgress, Grid, Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import { useEffect } from "react";
import { Book } from "../../interfaces/book";
import { PropsComponents, Status } from "../../interfaces/utils";
import BookCard from "../utils/book-card";
import { styles } from "./styles";

interface OwnProps {
    data: Array<Book>;
    isTipping: boolean;
    status: Status;
}

type Props = PropsComponents & OwnProps;

const BooksLayout = (props: Props) => {
    const {
        classes,
        data,
        isTipping,
        status,
    } = props;

    useEffect(() => {
        (document.getElementById("bookLayoutRoot") as HTMLDivElement).scrollTop = 0;
    }, [data]);

    const noBooksFound = data.length === 0; 
    const showProgress = isTipping || status === Status.LOADING;

    return (
        <>
            {showProgress && <CircularProgress classes={{ root: classes.loading }} size={100} />}
            <Grid
                id={"bookLayoutRoot"}
                container
                rowSpacing={{ xs: 1, sm: 2, md: 3 }}
                columnSpacing={{ xs: 0, sm: 1, md: 2 }}
                classes={{ root: `${classes.rootGrid} ${showProgress ? classes.rootGridTipping : ""}` }}
                alignItems={'stretch'}
                height={noBooksFound ? '100%' : undefined}
            >
                {noBooksFound && status === Status.IDLE ? (
                    <Grid item xs={12} alignSelf={'center'} textAlign={'center'}>
                        <Typography variant={"h5"} className={classes.noBooksFoundTexts}>No books found</Typography>
                    </Grid>
                ) : data.map((book, idx) => (
                    <Grid item key={idx} xs={12} sm={6} md={3} className={classes.book}>
                        <BookCard book={book} />
                    </Grid>))}
            </Grid>
        </>
    )
}

export default withStyles(styles)(BooksLayout);