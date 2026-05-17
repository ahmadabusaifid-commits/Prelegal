import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import {
  ATTRIBUTION,
  STANDARD_TERMS,
  buildTemplateVars,
  fillTemplate,
  formatDate,
} from "./nda-template";
import type { NDAData, Party } from "./types";

const styles = StyleSheet.create({
  page: {
    paddingTop: 56,
    paddingBottom: 64,
    paddingHorizontal: 56,
    fontSize: 10.5,
    lineHeight: 1.5,
    fontFamily: "Helvetica",
    color: "#0f172a",
  },
  title: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: "#cbd5e1",
    marginBottom: 12,
  },
  sectionHeading: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginTop: 14,
    marginBottom: 6,
  },
  coverRow: { flexDirection: "row", marginBottom: 3 },
  coverLabel: { fontFamily: "Helvetica-Bold", width: 140 },
  coverValue: { flex: 1 },
  partyRow: { flexDirection: "row", gap: 18, marginTop: 10 },
  partyCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    padding: 8,
    borderRadius: 3,
  },
  partyLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  partyName: { fontFamily: "Helvetica-Bold", marginBottom: 2 },
  muted: { color: "#475569" },
  signatureRow: { flexDirection: "row", gap: 24, marginTop: 12 },
  signatureBlock: { flex: 1 },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#475569",
    marginTop: 28,
    marginBottom: 2,
  },
  signatureCaption: { fontSize: 8, color: "#64748b", marginBottom: 6 },
  bold: { fontFamily: "Helvetica-Bold" },
  termItem: { flexDirection: "row", marginBottom: 6 },
  termIndex: { width: 22, fontFamily: "Helvetica-Bold" },
  termBody: { flex: 1, textAlign: "justify" },
  footer: {
    marginTop: 18,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    fontSize: 8,
    color: "#64748b",
  },
});

export function NDADocument({ data }: { data: NDAData }) {
  const vars = buildTemplateVars(data);

  return (
    <Document
      title="Mutual Non-Disclosure Agreement"
      author={data.partyA.name || "Prelegal"}
    >
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.title}>Mutual Non-Disclosure Agreement</Text>
        <View style={styles.hr} />

        <Text style={styles.sectionHeading}>Cover Page</Text>
        <CoverRow label="Effective Date" value={formatDate(data.effectiveDate)} />
        <CoverRow label="Purpose" value={data.purpose} />
        <CoverRow label="MNDA Term" value={data.mndaTerm} />
        <CoverRow
          label="Term of Confidentiality"
          value={data.termOfConfidentiality}
        />
        <CoverRow label="Governing Law" value={data.governingLaw} />
        <CoverRow label="Jurisdiction" value={data.jurisdiction} />

        <View style={styles.partyRow}>
          <PartyCard label="Party A" party={data.partyA} />
          <PartyCard label="Party B" party={data.partyB} />
        </View>

        <Text style={styles.sectionHeading}>Signatures</Text>
        <Text style={styles.muted}>
          Each party has caused this MNDA to be executed by its duly authorized
          representative as of the Effective Date.
        </Text>
        <View style={styles.signatureRow}>
          <SignatureBlock party={data.partyA} />
          <SignatureBlock party={data.partyB} />
        </View>

        <Text style={styles.sectionHeading}>Standard Terms</Text>
        {STANDARD_TERMS.map((s, i) => (
          <View key={i} style={styles.termItem}>
            <Text style={styles.termIndex}>{i + 1}.</Text>
            <Text style={styles.termBody}>
              <Text style={styles.bold}>{s.heading}. </Text>
              {fillTemplate(s.body, vars)}
            </Text>
          </View>
        ))}

        <Text style={styles.footer}>{ATTRIBUTION}</Text>
      </Page>
    </Document>
  );
}

function CoverRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.coverRow}>
      <Text style={styles.coverLabel}>{label}</Text>
      <Text style={styles.coverValue}>{value || "—"}</Text>
    </View>
  );
}

function PartyCard({ label, party }: { label: string; party: Party }) {
  return (
    <View style={styles.partyCard}>
      <Text style={styles.partyLabel}>{label}</Text>
      <Text style={styles.partyName}>{party.name || "—"}</Text>
      {party.entityType ? (
        <Text style={styles.muted}>{party.entityType}</Text>
      ) : null}
      {party.address ? (
        <Text style={[styles.muted, { marginTop: 2 }]}>{party.address}</Text>
      ) : null}
    </View>
  );
}

function SignatureBlock({ party }: { party: Party }) {
  return (
    <View style={styles.signatureBlock}>
      <Text style={styles.bold}>{party.name || "—"}</Text>
      <View style={styles.signatureLine} />
      <Text style={styles.signatureCaption}>Signature</Text>
      <Text>
        <Text style={styles.bold}>Name: </Text>
        {party.signatoryName || "—"}
      </Text>
      <Text>
        <Text style={styles.bold}>Title: </Text>
        {party.signatoryTitle || "—"}
      </Text>
      <Text>
        <Text style={styles.bold}>Email: </Text>
        {party.signatoryEmail || "—"}
      </Text>
      <Text>
        <Text style={styles.bold}>Date: </Text>
        ____________________
      </Text>
    </View>
  );
}

