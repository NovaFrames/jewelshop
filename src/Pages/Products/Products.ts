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
        image: 'https://wordpressthemes.live/WCG10/WCM232_golden/jewellery07/wp-content/uploads/2025/03/42_02-600x689.jpg',
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
        image: 'https://wordpressthemes.live/WCG10/WCM232_golden/jewellery07/wp-content/uploads/2025/03/21_02-600x689.jpg',
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
        image: 'https://wordpressthemes.live/WCG10/WCM232_golden/jewellery07/wp-content/uploads/2025/03/22_02-600x689.jpg',
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
        image: 'https://wordpressthemes.live/WCG10/WCM232_golden/jewellery07/wp-content/uploads/2025/03/24_02-600x689.jpg',
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
        image: 'https://wordpressthemes.live/WCG10/WCM232_golden/jewellery07/wp-content/uploads/2025/03/20_02-600x689.jpg',
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
        image: 'https://wordpressthemes.live/WCG10/WCM232_golden/jewellery07/wp-content/uploads/2025/03/25_02-600x689.jpg',
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
        image: 'https://wordpressthemes.live/WCG10/WCM232_golden/jewellery07/wp-content/uploads/2025/03/40_02-600x689.jpg',
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
        image: 'https://wordpressthemes.live/WCG10/WCM232_golden/jewellery07/wp-content/uploads/2025/03/22_03-600x689.jpg',
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
        image: 'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwa0e3f2e8/homepage/shopByCategory/earrings-25-11-25.jpg',
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
        image: 'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwf908d297/homepage/shopByCategory/ring-25-11-25.jpg',
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
        image: 'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwda9a1adc/homepage/shopByCategory/pendant-25-11-25.jpg',
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
        image: 'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwac800abe/homepage/shopByCategory/mangalsutra-25-11-25.jpg',
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
        image: 'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw523fbc6d/homepage/shopByCategory/bracelets-25-11-25.jpg',
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
        image: 'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw7ee74c79/homepage/shopByCategory/bangles-25-11-25.jpg',
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
        image: 'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw901912c0/homepage/shopByCategory/chains-25-11-25.jpg',
        rating: 4.4,
        reviews: 298,
        inStock: true,
        tags: ['trendy', 'versatile']
    },
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
