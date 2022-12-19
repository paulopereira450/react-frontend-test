import { Book, FetchBookFilter } from "../interfaces/book";
import { API_URL } from "../utils/constants";

export function fetchBooks(page: number, itemsPerPage: number, filters?: Array<FetchBookFilter>) {
    return new Promise<{ books: Array<Book>, count: number}>((resolve, reject) => {
        return fetch(`${API_URL}/books`, {
            method: 'post',
            body: JSON.stringify({
                page,
                itemsPerPage,
                filters
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (!response.ok) {
                reject(new Error(response.statusText))
            }
            return response.json();
        }).then((response) => {
            resolve(response)
        }).catch((err: Error) => {
            reject(err)
        })
    })
}