import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface GoldRates {
    gold24k: number;
    gold22k: number;
    gold18k: number;
    gold14k: number;
    unit: string;
    source: string;
    updatedAt: any;
}

export interface GoldMultiplier {
    value: number;
    updatedAt: any;
}

const COLLECTION_NAME = 'goldRates';
const DOCUMENT_ID = 'tamilnadu';
const MULTIPLIER_DOC_ID = 'multiplier';

/**
 * Fetches the latest gold rates from Firestore
 */
export const getGoldRates = async (): Promise<GoldRates | null> => {
    try {
        const docRef = doc(db, COLLECTION_NAME, DOCUMENT_ID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as GoldRates;
        } else {
            console.warn("No gold rates found in Firestore!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching gold rates:", error);
        throw error;
    }
};

/**
 * Subscribes to real-time updates of gold rates
 */
export const subscribeToGoldRates = (callback: (rates: GoldRates | null) => void) => {
    const docRef = doc(db, COLLECTION_NAME, DOCUMENT_ID);
    return onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
            callback(docSnap.data() as GoldRates);
        } else {
            callback(null);
        }
    }, (error) => {
        console.error("Error subscribing to gold rates:", error);
    });
};

/**
 * Fetches the gold multiplier from Firestore
 */
export const getGoldMultiplier = async (): Promise<GoldMultiplier | null> => {
    try {
        const docRef = doc(db, COLLECTION_NAME, MULTIPLIER_DOC_ID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as GoldMultiplier;
        } else {
            // Default value if not set
            return { value: 1.07, updatedAt: new Date() };
        }
    } catch (error) {
        console.error("Error fetching gold multiplier:", error);
        throw error;
    }
};

/**
 * Updates the gold multiplier in Firestore
 */
export const updateGoldMultiplier = async (value: number): Promise<void> => {
    try {
        const docRef = doc(db, COLLECTION_NAME, MULTIPLIER_DOC_ID);
        await setDoc(docRef, {
            value,
            updatedAt: new Date()
        });
    } catch (error) {
        console.error("Error updating gold multiplier:", error);
        throw error;
    }
};

/**
 * Subscribes to real-time updates of the gold multiplier
 */
export const subscribeToGoldMultiplier = (callback: (multiplier: GoldMultiplier | null) => void) => {
    const docRef = doc(db, COLLECTION_NAME, MULTIPLIER_DOC_ID);
    return onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
            callback(docSnap.data() as GoldMultiplier);
        } else {
            callback({ value: 1.07, updatedAt: new Date() });
        }
    }, (error) => {
        console.error("Error subscribing to gold multiplier:", error);
    });
};
