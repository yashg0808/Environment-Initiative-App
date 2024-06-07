import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileService from "../../services/profile/ProfileService";
import AuthService from "../../services/auth/AuthService";
import useCustomNavigate from "../../hooks/useCustomNavigate";
import { ROUTE_PATHS } from "../../constants";

const ProfilePageContainer = () => {
  const params = new URLSearchParams(window.location.search);
  const username = params.get("profile");
  const [image, setImage] = useState("");
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
        const image = await AuthService.getAavatarById(profileData.owner);
        setImage(image);
        setProfile(profileData);
      } catch (error) {
        console.log(error);
        navigate(ROUTE_PATHS.pageNotFound);
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
        followersCount: prevProfile.isFollowing
          ? prevProfile.followersCount - 1
          : prevProfile.followersCount + 1,
      }));
    } catch (error) {
      console.log(error);
      // Optionally, add user notification here
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>Profile not found</div>;
  }

  const {
    name,
    bio,
    interests,
    phoneNumber,
    location,
    followersCount,
    followingCount,
    isFollowing,
  } = profile;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white w-full md:w-1/2 lg:w-1/3 p-8 mt-10 rounded-lg shadow-lg">
        <div className="mb-8">
          <img
            src={image}
            alt="Profile Avatar"
            className="w-48 h-48 rounded-full object-cover mb-4 shadow-lg"
          />
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Name: {name}
          </h1>
          <p className="text-gray-700 mb-2">
            <strong>Bio:</strong> {bio}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Interests:</strong> {interests}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Phone Number:</strong> {phoneNumber}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Location:</strong> {location}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Followers:</strong> {followersCount}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Following:</strong> {followingCount}
          </p>
        </div>
        <button
          className={`w-full py-2 px-4 rounded ${
            isFollowing
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white font-semibold`}
          onClick={clickHandler}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      </div>
    </div>
  );
};

export default ProfilePageContainer;
