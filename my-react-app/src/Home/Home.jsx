import React from 'react';
import Header from './partials/Header';
import Footer from './partials/Footer';
import './Home.css';
import SearchSection from './partials/SearchSection';
import Venue from './venue/Venue';

const Home = () => {
  return (
    <div class="home">
      <Header />
      <SearchSection />
      <main>
        {/* Add content for Home here */}
        <Venue />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
