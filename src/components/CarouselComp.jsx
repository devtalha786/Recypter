// "use client";
// import React, { useState, useEffect, useCallback } from "react";
// import { ArrowLeft, ArrowRight, Sparkle } from "lucide-react";
// import { Card } from "@/components/ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { cn } from "@/lib/utils";
// import MessageCard from "./common/MessageCard";

// const testimonials = [
//   {
//     id: 1,
//     text: "We have been working with Positivus for the past year and have seen a significant increase in website traffic and leads as a result of their efforts. The team is professional, responsive, and truly cares about the success of our business. We highly recommend Positivus to any company looking to grow their online presence.",
//     author: "John Smith",
//     position: "Marketing Director at XYZ Corp",
//   },
//   {
//     id: 2,
//     text: "We have been working with Positivus for the past year and have seen a significant increase in website traffic and leads as a result of their efforts. The team is professional, responsive, and truly cares about the success of our business. We highly recommend Positivus to any company looking to grow their online presence.",
//     author: "John Smith",
//     position: "Marketing Director at XYZ Corp",
//   },
//   {
//     id: 3,
//     text: "We have been working with Positivus for the past year and have seen a significant increase in website traffic and leads as a result of their efforts. The team is professional, responsive, and truly cares about the success of our business. We highly recommend Positivus to any company looking to grow their online presence.",
//     author: "John Smith",
//     position: "Marketing Director at XYZ Corp",
//   },
//   {
//     id: 4,
//     text: "We have been working with Positivus for the past year and have seen a significant increase in website traffic and leads as a result of their efforts. The team is professional, responsive, and truly cares about the success of our business. We highly recommend Positivus to any company looking to grow their online presence.",
//     author: "John Smith",
//     position: "Marketing Director at XYZ Corp",
//   },
//   {
//     id: 5,
//     text: "We have been working with Positivus for the past year and have seen a significant increase in website traffic and leads as a result of their efforts. The team is professional, responsive, and truly cares about the success of our business. We highly recommend Positivus to any company looking to grow their online presence.",
//     author: "John Smith",
//     position: "Marketing Director at XYZ Corp",
//   },
  
 
// ];


// const CarouselComp = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [api, setApi] = useState(null);

//   const scrollNext = useCallback(() => {
//     if (!api) return;
//     api.scrollNext();
//   }, [api]);

//   const scrollPrev = useCallback(() => {
//     if (!api) return;
//     api.scrollPrev();
//   }, [api]);

//   const scrollTo = useCallback((index) => {
//     if (!api) return;
//     api.scrollTo(index);
//     setCurrentSlide(index);
//   }, [api]);

//   useEffect(() => {
//     if (!api) return;

//     api.on("select", () => {
//       setCurrentSlide(api.selectedScrollSnap());
//     });

//     const interval = setInterval(() => {
//       scrollNext();
//     }, 3000);

//     return () => {
//       clearInterval(interval);
//       api.off("select");
//     };
//   }, [api, scrollNext]);

//   const handleManualNavigation = (action) => {
//     action();
//   };

//   return (
//     <div className="w-full min-h-[70vh] mx-auto bg-colorTheme-secondary rounded-3xl py-8 overflow-hidden flex flex-col justify-center">
//       <Carousel
//         opts={{
//           loop: true,
//           align: "center",
//           slidesToScroll: 1,
//         }}
//         className="w-full relative"
//         setApi={setApi}
//       >
//         <CarouselContent className="-ml-2 md:-ml-4">
//           {testimonials.map((testimonial, index) => {
//             const isCenter = currentSlide === index;
//             return (
//               <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-[540px] transition-all duration-500">
//                 <div 
//                   className={cn(
//                     "p-4 transition-all duration-500",
//                     isCenter 
//                       ? "scale-100 opacity-100 translate-y-0" 
//                       : "scale-[0.9] opacity-70 translate-y-2 brightness-75"
//                   )}
//                 >
//                   <MessageCard>
//                     <div className={cn(
//                       "transition-all duration-500",
//                       isCenter ? "opacity-100" : "opacity-90"
//                     )}>
//                       {testimonial.text}
//                     </div>
//                   </MessageCard>
//                   <div className={cn(
//                     "text-left pl-20 transition-all duration-500",
//                     isCenter ? "opacity-100 translate-y-0" : "opacity-80 translate-y-2"
//                   )}>
//                     <h3 className="text-colorTheme-primary mt-4 font-semibold text-xl">
//                       {testimonial.author}
//                     </h3>
//                     <p className="text-white opacity-80">
//                       {testimonial.position}
//                     </p>
//                   </div>
//                 </div>
//               </CarouselItem>
//             );
//           })}
//         </CarouselContent>

//         <div className="flex items-center justify-center gap-8 md:gap-32 mt-12">
//           <button 
//             className="bg-transparent border-none hover:bg-transparent p-0 cursor-pointer"
//             onClick={() => handleManualNavigation(scrollPrev)}
//             aria-label="Previous slide"
//           >
//             <ArrowLeft className="w-6 h-6 md:w-8 md:h-8 text-white hover:text-gray-300 transition-colors" />
//           </button>
          
//           <div className="flex gap-2 md:gap-4">
//             {testimonials.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => scrollTo(index)}
//                 className="bg-transparent border-0 p-0 cursor-pointer"
//                 aria-label={`Go to slide ${index + 1}`}
//               >
//                 <Sparkle
//                   className={cn(
//                     "w-5 h-5 md:w-6 md:h-6 transition-all duration-300 rotate-45",
//                     currentSlide === index 
//                       ? "text-colorTheme-primary fill-colorTheme-primary stroke-colorTheme-primary" 
//                       : "text-white/40 hover:text-white/60"
//                   )}
//                 />
//               </button>
//             ))}
//           </div>
          
//           <button 
//             className="bg-transparent border-none hover:bg-transparent p-0 cursor-pointer"
//             onClick={() => handleManualNavigation(scrollNext)}
//             aria-label="Next slide"
//           >
//             <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-white hover:text-gray-300 transition-colors" />
//           </button>
//         </div>
//       </Carousel>
//     </div>
//   );
// };

// export default CarouselComp;



"use client";
import React, { useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight, Sparkle } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import MessageCard from "./common/MessageCard";

const testimonials = [
  {
    id: 1,
    text: "We have been working with Positivus for the past year and have seen a significant increase in website traffic and leads as a result of their efforts. The team is professional, responsive, and truly cares about the success of our business. We highly recommend Positivus to any company looking to grow their online presence.",
    author: "John Smith",
    position: "Marketing Director at XYZ Corp",
  },
  {
    id: 2,
    text: "We have been working with Positivus for the past year and have seen a significant increase in website traffic and leads as a result of their efforts. The team is professional, responsive, and truly cares about the success of our business. We highly recommend Positivus to any company looking to grow their online presence.",
    author: "John Smith",
    position: "Marketing Director at XYZ Corp",
  },
  {
    id: 3,
    text: "We have been working with Positivus for the past year and have seen a significant increase in website traffic and leads as a result of their efforts. The team is professional, responsive, and truly cares about the success of our business. We highly recommend Positivus to any company looking to grow their online presence.",
    author: "John Smith",
    position: "Marketing Director at XYZ Corp",
  },
  {
    id: 4,
    text: "We have been working with Positivus for the past year and have seen a significant increase in website traffic and leads as a result of their efforts. The team is professional, responsive, and truly cares about the success of our business. We highly recommend Positivus to any company looking to grow their online presence.",
    author: "John Smith",
    position: "Marketing Director at XYZ Corp",
  },
  {
    id: 5,
    text: "We have been working with Positivus for the past year and have seen a significant increase in website traffic and leads as a result of their efforts. The team is professional, responsive, and truly cares about the success of our business. We highly recommend Positivus to any company looking to grow their online presence.",
    author: "John Smith",
    position: "Marketing Director at XYZ Corp",
  },
];

const CarouselComp = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Add resize listener to check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    // Initial check
    checkMobile();
    
    // Add listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollNext = useCallback(() => {
    if (!api) return;
    api.scrollNext();
  }, [api]);

  const scrollPrev = useCallback(() => {
    if (!api) return;
    api.scrollPrev();
  }, [api]);

  const scrollTo = useCallback((index) => {
    if (!api) return;
    api.scrollTo(index);
    setCurrentSlide(index);
  }, [api]);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap());
    });

    const interval = setInterval(() => {
      scrollNext();
    }, 3000);

    return () => {
      clearInterval(interval);
      api.off("select");
    };
  }, [api, scrollNext]);

  const handleManualNavigation = (action) => {
    action();
  };

  return (
    <div className="w-full min-h-[50vh] sm:min-h-[70vh] mx-auto bg-colorTheme-secondary rounded-3xl py-4 sm:py-8 overflow-hidden flex flex-col justify-center px-2 sm:px-4">
      <Carousel
        opts={{
          loop: true,
          align: "center",
          slidesToScroll: 1,
        }}
        className="w-full relative"
        setApi={setApi}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {testimonials.map((testimonial, index) => {
            const isCenter = currentSlide === index;
            return (
              <CarouselItem 
                key={index} 
                className={cn(
                  "pl-2 md:pl-4 transition-all duration-500",
                  isMobile ? "basis-full" : "basis-full sm:basis-1/2 lg:basis-[540px]"
                )}
              >
                <div 
                  className={cn(
                    "p-2 sm:p-4 transition-all duration-500",
                    isCenter 
                      ? "scale-100 opacity-100 translate-y-0" 
                      : "scale-[0.9] opacity-70 translate-y-2 brightness-75"
                  )}
                >
                  <MessageCard>
                    <div className={cn(
                      "transition-all duration-500 text-sm sm:text-base",
                      isCenter ? "opacity-100" : "opacity-90"
                    )}>
                      {testimonial.text}
                    </div>
                  </MessageCard>
                  <div className={cn(
                    "text-left pl-4 sm:pl-20 transition-all duration-500",
                    isCenter ? "opacity-100 translate-y-0" : "opacity-80 translate-y-2"
                  )}>
                    <h3 className="text-colorTheme-primary mt-4 font-semibold text-lg sm:text-xl">
                      {testimonial.author}
                    </h3>
                    <p className="text-white opacity-80 text-sm sm:text-base">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-32 mt-6 sm:mt-12">
          <button 
            className="bg-transparent border-none hover:bg-transparent p-0 cursor-pointer"
            onClick={() => handleManualNavigation(scrollPrev)}
            aria-label="Previous slide"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white hover:text-gray-300 transition-colors" />
          </button>
          
          <div className="flex gap-1 sm:gap-2 md:gap-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className="bg-transparent border-0 p-0 cursor-pointer"
                aria-label={`Go to slide ${index + 1}`}
              >
                <Sparkle
                  className={cn(
                    "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-all duration-300 rotate-45",
                    currentSlide === index 
                      ? "text-colorTheme-primary fill-colorTheme-primary stroke-colorTheme-primary" 
                      : "text-white/40 hover:text-white/60"
                  )}
                />
              </button>
            ))}
          </div>
          
          <button 
            className="bg-transparent border-none hover:bg-transparent p-0 cursor-pointer"
            onClick={() => handleManualNavigation(scrollNext)}
            aria-label="Next slide"
          >
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white hover:text-gray-300 transition-colors" />
          </button>
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselComp;