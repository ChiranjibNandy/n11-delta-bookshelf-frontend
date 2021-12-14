import { createContext, useReducer } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
  Dashboard,
  Header,
  Footer,
  UserEntry,
  BookDetail,
  AdminHome,
  UserList,
  BookList,
} from "../components";
import { IAppContext, RootReducer } from "../reducers";
import styles from "./App.module.scss";

const initialAppState: IAppContext = {
  searchText: "",
  isUserLoggedIn: false,
  isSuperAdmin: false,
  userEntry: null,
  open: false,
  token: {},
};

export const AppContext = createContext(null);

function App() {
  const [appState, dispatchAppAction] = useReducer(
    RootReducer,
    initialAppState
  );

  return (
    <Router>
      <div className={styles.pageContainer}>
        <AppContext.Provider value={{ appState, dispatchAppAction }}>
          <Header />
          <div className={styles.wrapper}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/books/:id" element={<BookDetail />} />
              <Route path="/admin/home" element={<AdminHome />} />
              <Route path="/admin/users" element={<UserList />} />
              <Route path="/admin/books" element={<BookList />} />
            </Routes>
            {!!appState.userEntry && (
              <UserEntry showForm={appState.userEntry} />
            )}
          </div>
        </AppContext.Provider>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
