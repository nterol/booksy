import React, { Component } from "react";

import { MainContext } from "../pages/Main";
import Enlighter from "./Enlighter";
import Parser from "./Parser";
import Ratings from "./Ratings";
import "./styles/book.css";

class Book extends Component {
  state = {
    more: false
  };

  handleClickBook = () =>
    this.setState(({ more: prevMore }) => ({ more: !prevMore }));

  render() {
    const {
      item: { title, author, extract, subject = "", book },
      matches,
      score
    } = this.props.book;
    const { more } = this.state;
    return (
      <MainContext.Consumer>
        {({ search, select }) => (
          <div className="book-container">
            <div className="basic-info-container">
              {select === "title" ? (
                <h1 className="title">
                  <Enlighter select={select} search={search}>
                    {title}
                  </Enlighter>
                </h1>
              ) : (
                <h1 className="title"> {title}</h1>
              )}

              {select === "author" || select === "date" ? (
                <Enlighter select={select} search={search}>
                  {author}
                </Enlighter>
              ) : (
                <p className="author">{author}</p>
              )}
              {select === "subject" ? (
                <Enlighter select={select} search={search}>
                  {subject}
                </Enlighter>
              ) : (
                <p className="subject">{subject}</p>
              )}
            </div>
            <div className="trivia-container">
              Relevancy:
              <br />
              <Ratings score={score} />
            </div>
            {select === "all" && (
              <div className="highlights-container">
                <h2>Your research matches:&nbsp;</h2>

                {matches.map(({ higlights }, i) => (
                  <Parser key={`highlight-${i}`}>{higlights}</Parser>
                ))}
              </div>
            )}
            {more ? (
              <div className="summary-container">
                <h2 className="first-page-holder">First Page :</h2>
                <pre className="first-page">{book}</pre>
              </div>
            ) : (
              <div className="summary-container">
                <h2>Extract :</h2>
                <pre className="reader">{extract}</pre>
              </div>
            )}
            <button
              className="read-more"
              onClick={this.handleClickBook}
            >{`Read ${more ? "less" : "more"}`}</button>
          </div>
        )}
      </MainContext.Consumer>
    );
  }
}

export default Book;
