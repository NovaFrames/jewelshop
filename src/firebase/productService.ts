import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDoc,
    query,
    limit,
    startAfter,
    DocumentSnapshot
} from 'firebase/firestore';
import { db } from './firebase';
import { type Product } from '../Pages/User/Products/Products';

const COLLECTION_NAME = 'products';

// Get all products (for components that need all data)
export const getProducts = async (): Promise<Product[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
        const products: Product[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            products.push({
                id: doc.id,
                ...data
            } as Product);
        });
        return products;
    } catch (error) {
        console.error("Error getting products: ", error);
        throw error;
    }
};

// Get paginated products for infinite scroll
export const getPaginatedProducts = async (
    pageSize: number = 4,
    lastDoc?: DocumentSnapshot
): Promise<{ products: Product[], lastVisible: DocumentSnapshot | null }> => {
    try {
        let q = query(collection(db, COLLECTION_NAME), limit(pageSize));

        if (lastDoc) {
            q = query(collection(db, COLLECTION_NAME), startAfter(lastDoc), limit(pageSize));
        }

        const querySnapshot = await getDocs(q);
        const products: Product[] = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            products.push({
                id: doc.id,
                ...data
            } as Product);
        });

        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1] || null;

        return { products, lastVisible };
    } catch (error) {
        console.error("Error getting paginated products:", error);
        throw error;
    }
};

// Get limited products (for home page)
export const getEightProducts = async (): Promise<Product[]> => {
    try {
        const q = query(
            collection(db, COLLECTION_NAME),
            limit(8)
        );

        const querySnapshot = await getDocs(q);
        const products: Product[] = [];

        querySnapshot.forEach((doc) => {
            products.push({
                id: doc.id,
                ...(doc.data() as Omit<Product, "id">),
            });
        });

        return products;
    } catch (error) {
        console.error("Error getting products:", error);
        throw error;
    }
};

// Get a single product by ID
export const getProductById = async (id: string): Promise<Product | null> => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Product;
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error getting product: ", error);
        throw error;
    }
};

// Add a new product
// We omit 'id' because Firestore generates it, or we can use a custom one.
// The Product interface has 'id', but when adding, we might not have it yet if we let Firestore generate it.
export const addProduct = async (product: Omit<Product, 'id'>): Promise<string> => {
    try {
        const docRef = await addDoc(collection(db, COLLECTION_NAME), product);
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error adding product: ", error);
        throw error;
    }
};

// Update a product
export const updateProduct = async (id: string, updatedData: Partial<Product>): Promise<void> => {
    try {
        const productRef = doc(db, COLLECTION_NAME, id);
        await updateDoc(productRef, updatedData);
        console.log("Document successfully updated!");
    } catch (error) {
        console.error("Error updating product: ", error);
        throw error;
    }
};

// Delete a product
export const deleteProduct = async (id: string): Promise<void> => {
    try {
        await deleteDoc(doc(db, COLLECTION_NAME, id));
        console.log("Document successfully deleted!");
    } catch (error) {
        console.error("Error removing product: ", error);
        throw error;
    }
};
