import { useState, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Palette, Hammer, Tag } from "lucide-react";

/* quick colour → swatch; falls back to brand blue */
const colourToHsl = (name) => {
  const h = [...name].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % 360;
  return `hsl(${h} 70% 50%)`;
};

export default function MaterialCard({ preview, analysis }) {
  const [open, setOpen] = useState({ prop: true, uses: true });

  const pills = (text = "") =>
    text.split(/[,•;\n]+/).map((s) => s.trim()).filter(Boolean);

  return (
    <div
      className="rounded-3xl overflow-hidden border border-gray-200 dark:border-neutral-700
                 bg-card-light dark:bg-card-dark backdrop-blur-lg glass-edge shadow-md dark:shadow-none flex flex-col
                 transition-colors backdrop-blur-lg glass-edge glass-hover"
      style={{ minHeight: 420 }}
    >
      {/* ─── hero image ─────────────────────────────────────────────── */}
      {preview ? (
        <div className="relative group">
          <img
            src={preview}
            alt="preview"
            className="w-full h-56 object-cover"
          />
          {/* subtle gradient to make white images visible */}
          <div className="absolute inset-0 bg-gradient-to-t
                          from-black/50 via-black/5 to-transparent" />
          {analysis?.Material && (
            <span
              className="absolute bottom-3 left-3 px-3 py-1 rounded-full backdrop-blur
                         bg-white/20 dark:bg-black/40 text-white text-sm font-semibold
                         flex items-center gap-1"
            >
              <Tag size={14} /> {analysis.Material}
            </span>
          )}
        </div>
      ) : (
        <div className="m-auto text-gray-400 p-6 text-center">
          Upload an image to preview&nbsp;&amp; analyze
        </div>
      )}

      {analysis && (
        <div className="p-6 flex flex-col gap-5 text-sm text-gray-800 dark:text-gray-200 grow">
          {/* ─── colours row ─────────────────────────────────────── */}
          {analysis.Colour && (
            <section className="flex items-center gap-2 flex-wrap">
              <Palette size={16} className="text-brand shrink-0" />
              {pills(analysis.Colour).map((c) => (
                <span
                  key={c}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full
                             bg-brand/15 text-xs capitalize"
                  style={{ background: colourToHsl(c) + "20", color: colourToHsl(c) }}
                >
                  <span
                    className="inline-block w-2 h-2 rounded-full"
                    style={{ background: colourToHsl(c) }}
                  />
                  {c}
                </span>
              ))}
            </section>
          )}

          {/* ─── collapsible blocks ─────────────────────────────── */}
          {[
            {
              key: "prop",
              title: "Key properties",
              icon: <Hammer size={14} />,
              body: analysis.Properties,
            },
            {
              key: "uses",
              title: "Typical uses",
              icon: <ChevronDown size={14} className="rotate-90" />, // fake bullet
              body: pills(analysis.Uses)
                .map((u, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <ChevronDown
                      size={12}
                      className="text-brand rotate-90 mt-[3px] shrink-0"
                    />
                    {u}
                  </li>
                ))
                .reduce(
                  (acc, el) => (acc.length ? [...acc, <Fragment key={crypto.randomUUID()}>{el}</Fragment>] : [el]),
                  []
                ),
              list: true,
            },
          ].map(({ key, title, icon, body, list }) => (
            <div key={key} className="border-t border-gray-200 dark:border-neutral-700 pt-3">
              <button
                onClick={() => setOpen((o) => ({ ...o, [key]: !o[key] }))}
                className="w-full flex justify-between items-center text-left font-semibold"
              >
                <span className="flex items-center gap-2">
                  {icon} {title}
                </span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${open[key] ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence initial={false}>
                {open[key] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-2 text-gray-700 dark:text-gray-300">
                      {list ? <ul className="space-y-1">{body}</ul> : body}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}