"use client";
// WebcamCapture.jsx
import React, { useState } from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import { FaCamera } from "react-icons/fa";

const WebcamCapture = () => {
  const [image, setImage] = useState("");
  const [isCameraOn, setIsCameraOn] = useState(false);
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);

  return (
    <div className="bg-red-500 rounded-tr-full">
      {isCameraOn ? (
        <Webcam
          audio={false}
          height={720}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={1280}
          videoConstraints={{
            facingMode: "user",
          }}
        />
      ) : (
        <div className="relative">
          <FaCamera
            className="cursor-pointer absolute left-0 bottom-0 rounded-b-full rotate-45 text-wwhite"
            size={24}
            onClick={() => {
              setIsCameraOn(true);
              capture();
            }}
          />
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;
