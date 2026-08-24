import React from 'react';

const RoomLoading = () => {
  // Common skeleton box style with smooth gradient pulse animation
  const skeletonClass = "bg-gradient-to-r from-gray-300 via-gray-50 to-gray-200 animate-pulse";

  return (
    <div className="flex flex-col md:flex-row rounded-3xl bg-white overflow-hidden shadow-sm border border-gray-100">
      {/* Photo Placeholder */}
      <div className="relative md:w-72 shrink-0 p-3">
        <div className={`w-full h-48 md:h-full rounded-2xl ${skeletonClass}`}></div>
      </div>

      {/* Content Section Placeholder */}
      <div className="flex flex-col justify-between p-5 flex-1 gap-4">
        {/* Top Info Header */}
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-2 flex-1">
            {/* Title Line */}
            <div className={`h-6 rounded-md w-3/4 ${skeletonClass}`}></div>
            {/* Capacity Line */}
            <div className={`h-4 rounded-md w-1/3 ${skeletonClass}`}></div>
          </div>

          {/* Star Rating Badge */}
          <div className={`h-7 w-16 rounded-full shrink-0 ${skeletonClass}`}></div>
        </div>

        {/* Room Type & Amenities Placeholder */}
        <div className="space-y-2">
          {/* Room Type Title */}
          <div className={`h-3 rounded-md w-1/4 ${skeletonClass}`}></div>
          {/* Amenity Pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <div className={`h-6 w-16 rounded-lg ${skeletonClass}`}></div>
            <div className={`h-6 w-20 rounded-lg ${skeletonClass}`}></div>
            <div className={`h-6 w-14 rounded-lg ${skeletonClass}`}></div>
          </div>
        </div>

        {/* Pricing & CTA Placeholder */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
          <div className="space-y-1">
            <div className={`h-3 rounded-md w-12 ${skeletonClass}`}></div>
            <div className={`h-7 rounded-md w-24 ${skeletonClass}`}></div>
          </div>

          {/* Button Placeholder */}
          <div className={`h-11 w-28 rounded-xl ${skeletonClass}`}></div>
        </div>
      </div>
    </div>
  );
};

export default RoomLoading;