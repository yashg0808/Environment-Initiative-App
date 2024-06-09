import React from 'react';

const Skeleton = ({ type }) => {
  const skeletonClasses = 'animate-pulse bg-gray-300 rounded';

  const renderSkeleton = () => {
    switch (type) {
      case 'avatar':
        return <div className={`${skeletonClasses} w-20 h-20 rounded-full`} />;
      case 'text':
        return <div className={`${skeletonClasses} h-4 mb-2`} />;
      case 'title':
        return <div className={`${skeletonClasses} h-6 mb-2`} />;
      case 'coverImage':
        return <div className={`${skeletonClasses} w-full h-48 rounded-md`} />;
      case 'post':
        return (
          <div className="mb-4">
            <div className={`${skeletonClasses} h-6 w-1/2 mb-2`} />
            <div className={`${skeletonClasses} h-4 mb-2`} />
            <div className={`${skeletonClasses} h-4 w-3/4`} />
          </div>
        );
      default:
        return null;
    }
  };

  return <div className="my-2">{renderSkeleton()}</div>;
};

export default Skeleton;
