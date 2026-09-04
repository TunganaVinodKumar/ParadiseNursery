// Product catalog — single source of truth
const PRODUCTS = [
  {
    id: 'aro-lavender',
    name: 'Lavender',
    category: 'Aromatic Plants',
    price: 7.99,
    img: '/assets/lavender.jpg',
    desc: 'Soothing fragrance; great for bedrooms and balconies.',
  },
  {
    id: 'aro-jasmine',
    name: 'Jasmine',
    category: 'Aromatic Plants',
    price: 8.49,
    img: '/assets/jasmine.jpg',
    desc: 'Sweet floral scent that freshens your home.',
  },
  {
    id: 'aro-rosemary',
    name: 'Rosemary',
    category: 'Aromatic Plants',
    price: 7.49,
    img: '/assets/rosemary.jpg',
    desc: 'Piney aroma; perfect for kitchens and windowsills.',
  },
  {
    id: 'med-aloevera',
    name: 'Aloe Vera',
    category: 'Medicinal Plants',
    price: 6.49,
    img: '/assets/aloe.jpg',
    desc: 'Succulent with skin-soothing gel and low maintenance.',
  },
  {
    id: 'med-mint',
    name: 'Mint',
    category: 'Medicinal Plants',
    price: 4.99,
    img: '/assets/mint.jpg',
    desc: 'Refreshing herb for teas and garnishes.',
  },
  {
    id: 'med-rosemary',
    name: 'Tulsi (Holy Basil)',
    category: 'Medicinal Plants',
    price: 5.99,
    img: '/assets/rosemary.jpg',
    desc: 'Traditional herb known for wellness benefits.',
  },
];

export default PRODUCTS;

export const getByCategory = (cat) => PRODUCTS.filter((p) => p.category === cat);
export const getById = (id) => PRODUCTS.find((p) => p.id === id);
export const CATEGORIES = [...new Set(PRODUCTS.map((p) => p.category))];
