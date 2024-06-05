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
    <div className="container mt-5">
      <img
        src={image.url}
        width={500}
        height={500}
        className="img-fluid rounded "
      />
      <form onSubmit={handleAvatarSubmit}>
        <input
          type="file"
          className="form-control-file"
          id="avatar"
          onChange={handleFileChange}
        />
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default Avatar;
