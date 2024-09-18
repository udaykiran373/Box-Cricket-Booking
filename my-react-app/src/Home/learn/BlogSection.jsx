// BlogSection.jsx
import React from 'react';
import BlogCard from './BlogCard';
import './BlogSection.css'; // Add specific styling for BlogSection if needed

const BlogSection = () => {
  const blogs = [
    {
      image: 'VolleyballRule.jpg',
      title: 'Learn Volleyball in 5!',
      description: 'The most simplified Volleyball manual...',
      date: 'SEPTEMBER 26, 2018',
      author: 'PLAYO'
    },
    {
      image: 'CricketRule.jpg',
      title: 'Names Celebrated by Cricket!',
      description: 'Understand what it takes to become...',
      date: 'MARCH 3, 2016',
      author: 'SHERYL THOMAS'
    },
    {
      image: 'BatmintonRules.png',
      title: 'Easy-to-Learn Badminton Hand Signals',
      description: 'Get a peek of game-basics that’ll ...',
      date: 'AUGUST 2, 2019',
      author: 'NIDHI PATEL'
    },
    {
      image: 'FootballRule.png',
      title: 'Take Football Shots Like a Pro!',
      description: 'Learn what it takes to master popula...',
      date: 'APRIL 15, 2017',
      author: 'ARJUN THOMAS'
    }
  ];

  return (
    <div className="blog-section">
        <div className='flexconatiner'>
        <h1>Learn Your  Favorite Sport!</h1>
        <a href='#' className='textdecoration'><p>See All</p></a>
        </div>
        <h4 className='para'>Explore our Leaning posts to gain insights and improve your skills in various sports. 
            Whether you're a beginner or an experienced athlete, you'll find valuable tips and guides to elevate your game.
        </h4>
      <div className="blog-container">
        {blogs.map((blog, index) => (
          <BlogCard
            key={index}
            image={blog.image}
            title={blog.title}
            description={blog.description}
            date={blog.date}
            author={blog.author}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
