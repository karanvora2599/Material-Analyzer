import { Tag, CheckCircle } from "lucide-react";

export default function MaterialCard({ preview, analysis }) {
  /* helpers -------------------------------------------------- */
  const splitList = (str = "") =>
    str
      .split(/[,•;\n]+/)           // comma, bullet, semicolon or newline
      .map((s) => s.trim())
      .filter(Boolean);

  return (
    <div
      className="rounded-2xl bg-card-light dark:bg-card-dark
                 border border-gray-200 dark:border-neutral-700
                 shadow-sm dark:shadow-none flex flex-col overflow-hidden"
      style={{ minHeight: 420 }}
    >
      {preview ? (
        <>
          {/* -------- thumbnail ------------------------------------------- */}
          <img
            src={preview}
            alt="preview"
            className="w-full object-contain max-h-56 bg-black/5 dark:bg-black/20"
          />

          {/* -------- details -------------------------------------------- */}
          {analysis ? (
            <div className="flex flex-col gap-5 p-6 text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
              {/* headline */}
              <h4 className="text-lg font-semibold flex items-center gap-1 break-words">
                <Tag size={16} className="text-brand shrink-0" />
                {analysis.Material || "—"}
              </h4>

              {/* colour pills */}
              <div className="flex flex-wrap gap-2">
                {splitList(analysis.Colour).map((c) => (
                  <span
                    key={c}
                    className="px-2.5 py-0.5 rounded-full
                               bg-brand/15 text-brand/90 text-xs font-medium
                               whitespace-nowrap"
                  >
                    {c}
                  </span>
                ))}
              </div>

              {/* divider */}
              <hr className="border-gray-200 dark:border-neutral-700" />

              {/* properties */}
              {analysis.Properties && (
                <section>
                  <h5 className="font-semibold mb-1 text-sm text-gray-900 dark:text-gray-100">
                    Key properties
                  </h5>
                  <p className="break-words">{analysis.Properties}</p>
                </section>
              )}

              {/* uses list */}
              {analysis.Uses && (
                <section>
                  <h5 className="font-semibold mb-1 text-sm text-gray-900 dark:text-gray-100">
                    Typical uses
                  </h5>
                  <ul className="space-y-1">
                    {splitList(analysis.Uses).map((u) => (
                      <li key={u} className="flex gap-2 items-start">
                        <CheckCircle size={14} className="text-brand mt-[3px]" />
                        <span className="break-words">{u}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          ) : (
            <p className="italic text-center text-gray-500 py-10">
              Click “Analyze” to see results
            </p>
          )}
        </>
      ) : (
        <div className="m-auto px-6 text-gray-400 text-center">
          Upload an image to preview &amp; analyze
        </div>
      )}
    </div>
  );
}