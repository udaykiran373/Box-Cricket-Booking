import React from 'react';
import Header from './partials/Header';
import Footer from './partials/Footer';
import './Home.css';
import SearchSection from './partials/SearchSection';
import Venue from './venue/Venue';
import PopularSports from './sports/PopularSports';
import FindPlayers from './findvenue/FindPlayers';
import BlogSection from './learn/BlogSection';
import News from './news/News';

const Home = () => {
  return (
    <div class="home">
      <Header />
      <SearchSection />
      <FindPlayers />
      <Venue />
      <News />
      <PopularSports />
      <BlogSection />
      <Footer />
    </div>
  );
};

export default Home;
