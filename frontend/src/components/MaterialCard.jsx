/* Shows either the placeholder or the analyzed preview */
export default function MaterialCard({ preview, analysis }) {
    return (
      <div className="border rounded-lg p-6 bg-gray-50 min-h-[420px] flex flex-col">
        {preview ? (
          <>
            <img
              src={preview}
              alt="preview"
              className="object-contain max-h-72 mx-auto"
            />
            {analysis ? (
              <ul className="mt-6 space-y-1">
                <li><strong>Material:</strong> {analysis.Material}</li>
                <li><strong>Colour:</strong> {analysis.Colour}</li>
                <li><strong>Properties:</strong> {analysis.Properties}</li>
                <li><strong>Uses:</strong> {analysis.Uses}</li>
              </ul>
            ) : (
              <p className="text-center text-gray-500 mt-4 italic">
                Click “Analyze” to see results
              </p>
            )}
          </>
        ) : (
          <p className="m-auto text-gray-400 text-lg text-center">
            Upload an image to preview &amp; analyze
          </p>
        )}
      </div>
    );
  }  