import React from 'react';
import styles from './AboutUs.module.css'; // Import CSS module
import ground1 from './ground2.avif'; // Assuming the image is in the same folder
import cricketGroundImage from './Screenshot 2024-09-22 194802.png'; // Add your new image path here

const AboutUs = () => {
    return (
        <div className={styles.aboutUsContainer}>
            <h1 className={styles.mainHeading}>ABOUT BOX PLAY</h1> {/* Main heading on top */}
            <div className={styles.aboutUsContent}>
                <div className={styles.textSection}>
                    <p className={styles.bigIntro}>
                        <strong>Box Play is the world's best sports activities enabler.</strong>
                    </p>
                    <p className={styles.intro}>
                        We are a one-stop platform to help sports enthusiasts meet playpals, discover venues, skill-up their game, 
                        manage their activities seamlessly, and buy gear.
                    </p>
                    <p className={styles.mission}>
                        Our goal is to create a welcoming space for all cricket lovers. From casual matches to competitive leagues, 
                        we strive to deliver a top-tier playing experience.
                    </p>
                </div>
                
                <div className={styles.imageSection}>
                    <img src={ground1} alt="Cricket Ground" className={styles.groundImage}/>
                </div>
            </div>

           

            {/* New Section with the Uploaded Content */}
            <div className={styles.venueSection}>
                <div className={styles.venueImageWrapper}>
                    <img src={cricketGroundImage} alt="Indoor Cricket Ground" className={styles.venueImage} />
                </div>
                <div className={styles.venueText}>
                    <h2>Discovering a World of Sports Venues</h2>
                    <p>
                        Book My Sport opens the door to a vast array of sports venues, from cricket fields  to well-maintained 
                       . The app's intuitive interface allows users to explore various sporting options within 
                        their vicinity, providing key insights about each facility. From location and amenities to pricing, users can make informed 
                        decisions based on the real experiences of other sports enthusiasts.
                    </p>
                </div>
            </div>
            <div className={styles.detailsSection}>
                <h2>Why Choose Us?</h2>
                <ul className={styles.features}>
                    <li>Multiple grounds with different sizes and amenities.</li>
                    <li>Flexible booking options for your convenience.</li>
                    <li>Clean and well-maintained pitches.</li>
                    <li>Seating arrangements for spectators.</li>
                </ul>

                <div className={styles.quoteSection}>
                    <p className={styles.quote}>"The best box cricket grounds you'll find in the city!"</p>
                </div>

                <h2>Contact Us</h2>
                <p>
                    For bookings or inquiries, feel free to reach out at <a href="mailto:info@boxplay.com" className={styles.contactLink}>info@boxplay.com</a> 
                    or call us at (123) 456-7890.
                </p>
            </div>

            
            <div className={styles.statsSection}>
                <h2 className={styles.subHeading}>Playo Stats</h2>
                <div className={styles.stats}>
                    <div>2M+ Users</div>
                    <div>100+ Sports</div>
                    <div>12M+ Sports Activities Enabled</div>
                    <div>19M+ Player Connections Enabled</div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
