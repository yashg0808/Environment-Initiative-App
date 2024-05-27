import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpdateProfileForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    interests:[],
    phoneNumber: '',
    location: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/profile/')
      .then((response) => {
        console.log(response)
        setFormData({
          name: response.data.data.name || '',
          bio: response.data.data.bio || '',
          interests: response.data.data.interests || '',
          phoneNumber: response.data.data.phoneNumber || '',
          location: response.data.data.location || '',
        });
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.patch('http://localhost:8000/api/v1/profile/', formData)
      .then((response) => {
        console.log('Profile updated:', response.data);
      })
      .catch((error) => {
        console.error('There was an error updating the profile:', error);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Bio:
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Interests:
          <input
            type="text"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Phone Number:
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </label>
      </div>
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default UpdateProfileForm;
