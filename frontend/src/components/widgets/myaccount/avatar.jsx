import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const AvatarUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [image, setImage] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8000/api/v1/user/current-user")
            .then((response)=>{
                console.log(response.data.data.avatar)
                setImage(response.data.data.avatar)
            })
            .catch((error)=>{
                console.log(error)
            })
    }, [])

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setError("Please select a file");
      return;
    }
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('avatar', selectedFile);

    try {
      const response = await axios.patch('http://localhost:8000/api/v1/user/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alert('Avatar updated successfully!');
      }
    } catch (err) {
      setError('Failed to update avatar. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
        <img src={image.url} width={500} height={500} className='img-fluid rounded '/>
      <form onSubmit={handleSubmit}>
          <input
            type="file"
            className="form-control-file"
            id="avatar"
            onChange={handleFileChange}
          />
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default AvatarUpload;
