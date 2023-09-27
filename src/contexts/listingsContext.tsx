import { createContext, FC, useContext, useEffect, useMemo, useState } from 'react';
import { db } from '../firebase';
import { addDoc, collection, getDocs, updateDoc, doc } from 'firebase/firestore';
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
  userSaleListings: Listing[];
  userPurchaseListings: Listing[];
  listingsForSale: Listing[];
  initializeListingPurchase: (listing: Listing) => Promise<void>;
  refreshListings: VoidFunction;
}

export const ListingsContext = createContext<ListingsContextInterface>(
  {} as ListingsContextInterface
);

const ListingsProvider: FC<Props> = ({ children }) => {
  const [allListings, setAllListings] = useState<Listing[]>([]);
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

  const fetchAllListings = async () => {
    try {
      const data = await getDocs(listingsCollection);
      const allListings = data.docs.map((doc) => {
        const listingData = doc.data() as Listing;
        // Include the document ID in the Listing object
        return { id: doc.id, ...listingData };
      });
      console.log('all listings', allListings);
      setAllListings(allListings);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  const initializeListingPurchase = async (listing: Listing) => {
    const listingRef = doc(listingsCollection, listing.id);
    try {
      // Use the updateDoc function to add the buyer's ID to the listing document
      await updateDoc(listingRef, {
        buyerId: user.id,
        status: 'pending-seller'
      });
    } catch (error) {
      console.error('Error updating listing document:', error);
    }
  };

  useEffect(() => {
    if (user && user.id) {
      fetchAllListings();
    }
  }, [user]);

  const userSaleListings = useMemo(
    () => allListings.filter((listing) => listing.sellerId === user.id),
    [allListings]
  );

  const userPurchaseListings = useMemo(
    () => allListings.filter((listing) => listing.buyerId === user.id),
    [allListings]
  );

  const listingsForSale = useMemo(
    () => allListings.filter((listing) => listing.status === 'listed'),
    [allListings]
  );

  return (
    <ListingsContext.Provider
      value={{
        createListingFromCSV,
        userSaleListings,
        userPurchaseListings,
        listingsForSale,
        initializeListingPurchase,
        refreshListings: fetchAllListings
      }}>
      {children}
    </ListingsContext.Provider>
  );
};

export default ListingsProvider;
