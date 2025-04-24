import { useState } from "react";
import Dropzone from "./Dropzone";
import MaterialCard from "./MaterialCard";
import { analyzeImage } from "../api";

export default function Analyzer() {
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDrop = (f) => {
    setError("");
    setAnalysis(null);
    const img = f[0];
    if (!img) return;
    setFile(img);
    setPreviewURL(URL.createObjectURL(img));
  };

  const runAnalysis = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const data = await analyzeImage(file);
      setAnalysis(data);
    } catch (e) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Upload box */}
      <div>
        <Dropzone onDrop={handleDrop} />
        <button
          onClick={runAnalysis}
          disabled={!file || loading}
          className="mt-4 inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700
                     disabled:opacity-50 text-white px-6 py-2 rounded-md"
        >
          {loading ? (
            <>
              <span className="animate-spin border-2 border-transparent border-l-white rounded-full h-4 w-4" />
              Analyzing…
            </>
          ) : (
            <>
              <i className="fa-solid fa-magnifying-glass"></i> Analyze
            </>
          )}
        </button>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </div>

      {/* Result card */}
      <MaterialCard preview={previewURL} analysis={analysis} />
    </div>
  );
}