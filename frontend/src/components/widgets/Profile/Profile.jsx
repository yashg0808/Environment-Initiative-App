import { useEffect, useState } from "react";

const Profile = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user'); // Replace with your API endpoint
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data', error);
        setLoading(false);
      }
    };

    const fetchUserPosts = async () => {
      try {
        const response = await axios.get('/api/user/posts'); // Replace with your API endpoint
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching user posts', error);
      }
    };

    fetchUserData();
    fetchUserPosts();
  }, []);

  const handleFollow = async () => {
    setLoading(true);
    try {
      await axios.post('/api/follow', { userId: user.id }); // Replace with your API endpoint
      setUser({ ...user, isFollowing: true, followersCount: user.followersCount + 1 });
    } catch (error) {
      console.error('Error following user', error);
    }
    setLoading(false);
  };

  const handleUnfollow = async () => {
    setLoading(true);
    try {
      await axios.post('/api/unfollow', { userId: user.id }); // Replace with your API endpoint
      setUser({ ...user, isFollowing: false, followersCount: user.followersCount - 1 });
    } catch (error) {
      console.error('Error unfollowing user', error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-4 bg-white rounded-lg shadow-md">
        <div className="flex items-center space-x-4">
          <Skeleton type="avatar" />
          <div className="flex-1">
            <Skeleton type="title" />
            <Skeleton type="text" />
            <Skeleton type="text" />
            <div className="flex space-x-2 mt-2">
              <Skeleton type="text" />
              <Skeleton type="text" />
            </div>
            <Skeleton type="text" />
          </div>
        </div>
        <div className="mt-6">
          <Skeleton type="coverImage" />
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
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <img src={user.avatar} alt={`${user.name}'s avatar`} className="w-20 h-20 rounded-full" />
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-600">{user.bio}</p>
          <p className="text-gray-600">{user.location}</p>
          <div className="flex space-x-2 mt-2">
            <span>{user.followersCount} Followers</span>
            <span>{user.followingCount} Following</span>
          </div>
          <button
            className={`mt-2 px-4 py-2 rounded ${user.isFollowing ? 'bg-red-500' : 'bg-blue-500'} text-white`}
            onClick={user.isFollowing ? handleUnfollow : handleFollow}
            disabled={loading}
          >
            {loading ? 'Loading...' : user.isFollowing ? 'Unfollow' : 'Follow'}
          </button>
        </div>
      </div>
      <div className="mt-6">
        <img src={user.coverImage} alt={`${user.name}'s cover`} className="w-full h-48 object-cover rounded-md" />
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Posts</h2>
        <div className="mt-4 space-y-4">
          {posts.length > 0 ? posts.map(post => (
            <Post key={post.id} {...post} />
          )) : (
            <p>No posts to display</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
