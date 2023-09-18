import { createContext, FC, useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { addDoc, collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import { Certificate, Fuel, Generator, Listing, ListingCSV } from '../types';
import { UserContext } from './userContext';

type Props = {
  children?: React.ReactNode;
};

interface ListingsContextInterface {
  createListingFromCSV: (
    csvData: ListingCSV,
    price: number,
    expiration: Date,
    quantity: number,
    description: string
  ) => Promise<void>;
  fetchUserSaleListings: () => Promise<void>;
  userSaleListings: Listing[];
  allListings: Listing[];
}

export const ListingsContext = createContext<ListingsContextInterface>(
  {} as ListingsContextInterface
);

const ListingsProvider: FC<Props> = ({ children }) => {
  const [allListings, setAllListings] = useState<Listing[]>([]);
  const [userSaleListings, setUserSaleListings] = useState<Listing[]>([]);
  const { user } = useContext(UserContext);
  const listingsCollection = collection(db, 'listings');
  const createListingFromCSV = async (
    csvDatum: ListingCSV,
    price: number,
    expirationDate: Date,
    quantity: number,
    description: string
  ) => {
    const generator: Generator = {
      name: csvDatum.generator_name,
      state: csvDatum.generator_state,
      county: csvDatum.generator_county,
      country: csvDatum.generator_country,
      commencedOperationDate: new Date(),
      maxAnnualEnergy: csvDatum.generator_annual_production,
      fuels: [{ type: csvDatum.certificate_fuel } as Fuel]
    };

    const certificate: Certificate = {
      generator,
      fuel: { type: csvDatum.certificate_fuel } as Fuel,
      expirationDate: csvDatum.certificate_expiration_date
    };

    const listing: Listing = {
      sellerId: user.id,
      status: 'listed',
      description,
      expirationDate,
      quantity,
      price,
      certificate
    };

    await addDoc(listingsCollection, listing);
    return;
  };

  const fetchUserSaleListings = async () => {
    const listingsQuery = query(collection(db, 'listings'), where('sellerId', '==', user.id));
    getDocs(listingsQuery)
      .then((querySnapshot) => {
        console.log('query snapshot ', querySnapshot.docs);
        setUserSaleListings(querySnapshot.docs.map((doc) => doc.data() as Listing));
      })
      .catch((error) => {
        console.error('Error getting listings:', error);
      });
  };

  const fetchAllListings = async () => {
    const data = await getDocs(listingsCollection);
    setAllListings(data.docs.map((doc) => doc.data() as Listing));
  };

  useEffect(() => {
    fetchAllListings();
    fetchUserSaleListings();
  }, []);

  console.log('user listings ', userSaleListings);

  return (
    <ListingsContext.Provider
      value={{ createListingFromCSV, fetchUserSaleListings, userSaleListings, allListings }}>
      {children}
    </ListingsContext.Provider>
  );
};

export default ListingsProvider;
