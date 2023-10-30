import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./Components/NavBar";
import BooksList from "./Components/BooksList";
import EditBook from "./Components/EditBook";
import AddBook from "./Components/AddBook";
import AuthorsList from "./Components/AuthorsList";
import AddAuthor from "./Components/AddAuthor";
import EditAuthor from "./Components/EditAuthor";
import NotFoundPage from "./Components/NotFoundPage";

// This the Main App Component

function App() {
  return (
    <div className="App">
      {/* Navigation Bar */}
      <NavBar />
      {/* All Required Routes path are assigned */}
      {/* This container is used to display the diff. types of pages loading using router */}
      {/* All Components all called when the link is clicked in the NavBar Component */}
      <Routes>
        <Route path="/" element={<BooksList />} />
        <Route path="/book-edit/:id" element={<EditBook />} />
        <Route path="/author-edit/:id" element={<EditAuthor />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/authors-list" element={<AuthorsList />} />
        <Route path="/add-author" element={<AddAuthor />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;