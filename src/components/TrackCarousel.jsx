import { useRef, useState } from "react";
import sampleAudio from "/src/audio/Sample.webm";

// Swap `src` per track once real songs are ready — titles are placeholders.
const tracks = [
  { title: "Track 01", src: sampleAudio },
  { title: "Track 02", src: sampleAudio },
  { title: "Track 03", src: sampleAudio },
  { title: "Track 04", src: sampleAudio },
  { title: "Track 05", src: sampleAudio },
];

export const TrackCarousel = () => {
  const audioRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleStripClick = (index) => {
    const audio = audioRef.current;

    if (index === activeIndex) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
      return;
    }

    setActiveIndex(index);
    audio.src = tracks[index].src;
    audio.play();
    setIsPlaying(true);
  };

  return (
    <div className="track-carousel">
      <audio
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
      />
      {tracks.map((track, i) => {
        const active = i === activeIndex;
        return (
          <div
            key={track.title}
            className={`track-strip ${active ? "active" : ""} ${active && isPlaying ? "playing" : ""}`}
            onClick={() => handleStripClick(i)}
          >
            <span className="track-index">0{i + 1}</span>
            <span className="track-title">{track.title}</span>
            <span className="track-icon">
              <i className={`fa-solid ${active && isPlaying ? "fa-pause" : "fa-play"}`}></i>
            </span>
          </div>
        );
      })}
    </div>
  );
};
