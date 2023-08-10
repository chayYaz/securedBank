import React from "react";
import "./Audio.css"


// Defining the Audio component as a functional component
const Audio = ({ src }) => {
  return (
    <audio controls>
      <source src={src} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
};

export default Audio;
