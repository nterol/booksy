import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "../components/styles/book.css";
import "../components/styles/nav.css";

class BookPage extends Component {
  state = {
    book: {}
  };

  async componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const {
      REACT_APP_API_KEY: apiKey,
      REACT_APP_CONTENT_QUERY: contentQuery
    } = process.env;
    try {
      const { data } = await axios.request({
        url: `${contentQuery}${id}`,
        headers: {
          "x-api-key": apiKey
        },
        method: "get"
      });

      this.setState({ book: { ...data } });
    } catch (e) {}
  }

  render() {
    const {
      book: { title, author, subject, downloads, book }
    } = this.state;
    console.log(this.state);
    return (
      <div className="book-page-container">
        <div className="back-container">
          <Link to="/">
            <div id="back" className={`arrow back-arrow-page `} />
          </Link>
          <div className="back-page-holder">Back to search page</div>
        </div>
        <div className="book-container">
          <div className="basic-info-container">
            <h1 className="title"> {title}</h1>
            <p className="author">{author}</p>
            <p className="subject">
              <p className="subject-holder">Subject:</p>
              {subject}
            </p>
          </div>
          <div className="downloads">{downloads}</div>
          <div className="summary-container">
            <h2 className="first-page-holder">First Page :</h2>
            <pre className="first-page">{book}</pre>
          </div>
        </div>
      </div>
    );
  }
}

export default BookPage;
