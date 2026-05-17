"use client";

import type { NDAData, Party } from "@/lib/types";

type Props = {
  data: NDAData;
  onChange: (next: NDAData) => void;
};

export function NDAForm({ data, onChange }: Props) {
  const update = <K extends keyof NDAData>(key: K, value: NDAData[K]) =>
    onChange({ ...data, [key]: value });

  return (
    <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
      <Field
        label="Effective Date"
        type="date"
        value={data.effectiveDate}
        onChange={(v) => update("effectiveDate", v)}
      />

      <PartyFieldset
        legend="Party A"
        party={data.partyA}
        onChange={(p) => update("partyA", p)}
      />
      <PartyFieldset
        legend="Party B"
        party={data.partyB}
        onChange={(p) => update("partyB", p)}
      />

      <Field
        label="Purpose"
        textarea
        value={data.purpose}
        onChange={(v) => update("purpose", v)}
        hint="The reason the parties are sharing confidential information."
      />
      <Field
        label="MNDA Term"
        value={data.mndaTerm}
        onChange={(v) => update("mndaTerm", v)}
        hint='e.g. "2 years from the Effective Date"'
      />
      <Field
        label="Term of Confidentiality"
        value={data.termOfConfidentiality}
        onChange={(v) => update("termOfConfidentiality", v)}
        hint='e.g. "3 years from the date of disclosure"'
      />
      <Field
        label="Governing Law (state)"
        value={data.governingLaw}
        onChange={(v) => update("governingLaw", v)}
      />
      <Field
        label="Jurisdiction"
        value={data.jurisdiction}
        onChange={(v) => update("jurisdiction", v)}
        hint='e.g. "San Francisco County, California"'
      />
    </form>
  );
}

function PartyFieldset({
  legend,
  party,
  onChange,
}: {
  legend: string;
  party: Party;
  onChange: (p: Party) => void;
}) {
  const set = <K extends keyof Party>(key: K, value: Party[K]) =>
    onChange({ ...party, [key]: value });

  return (
    <fieldset className="rounded-lg border border-slate-200 bg-white p-4">
      <legend className="px-2 text-sm font-semibold text-slate-700">
        {legend}
      </legend>
      <div className="space-y-4">
        <Field
          label="Legal name"
          value={party.name}
          onChange={(v) => set("name", v)}
        />
        <Field
          label="Entity type"
          value={party.entityType}
          onChange={(v) => set("entityType", v)}
          hint='e.g. "Delaware corporation"'
        />
        <Field
          label="Address"
          textarea
          value={party.address}
          onChange={(v) => set("address", v)}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            label="Signatory name"
            value={party.signatoryName}
            onChange={(v) => set("signatoryName", v)}
          />
          <Field
            label="Signatory title"
            value={party.signatoryTitle}
            onChange={(v) => set("signatoryTitle", v)}
          />
        </div>
        <Field
          label="Signatory email"
          type="email"
          value={party.signatoryEmail}
          onChange={(v) => set("signatoryEmail", v)}
        />
      </div>
    </fieldset>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  textarea = false,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  textarea?: boolean;
  hint?: string;
}) {
  const baseClass =
    "block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500";

  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </span>
      {textarea ? (
        <textarea
          className={baseClass}
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className={baseClass}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {hint && (
        <span className="mt-1 block text-xs text-slate-500">{hint}</span>
      )}
    </label>
  );
}
