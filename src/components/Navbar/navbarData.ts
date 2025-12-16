
export interface SubCategory {
    name: string;
    icon?: string; // We can use a placeholder icon or mapping
    path: string;
}

export interface MenuCategory {
    name: string;
    subCategories: SubCategory[];
}

export interface MegaMenuContent {
    tabs: string[]; // e.g., ['Category', 'Price', 'Occasion', 'Gender']
    categories: Record<string, SubCategory[]>; // Map tab name to subcategories
    promoImage?: string;
    promoTitle?: string;
    promoLinkText?: string;
    promoLink?: string;
    bottomBanner?: {
        text: string;
        subText: string;
        buttonText: string;
        image?: string;
    };
}

export interface NavItem {
    name: string;
    path: string;
    icon?: string; // For the top level icon if needed
    hasMegaMenu?: boolean;
    megaMenuData?: MegaMenuContent;
}

export const navItems: NavItem[] = [
    {
        name: 'All Jewellery',
        path: '/all-jewellery',
        hasMegaMenu: true,
        megaMenuData: {
            tabs: ['Category', 'Price', 'Occasion', 'Gender'],
            categories: {
                'Category': [
                    { name: 'All Jewellery', path: '/all-jewellery' },
                    { name: 'Earrings', path: '/earrings' },
                    { name: 'Pendants', path: '/pendants' },
                    { name: 'Finger Rings', path: '/finger-rings' },
                    { name: 'Mangalsutra', path: '/mangalsutra' },
                    { name: 'Chains', path: '/chains' },
                    { name: 'Nose Pin', path: '/nose-pin' },
                    { name: 'Necklaces', path: '/necklaces' },
                    { name: 'Necklace Set', path: '/necklace-set' },
                    { name: 'Bangles', path: '/bangles' },
                    { name: 'Bracelets', path: '/bracelets' },
                    { name: 'Pendants & Earring Set', path: '/pendants-earring-set' },
                ],
                'Price': [
                    { name: 'Under 10k', path: '/price/under-10k' },
                    { name: '10k - 20k', path: '/price/10k-20k' },
                ],
                'Occasion': [
                    { name: 'Wedding', path: '/occasion/wedding' },
                    { name: 'Daily Wear', path: '/occasion/daily-wear' },
                ],
                'Gender': [
                    { name: 'Women', path: '/gender/women' },
                    { name: 'Men', path: '/gender/men' },
                    { name: 'Kids', path: '/gender/kids' },
                ]
            },
            promoImage: 'https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-site-catalog/default/dwf47a3eda/header-mega-menu/banner-images/elan-desktop.jpg', // Placeholder
            promoTitle: 'Elan - My World. My Story.',
            promoLinkText: 'Explore Now',
            bottomBanner: {
                image: 'https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-site-catalog/default/dw4723a799/header-mega-menu/thumbnail-images/all-jew-menu-bottom.png',
                text: 'Jewellery for Every Moment—See It All Here!',
                subText: '14,000+ designs to choose from',
                buttonText: 'View All',
            }
        }
    },
    {
        name: 'Gold',
        path: '/gold',
        hasMegaMenu: true,
        megaMenuData: {
            tabs: ['Category', 'Price', 'Occasion', 'Gold Coin', 'Men', 'Metal'],
            categories: {
                'Category': [
                    { name: 'All Gold', path: '/gold/all' },
                    { name: 'Gold Bangles', path: '/gold/bangles' },
                    { name: 'Gold Bracelets', path: '/gold/bracelets' },
                    { name: 'Gold Earrings', path: '/gold/earrings' },
                    { name: 'Gold Chains', path: '/gold/chains' },
                    { name: 'Gold Pendants', path: '/gold/pendants' },
                    { name: 'Gold Rings', path: '/gold/rings' },
                    { name: 'Gold Engagement Rings', path: '/gold/engagement-rings' },
                    { name: 'Gold Necklaces', path: '/gold/necklaces' },
                    { name: 'Gold Nose Pins', path: '/gold/nose-pins' },
                    { name: 'Gold Kadas', path: '/gold/kadas' },
                    { name: 'Gold Mangalsutras', path: '/gold/mangalsutras' },
                ],
                'Price': [],
                'Occasion': [],
                'Gold Coin': [],
                'Men': [],
                'Metal': []
            },
            promoImage: 'https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-site-catalog/default/dw5c76c6f6/header-mega-menu/banner-images/kundan-stories-desktop.jpg',
            promoTitle: 'Intricately handcrafted Kundan masterpieces for the women who inspire new narratives.',
            promoLinkText: 'Explore Now',
            bottomBanner: {
                image: 'https://www.tanishq.co.in/on/demandware.static/-/Sites-Tanishq-site-catalog/default/dw4723a799/header-mega-menu/thumbnail-images/all-jew-menu-bottom.png',
                text: 'From Classic to Contemporary.',
                subText: 'Explore 6000+ Stunning Designs.',
                buttonText: 'View All',
            }
        }
    },
    { name: 'Diamond', path: '/diamond' },
    { name: 'Earrings', path: '/earrings' },
    { name: 'Rings', path: '/rings' },
    { name: 'Daily Wear', path: '/daily-wear' },
    { name: 'Collections', path: '/collections' },
    { name: 'Wedding', path: '/wedding' },
    { name: 'Gifting', path: '/gifting' },
    { name: 'More', path: '/more' },
];
