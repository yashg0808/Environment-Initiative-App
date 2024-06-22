import React from 'react';
import { useNavigate } from 'react-router-dom';

const AboutPageContainer = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-darkJetGreen p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">About Our Initiative</h1>
        <p className="mb-4">
          Welcome to our environment initiative app! Our mission is to create a community of environmentally conscious individuals who are dedicated to making a positive impact on our planet. Whether you are planting trees, organizing clean-up drives, or simply looking to connect with like-minded individuals, our platform is here to support and amplify your efforts.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
        <p className="mb-4">
          Our mission is to foster a community where everyone can contribute to environmental conservation. We believe that small actions, when combined, can lead to significant change. By providing a space for sharing initiatives, collaborating on projects, and spreading awareness, we aim to empower individuals to take action and inspire others to do the same.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Features</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Share your environmental initiatives and projects.</li>
          <li>Connect with other eco-friendly individuals and groups.</li>
          <li>Participate in community challenges and events.</li>
          <li>Learn about the latest in environmental conservation and sustainability.</li>
        </ul>
        <h2 className="text-2xl font-semibold mb-2">Join Us</h2>
        <p className="mb-4">
          Join our community and be a part of the change you want to see in the world. Together, we can make a significant impact on the environment and create a better future for generations to come. Sign up today and start sharing your initiatives!
        </p>
        <button
          onClick={() => navigate('/signup')}
          className="mt-4 px-4 py-2 bg-darkJetGreen-light rounded shadow-lg"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default AboutPageContainer;
