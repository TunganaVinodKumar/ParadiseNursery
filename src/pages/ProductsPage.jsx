import { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import PRODUCTS, { CATEGORIES } from '../data/products';

export default function ProductsPage({ onQuickView, onOpenQuiz }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [petSafeOnly, setPetSafeOnly] = useState(false);
  const [selectedCareLevel, setSelectedCareLevel] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.desc.toLowerCase().includes(q) ||
          p.scientificName.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.benefits?.some((b) => b.toLowerCase().includes(q))
      );
    }

    // Category
    if (selectedCategory !== 'All') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Pet safety
    if (petSafeOnly) {
      list = list.filter((p) => p.petSafe === true);
    }

    // Care level
    if (selectedCareLevel !== 'All') {
      list = list.filter((p) => p.careLevel === selectedCareLevel);
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // featured default
        break;
    }

    return list;
  }, [searchQuery, selectedCategory, petSafeOnly, selectedCareLevel, sortBy]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'All' ||
    petSafeOnly ||
    selectedCareLevel !== 'All' ||
    sortBy !== 'featured';

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setPetSafeOnly(false);
    setSelectedCareLevel('All');
    setSortBy('featured');
  };

  return (
    <div className="page">
      <div className="container">
        {/* Page Banner */}
        <div className="products-hero">
          <div className="products-hero__content">
            <span className="section__pill">Our Green Collection</span>
            <h1 className="products-hero__title">Discover Your Next Houseplant</h1>
            <p className="products-hero__subtitle">
              Carefully propagated, potted, and nurtured plants to breathe fresh life, aroma, and vitality into your home.
            </p>
          </div>
          <button className="btn btn--outline btn--sm" onClick={onOpenQuiz}>
            ✨ Unsure? Try Plant Matcher Quiz
          </button>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="filter-toolbar">
          {/* Search Bar */}
          <div className="search-bar-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search by plant name, benefit, aroma, or health benefits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="search-clear-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="category-pills">
            {CATEGORIES.map((cat) => {
              const count =
                cat === 'All'
                  ? PRODUCTS.length
                  : PRODUCTS.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat} <span className="category-pill__count">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Secondary Filters & Sorting Controls */}
          <div className="sub-filters-row">
            {/* Pet Friendly Toggle */}
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={petSafeOnly}
                onChange={(e) => setPetSafeOnly(e.target.checked)}
              />
              <span>🐾 Pet Friendly Only</span>
            </label>

            {/* Care Level Selector */}
            <div className="filter-select-group">
              <label htmlFor="care-filter" className="filter-label">
                Care:
              </label>
              <select
                id="care-filter"
                className="filter-select"
                value={selectedCareLevel}
                onChange={(e) => setSelectedCareLevel(e.target.value)}
              >
                <option value="All">All Levels</option>
                <option value="Easy">Easy Care</option>
                <option value="Moderate">Moderate Care</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="filter-select-group">
              <label htmlFor="sort-filter" className="filter-label">
                Sort:
              </label>
              <select
                id="sort-filter"
                className="filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated ★</option>
                <option value="name">Name (A – Z)</option>
              </select>
            </div>

            {/* Reset Filters */}
            {hasActiveFilters && (
              <button className="reset-filters-btn" onClick={handleResetFilters}>
                🔄 Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="results-header">
          <span className="results-count">
            Showing <strong>{filteredProducts.length}</strong> of {PRODUCTS.length} plants
          </span>
          {selectedCategory !== 'All' && (
            <span className="results-active-tag">Filtered by: {selectedCategory}</span>
          )}
        </div>

        {/* Product Grid or Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="empty-results">
            <span className="empty-results__icon">🌱🔎</span>
            <h3 className="empty-results__title">No plants match your criteria</h3>
            <p className="empty-results__text">
              Try adjusting your search query, changing category pills, or clearing pet-safety filters.
            </p>
            <button className="btn btn--primary btn--md" onClick={handleResetFilters}>
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="product-grid stagger-children">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
