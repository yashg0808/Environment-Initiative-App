import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProfileService from '../../services/profile/ProfileService';
import { set } from 'react-hook-form';
import AuthService from '../../services/auth/AuthService';
import useCustomNavigate from '../../hooks/useCustomNavigate';

const ProfilePageContainer = () => {
    let params = new URL(document.location.toString()).searchParams;
    const username = params.get("profile");
    const [profile, setProfile] = useState({});
    const navigate = useCustomNavigate();
    useEffect(() => {
        const fetchData = async () => {
            await AuthService.getCurrentUser()
            .then((response) => {
                if(response.username===username){
                    navigate('/my-account');
                }
            })
            .catch((error) => {
                console.log(error);
            });
            await ProfileService.getProfileByUsername(username)
            .then((response) => {
                setProfile(response);
            })
            .catch((error) => {
                console.log(error);
            });
        }
        
        fetchData();
    }, [username,navigate]);

  return (
    <div className="container mt-5">
        <div className="card">
            <div className="card-body">
            <h5 className="card-title">Name: {profile.name}</h5>
            <p className="card-text">Bio: {profile.bio}</p>
            <p className="card-text">Interests: {profile.interests}</p>
            <p className="card-text">Phone Number: {profile.phoneNumber}</p>
            <p className="card-text">Location: {profile.location}</p>
            </div>
        </div>
    </div>
  );
};

export default ProfilePageContainer;
