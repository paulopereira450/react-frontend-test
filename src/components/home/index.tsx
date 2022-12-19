import { InputAdornment, Pagination, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { withStyles } from "@mui/styles"
import { Search } from '@mui/icons-material';
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PropsComponents, Status } from "../../interfaces/utils";
import { changeItemsPerPage, changeSearchFilter, fetchData, getBooksState } from "../../redux/bookReducer";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { DEFAULT_ROUTE } from "../../utils/constants";
import { getNewPagePath, isNumericAndPositive } from "../../utils/utils";
import BooksLayout from "../books-layout";
import ItemsPerPageInput from "../utils/items-per-page-input";
import { styles } from "./styles";

const Home = (props: PropsComponents) => {
    const {
        classes
    } = props;

    const isMounted = useRef<boolean>(false);

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { count, itemsPerPage, searchFilter, data, status } = useAppSelector(getBooksState);

    const currentPage = location.pathname.split('/').pop() as string;

    const [searchInput, setSearchFilter] = useState<string>('');
    const [isTipping, setIsTipping] = useState<boolean>(false);

    const handleChangeLocation = useCallback(() => {
        const currentPage = location.pathname.split('/').pop() as string;

        if (!isNumericAndPositive(currentPage) || Number(currentPage) === 0) {
            navigate(DEFAULT_ROUTE);
            return;
        }

        dispatch(fetchData({ page: Number(currentPage) }));
    }, [dispatch, location, navigate]);

    // Handle location change
    useEffect(() => {
        handleChangeLocation();
    }, [location, handleChangeLocation]);

    const handleInvalidPageInterval = useCallback(() => {
        if (status === Status.INVALID_PAGE_INTERVAL) navigate(DEFAULT_ROUTE);
    }, [status, navigate]);

    // Handle invalid page interval
    useEffect(() => {
        handleInvalidPageInterval();
    }, [status, handleInvalidPageInterval]);

    // Handle search input
    // Only update data when user stops tiping
    useEffect(() => {
        if (!isMounted.current) return;

        if (!isTipping) setIsTipping(true);

        const delay = setTimeout(() => {
            if (searchInput !== searchFilter) dispatch(changeSearchFilter(searchInput));

            setIsTipping(false);
        }, 3000);

        return () => clearTimeout(delay);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchInput]);

    // Handle filter update
    // If one of this filters change fetch new data
    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;

            return;
        }
        navigate(DEFAULT_ROUTE);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemsPerPage, searchFilter]);

    const numberPages = Math.ceil(count / itemsPerPage);

    function handleChangeItemsPerPage(e: SelectChangeEvent<number>): void {
        dispatch(changeItemsPerPage(e.target.value as number));
    }

    function handleChangePage(_event: React.ChangeEvent<unknown>, page: number): void {
        navigate(getNewPagePath(page))
    }

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <Typography variant={"h4"} fontWeight={700}>Books</Typography>
                <TextField
                    size={"small"}
                    value={searchInput}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder={"Search for some data from a book"}
                    InputProps={{
                        className: classes.searchInput,
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        )
                    }}
                    disabled={status === Status.LOADING}
                />
            </div>
            {status === Status.FAILED ? (
                <div className={classes.errorRoot}>
                    <Typography variant={'h5'} color={"error"}>Unexpected error</Typography>
                </div>
            ) : (
                <BooksLayout
                    data={data}
                    isTipping={isTipping}
                    status={status}
                />
            )}
            <div className={classes.footer}>
                <Pagination
                    page={Number(currentPage)}
                    count={numberPages}
                    showFirstButton
                    showLastButton
                    onChange={handleChangePage}
                    disabled={isTipping || status === Status.LOADING}
                />
                <ItemsPerPageInput
                    value={itemsPerPage}
                    onChange={handleChangeItemsPerPage}
                    disabled={isTipping || status === Status.LOADING}
                />
            </div>
        </div>
    )
}

export default withStyles(styles)(Home);