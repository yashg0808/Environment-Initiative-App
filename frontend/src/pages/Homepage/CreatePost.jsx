import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import PostService from '../../services/post/PostService';

const CreatePost = ({ setIsExpanded }) => {
  const { register, handleSubmit, control, reset } = useForm();
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handlePostSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { content } = data;
      const response = await PostService.createPost(content,tags,images);
      console.log("Response:", response);

    //   reset();
    //   setTags([]);
    //   setImages([]);
    //   setIsExpanded(false);
    } catch (error) {
      console.error('Failed to create post', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTagChange = (e, index) => {
    const newTags = [...tags];
    newTags[index] = e.target.value;
    setTags(newTags);
  };

  const handleImageChange = (e) => {
    const newImages = [...images];
    newImages.push({
        url: URL.createObjectURL(e.target.files[0]),
        file: e.target.files[0],
    });
    setImages(newImages);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <form onSubmit={handleSubmit(handlePostSubmit)} className="mx-auto w-full max-w-lg bg-white shadow-md rounded-lg overflow-hidden mb-6">
      <div className="p-4">
        <label className="block mb-2 text-sm font-medium text-gray-600">Content</label>
        <textarea
          {...register('content')}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Write your post content..."
        ></textarea>
      </div>
      <div className="p-4">
        <label className="block mb-2 text-sm font-medium text-gray-600">Tags</label>
        {tags.map((tag, index) => (
          <input
            key={index}
            value={tag}
            onChange={(e) => handleTagChange(e, index)}
            className="w-full mb-2 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter a tag..."
          />
        ))}
        <button
          type="button"
          onClick={() => setTags([...tags, ''])}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Add Tag
        </button>
      </div>
      <div className="p-4">
        <label className="block mb-2 text-sm font-medium text-gray-600">Images</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-2"
        />
        <div className="flex flex-wrap">
          {images.map((image, index) => (
            <div key={index} className="p-2">
              <img src={image.url} alt={`Image ${index + 1}`} className="w-full h-auto" />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="mt-1 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 flex flex-col">
        <button 
          type="submit" 
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md m-2"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Post...' : 'Create Post'}
        </button>
        <button 
          type="button"
          onClick={() => setIsExpanded(false)} 
          className="bg-red-500 m-2 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          disabled={isLoading}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
