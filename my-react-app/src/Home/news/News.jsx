import React from 'react';
import './News.css'; // Import the CSS file

const News = () => {
  return (
    <div className="news-container">
      <div className="news">
        <h3 className='heading2'>Latest News</h3>
        <div className='flexcontainer'>
        <div className='side'>
        <h3 className="news-title">Stay Updated with the Latest Headlines:</h3>
        <h3 className="news-subtitle">Your Daily News Digest!</h3>
        <button className="news-button">Read More</button>
        </div>
        <div>
        <div className="news-img">
          <img src="sportNews.jpg" alt="Latest News"/>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
};

export default News;
