import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 20,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalArticles: 0,
    };
    document.title = `${this.capital(this.props.category)} - NewsGeek`;
  }

  capital(word) {
    return word[0].toUpperCase() + word.slice(1);
  }

  async updateNews() {
    this.props.showProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&page=${this.state.page}&pageSize=${this.props.pageSize}&apiKey=${this.props.apiKey}`;
    const data = await fetch(url);
    this.props.showProgress(50);
    const parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false,
    });
    this.props.showProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  // handleNextPage = async () => {
  //   this.setState({
  //     page: this.state.page + 1,
  //   });
  //   this.updateNews();
  // };

  // handlePrevPage = async () => {
  //   this.setState({
  //     page: this.state.page - 1,
  //   });
  //   this.updateNews();
  // };

  fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&page=${this.state.page+1}&pageSize=${this.props.pageSize}&apiKey=${this.props.apiKey}`;
    const data = await fetch(url);
    const parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalArticles: parsedData.totalResults,
      page: this.state.page + 1,
    });
  };

  render() {
    return (
      <>
        <h1 className="my-4 text-center">{`NewsGeek - Top ${this.capital(
          this.props.category
        )} Headlines`}</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalArticles}
          loader={<Spinner />}
        >
          <div className="container">
        <div className="row">
          {this.state.articles.map((article) => {
              return (
                <div className="col-md-4" key={article.url}>
                  <NewsItem
                    title={article.title}
                    description={article.description}
                    imgUrl={article.urlToImage}
                    newsUrl={article.url}
                    publish={article.publishedAt}
                    author={article.author}
                    source={article.source.name}
                  />
                </div>
              );
            })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="my-4 d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1 ? true : false}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevPage}
          >
            ← Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalArticles / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextPage}
          >
            Next →
          </button>
        </div> */}
      </>
    );
  }
}

export default News;
