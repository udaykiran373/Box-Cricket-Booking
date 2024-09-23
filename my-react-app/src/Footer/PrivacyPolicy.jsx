import React from 'react';
import './PrivacyPolicy.css'; // Make sure to create this CSS file

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <h1 className="privacy-policy-main-heading">Privacy Policy</h1>
      <h2>Protecting Your Privacy</h2>
      <p>
        Protecting your privacy is fundamental to us at PlayAll Sports. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
      </p>
      
      <h2>Information We Collect</h2>
      <ul>
        <li>
          <strong>Personal Information:</strong> When you register an account or make bookings, we may collect personal details such as your name, email address, phone number, and payment information.
        </li>
        <li>
          <strong>Usage Data:</strong> We gather information about how you interact with our app, including the facilities booked, session times, and preferences.
        </li>
      </ul>

      <h2>How We Use Your Information</h2>
      <p>
        We utilize the collected data to provide and personalize our services, manage your account, process bookings, and communicate with you. Your information may be used for billing, authentication, customer support, and improving our app's functionality and user experience.
      </p>

      <h2>Data Security</h2>
      <p>
        We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. All financial transactions are encrypted using secure socket layer technology (SSL) to ensure the confidentiality of your payment details.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        We may engage third-party service providers to assist with payment processing, analytics, marketing, and other operational tasks. These third parties are contractually bound to handle your data securely and are prohibited from using it for any other purpose.
      </p>

      <h2>Data Retention</h2>
      <p>
        We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy and to comply with legal obligations. You can request the deletion of your account and associated data at any time, subject to certain exceptions required by law.
      </p>

      <h2>Your Rights</h2>
      <p>
        You have the right to access, correct, update, or delete your personal information. You may also object to or restrict certain processing activities.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
