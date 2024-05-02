import Slider from "react-slick";

const FEEDBACKARR = [
    {
        id: 1,
        image: "author-06.webp",
        name: "Sara Alexander",
        designation: "Product Designer, USA",
        star: "⭐⭐⭐⭐",
        comment:
            "Lorem Ipsum has been the industrys standard dummy text since the 1500 when unknown printer took a galley of type and scrambled to make type specimen book has survived not five centuries but also the leap into electronic type and book.",
    },
    {
        id: 2,
        image: "author-07.webp",
        name: "Koral Batchman",
        designation: "Product Designer, USA",
        star: "⭐⭐⭐⭐",
        comment:
            "Lorem Ipsum has been the industrys standard dummy text since the 1500 when unknown printer took a galley of type and scrambled to make type specimen book has survived not five centuries but also the leap into electronic type and book.",
    },
    {
        id: 3,
        image: "author-03.webp",
        name: "Gertude Culbertson",
        designation: "Product Designer, USA",
        star: "⭐⭐⭐⭐",
        comment:
            "Lorem Ipsum has been the industrys standard dummy text since the 1500 when unknown printer took a galley of type and scrambled to make type specimen book has survived not five centuries but also the leap into electronic type and book.",
    },
];

const Feedback = ({ data = FEEDBACKARR }: any) => {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true,

            },

        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 2,
                initialSlide: 1,

            },

        },

        ],
    };


    return (
        <div className=" main-container w-full lg:w-[100%] bg mt-8 my-8">
            <p className=" text-md lg:text-xl mb-4 text-center  text-green-600">Student Testimonial</p>
            <h1 className=" text-2xl lg:text-4xl mb-4 text-center font-semibold">Feedback From <span className=" text-green-600">Student</span> </h1>
            <Slider {...sliderSettings}>
                {data.map((feedback: any) => (
                    <div key={feedback.id} className="p-4">
                        <div className=" grid border-2 p-6 rounded-lg shadow-md text-center ">
                            <img
                                src={feedback.image}
                                alt={feedback.name}
                                className="h-20 w-20 rounded-full outline-2 outline outline-offset-8 outline-slate-400 object-cover place-self-center my-5 mr-4"
                            />
                            <div>
                                <h2 className="text-lg font-bold mb-2">{feedback.name}</h2>
                                <p className="text-gray-600 mb-2">{feedback.designation}</p>
                                <p className="text-yellow-500 mb-2">{feedback.star}</p>
                                <p>{feedback.comment}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Feedback;