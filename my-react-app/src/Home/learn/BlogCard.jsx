// BlogCard.jsx
import React from 'react';
import './BlogCard.css'; // Add specific styling for BlogCard if needed

const BlogCard = ({ image, title, description, date, author }) => {
  return (
    <div className="blog-card">
      <div className="blog-image-container">
        <img src={image} alt={title} className="blog-image" />
      </div>
      <div className="blog-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <p className="blog-meta">{date} | {author}</p>
      </div>
    </div>
  );
};

export default BlogCard;
