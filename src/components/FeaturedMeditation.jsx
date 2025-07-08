"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import CustomLabel from "./common/CustomLabel";
import CompLayout from "./CompLayout";
import { fetchAudio } from "@/store/audio/audioThunk";
import { set } from "date-fns";

const FeaturedMeditation = () => {
  const dispatch = useDispatch();
  const { items, loader, error } = useSelector((state) => state.audio);
  const [selectedGenre, setSelectedGenre] = useState("HipHop");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [progress, setProgress] = useState(0);
  const [preLyricLine, setPreLyricLine] = useState("");

  const [currentLyricLine, setCurrentLyricLine] = useState("");
  const [nextLyricLine, setNextLyricLine] = useState("");

  const [lyricsArray, setLyricsArray] = useState([]);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(-1);
  const [lyricsLoading, setLyricsLoading] = useState(false);
  const audioRef = useRef(null);
  const genres = ["HipHop", "Electro", "Indie", "Lo-Fi", "Pop"];

  // Initialize audio after mount
  useEffect(() => {
    const audio = typeof window !== "undefined" ? new Audio() : null;
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    dispatch(fetchAudio());
  }, [dispatch]);

  // Parse lyrics with timestamps
  const parseLyrics = (lyricsText) => {
    const lines = lyricsText.split("\n");
    const parsedLines = [];

    lines.forEach((line) => {
      const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2})\]/g;
      const matches = line.match(timeRegex);

      if (matches) {
        const text = line.replace(timeRegex, "").trim();
        matches.forEach((match) => {
          const [minutes, seconds, hundredths] = match
            .slice(1, -1)
            .split(/[:.]/);
          const startTime =
            parseInt(minutes) * 60 +
            parseInt(seconds) +
            parseInt(hundredths) / 100;

          parsedLines.push({
            startTime,
            endTime: startTime + 5, // Each line shows for 5 seconds
            text,
          });
        });
      }
    });

    return parsedLines.sort((a, b) => a.startTime - b.startTime);
  };

  // Set initial track when items are loaded
  useEffect(() => {
    if (items.length > 0 && audioRef.current) {
      const defaultTrack = items.find(
        (track) => track.audioType === selectedGenre
      );
      if (defaultTrack) {
        setCurrentTrack(defaultTrack);
        audioRef.current.src = defaultTrack.audio.downloadURL;
        handleFetchLyrics(defaultTrack);
      }
    }
  }, [items, selectedGenre]);

  // Handle audio time update and lyrics sync
  useEffect(() => {
    if (!audioRef.current) return;

    const handleTimeUpdate = () => {
      if (!audioRef.current) return;

      // Update progress
      const progress =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);

      // Find current lyric
      const currentTime = audioRef.current.currentTime;
      const index = lyricsArray.findIndex(
        (line) => currentTime >= line.startTime && currentTime <= line.endTime
      );

      if (index !== -1 && index !== currentLyricIndex) {
        setCurrentLyricIndex(index);
        if (lyricsArray[index - 1].text) {
          setPreLyricLine(lyricsArray[index - 1].text);
        }
        setCurrentLyricLine(lyricsArray[index].text);
        setNextLyricLine(lyricsArray[index + 1]?.text || "");
      }
    };

    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [lyricsArray, currentLyricIndex]);

  const handleFetchLyrics = async (track) => {
    if (!track?.lyrics?.downloadURL) {
      setCurrentLyricLine("No lyrics available");
      return;
    }

    setLyricsLoading(true);
    try {
      const response = await fetch("/api/lyrics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: track.lyrics.downloadURL,
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch lyrics");

      const data = await response.json();

    
    

      const parsed = parseLyrics(data.lyrics);

    

      setLyricsArray(parsed);
      setCurrentLyricLine(parsed[0]?.text || "No lyrics available");
      setNextLyricLine(parsed[1]?.text || "");
      setCurrentLyricIndex(0);
    } catch (error) {
      console.error("Error fetching lyrics:", error);
      setCurrentLyricLine("Could not load lyrics");
      setLyricsArray([]);
    } finally {
      setLyricsLoading(false);
    }
  };

  const handleGenreChange = (value) => {
    setSelectedGenre(value);
    const genreTrack = items.find((track) => track.audioType === value);
    if (genreTrack && audioRef.current) {
      setCurrentTrack(genreTrack);
      audioRef.current.src = genreTrack.audio.downloadURL;
      handleFetchLyrics(genreTrack);
      setProgress(0);
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgress = (values) => {
    if (!audioRef.current) return;

    const newTime = (values[0] / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress(values[0]);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const getCurrentTime = () => {
    return formatTime(audioRef.current?.currentTime || 0);
  };

  const getDuration = () => {
    return formatTime(audioRef.current?.duration || 0);
  };

  const renderLyrics = () => {
    if (loader || lyricsLoading) {
      return <CustomLabel text="Loading..." className="bg-colorTheme-gray" />;
    }

    if (error) {
      return <CustomLabel text={error} className="bg-colorTheme-gray" />;
    }

    if (!currentTrack) {
      return (
        <CustomLabel text="No track selected" className="bg-colorTheme-gray" />
      );
    }

    return (
      <div className="flex flex-col gap-4 items-center justify-center">
        {preLyricLine && (
          <p
            className={`bg-colorTheme-gray font-medium text-center blur-[1px]  text-md px-2 py-1 rounded-lg transition-all  duration-300 transform `}
          >
            {preLyricLine}
          </p>
        )}

        <CustomLabel
          text={currentLyricLine}
          className={`bg-colorTheme-gray text-center text-xl transition-all duration-300 transform ${
            currentLyricIndex >= 0 ? "scale-105" : "scale-100"
          }`}
        />
        {nextLyricLine && (
          <p
            className={`bg-colorTheme-gray font-medium text-center  blur-[1px] text-md p-1 rounded-lg transition-all  duration-300 transform `}
          >
            {nextLyricLine}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="mt-12">
      <CompLayout
        title="Featured Meditation"
        description="Use the player below to sample our Al-generated meditation tracks, tailored to your unique needs. Each composition is crafted to help you find your inner peace and boost your mindfulness practice."
      >
        <div className="flex items-center justify-center w-full mb-16">
          <Select defaultValue="HipHop" onValueChange={handleGenreChange}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select Genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Music Genres</SelectLabel>
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-12 gap-6 h-auto md:h-72">
          <div className="col-span-12 md:col-span-4">
            <Card className="bg-colorTheme-gray h-full border border-black rounded-3xl p-6 space-y-6 shadow-[0_5px_0px_0px_rgba(1,1,1,1)] transition-all duration-300">
              <CustomLabel
                className="bg-colorTheme-primary inline-block my-6"
                text={currentTrack?.trackName || `${selectedGenre} Meditation`}
              />

              <div className="space-y-12">
                <div>
                  <Slider
                    defaultValue={[0]}
                    value={[progress]}
                    max={100}
                    step={1}
                    className="w-full"
                    onValueChange={handleProgress}
                  />

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-gray-600">
                      {getCurrentTime()}
                    </span>
                    <span className="text-sm text-gray-600">
                      {getDuration()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-600 hover:text-black"
                      disabled
                    >
                      <SkipBack className="h-5 w-5" />
                      <span className="sr-only">Previous</span>
                    </Button>
                    <Button
                      size="icon"
                      className="h-12 w-12 rounded-full bg-colorTheme-primary hover:bg-[#a5e088] text-black"
                      onClick={togglePlay}
                    >
                      {isPlaying ? (
                        <Pause className="h-5 w-5" />
                      ) : (
                        <Play className="h-5 w-5" />
                      )}
                      <span className="sr-only">Play/Pause</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-600 hover:text-black"
                      disabled
                    >
                      <SkipForward className="h-5 w-5" />
                      <span className="sr-only">Next</span>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className="col-span-12 md:col-span-8">
            <Card className="bg-colorTheme-primary min-h-72 md:h-full rounded-3xl p-8 flex flex-col items-center justify-center border border-black shadow-[0_5px_0px_0px_rgba(1,1,1,1)] transition-all duration-300">
              {renderLyrics()}
            </Card>
          </div>
        </div>
      </CompLayout>
    </div>
  );
};

export default FeaturedMeditation;
