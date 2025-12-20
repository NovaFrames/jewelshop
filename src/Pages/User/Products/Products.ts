// src/Pages/Products/Products.ts
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    category: string;
    material: string;
    image: string;
    images?: string[];
    rating: number;
    reviews: number;
    inStock: boolean;
    discount?: number;
    tags: string[];
    weight: number;
}

export const categories = [
    { name: 'Our Store', count: 24 },
    { name: 'Anklet', count: 8 },
    { name: 'Barrette', count: 10 },
    { name: 'Earring', count: 8 },
    { name: 'Prayer jewellery', count: 5 },
    { name: 'Rings', count: 8 },
    { name: 'Slave bracelet', count: 6 }
];

export const brands = [
    { name: 'Creative', count: 3 },
    { name: 'Design', count: 3 },
    { name: 'Gallery', count: 3 },
    { name: 'Golden', count: 3 },
    { name: 'Highlight', count: 3 },
    { name: 'Modern', count: 3 },
    { name: 'Nature', count: 3 }
];
