import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { FaStar } from "react-icons/fa6";

const testimonials = [
  {
    stars: 5,
    text: `"Working with Fly Your Tech was an absolute pleasure. Their team is highly professional and responsive, ensuring that our project was completed on time and to the highest standards. They brought our vision to life with creative solutions and an innovative approach. We look forward to collaborating with them on future projects."`,
    image:
      "data:image/png;base64,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",
    name: "Aakash Verma",
    title: "Sales Manager",
  },
  {
    stars: 5,
    text: `"Fly Your Tech's expertise in tech development is unmatched. From the initial consultation to the final delivery, the process was seamless. Their attention to detail and commitment to quality made all the difference in the success of our project. I highly recommend their services to anyone looking for a reliable and skilled tech partner."`,
    image:
      "data:image/png;base64,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",
    name: "Neha Kapoor",
    title: "BDA",
  },
  {
    stars: 5,
    text: ` "The team at Fly Your Tech is exceptional. They understood our requirements perfectly and delivered a product that exceeded our expectations. Their ability to adapt to changing needs and provide innovative solutions was impressive. Communication was always clear, and they were always available to address any concerns."`,
    image:
      "data:image/png;base64,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",
    name: " Rahul Deshmukh",
    title: "Account executive",
  },
  {
    stars: 5,
    text: ` "Fly Your Tech made the entire development process a breeze. Their team is knowledgeable, experienced, and dedicated to delivering the best possible outcome. They kept us in the loop at every stage, and the final product was exactly what we wanted. Their professionalism and expertise are truly commendable."`,
    image:
      "data:image/png;base64,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",
    name: " Priyanka Singh",
    title: "Marketing Head",
  },
  {
    stars: 5,
    text: ` "I had a great experience working with Fly Your Tech. Their team is incredibly talented and focused on delivering results that matter. They went above and beyond to ensure that our project was successful, providing valuable insights and suggestions along the way. The collaboration was smooth, and the end result was fantastic."`,
    image:
      "data:image/png;base64,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",
    name: " Varun Gupta",
    title: "Sales Consultant",
  },
];

function TestimonialsCarousel() {
  return (
    <div className="pb-10  lg:h-96">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        stopOnHover={true}
        swipeable={true}
        showArrows={false}
        showStatus={false}
        
        className="w-[400px] sm:w-[550px]   md:w-[100%]"
      >
        {testimonials.map((testimonial, index) => (
          <div className="h-96" key={index}>
            <div className="text-white flex-col gap-5 items-center justify-center flex">
              <div className="flex gap-1 items-center">
                <span className="flex text-xl text-yellow-300">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </span>
                <span className="text-xl">{testimonial.stars}</span>
              </div>
              <div className=" w-[90%] lg:w-[70%]">
                <span className="lg:text-2xl  text-sm font-display font-bold text-center">
                  {testimonial.text}
                </span>
              </div>
              <div className="flex mt-4">
                <div className="rounded-full overflow-hidden">
                  <img
                    src={testimonial.image}
                    className="lg:h-32 h-24 w-24 lg:w-32 object-cover rounded-full"
                    alt={testimonial.name}
                  />
                </div>
                <div className="flex flex-col items-start text-xl justify-center ml-6">
                  <span>{testimonial.name}</span>
                  <span>{testimonial.title}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default TestimonialsCarousel;
