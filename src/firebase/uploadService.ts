import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

export const uploadImage = async (file: File, path: string = 'products'): Promise<string> => {
    try {
        // Create a unique filename
        const timestamp = Date.now();
        const uniqueName = `${timestamp}_${file.name}`;
        const storageRef = ref(storage, `${path}/${uniqueName}`);

        // Upload the file
        const snapshot = await uploadBytes(storageRef, file);

        // Get the download URL
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    } catch (error) {
        console.error("Error uploading image: ", error);
        throw error;
    }
};
