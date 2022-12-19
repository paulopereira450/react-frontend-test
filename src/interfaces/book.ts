export interface Book {
    id: number;
    book_author: Array<string>;
    book_title: string;
    book_publication_year: number;
    book_publication_country: string;
    book_publication_city: string;
    book_pages: number;
}

export interface FetchBookFilter {
    type: string;
    values: Array<string>;
}

export const validItemsPerPage = [20, 40, 80, 160, 320]

export function isValidItemsPerPage(itemsPerPage: number): boolean {
    return validItemsPerPage.includes(itemsPerPage);
}