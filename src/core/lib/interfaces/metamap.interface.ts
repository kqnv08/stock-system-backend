export interface IMetamapEvent {
    metadata: Metadata;
    resource: string;
    step?: Step;
    eventName: string;
    flowId: string;
    timestamp: string;
  }
  export interface Metadata {
    customerId: string;
  }
  export interface Step {
    status: number;
    id: string;
    error?: null;
    data?: Data;
    documentType: string;
  }
  export interface Data {
    dateOfBirth: string;
    dateOfDeath?: null;
    email?: null;
    fullName: string;
    firstName: string;
    surname: string;
    taxIdType: string;
    taxNumber: string;
    activityCode?: null;
    activityDescription?: null;
    address: string;
    dniNumber: string;
    phoneNumbers?: (string)[] | null;
    cuit: string;
    nationality: string;
    gender: "F"|"M";
    dateOfIssue: string;
    dateOfExpiry: string;
    transactionNumber: string;
    version: string;
    sanctioned?: null;
    pep?: null;
    sujetoObligado?: null;
    deceased: boolean;
  }
  