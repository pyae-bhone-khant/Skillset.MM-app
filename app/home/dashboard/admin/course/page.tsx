import React from 'react';
import ReactPlayer from 'react-player';

export default function CoursePage() {
    return (
        <div>
             <div className="w-full max-w-3xl aspect-video mx-auto"> 
      <ReactPlayer 
        src= "https://youtu.be/Q6NpiIp-6WM?si=6zfhlJRL8qBNiral"
        width="100%"
        height="100%"
        controls={true} 
      />
    </div>
        </div>
    )
}