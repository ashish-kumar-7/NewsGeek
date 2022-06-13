import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imgUrl, newsUrl, publish, author, source } = this.props;
    return (
      <div>
        <div className="card my-3">
          <div style={{display: "flex", justifyContent: "flex-end", position: "absolute", right: "0"}}>
          <span className="badge rounded-pill bg-danger" >
            {source}
            <span className="visually-hidden">unread messages</span>
          </span>
          </div>
          <img
            src={
              imgUrl
                ? imgUrl
                : "https://media.istockphoto.com/photos/safety-concept-opened-padlock-on-digital-background-picture-id466487479?k=20&m=466487479&s=612x612&w=0&h=M9YndzncWKvZEFqsYhPyrgkp2l_wumpf7cBePsMlwMI="
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <br />
            <p className="card-text">
              <small className="text-muted">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(publish).toGMTString()}
              </small>
            </p>
            <a href={newsUrl} target="blank" className="btn btn-sm btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
