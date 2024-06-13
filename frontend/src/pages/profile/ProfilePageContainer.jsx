import React, { useEffect, useState } from "react";
import ProfileService from "../../services/profile/ProfileService";
import AuthService from "../../services/auth/AuthService";
import useCustomNavigate from "../../hooks/useCustomNavigate";
import { ROUTE_PATHS } from "../../constants";
import Skeleton from "../../components/basic/Skeleton";
import PostService from "../../services/post/PostService";
import Post from "../../components/widgets/posts/Post";
import ApiError from "../../services/ApiError";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/AuthSlice";
import FollowersFollowingModal from "../../components/modals/follwersFollowingModal/FollowersFollowingModal";

const ProfilePageContainer = () => {
  const dispatch = useDispatch();
  const params = new URLSearchParams(window.location.search);
  const username = params.get("profile");
  const [errorMessage, setErrorMessage] = useState("");
  const [avatar, setAvatar] = useState("");
  const [followerList, setFollowerList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [type, setType] = useState("followers"); // ["followers", "following"]
  const [isModalShown, setIsModalShown] = useState(false);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const navigate = useCustomNavigate();

  const logOutClickHandler = async () => {
    setLoading(true);
    const response = await AuthService.logoutService();
    if (response instanceof ApiError) {
      setErrorMessage(response.errorResponse?.message || response.errorMessage);
    } else {
      dispatch(logOut());
      setIsCurrentUser(false);
      console.log("Logged Out Successfully");
      navigate(ROUTE_PATHS.home);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const user = await AuthService.getCurrentUser();
        setIsCurrentUser(user.username === username);
        const profileData = await ProfileService.getProfileByUsername(username);
        const image = await AuthService.getAavatarById(profileData.owner);
        const postsData = await PostService.getPostsByUser(username);
        const followerListData = await ProfileService.getFollowersByUsername(
          username
        );
        const followingListData = await ProfileService.getFollowingByUsername(
          username
        );
        setFollowerList(followerListData.followers);
        setFollowingList(followingListData.following);
        setPosts(postsData.posts);
        setAvatar(image);
        setProfile(profileData);
      } catch (error) {
        console.log(error);
        navigate(ROUTE_PATHS.pageNotFound);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  const clickHandler = async () => {
    try {
      setLoading(true);
      const response = await ProfileService.followUnFollowUser(
        profile.account._id
      );
      if (response instanceof ApiError) {
        console.log(response.errorMessage);
        navigate(ROUTE_PATHS.login);
      } else {
        setProfile((prevProfile) => ({
          ...prevProfile,
          isFollowing: !prevProfile.isFollowing,
          followersCount: prevProfile.isFollowing
            ? prevProfile.followersCount - 1
            : prevProfile.followersCount + 1,
        }));
      }
    } catch (error) {
      navigate(ROUTE_PATHS.login);
      console.log("Error Occured: ", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleModal = (type) => {
    setType(type);
    setIsModalShown((prev) => !prev);
  };

  if (loading) {
    return (
      <>
        <div className="max-w-4xl mx-auto mt-10 p-4 bg-white rounded-lg shadow-md">
          <div className="relative">
            <Skeleton type="coverImage" />
            <div className="absolute top-20 left-4">
              <Skeleton type="avatar" />
            </div>
          </div>
          <div className="mt-20">
            <Skeleton type="title" />
            <Skeleton type="text" />
            <Skeleton type="text" />
            <div className="flex space-x-2 mt-2">
              <Skeleton type="text" />
              <Skeleton type="text" />
            </div>
            <Skeleton type="text" />
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Posts</h2>
            <div className="mt-4 space-y-4">
              {[...Array(3)].map((_, index) => (
                <Skeleton key={index} type="post" />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {isModalShown && (
        <FollowersFollowingModal
          followers={followerList}
          following={followingList}
          type={type}
          hideModal={() => setIsModalShown(false)}
        />
      )}
      <div className="max-w-4xl mx-auto mt-10 p-4 bg-white rounded-lg shadow-md">
        <div className="relative">
          <img
            src={profile.coverImage.url}
            alt={`${profile.name}'s cover`}
            className="w-full h-48 object-cover rounded-md"
          />
          <div className="absolute top-20 left-4">
            <img
              src={avatar}
              alt={`${profile.name}'s avatar`}
              className="w-40 h-40 rounded-full border-4 border-white"
            />
          </div>
        </div>
        <div className="mt-20 p-4">
          <h1 className="text-2xl font-bold">{profile.name}</h1>
          <p className="text-gray-600">{profile.bio}</p>
          <div className="flex items-center text-gray-600 mt-2">
            <svg
              className="w-5 h-5"
              fill="#000000"
              version="1.1"
              id="Capa_1"
              width="800px"
              height="800px"
              viewBox="0 0 395.71 395.71"
            >
              <g>
                <path
                  d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738
              c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388
              C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191
              c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"
                />
              </g>
            </svg>
            {profile.location}
          </div>
          <div className="flex space-x-2 mt-2 text-gray-600">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => toggleModal("followers")}
            >
              {profile.followersCount} Followers
            </div>
            <div
              className="flex items-center cursor-pointer"
              onClick={() => toggleModal("following")}
            >
              {profile.followingCount} Following
            </div>
          </div>
          {/* if user is current user, show 2 buttons, edit profile and logout */}
          {isCurrentUser ? (
            <div className="flex space-x-4 mt-4">
              <button
                className="px-4 py-2 rounded bg-blue-500 text-white"
                onClick={() => navigate(ROUTE_PATHS.myAccount)}
              >
                Edit Profile
              </button>
              <button
                className="px-4 py-2 rounded bg-red-500 text-white"
                onClick={logOutClickHandler}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <button
                className={`mt-2 px-4 py-2 rounded ${
                  profile.isFollowing ? "bg-red-500" : "bg-blue-500"
                } text-white flex items-center`}
                onClick={clickHandler}
                disabled={loading}
              >
                {loading ? (
                  "Loading..."
                ) : profile.isFollowing ? (
                  <>Unfollow</>
                ) : (
                  <>Follow</>
                )}
              </button>
            </>
          )}
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Posts</h2>
          <div className="mt-4 space-y-4">
            {posts.length > 0 ? (
              posts.map((post, idx) => <Post key={idx} post={post} />)
            ) : (
              <p>User has no posts</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePageContainer;
