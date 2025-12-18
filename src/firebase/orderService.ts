import {
    collection,
    getDocs,
    updateDoc,
    doc,
    query,
    orderBy,
    getDoc
} from 'firebase/firestore';
import { db } from './firebase';
import { type Order } from '../types';

const COLLECTION_NAME = 'orders';

// Get all orders
export const getOrders = async (): Promise<Order[]> => {
    try {
        const ordersRef = collection(db, COLLECTION_NAME);
        const q = query(ordersRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const orders: Order[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            orders.push({
                id: doc.id,
                ...data
            } as Order);
        });
        return orders;
    } catch (error) {
        console.error("Error getting orders: ", error);
        throw error;
    }
};

// Update order status (specifically for items within the order)
export const updateOrderItemStatus = async (orderId: string, itemIndex: number, newStatus: string): Promise<void> => {
    try {
        const orderRef = doc(db, COLLECTION_NAME, orderId);
        const docSnap = await getDoc(orderRef);

        if (docSnap.exists()) {
            const orderData = docSnap.data() as Order;
            const updatedItems = [...orderData.items];
            if (updatedItems[itemIndex]) {
                updatedItems[itemIndex].status = newStatus;
                updatedItems[itemIndex].updatedAt = new Date().toISOString();
                await updateDoc(orderRef, { items: updatedItems });
            }
        }
    } catch (error) {
        console.error("Error updating order item status: ", error);
        throw error;
    }
};

// Update top-level order status
export const updateOrderStatus = async (orderId: string, newStatus: string): Promise<void> => {
    try {
        const orderRef = doc(db, COLLECTION_NAME, orderId);
        await updateDoc(orderRef, {
            status: newStatus,
            updatedAt: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error updating order status: ", error);
        throw error;
    }
};
