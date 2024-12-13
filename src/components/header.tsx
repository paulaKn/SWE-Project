import React from 'react';
import styles from './header.module.css';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = 'Buch' }) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.searchContainer}>
          <input
            type="search"
            placeholder="Search..."
            className={styles.searchInput}
            aria-label="Search"
          />
          <button className={styles.searchButton} aria-label="Submit search">
            Search
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

