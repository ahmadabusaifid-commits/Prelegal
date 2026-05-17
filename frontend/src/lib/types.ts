export type Party = {
  name: string;
  entityType: string;
  address: string;
  signatoryName: string;
  signatoryTitle: string;
  signatoryEmail: string;
};

export type NDAData = {
  effectiveDate: string;
  partyA: Party;
  partyB: Party;
  purpose: string;
  mndaTerm: string;
  termOfConfidentiality: string;
  governingLaw: string;
  jurisdiction: string;
};

export const defaultNDAData: NDAData = {
  effectiveDate: "",
  partyA: {
    name: "Acme, Inc.",
    entityType: "Delaware corporation",
    address: "123 Main Street, San Francisco, CA 94105",
    signatoryName: "Jane Doe",
    signatoryTitle: "Chief Executive Officer",
    signatoryEmail: "jane@acme.example",
  },
  partyB: {
    name: "Globex LLC",
    entityType: "California limited liability company",
    address: "456 Market Street, San Francisco, CA 94103",
    signatoryName: "John Smith",
    signatoryTitle: "President",
    signatoryEmail: "john@globex.example",
  },
  purpose: "Evaluating a potential business relationship between the parties.",
  mndaTerm: "2 years from the Effective Date",
  termOfConfidentiality: "3 years from the date of disclosure",
  governingLaw: "California",
  jurisdiction: "San Francisco County, California",
};
