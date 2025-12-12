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
    rating: number;
    reviews: number;
    inStock: boolean;
    discount?: number;
    tags: string[];
}

export const products: Product[] = [
    {
        id: '1',
        name: 'Reebeecraft Gold Plated Threader Earrings',
        description: 'Elegant gold plated threader earrings with delicate diamond pendant',
        price: 590,
        originalPrice: 800,
        category: 'Earring',
        material: 'Gold Plated',
        image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop',
        rating: 4.5,
        reviews: 785,
        inStock: true,
        discount: 2,
        tags: ['sale', 'trending']
    },
    {
        id: '2',
        name: 'Bomine Leaves Bracelets Hollow Leaf Chain Bracelet',
        description: 'Delicate hollow leaf chain bracelet in rose gold',
        price: 58,
        category: 'Bracelet',
        material: 'Rose Gold',
        image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop',
        rating: 4.0,
        reviews: 342,
        inStock: true,
        tags: ['new']
    },
    {
        id: '3',
        name: 'Caratgirls Designer Gold And Diamond Bracelet',
        description: 'Stunning gold bracelet with diamond flower pendant',
        price: 590,
        originalPrice: 675,
        category: 'Bracelet',
        material: 'Gold',
        image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop',
        rating: 4.8,
        reviews: 521,
        inStock: true,
        discount: 2,
        tags: ['sale', 'bestseller']
    },
    {
        id: '4',
        name: "Chhavi's Jewels Bead Drop Dangle Earrings",
        description: 'Exquisite sunburst dangle earrings in gold',
        price: 229,
        category: 'Earring',
        material: 'Gold',
        image: 'https://images.unsplash.com/photo-1629216316801-9b8c6c9c4b8f?w=600&h=600&fit=crop',
        rating: 4.3,
        reviews: 198,
        inStock: true,
        tags: ['trending']
    },
    {
        id: '5',
        name: 'Silver Charm Anklet',
        description: 'Delicate silver anklet with charming bells',
        price: 145,
        category: 'Anklet',
        material: 'Silver',
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop',
        rating: 4.6,
        reviews: 267,
        inStock: true,
        tags: ['summer']
    },
    {
        id: '6',
        name: 'Diamond Pendant Necklace',
        description: 'Classic gold necklace with single diamond drop',
        price: 890,
        originalPrice: 1200,
        category: 'Prayer jewellery',
        material: 'Gold',
        image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop',
        rating: 4.9,
        reviews: 643,
        inStock: true,
        discount: 2,
        tags: ['sale', 'luxury']
    },
    {
        id: '7',
        name: 'Solitaire Diamond Ring',
        description: 'Classic solitaire diamond ring in white gold',
        price: 2499,
        category: 'Rings',
        material: 'White Gold',
        image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop',
        rating: 5.0,
        reviews: 892,
        inStock: true,
        tags: ['engagement', 'luxury']
    },
    {
        id: '8',
        name: 'Gold Hoop Earrings',
        description: 'Medium-sized gold hoop earrings with textured design',
        price: 320,
        category: 'Earring',
        material: 'Gold',
        image: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=600&h=600&fit=crop',
        rating: 4.4,
        reviews: 456,
        inStock: true,
        tags: ['classic']
    },
    {
        id: '9',
        name: 'Traditional Gold Bangle',
        description: 'Intricately carved gold bangle with traditional motifs',
        price: 1850,
        category: 'Barrette',
        material: 'Gold',
        image: 'https://images.unsplash.com/photo-1610695871954-5e79cd0e3e95?w=600&h=600&fit=crop',
        rating: 4.7,
        reviews: 334,
        inStock: true,
        tags: ['traditional', 'wedding']
    },
    {
        id: '10',
        name: 'Pearl Choker Necklace',
        description: 'Elegant white pearl choker with gold clasp',
        price: 675,
        originalPrice: 850,
        category: 'Prayer jewellery',
        material: 'Pearl',
        image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&h=600&fit=crop',
        rating: 4.6,
        reviews: 289,
        inStock: true,
        discount: 2,
        tags: ['sale', 'elegant']
    },
    {
        id: '11',
        name: 'Diamond Eternity Band',
        description: 'Platinum eternity band with continuous diamonds',
        price: 3200,
        category: 'Rings',
        material: 'Platinum',
        image: 'https://images.unsplash.com/photo-1603561596112-0a132b757442?w=600&h=600&fit=crop',
        rating: 4.9,
        reviews: 567,
        inStock: true,
        tags: ['wedding', 'luxury']
    },
    {
        id: '12',
        name: 'Pearl Stud Earrings',
        description: 'Classic white pearl studs with gold setting',
        price: 280,
        category: 'Earring',
        material: 'Gold',
        image: 'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=600&h=600&fit=crop',
        rating: 4.5,
        reviews: 421,
        inStock: true,
        tags: ['classic']
    },
    {
        id: '13',
        name: 'Heart Locket Pendant',
        description: 'Vintage gold heart locket with engraved details',
        price: 425,
        category: 'Prayer jewellery',
        material: 'Gold',
        image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop',
        rating: 4.7,
        reviews: 378,
        inStock: true,
        tags: ['vintage', 'gift']
    },
    {
        id: '14',
        name: 'Diamond Tennis Bracelet',
        description: 'Luxurious white gold tennis bracelet',
        price: 2890,
        originalPrice: 3500,
        category: 'Bracelet',
        material: 'White Gold',
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop',
        rating: 5.0,
        reviews: 712,
        inStock: true,
        discount: 2,
        tags: ['sale', 'luxury', 'bestseller']
    },
    {
        id: '15',
        name: 'Layered Gold Necklace Set',
        description: 'Three delicate gold chains of varying lengths',
        price: 540,
        category: 'Prayer jewellery',
        material: 'Gold',
        image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop',
        rating: 4.4,
        reviews: 298,
        inStock: true,
        tags: ['trendy', 'versatile']
    },
    {
        id: '16',
        name: 'Emerald Cocktail Ring',
        description: 'Statement emerald ring with diamond halo',
        price: 1950,
        category: 'Rings',
        material: 'Yellow Gold',
        image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop',
        rating: 4.8,
        reviews: 445,
        inStock: true,
        tags: ['statement', 'luxury']
    },
    {
        id: '17',
        name: 'Crystal Chandelier Earrings',
        description: 'Elegant crystal chandelier earrings',
        price: 385,
        category: 'Earring',
        material: 'Silver',
        image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop',
        rating: 4.6,
        reviews: 312,
        inStock: true,
        tags: ['party', 'elegant']
    },
    {
        id: '18',
        name: 'Gold Beaded Anklet',
        description: 'Delicate gold beaded anklet with charms',
        price: 195,
        category: 'Anklet',
        material: 'Gold',
        image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop',
        rating: 4.3,
        reviews: 189,
        inStock: true,
        tags: ['summer', 'casual']
    },
    {
        id: '19',
        name: 'Ruby Statement Necklace',
        description: 'Luxurious ruby and diamond collar necklace',
        price: 4500,
        category: 'Our Store',
        material: 'Gold',
        image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&h=600&fit=crop',
        rating: 5.0,
        reviews: 234,
        inStock: true,
        tags: ['luxury', 'statement']
    },
    {
        id: '20',
        name: 'Silver Charm Bracelet',
        description: 'Classic silver charm bracelet',
        price: 340,
        category: 'Slave bracelet',
        material: 'Silver',
        image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop',
        rating: 4.5,
        reviews: 401,
        inStock: true,
        tags: ['personalized', 'gift']
    }
];

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
