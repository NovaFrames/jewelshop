import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
} from 'firebase/firestore';
import { db } from './firebase';

export interface Category {
    id: string;
    name: string;
}

export interface Material {
    id: string;
    name: string;
}

const CATEGORY_COLLECTION = 'categories';
const MATERIAL_COLLECTION = 'materials';

// --- Categories ---

export const getCategories = async (): Promise<Category[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, CATEGORY_COLLECTION));
        const categories: Category[] = [];
        querySnapshot.forEach((doc) => {
            categories.push({ id: doc.id, ...doc.data() } as Category);
        });
        return categories;
    } catch (error) {
        console.error("Error getting categories: ", error);
        throw error;
    }
};

export const addCategory = async (name: string): Promise<string> => {
    try {
        const docRef = await addDoc(collection(db, CATEGORY_COLLECTION), { name });
        return docRef.id;
    } catch (error) {
        console.error("Error adding category: ", error);
        throw error;
    }
};

export const deleteCategory = async (id: string): Promise<void> => {
    try {
        await deleteDoc(doc(db, CATEGORY_COLLECTION, id));
    } catch (error) {
        console.error("Error deleting category: ", error);
        throw error;
    }
};

// --- Materials ---

export const getMaterials = async (): Promise<Material[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, MATERIAL_COLLECTION));
        const materials: Material[] = [];
        querySnapshot.forEach((doc) => {
            materials.push({ id: doc.id, ...doc.data() } as Material);
        });
        return materials;
    } catch (error) {
        console.error("Error getting materials: ", error);
        throw error;
    }
};

export const addMaterial = async (name: string): Promise<string> => {
    try {
        const docRef = await addDoc(collection(db, MATERIAL_COLLECTION), { name });
        return docRef.id;
    } catch (error) {
        console.error("Error adding material: ", error);
        throw error;
    }
};

export const deleteMaterial = async (id: string): Promise<void> => {
    try {
        await deleteDoc(doc(db, MATERIAL_COLLECTION, id));
    } catch (error) {
        console.error("Error deleting material: ", error);
        throw error;
    }
};
