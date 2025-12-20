import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
    arrayUnion,
    arrayRemove
} from 'firebase/firestore';
import { db } from './firebase';

export interface Category {
    id: string;
    name: string;
    materialId: string;
}

export interface Material {
    id: string;
    name: string;
    categories: string[];
}

const MATERIAL_COLLECTION = 'materials';

// --- Categories ---

export const getCategories = async (): Promise<Category[]> => {
    try {
        const materials = await getMaterials();
        const categories: Category[] = [];
        materials.forEach(mat => {
            if (mat.categories) {
                mat.categories.forEach(catName => {
                    categories.push({
                        id: `${mat.id}_${catName}`,
                        name: catName,
                        materialId: mat.id
                    });
                });
            }
        });
        return categories;
    } catch (error) {
        console.error("Error getting categories: ", error);
        throw error;
    }
};

export const addCategory = async (name: string, materialId: string): Promise<string> => {
    try {
        const materialRef = doc(db, MATERIAL_COLLECTION, materialId);
        await updateDoc(materialRef, {
            categories: arrayUnion(name)
        });
        return `${materialId}_${name}`;
    } catch (error) {
        console.error("Error adding category: ", error);
        throw error;
    }
};

export const deleteCategory = async (name: string, materialId: string): Promise<void> => {
    try {
        const materialRef = doc(db, MATERIAL_COLLECTION, materialId);
        await updateDoc(materialRef, {
            categories: arrayRemove(name)
        });
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
        const docRef = await addDoc(collection(db, MATERIAL_COLLECTION), { name, categories: [] });
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
