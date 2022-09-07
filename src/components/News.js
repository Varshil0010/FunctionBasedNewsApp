import React, { useEffect, useState } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, settotalResults] = useState(0)

    const updateNews = async () => {
        props.setProgress(0);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=78fd5c3ec0d14f47872003b431f8f61c&page=1&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setArticles(parsedData.articles);
        settotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }

    useEffect(() => {
        updateNews();
    }, [])


    // const previousPage = async () => {
    //     // props.setProgress(0);
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=78fd5c3ec0d14f47872003b431f8f61c&page=${setPage(page - 1)}&pageSize=${props.pageSize}`;
    //     // setLoading(true);
    //     // let data = await fetch(url);
    //     // let parsedData = await data.json();
    //     // console.log(parsedData);
    //     // setArticles(parsedData.articles)
    //     // settotalResults(parsedData.totalResults);
    //     // setLoading(false);
    //     // props.setProgress(100);


    //     // this.setState({ page: this.state.page - 1 });
    //     setPage(page - 1);
    //     updateNews();
    // }

    // const nextPage = async () => {
    //     // if (!(page + 1 > Math.ceil(totalResults / props.pageSize))) {
    //     //     props.setProgress(0);
    //     //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=78fd5c3ec0d14f47872003b431f8f61c&page=${setPage(page + 1)}&pageSize=${props.pageSize}`;
    //     //     setLoading(true);
    //     //     let data = await fetch(url);
    //     //     let parsedData = await data.json();
    //     //     setArticles(parsedData.articles);
    //     //     settotalResults(parsedData.totalResults);
    //     //     setLoading(false);
    //     //     props.setProgress(100); // Loading bar

    //     // }
    //     // this.setState({ page: this.state.page + 1 });
    //     setPage(page + 1);
    //     updateNews();
    // }

    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=78fd5c3ec0d14f47872003b431f8f61c&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page + 1);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles))
        settotalResults(parsedData.totalResults)
    };


    return (
        <div className="container my-3">
            <h1 className="text-center" style={{margin: '35px 0px', marginTop: '90px'}}>NewsMonkey - Top Headlines on {props.category} </h1>
            {loading && <Spinner />}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >

                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItems title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageurl={element.urlToImage}
                                    newsurl={element.url} author={element.author} date={element.publishedAt} />
                            </div>
                        })}

                    </div>
                </div>

            </InfiniteScroll>
            {/* <div className='container d-flex justify-content-between'>
                <button disabled={page <= 1} type="button" class="btn btn-dark" onClick={previousPage}>&larr; Previous</button>
                <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" class="btn btn-dark" onClick={nextPage}>Next &rarr;</button>
            </div> */}
        </div>
    )

}

// To make different category in the Navbar
News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
