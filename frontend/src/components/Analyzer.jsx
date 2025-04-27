import { useState } from "react";
import Dropzone from "./Dropzone";
import MaterialCard from "./MaterialCard";
import Loader from "./Loader";
import ShadowButton from "./ShadowButton";
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
    <div className="grid md:grid-cols-2 gap-10">
      {/* Upload box */}
      <div>
        <Dropzone onDrop={handleDrop} />
        <div className="mt-5">
          <ShadowButton onClick={runAnalysis} disabled={!file || loading}>
              {loading ? "Analyzing…" : (
              <>
                <i className="fa-solid fa-magnifying-glass" /> Analyze
              </>
            )}
          </ShadowButton>
        </div>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </div>

      {/* Result card */}
      {loading ? (
        /* same size & styling as the real card so nothing shifts */
        <div className="rounded-2xl p-6 bg-card-light dark:bg-card-dark
                        shadow-sm border border-gray-200 dark:border-neutral-700
                        min-h-[420px] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <MaterialCard preview={previewURL} analysis={analysis} />
      )}
    </div>
  );
}