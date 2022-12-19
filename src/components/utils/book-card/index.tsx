import { Box, Card, CardContent, Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import { Book } from "../../../interfaces/book";
import { PropsComponents } from "../../../interfaces/utils";
import { styles } from "./styles";

interface OwnProps {
    book: Book;
}

type Props = PropsComponents & OwnProps;

const BookCard = (props: Props) => {
    const {
        classes,
        book,
    } = props;

    return (
        <Card variant="outlined" className={classes.card}>
            <CardContent className={classes.cardContent}>
                <Typography fontWeight={'bold'} data-testid="book-title">
                    {book.book_title}
                </Typography>
                <Typography variant="body2" style={{ marginTop:'auto', marginBottom: 0}}>
                    <Box sx={{ fontWeight: 'bold' }} component={"span"}>Author: </Box>{book.book_author}
                </Typography>
                <Typography variant="body2">
                    <Box sx={{ fontWeight: 'bold' }} component={"span"}>Publication year: </Box>{book.book_publication_year}
                </Typography>
                <Typography variant="body2">
                    <Box sx={{ fontWeight: 'bold' }} component={"span"}>Number of pages: </Box>{book.book_pages}
                </Typography>
                <Typography variant="body2" textAlign={'right'}>
                    {`${book.book_publication_city}, ${book.book_publication_country}`}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default withStyles(styles)(BookCard);