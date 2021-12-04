import {Button, MenuItem, Select} from "@material-ui/core";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import {Grid} from "@mui/material";
import axios from "axios";
import {useContext, useEffect, useReducer} from "react";

import {AppContext} from "../../App/App";
import banner from "../../assets/banner.svg";
import {DUMMY_BOOKS_DATA} from "../../dummy-data";
import {DashboardReducer} from "../../reducers";
import {Overlay} from "../../shared/components";
import {Filter} from "../../shared/enums";
import {DASHBOARD_ACTIONS} from "../../shared/immutables";
import {Book} from "../../shared/models";
import {BookCard} from "../BookCard/BookCard";
import styles from "./Dashboard.module.scss";

const emptyBooksList: Book[] = [];

const initialDashboardState = {
  books: emptyBooksList,
  filteredBooks: emptyBooksList,
  isLoading: true,
  sortFilter: Filter.RELEVANCE,
};

export const Dashboard = () => {
  const {
    appState: {searchText},
  } = useContext(AppContext);
  const [state, dispatch] = useReducer(DashboardReducer, initialDashboardState);

  const handleChange = (event) => {
    dispatch({
      type: DASHBOARD_ACTIONS.SORT_FILTER,
      data: event.target.value,
    });
  };

  function setDummyDataToBooks() {
    dispatch({type: DASHBOARD_ACTIONS.SET_ALL_BOOKS, data: DUMMY_BOOKS_DATA});
  }

  function getAllBooks() {
    axios
      .get("")
      .then((success) => {
        setDummyDataToBooks();
      })
      .catch(() => {
        setDummyDataToBooks();
      });
  }

  useEffect(() => {
    if (!state.books.length) {
      getAllBooks();
    }
    dispatch({
      type: DASHBOARD_ACTIONS.FILTER_BOOKS,
      searchOn: searchText,
    });
  }, [searchText]);

  const {isLoading, sortFilter, filteredBooks} = state;

  const booksGrid = (
    <Grid container className={styles.booksGrid} spacing={2}>
      {filteredBooks.map((book) => (
        <Grid key={book.id.toString()} item xs={3}>
          <BookCard book={book} />
        </Grid>
      ))}
    </Grid>
  );

  return (
    <>
      <img src={banner} alt="banner" className={styles.banner} />
      {isLoading ? (
        <div style={{minHeight: "256px"}}>
          <Overlay showBackdrop={true} />
        </div>
      ) : (
        <>
          <div className={styles.toolbar}>
            <Button
              disabled
              className={styles.filterBtn}
              startIcon={<FilterAltOutlinedIcon />}
            />
            <Select
              variant="standard"
              labelId="sort-by-select-label"
              id="sort-by"
              value={sortFilter}
              label="Sort by"
              onChange={handleChange}
            >
              <MenuItem value={Filter.RELEVANCE}>Relevance</MenuItem>
              <MenuItem value={Filter.PRICE_LOW_TO_HIGH}>
                Price - Low to High
              </MenuItem>
              <MenuItem value={Filter.PRICE_HIGH_TO_LOW}>
                Price - High to Low
              </MenuItem>
            </Select>
          </div>
          {filteredBooks && booksGrid}
        </>
      )}
    </>
  );
};