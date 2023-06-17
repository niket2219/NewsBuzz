import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(false);
  const [page, setpage] = useState(1);
  const [total, settotal] = useState(0);
  const [totalResults, settotalResults] = useState(0);

  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/everything?q='${props.category}'&apiKey=08bb07fa18314df782b3a721c2f05b7d&pageSize=8&page=${page}`;
    setloading(true);
    props.setProgress(30);
    let data = await fetch(url);
    let parsedData = await data.json();
    props.setProgress(60);
    let filtData = parsedData.articles.filter((e) => {
      return e.urlToImage != null;
    });
    let noOfPages = Math.ceil(parsedData.totalResults / 8);
    setarticles(filtData);
    settotal(noOfPages);
    setloading(false);
    settotalResults(filtData.totalResults);
    props.setProgress(100);
  };

  useEffect(() => {
    updateNews();
    document.title = `NewsBuzz__${props.category}`;
  }, []);

  const fetchMoreData = async () => {
    setpage(page + 1);
    let url = `https://newsapi.org/v2/everything?q='${
      props.category
    }'&apiKey=08bb07fa18314df782b3a721c2f05b7d&pageSize=8&page=${page + 1}`;
    setloading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    let filtData = parsedData.articles.filter((e) => {
      return e.urlToImage != null;
    });
    let noOfPages = Math.ceil(parsedData.totalResults / 8);
    setarticles(articles.concat(filtData));
    settotal(noOfPages);
    setloading(false);
    settotalResults(filtData.totalResults);
  };

  return (
    <>
      <h1
        className="text-center"
        style={{ marginTop: "72px", marginBottom: "19px" }}
      >
        Top {props.category} Headlines
      </h1>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={page !== 11}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles &&
              articles.map((element, index) => {
                return (
                  <div className="col-md-3 my-2 mx-0.5" key={index}>
                    <Newsitem
                      title={
                        element.title.length > 50
                          ? element.title.slice(0, 50)
                          : element.title
                      }
                      description={
                        element.description.length > 50
                          ? element.description.slice(0, 50)
                          : element.description
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author ? element.author : "Unknown"}
                      publishedAt={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "in",
  pagesize: 8,
};
News.propTypes = {
  country: PropTypes.string,
  pagesize: PropTypes.number,
};

export default News;
