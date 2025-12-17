// src/contexts/mockCartData.ts
import { products } from '../Pages/User/Products/Products';
import type { CartItem } from '../types';

export const mockCartItems: CartItem[] = [
    {
        product: {
            ...products[0], // Reebeecraft Gold Plated Threader Earrings - $590
            images: [products[0].image],
        } as any,
        quantity: 2,
    },
    {
        product: {
            ...products[2], // Caratgirls Designer Gold And Diamond Bracelet - $590
            images: [products[2].image],
        } as any,
        quantity: 1,
        size: 'Medium',
    },
    {
        product: {
            ...products[5], // Diamond Pendant Necklace - $890
            images: [products[5].image],
        } as any,
        quantity: 1,
    },
    {
        product: {
            ...products[7], // Diamond Pendant Necklace - $890
            images: [products[7].image],
        } as any,
        quantity: 1,
    },
    {
        product: {
            ...products[9], // Diamond Pendant Necklace - $890
            images: [products[9].image],
        } as any,
        quantity: 1,
    },
    {
        product: {
            ...products[11], // Diamond Pendant Necklace - $890
            images: [products[11].image],
        } as any,
        quantity: 1,
    },
];
