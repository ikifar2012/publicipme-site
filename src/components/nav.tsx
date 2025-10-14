import styles from './MenuBar.module.css';
import Link from "next/link"; // Add this import statement
import * as React from "react"
import { SiGithub, SiBuymeacoffee, } from "@icons-pack/react-simple-icons";

function SiteNavigationMenu() {
  return (
    <header className={styles.menuBar}>
      <nav aria-label="Main navigation">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/lookup">Lookup</Link>
          </li>
        </ul>

        <div className={styles.socials}>
          <a href="https://github.com/ikifar2012/publicipme-site" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
            <SiGithub />
          </a>
          <a href="https://www.buymeacoffee.com/mathesonstep" aria-label="Buy me a coffee" target="_blank" rel="noopener noreferrer">
            <SiBuymeacoffee className="hover:fill-buymeacoffee" />
          </a>
        </div>
      </nav>
    </header>
  )
}
export { SiteNavigationMenu }