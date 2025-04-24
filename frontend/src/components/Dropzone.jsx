import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function Dropzone({ onDrop }) {
  const dz = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    onDrop,
  });

  return (
    <div
      {...dz.getRootProps()}
      className="border-2 border-dashed border-gray-300 rounded-lg
                 h-[420px] flex flex-col items-center justify-center
                 text-center cursor-pointer bg-gray-50 hover:bg-gray-100"
    >
      <input {...dz.getInputProps()} />
      <i className="fa-regular fa-image text-5xl text-gray-400 mb-4"></i>
      <p className="text-gray-500">
        Drag &amp; drop an image here, or click to select.
      </p>
    </div>
  );
}