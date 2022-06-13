import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setpage] = useState(1)
  const [totalArticles, settotalArticles] = useState(0)

  const capital = (word) => {
    return word[0].toUpperCase() + word.slice(1);
  }

  const updateNews = async () => {
    props.showProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&page=${page}&pageSize=${props.pageSize}&apiKey=${props.apiKey}`;
    const data = await fetch(url);
    props.showProgress(50);
    const parsedData = await data.json();
    // document.title = `${capital(props.category)} - NewsGeek`;
    setarticles(parsedData.articles)
    settotalArticles(parsedData.totalResults)
    setloading(false)
    props.showProgress(100);
  }

  useEffect(() => {
    updateNews();
  }, [])

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

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&page=${page+1}&pageSize=${props.pageSize}&apiKey=${props.apiKey}`;
    const data = await fetch(url);
    const parsedData = await data.json();
    setarticles(articles.concat(parsedData.articles))
    settotalArticles(parsedData.totalResults)
    setpage(page + 1)
  };

    return (
      <>
        <h1 className="my-4 text-center">{`NewsGeek - Top ${capital(
          props.category
        )} Headlines`}</h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalArticles}
          loader={<Spinner />}
        >
          <div className="container">
        <div className="row">
          {articles.map((article) => {
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

News.defaultProps = {
    country: "in",
    pageSize: 20,
    category: "general",
  };

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

export default News;
