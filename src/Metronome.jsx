import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';
import './Metronome.css';

const Metronome = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(60);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const player = new Tone.Player({
      url: "https://tonejs.github.io/audio/drum-samples/CR78/kick.mp3",
      autostart: false,
    }).toDestination();
    setPlayer(player);

    return () => {
      player.dispose();
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      Tone.Transport.bpm.value = bpm;
      Tone.Transport.scheduleRepeat((time) => {
        player.start(time);
      }, "4n");
      Tone.Transport.start();
    } else {
      Tone.Transport.stop();
    }
  }, [isPlaying, bpm, player]);

  return (
    <div className="metronome">
      <h1>Metronome</h1>
      <input
        type="range"
        min="40"
        max="200"
        value={bpm}
        onChange={(e) => setBpm(e.target.value)}
        style={{ width: '80%', margin: '10px 0' }}
      />
      <div>{bpm} BPM</div>
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        style={{
          padding: '10px 20px',
          backgroundColor: isPlaying ? '#ff4b4b' : '#4caf50',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '10px',
        }}
      >
        {isPlaying ? "Stop" : "Start"}
      </button>
    </div>
  );
};

export default Metronome;
