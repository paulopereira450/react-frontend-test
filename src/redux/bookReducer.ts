import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchBooks } from '../fetch/books';
import { Book } from '../interfaces/book';
import { Status } from '../interfaces/utils';
import { getItemsPerPageFromStorage, setItemsPerPage } from '../utils/utils';
import { RootState } from './store';

export interface BookState {
  data: Array<Book>;
  count: number;
  status: Status;
  itemsPerPage: number;
  searchFilter: string;
}

const initialState: BookState = {
  data: [],
  count: 0,
  status: Status.IDLE,
  itemsPerPage: getItemsPerPageFromStorage(),
  searchFilter: ''
};

export const fetchData = createAsyncThunk(
  'books/fetchData',
  async (data: { page: number }, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const response = await fetchBooks(
      data.page, 
      state.books.itemsPerPage, 
      [{ type: "all", values: [state.books.searchFilter]}],
    );
    
    // Check if user selected a page out of the interval page
    if(response && response.books.length === 0 && response.count !== 0) {
      return rejectWithValue(Status.INVALID_PAGE_INTERVAL)
    }

    return response;
  }
);

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    changeItemsPerPage: (state, action: PayloadAction<number>) => {
      setItemsPerPage(action.payload);
      state.itemsPerPage = action.payload;
    },
    changeSearchFilter: (state, action: PayloadAction<string>) => {
      state.searchFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        return {
          ...state,
          status: Status.LOADING
        }
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        return {
          ...state,
          status: Status.IDLE,
          count: action.payload.count,
          data: action.payload.books
        }
      })
      .addCase(fetchData.rejected, (state, action) => {
        return {
          ...state,
          status: action.payload ? action.payload as Status : Status.FAILED
        }
      });
  },
});
export const getBooksState = (state: RootState) => state.books;

export const { changeItemsPerPage, changeSearchFilter } = bookSlice.actions;

export default bookSlice.reducer;
