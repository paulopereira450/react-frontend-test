import { render, screen } from '@testing-library/react';
import BooksLayout from './index';
import provideTheme from '../../tests/provideTheme';
import { Status } from '../../interfaces/utils';
import { Book } from '../../interfaces/book';

const defaultBook: Book = {
    id: 0,
    book_author: ["test test"],
    book_title: "test",
    book_publication_year: 2022,
    book_publication_country: "Portugal",
    book_publication_city: "Lisbon",
    book_pages: 1000,
}

describe('Books layout', () => {
  it('Component render', () => {
    render(provideTheme(<BooksLayout data={[]} status={Status.IDLE} isTipping={false}/>));
    const element = document.getElementById('bookLayoutRoot');
    expect(element).toBeInTheDocument();
  });

  it('Loading state', () => {
    render(provideTheme(<BooksLayout data={[]} status={Status.LOADING} isTipping={false}/>));
    const element = screen.getByRole('progressbar');
    expect(element).toBeInTheDocument();
  });

  it('Tipping loading state', () => {
    render(provideTheme(<BooksLayout data={[]} status={Status.IDLE} isTipping={true}/>));
    const element = screen.getByRole('progressbar');
    expect(element).toBeInTheDocument();
  });

  it('No books found', () => {
    render(provideTheme(<BooksLayout data={[]} status={Status.IDLE} isTipping={false}/>));
    const element = screen.getByText('No books found');
    expect(element).toBeInTheDocument();
  });

  it('Show one book', () => {
    render(provideTheme(<BooksLayout data={[defaultBook]} status={Status.IDLE} isTipping={false}/>));
    const element = screen.getByTestId('book-title');
    expect(element).toBeInTheDocument();
  });

  it('Show multiple books', () => {
    render(provideTheme(<BooksLayout data={[...Array(20)].map((k) => ({...defaultBook, id: k}))} status={Status.IDLE} isTipping={false}/>));
    const elements = screen.getAllByTestId('book-title')
    expect(elements).toHaveLength(20);
  });
});
