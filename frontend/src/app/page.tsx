"use client";

import { useState } from "react";
import { NDAForm } from "@/components/NDAForm";
import { NDAPreview } from "@/components/NDAPreview";
import { defaultNDAData, type NDAData } from "@/lib/types";

export default function Home() {
  const [data, setData] = useState<NDAData>(() => ({
    ...defaultNDAData,
    effectiveDate: new Date().toISOString().slice(0, 10),
  }));
  const [downloading, setDownloading] = useState(false);

  async function handleDownload() {
    setDownloading(true);
    try {
      const [{ pdf }, { NDADocument }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("@/lib/nda-pdf"),
      ]);
      const blob = await pdf(<NDADocument data={data} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename(data);
      document.body.appendChild(a);
      a.click();
      a.remove();
      // Delay revoke so the browser has time to start the download.
      setTimeout(() => URL.revokeObjectURL(url), 10_000);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Mutual NDA Creator
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Fill in the cover page on the left. The agreement on the right
            updates as you type. When you&rsquo;re happy with it, download a
            PDF.
          </p>
        </div>
        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading}
          className="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {downloading ? "Preparing PDF…" : "Download PDF"}
        </button>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,380px)_1fr]">
        <section aria-label="Cover page form" className="lg:sticky lg:top-6 lg:self-start">
          <NDAForm data={data} onChange={setData} />
        </section>
        <section aria-label="Document preview">
          <NDAPreview data={data} />
        </section>
      </div>
    </main>
  );
}

function filename(data: NDAData): string {
  const slug = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  const a = slug(data.partyA.name) || "party-a";
  const b = slug(data.partyB.name) || "party-b";
  return `mutual-nda-${a}-${b}.pdf`;
}
