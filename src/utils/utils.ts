import { isValidItemsPerPage } from "../interfaces/book";
import { DEFAULT_ITEMS_PER_PAGE } from "./constants";

export function isNumericAndPositive(val: string): boolean {
    return /^-?\d+$/.test(val) && Number(val) >= 0;
}

export function getNewPagePath(page: number): string {
    return `/books/${page.toString()}`
}

export function getItemsPerPageFromStorage(): number {
    const itemsPerPage = localStorage.getItem("itemsPerPage");
    if(!itemsPerPage || !isNumericAndPositive(itemsPerPage) || !isValidItemsPerPage(Number(itemsPerPage))) {
      setItemsPerPage(DEFAULT_ITEMS_PER_PAGE);
      return DEFAULT_ITEMS_PER_PAGE;
    }
  
    return Number(itemsPerPage);
  }
  
  export function setItemsPerPage(itemsPerPage: number) {
    localStorage.setItem("itemsPerPage", itemsPerPage.toString());
  }