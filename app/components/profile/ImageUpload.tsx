"use client";
// ImageUpload.jsx
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import WebcamCapture from "@/components/profile/WebcamCapture";

const ImageUpload = () => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Handle file logic here
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="dropzone h-96 relative">
      <input {...getInputProps()} />
      <div className="flex flex-col items-center bg-violet-50 h-full justify-center text-xl p-3">
        <p className="text-2xl opacity-50 font-thin">Drag 'n' drop some files here, or click to select files</p>
        <p className="text-2xl opacity-50 font-thin">Supported formats: .png, .jpg, .jpeg</p>
      </div>
        <div className="bg-transparent absolute left-0 bottom-0">
          <WebcamCapture />
        </div>
    </div>
  );
};

export default ImageUpload;
