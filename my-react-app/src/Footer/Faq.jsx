import React, { useState } from 'react';
import './Faq.css';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqData = [
        {
            question: 'Will I be able to cancel or back out if I’m not comfortable with the rented shoes?',
            answer: "The GameTime session will go on as planned and will NOT be cancelled. You can always carry your own shoes.",
        },
        {
            question: 'What if other players don’t turn up?',
            answer: 'If none of your co-players show up, (only) in case of rain, then the activity would be canceled and your money will be refunded / GameTime Unlocked charge reversed.',
          },
          {
              question: 'Do i need to carry my own equipment or will the equipment be provided at the venue?',
              answer: 'Please refer to the activity information for instructions on equipment. Generally, common equipment for the game (shuttle, ball) will be provided at the venue and this equipment needs to be returned post completion of the activity. You will need to carry your own Individual equipment (rackets, shoes) - or can rent these at the venue subject to availability and sizing.',
            },
            {
              question: 'Till when can I send the join request for an activity?',
              answer: 'You can send a join request till the activity has started. ',
            },
            {
              question: 'How to add a Playpal?',
              answer: 'Host/Join an activity and after the activity gets over the players who have played with you will be a part of your Playpal list.',
            },
            {
              question: "What is the Learn Section all about?",
              answer: 'The learn section is a curated section where one can learn by training  the various aspects of game.',
            },
            {
              question: 'I cannot see any venues near my area? Why is that?',
              answer: 'We are trying to reach out to more venues near your area, as youre reading this. This issue you are facing can be the case if there are no venues tied up with Playo and/or if there are no venues near your selected location. The app automatically shows the closest venues to your area.',
            },
            {
              question: 'what does the venue rating signify?',
              answer: 'The venue rating is the average of all the ratings given by Playo users for a particular venue.',
            },
            {
              question: 'I encountered a game-breaking bug. Will I lose my progress if I restart?',
              answer: 'Restarting the game may resolve the issue, but could result in loss of unsaved progress. Contact support before restarting.',
            },
            {
              question: 'Can I transfer my progress or purchases between devices?',
              answer: 'The ability to transfer depends on the game. Some offer cloud saving or account linking. Check the game’s documentation for details.',
            },
          {
            question: 'Do I need to carry my own equipment or will the equipment be provided at the venue?',
            answer: 'Please refer to the activity information for instructions on equipment. Generally, common equipment for the game (shuttle, ball) will be provided at the venue and this equipment needs to be returned post completion of the activity. You will need to carry your own individual equipment (rackets, shoes) - or can rent these at the venue subject to availability and sizing.',
          },
          {
            question: 'How to rate a venue or submit feedback to the venue?',
            answer: 'Select the venue by navigating to Book Tab > Venues > Choose the venue > Rate. You will also be able to share feedback to the venue directly through the message box.',
          },
        // Add other FAQs here
    ];

    return (
        <div className="container">
            <h1>FAQ</h1>
            <h2>Frequently Asked Questions</h2>
            <div className="accordion">
                {faqData.map((item, index) => (
                    <div className={`accordion-item ${activeIndex === index ? 'active' : ''}`} key={index}>
                        <div className="accordion-title" onClick={() => toggleAccordion(index)}>
                            {item.question}
                            <span className="arrow">▼</span>
                        </div>
                        <div className="accordion-content" style={{ maxHeight: activeIndex === index ? '1000px' : '0' }}>
                            <p className="answer">{item.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
