// src/components/Dropzone.jsx
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Image as ImageIcon,
  Upload,
  XCircle,
  RefreshCcw,
} from "lucide-react";

/**
 * Props:
 *   onDrop(files:Array<File>) – called when a valid single image is chosen
 */
export default function Dropzone({ onDrop }) {
  const [previewURL, setPreviewURL] = useState("");
  const [error, setError] = useState("");

  /* ---------- drop / select handler ---------- */
  const handleAccepted = useCallback(
    (files) => {
      const file = files[0];
      setPreviewURL(URL.createObjectURL(file));
      setError("");
      onDrop(files); // keep analyzer API
    },
    [onDrop]
  );

  const handleRejected = () => {
    setError("Please upload a JPG, PNG or WEBP image smaller than 10 MB.");
    setPreviewURL("");
  };

  /* ---------- react-dropzone ---------- */
  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    accept: { "image/*": [] },
    maxSize: 10 * 1024 * 1024, // 10 MB
    multiple: false,
    onDropAccepted: handleAccepted,
    onDropRejected: handleRejected,
    // allow click & keyboard so <Enter> or a plain click opens the dialog
  });

  /* ---------- UI ---------- */
  const borderState = isDragActive
    ? "border-brand"
    : "border-gray-300 dark:border-neutral-700";

  return (
    <>
      {/* drop-area --------------------------------------------------- */}
      <div
        {...getRootProps()}
        className={`rounded-2xl h-[420px] flex items-center justify-center
                    bg-gray-50 dark:bg-card-dark backdrop-blur-lg glass-edge cursor-pointer transition-colors
                    hover:bg-gray-100 dark:hover:bg-neutral-700 border-2 border-dashed ${borderState}`}
      >
        <input {...getInputProps()} />

        {/* idle --------------------------------------------------- */}
        {!previewURL && (
          <div className="flex flex-col items-center gap-3 text-gray-500">
            <ImageIcon size={42} strokeWidth={1} />
            <p className="max-w-[14rem] text-center leading-snug">
              Drag an image here or{" "}
              <span className="text-brand hover:underline">browse</span>.
            </p>
          </div>
        )}

        {/* drag overlay ------------------------------------------- */}
        {isDragActive && (
          <div className="absolute inset-0 rounded-2xl bg-brand/10 backdrop-blur-sm" />
        )}

        {/* preview ------------------------------------------------- */}
        {previewURL && (
          <img
            src={previewURL}
            alt="preview"
            className="object-contain max-h-[380px] max-w-full"
          />
        )}
      </div>

      {/* footer row ------------------------------------------------- */}
      <div className="flex justify-between items-center mt-2">
        {previewURL && (
          <button
            type="button"
            className="flex items-center gap-1 text-sm text-brand hover:underline"
          >
            <RefreshCcw size={14} /> Replace image
          </button>
        )}

        {error && (
          <span className="flex items-center gap-1 text-xs text-red-400">
            <XCircle size={14} /> {error}
          </span>
        )}
      </div>
    </>
  );
}