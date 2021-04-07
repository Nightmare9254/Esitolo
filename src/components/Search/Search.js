import React from 'react';

const Search = () => {
  return (
    <main className="search">
      <div className="search__bar">
        <i class="fas fa-arrow-left"></i>
        <input className="search__input" type="text" placeholder="4x4 quad" />
      </div>
      <section className="search__recent">
        <h5>Recent:</h5>
        {/* Resent items in span tags */}
      </section>
      <section className="search__results">
        <div className="search__header-container">
          <h5>Results</h5>
          <p className="search__count">
            Total
            <span className="search__count-total">{/*Total results*/}</span>
          </p>
        </div>
        {/* Results items component */}
        <div
          style={{ width: '50px', height: '50px', backgroundColor: 'red' }}
        ></div>
      </section>
    </main>
  );
};

export default Search;