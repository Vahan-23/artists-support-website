import type { CSSProperties } from "react";

const notes = ["♪", "♫", "♬", "♩", "♭", "♯", "♪", "♫", "♬", "♩", "♪", "♫"];

const lanes = [4, 12, 19, 27, 36, 45, 54, 63, 72, 81, 89, 96];
const durations = [15, 18, 14, 20, 16, 19, 17, 21, 15, 22, 16, 18];
const delays = [-2, -7, -11, -5, -14, -9, -17, -4, -12, -20, -8, -15];
const drifts = [26, -18, 24, -22, 18, -16, 20, -25, 17, -19, 23, -21];
const sizes = [2.2, 1.9, 2.1, 1.8, 2, 2.3, 1.9, 2.2, 1.8, 2.1, 2, 2.3];

export function FloatingNotes() {
  return (
    <div className="floating-notes" aria-hidden>
      {notes.map((note, index) => (
        <span
          key={`${note}-${index}`}
          className="floating-note"
          style={
            {
              "--note-left": `${lanes[index]}%`,
              "--note-duration": `${durations[index]}s`,
              "--note-delay": `${delays[index]}s`,
              "--note-drift": `${drifts[index]}px`,
              "--note-size": `${sizes[index]}rem`,
            } as CSSProperties
          }
        >
          {note}
        </span>
      ))}
    </div>
  );
}
