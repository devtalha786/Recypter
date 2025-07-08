
//   "use client";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
// import { Slider } from "@/components/ui/slider";
// import CompLayout from "./CompLayout";
// import CustomLabel from "./common/CustomLabel";
// import { useEffect, useState, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchVideos } from "@/store/audio/audioThunk";

// export default function VideoSection() {
//   const dispatch = useDispatch();
//   const { vidloader, videoItems } = useSelector((state) => state.audio);
//   console.log('videoItems: ', JSON.stringify(videoItems));
//   const [isPlaying, setIsPlaying] = useState(false);

//   useEffect(() => {
//     dispatch(fetchVideos());
//   }, [dispatch]);

//   // YouTube video ID extraction
//   const getVideoId = (url) => {
//     const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*\?v=)|youtu\.be\/)([a-zA-Z0-9_-]+)/);
//     return match ? match[1] : null;
//   };

//   const handlePlayPause = () => {
//     setIsPlaying(!isPlaying); // Just toggling the state here since YouTube video will play automatically
//   };

//   return (
//     <CompLayout
//       title="MizanMe in Action"
//       description="Watch how our AI transforms your mood into personalized songs. Discover the seamless blend of technology and tranquility that makes MizanMe unique."
//     >
//       {/* Video Section */}
//       <div className="grid grid-cols-1 gap-6 h-[60vh]">
//         {/* Video Player Card */}
//         <Card className="bg-gray-100 h-full flex flex-col justify-center items-center rounded-3xl p-6 space-y-6 border border-black shadow-[0_5px_0px_0px_rgba(1,1,1,1)] transition-all duration-300">
//           <div className="w-full ">
//             {/* Video Label */}
//             <CustomLabel
//               text="Video"
//               className="inline-block bg-colorTheme-primary mb-12"
//             />

//             {/* YouTube Embed */}
//             {videoItems.length > 0 && (
//               <div className="w-full h-[60vh] relative">
//                 <iframe
//                   src={`https://www.youtube.com/embed/${getVideoId(videoItems[0].url)}?autoplay=${isPlaying ? 1 : 0}`}
//                   title="Video"
//                   className="w-full h-full rounded-3xl"
//                   frameBorder="0"
//                   allow="autoplay; encrypted-media"
//                   allowFullScreen
//                 ></iframe>
//               </div>
//             )}

//             {/* Video Controls */}
//             {/* <div className="space-y-16 ">
//               <div className="flex items-center justify-between ">
//                 <span className="text-sm text-gray-600">2:25</span>
//                 <div className="flex items-center gap-4">
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className="text-gray-600 hover:text-black"
//                   >
//                     <SkipBack className="h-5 w-5" />
//                     <span className="sr-only">Previous</span>
//                   </Button>
//                   <Button
//                     size="icon"
//                     className="h-12 w-12 rounded-full bg-colorTheme-primary hover:bg-[#a5e088] text-black"
//                     onClick={handlePlayPause} // Toggle play/pause on click
//                   >
//                     {isPlaying ? (
//                       <Pause className="h-5 w-5" />
//                     ) : (
//                       <Play className="h-5 w-5" />
//                     )}
//                     <span className="sr-only">Play/Pause</span>
//                   </Button>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className="text-gray-600 hover:text-black"
//                   >
//                     <SkipForward className="h-5 w-5" />
//                     <span className="sr-only">Next</span>
//                   </Button>
//                 </div>
//                 <span className="text-sm text-gray-600">4:02</span>
//               </div>

//               <Slider
//                 defaultValue={[55]}
//                 max={100}
//                 step={1}
//                 className="w-full"
//               />
//             </div> */}
//           </div>
//         </Card>
//       </div>
//     </CompLayout>
//   );
// }

"use client";
import React, { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import CompLayout from "./CompLayout";
import CustomLabel from "./common/CustomLabel";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "@/store/audio/audioThunk";

const VideoSection = () => {
  const dispatch = useDispatch();
  const { vidloader, videoItems } = useSelector((state) => state.audio);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  useEffect(() => {
    if (videoItems.length > 0) {
      setCurrentVideo(videoItems[0]);
    }
  }, [videoItems]);

  // YouTube video ID extraction
  const getVideoId = (url) => {
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*\?v=)|youtu\.be\/)([a-zA-Z0-9_-]+)/;
    const match = url?.match(youtubeRegex);
    return match ? match[1] : null;
  };

  // Check if URL is a YouTube link
  const isYoutubeUrl = (url) => {
    return url?.includes('youtube.com') || url?.includes('youtu.be');
  };

  const renderVideoPlayer = () => {
    if (!currentVideo) return null;

    const videoUrl = currentVideo.videoUrl || currentVideo.url;
    
    if (isYoutubeUrl(videoUrl)) {
      const videoId = getVideoId(videoUrl);
      return (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}`}
          title="YouTube Video"
          className="w-full h-full rounded-3xl"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      );
    } else {
      return (
        <video
          src={videoUrl}
          className="w-full h-full rounded-3xl"
          controls
          autoPlay={isPlaying}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          Your browser does not support the video tag.
        </video>
      );
    }
  };

  return (
    <CompLayout
      title="MizanMe in Action"
      description="Watch how our AI transforms your mood into personalized songs. Discover the seamless blend of technology and tranquility that makes MizanMe unique."
    >
      <div className="grid grid-cols-1 gap-6 h-[60vh]">
        <Card className="bg-gray-100 h-full flex flex-col justify-center items-center rounded-3xl p-6 space-y-6 border border-black shadow-[0_5px_0px_0px_rgba(1,1,1,1)] transition-all duration-300">
          <div className="w-full">
            <CustomLabel
              text="Video"
              className="inline-block bg-colorTheme-primary mb-12"
            />
            
            <div className="w-full h-[60vh] relative">
              {renderVideoPlayer()}
            </div>
          </div>
        </Card>
      </div>
    </CompLayout>
  );
};

export default VideoSection;