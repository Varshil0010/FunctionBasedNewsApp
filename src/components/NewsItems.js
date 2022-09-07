import React from 'react'

const NewsItems = (props) => {
    let { title, description, imageurl, newsurl, author, date } = props
    return (
        <div className="my-3">
            <div className="card" style={{ width: "18rem;" }}>
                <img src={!imageurl ? "https://images.indianexpress.com/2022/08/James-Webb-Telescope-phantom-galaxy-20220830.jpg" : imageurl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">By {!author ? "unknown" : author} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsurl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItems
