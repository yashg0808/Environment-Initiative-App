import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileService from '../../services/profile/ProfileService';
import AuthService from '../../services/auth/AuthService';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import { ROUTE_PATHS } from '../../constants';

const ProfilePageContainer = () => {
    const params = new URLSearchParams(window.location.search);
    const username = params.get("profile");
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useCustomNavigate(); // or useNavigate() if no custom logic

    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentUser = await AuthService.getCurrentUser();
                if (currentUser.username === username) {
                    navigate(ROUTE_PATHS.myAccount);
                    return;
                }
                const profileData = await ProfileService.getProfileByUsername(username);
                setProfile(profileData);
            } catch (error) {
                console.log(error);
                navigate(ROUTE_PATHS.pageNotFound)
                // Optionally, add user notification here
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [username]);

    const clickHandler = async () => {
        try {
            await ProfileService.followUnFollowUser(profile.account._id);
            setProfile((prevProfile) => ({
                ...prevProfile,
                isFollowing: !prevProfile.isFollowing,
                followersCount: prevProfile.isFollowing ? prevProfile.followersCount - 1 : prevProfile.followersCount + 1
            }));

            
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!profile) {
        return <div>Profile not found</div>;
    }

    const { name, bio, interests, phoneNumber, location, followersCount, followingCount, isFollowing } = profile;

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Name: {name}</h5>
                    <p className="card-text">Bio: {bio}</p>
                    <p className="card-text">Interests: {interests}</p>
                    <p className="card-text">Phone Number: {phoneNumber}</p>
                    <p className="card-text">Location: {location}</p>
                    <p className="card-text">Followers: {followersCount}</p>
                    <p className="card-text">Following: {followingCount}</p>
                </div>
                <button className="btn btn-primary" onClick={clickHandler}>
                    {isFollowing ? 'Unfollow' : 'Follow'}
                </button>
            </div>
        </div>
    );
};

export default ProfilePageContainer;
