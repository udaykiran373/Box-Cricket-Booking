import React, { useState } from 'react';
import './SearchSection.css';
import 'boxicons/css/boxicons.min.css';

const SearchSection = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="search-section">
            <div>
                <h1 className="search-heading">
                    Book Top Sports Complexes in Hyderabad Online
                </h1>
            </div>

            <div className="search-input">
                <i className='bx bx-search-alt-2'></i>
                <input type="text" placeholder="Search by venue name" />
            </div>

            <div className="dropdown-menu">
                <button className="dropdown-button" onClick={toggleDropdown}>
                    <i class='bx bx-cricket-ball'></i>
                    Select Sport
                </button>
                {isOpen && (
                    <div className="dropdown-content">
                        <div className="dropdown-grid">
                            <div className="dropdown-item">All Sports</div>
                            <div className="dropdown-item">Football</div>
                            <div className="dropdown-item">Cricket</div>
                            <div className="dropdown-item">Basketball</div>
                            <div className="dropdown-item">Tennis</div>
                            <div className="dropdown-item">Badminton</div>
                            <div className="dropdown-item">Volleyball</div>
                            <div className="dropdown-item">Baseball</div>
                            <div className="dropdown-item">Hockey</div>
                            {/* Add more sports as needed */}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchSection;

