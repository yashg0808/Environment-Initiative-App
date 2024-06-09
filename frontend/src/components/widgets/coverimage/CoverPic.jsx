const CoverPic = (props) => {
    const {
      handleCoverPicSubmit,
      isLoading,
      selectedCoverPic,
      setSelectedCoverPic,
      coverPic,
    } = props;
    const handleFileChange = (event) => {
      setSelectedCoverPic(event.target.files[0]);
    };
  
    return (
      <div className="container mt-5 flex flex-col items-center">
        <img
          src={coverPic.url}
          alt="Cover Pic"
          className="w-48 h-48 rounded-full object-cover mb-4 shadow-lg max-w-full z-10"
        />
        <form onSubmit={handleCoverPicSubmit} className="w-full max-w-sm">
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
  
  export default CoverPic;
  