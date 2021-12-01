import {Filter} from "../shared/enums";
import {DASHBOARD_ACTIONS} from "../shared/immutables";

export const DashboardReducer = (state, action) => {
  const newState = {...state, isLoading: true};
  switch (action.type) {
    case DASHBOARD_ACTIONS.SET_ALL_BOOKS:
      newState.books = action.data;
      newState.filteredBooks = action.data;
      break;
    case DASHBOARD_ACTIONS.FILTER_BOOKS:
      if (!!action.searchOn) {
        newState.filteredBooks = newState.books.filter((book) =>
          book.name
            .toLowerCase()
            .includes(action.searchOn.toLowerCase())
        );
      } else {
        newState.filteredBooks = newState.books;
      }
      break;
    case DASHBOARD_ACTIONS.SORT_FILTER:
      newState.sortFilter = action.data;
      if (newState.sortFilter === Filter.PRICE_LOW_TO_HIGH) {
        newState.filteredBooks.sort(
          (bookA, bookB) => bookA.price - bookB.price
        );
      } else if (newState.sortFilter === Filter.PRICE_HIGH_TO_LOW) {
        newState.filteredBooks.sort(
          (bookA, bookB) => bookB.price - bookA.price
        );
      } else {
        newState.filteredBooks.sort((bookA, bookB) => bookA.id - bookB.id);
      }
      break;
    default:
    // do nothing
  }
  newState.isLoading = false;
  return newState;
};