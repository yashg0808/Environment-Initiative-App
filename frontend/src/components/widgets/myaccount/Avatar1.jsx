const Avatar = (props) => {
  const {
    handleAvatarSubmit,
    isLoading,
    selectedFile,
    setSelectedFile,
    image,
  } = props;
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div className="container mt-5 flex flex-col items-center">
      <img
        src={image.url}
        alt="Profile Avatar"
        className="w-48 h-48 rounded-full object-cover mb-4 shadow-lg max-w-full "
      />
      <form onSubmit={handleAvatarSubmit} className="w-full max-w-sm">
        <input
          type="file"
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none mb-4"
          id="avatar"
          onChange={handleFileChange}
        />
        <button
          type="submit"
          className={`w-full py-2 px-4 rounded text-white font-semibold ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
          disabled={isLoading}
        >
          {isLoading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default Avatar;
