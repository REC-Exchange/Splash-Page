export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  organization: string;
  phone: string;
}

export interface Fuel {
  type: 'wind' | 'solar' | 'geothermal';
}

export interface Generator {
  id: string;
  name: string;
  state: string;
  county: string;
  country: string;
  commencedOperationDate: Date;
  maxAnnualEnergy: number;
}

export interface Certificate {
  id: string;
  recNumber: string;
  isCertified: boolean;
  expirationDate: Date;
  generationDate: Date;
  fuel: Fuel;
  generator: Generator;
}

export interface RecListing {
  id: string;
  seller: User; // <-- maps to a user ID
  certificates: Certificate[];
}
