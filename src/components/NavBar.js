// src/components/NavBar.js
"use client";

import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <nav style={styles.nav}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link href="/" style={styles.navLink}>
            Home
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link href="/stats" style={styles.navLink}>
            Stats
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link href="/rules" style={styles.navLink}>
            Rules
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: "#333",
    padding: "10px 20px",
  },
  navList: {
    display: "flex",
    listStyleType: "none",
    margin: 0,
    padding: 0,
  },
  navItem: {
    marginRight: "20px",
  },
  navLink: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
  },
};

export default NavBar;
