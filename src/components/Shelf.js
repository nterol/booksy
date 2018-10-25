import React from "react";

import Book from "./Book";
import "./styles/shelf.css";

const Shelf = ({ shelf }) => (
  <div className="shelf-container">
    {shelf.map(book => (
      <Book key={book.item.id} book={book} />
    ))}
  </div>
);

export default Shelf;
