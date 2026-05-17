import {
  ATTRIBUTION,
  STANDARD_TERMS,
  buildTemplateVars,
  fillTemplate,
  formatDate,
} from "@/lib/nda-template";
import type { NDAData, Party } from "@/lib/types";

type Props = { data: NDAData };

export function NDAPreview({ data }: Props) {
  const vars = buildTemplateVars(data);

  return (
    <article className="mx-auto max-w-3xl rounded-md bg-white p-10 text-[15px] leading-relaxed text-slate-900 shadow-sm ring-1 ring-slate-200">
      <header className="border-b border-slate-300 pb-4">
        <h1 className="text-center text-xl font-bold uppercase tracking-wide">
          Mutual Non-Disclosure Agreement
        </h1>
      </header>

      <section className="mt-6">
        <h2 className="text-base font-bold uppercase tracking-wide">
          Cover Page
        </h2>
        <dl className="mt-3 grid grid-cols-[max-content_1fr] gap-x-4 gap-y-2 text-sm">
          <CoverRow label="Effective Date" value={formatDate(data.effectiveDate)} />
          <CoverRow label="Purpose" value={data.purpose} />
          <CoverRow label="MNDA Term" value={data.mndaTerm} />
          <CoverRow
            label="Term of Confidentiality"
            value={data.termOfConfidentiality}
          />
          <CoverRow label="Governing Law" value={data.governingLaw} />
          <CoverRow label="Jurisdiction" value={data.jurisdiction} />
        </dl>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <PartyCard label="Party A" party={data.partyA} />
          <PartyCard label="Party B" party={data.partyB} />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-base font-bold uppercase tracking-wide">
          Signatures
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Each party has caused this MNDA to be executed by its duly authorized
          representative as of the Effective Date.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <SignatureBlock party={data.partyA} />
          <SignatureBlock party={data.partyB} />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-base font-bold uppercase tracking-wide">
          Standard Terms
        </h2>
        <ol className="mt-3 list-decimal space-y-3 pl-6">
          {STANDARD_TERMS.map((s, i) => (
            <li key={i} className="text-justify">
              <span className="font-semibold">{s.heading}. </span>
              {fillTemplate(s.body, vars)}
            </li>
          ))}
        </ol>
      </section>

      <footer className="mt-8 border-t border-slate-200 pt-4 text-xs text-slate-500">
        {ATTRIBUTION}
      </footer>
    </article>
  );
}

function CoverRow({ label, value }: { label: string; value: string }) {
  return (
    <>
      <dt className="font-semibold text-slate-700">{label}</dt>
      <dd className="text-slate-900">{value || "—"}</dd>
    </>
  );
}

function PartyCard({ label, party }: { label: string; party: Party }) {
  return (
    <div className="rounded border border-slate-200 p-3 text-sm">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className="mt-1 font-semibold">{party.name || "—"}</div>
      {party.entityType && (
        <div className="text-slate-600">{party.entityType}</div>
      )}
      {party.address && (
        <div className="mt-1 whitespace-pre-line text-slate-600">
          {party.address}
        </div>
      )}
    </div>
  );
}

function SignatureBlock({ party }: { party: Party }) {
  return (
    <div className="text-sm">
      <div className="font-semibold">{party.name || "—"}</div>
      <div className="mt-6 border-b border-slate-400" />
      <div className="mt-1 text-xs text-slate-500">Signature</div>
      <div className="mt-3">
        <span className="font-medium">Name:</span>{" "}
        {party.signatoryName || "—"}
      </div>
      <div>
        <span className="font-medium">Title:</span>{" "}
        {party.signatoryTitle || "—"}
      </div>
      <div>
        <span className="font-medium">Email:</span>{" "}
        {party.signatoryEmail || "—"}
      </div>
      <div>
        <span className="font-medium">Date:</span> ____________________
      </div>
    </div>
  );
}

