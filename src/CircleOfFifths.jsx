import React, { useState } from 'react';
import * as Tone from 'tone';
import './CircleOfFifths.css';

const notes = [
  { key: 'C', major: 'Do', minor: 'La menor', color: '#a8d5e2', majorScale: ['C', 'D', 'E', 'F', 'G', 'A', 'B'], minorScale: ['A', 'B', 'C', 'D', 'E', 'F', 'G'] },
  { key: 'G', major: 'Sol', minor: 'Mi menor', color: '#a8d5e2', majorScale: ['G', 'A', 'B', 'C', 'D', 'E', 'F#'], minorScale: ['E', 'F#', 'G', 'A', 'B', 'C', 'D'] },
  { key: 'D', major: 'Re', minor: 'Si menor', color: '#a8d5e2', majorScale: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'], minorScale: ['B', 'C#', 'D', 'E', 'F#', 'G', 'A'] },
  { key: 'A', major: 'La', minor: 'Fa# menor', color: '#a8d5e2', majorScale: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'], minorScale: ['F#', 'G#', 'A', 'B', 'C#', 'D', 'E'] },
  { key: 'E', major: 'Mi', minor: 'Do# menor', color: '#a8d5e2', majorScale: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'], minorScale: ['C#', 'D#', 'E', 'F#', 'G#', 'A', 'B'] },
  { key: 'B', major: 'Si', minor: 'Sol# menor', color: '#a8d5e2', majorScale: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'], minorScale: ['G#', 'A#', 'B', 'C#', 'D#', 'E', 'F#'] },
  { key: 'F#', major: 'Fa#', minor: 'Re# menor', color: '#a8d5e2', majorScale: ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#'], minorScale: ['D#', 'E#', 'F#', 'G#', 'A#', 'B', 'C#'] },
  { key: 'Db', major: 'Reb', minor: 'Sib menor', color: '#d5e2a8', majorScale: ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C'], minorScale: ['Bb', 'C', 'Db', 'Eb', 'F', 'Gb', 'Ab'] },
  { key: 'Ab', major: 'Lab', minor: 'Fa menor', color: '#d5e2a8', majorScale: ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G'], minorScale: ['F', 'G', 'Ab', 'Bb', 'C', 'Db', 'Eb'] },
  { key: 'Eb', major: 'Mib', minor: 'Do menor', color: '#d5e2a8', majorScale: ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'], minorScale: ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb'] },
  { key: 'Bb', major: 'Sib', minor: 'Sol menor', color: '#d5e2a8', majorScale: ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'], minorScale: ['G', 'A', 'Bb', 'C', 'D', 'Eb', 'F'] },
  { key: 'F', major: 'Fa', minor: 'Re menor', color: '#d5e2a8', majorScale: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'], minorScale: ['D', 'E', 'F', 'G', 'A', 'Bb', 'C'] },
];

const CircleOfFifths = () => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [chordType, setChordType] = useState('major');
  const [extensions, setExtensions] = useState([]);
  const synth = new Tone.Synth().toDestination();

  const handleClick = (note) => {
    setSelectedNote(note);
  };

  const playScale = (scale) => {
    const now = Tone.now();
    scale.forEach((n, index) => {
      synth.triggerAttackRelease(n, '8n', now + index * 0.5);
    });
  };

  const getChordNotes = (root, type, extensions) => {
    const baseNotes = {
      major: ['1', '3', '5'],
      minor: ['1', 'b3', '5'],
    };
    const extensionNotes = {
      9: ['9'],
      11: ['11'],
      13: ['13'],
    };

    let notes = baseNotes[type];
    extensions.forEach(ext => {
      notes = notes.concat(extensionNotes[ext]);
    });

    return notes;
  };

  const handlePlayChord = () => {
    if (!selectedNote) return;

    const root = selectedNote.key;
    const notes = getChordNotes(root, chordType, extensions);
    playScale(notes);
  };

  return (
    <div className="circle-of-fifths">
      <svg viewBox="0 0 200 200" width="400" height="400">
        {notes.map((note, index) => {
          const angle = (index / notes.length) * 360;
          const transform = `rotate(${angle} 100 100)`;
          return (
            <g key={note.key} transform={transform} onClick={() => handleClick(note)}>
              <circle cx="100" cy="30" r="15" fill={note.color} />
              <text x="100" y="35" textAnchor="middle" fill="#000" fontSize="8">{note.major}</text>
              <text x="100" y="45" textAnchor="middle" fill="#000" fontSize="6">{note.minor}</text>
            </g>
          );
        })}
      </svg>

      {selectedNote && (
        <div className="chord-details">
          <h2>{selectedNote.major} ({selectedNote.minor})</h2>
          <h3>Acordes en la Escala Mayor:</h3>
          <ul>
            {selectedNote.majorScale.map(note => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          <h3>Acordes en la Escala Menor:</h3>
          <ul>
            {selectedNote.minorScale.map(note => (
              <li key={note}>{note}</li>
            ))}
          </ul>

          <div>
            <label>
              <input
                type="radio"
                name="chordType"
                value="major"
                checked={chordType === 'major'}
                onChange={() => setChordType('major')}
              />
              Mayor
            </label>
            <label>
              <input
                type="radio"
                name="chordType"
                value="minor"
                checked={chordType === 'minor'}
                onChange={() => setChordType('minor')}
              />
              Menor
            </label>
          </div>

          <div>
            <label>
              <input
                type="checkbox"
                value="9"
                onChange={(e) => setExtensions([...extensions, e.target.value])}
              />
              9
            </label>
            <label>
              <input
                type="checkbox"
                value="11"
                onChange={(e) => setExtensions([...extensions, e.target.value])}
              />
              11
            </label>
            <label>
              <input
                type="checkbox"
                value="13"
                onChange={(e) => setExtensions([...extensions, e.target.value])}
              />
              13
            </label>
          </div>

          <button onClick={handlePlayChord}>Reproducir Acorde</button>
        </div>
      )}
    </div>
  );
};

export default CircleOfFifths;
