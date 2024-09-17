import React from 'react';
import Header from './partials/Header';
import Footer from './partials/Footer';
import './Home.css';
import SearchSection from './partials/SearchSection';
import Venue from './venue/Venue';
import PopularSports from './sports/PopularSports';

const Home = () => {
  return (
    <div class="home">
      <Header />
      <SearchSection />
      <Venue />
      <PopularSports />
      <Footer />
    </div>
  );
};

export default Home;
