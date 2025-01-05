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
            Seasons
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link href="/rules" style={styles.navLink}>
            Rules
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link href="/hof" style={styles.navLink}>
            H.O.F.
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: "#171717", // Dark background matching the theme
    padding: "20px 30px", // Adjust padding for better spacing
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Optional shadow for depth
  },
  navList: {
    display: "flex",
    listStyleType: "none",
    margin: 0,
    padding: 0,
  },
  navItem: {
    marginRight: "30px", // Increase spacing between items
  },
  navLink: {
    color: "#ffb338", // Gold color for the links
    textDecoration: "none",
    fontSize: "18px", // Slightly larger font size
    fontWeight: "bold", // Make text bold
    textTransform: "uppercase", // Make links uppercase
    transition: "color 0.3s ease, text-shadow 0.3s ease", // Smooth hover transition
  },
  navLinkHover: {
    color: "#e1c107", // Lighter gold color for hover effect
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)", // Subtle glow effect on hover
  },
};

export default NavBar;
