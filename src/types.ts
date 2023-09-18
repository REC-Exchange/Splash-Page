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
  name: string;
  state: string;
  county: string;
  country: string;
  commencedOperationDate: Date;
  maxAnnualEnergy: number;
  fuels: Fuel[];
}

export interface Certificate {
  generator: Generator;
  fuel: Fuel;
  expirationDate: Date;
}

export interface Listing {
  id?: string;
  sellerId: string;
  buyerId?: string;
  quantity: number;
  price: number;
  status:
    | 'pending-seller'
    | 'pending-buyer'
    | 'pending-recx'
    | 'processing'
    | 'completed'
    | 'expired'
    | 'listed';
  expirationDate: Date;
  description: string;
  certificate: Certificate;
}

export const requiredCsvFields = [
  'generator_name',
  'generator_state',
  'generator_county',
  'generator_country',
  'generator_start_date',
  'generator_annual_production',
  'certificate_id',
  'certificate_fuel',
  'certificate_expiration_date'
];

export interface ListingCSV {
  generator_name: string;
  generator_state: string;
  generator_county: string;
  generator_country: string;
  generator_start_date: Date;
  generator_annual_production: number;
  certificate_id: string;
  certificate_fuel: string;
  certificate_expiration_date: Date;
}
