import { useRef, useState } from "react";

// Add a real `src` per track once songs are ready - strips stay inert until then.
const tracks = [
  { title: "Track 01", src: null },
  { title: "Track 02", src: null },
  { title: "Track 03", src: null },
  { title: "Track 04", src: null },
  { title: "Track 05", src: null },
];

export const TrackCarousel = () => {
  const audioRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleStripClick = (index) => {
    const track = tracks[index];
    const audio = audioRef.current;

    if (index === activeIndex) {
      if (!track.src) return;
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
    if (!track.src) {
      setIsPlaying(false);
      return;
    }
    audio.src = track.src;
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
              <i className={`fa-solid ${track.src ? (active && isPlaying ? "fa-pause" : "fa-play") : "fa-clock"}`}></i>
            </span>
          </div>
        );
      })}
    </div>
  );
};
