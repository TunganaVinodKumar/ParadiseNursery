import ProductCard from '../components/ProductCard';
import { getByCategory } from '../data/products';

const CATEGORY_INFO = {
  'Aromatic Plants': {
    subtitle: 'Fragrant companions like Lavender, Jasmine, and Rosemary that elevate your mood and space.',
  },
  'Medicinal Plants': {
    subtitle: 'Practical wellness heroes — Aloe, Tulsi, and Mint — easy to grow and useful every day.',
  },
};

export default function ProductsPage() {
  const categories = Object.keys(CATEGORY_INFO);

  return (
    <div className="page">
      <div className="container">
        {categories.map((cat) => {
          const products = getByCategory(cat);
          const info = CATEGORY_INFO[cat];

          return (
            <section className="section" key={cat}>
              <div className="section__header" style={{ textAlign: 'left' }}>
                <h2 className="section__title">{cat}</h2>
                <p className="section__subtitle" style={{ margin: 0 }}>
                  {info.subtitle}
                </p>
              </div>

              <div className="product-grid stagger-children">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
