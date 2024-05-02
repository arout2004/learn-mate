import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ReviewSection = ({ reviews }: any) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="w-full mt-8">
      <h1 className="text-3xl mb-4">Student Reviews:</h1>
      <Slider {...sliderSettings}>
        {reviews.map((review: any) => (
          <div key={review.id} className="p-4">
            <div className="flex border-2 p-6 rounded-lg shadow-md">
              <img
                src={review.image}
                alt={review.name}
                className="h-20 w-20 rounded-full object-cover mr-4"
              />
              <div>
                <h2 className="text-lg font-bold mb-2">{review.name}</h2>
                <p className="text-gray-600 mb-2">{review.designation}</p>
                <p className="text-yellow-500 mb-2">{review.star}</p>
                <p>{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ReviewSection;
