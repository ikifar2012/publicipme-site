import styles from './MenuBar.module.css';
import Link from "next/link"; // Add this import statement
import * as React from "react"
import { SiGithub, SiBuymeacoffee, } from "@icons-pack/react-simple-icons";

function SiteNavigationMenu() {
        return (
// wrap this in a translucent bar to make it sticky full width

<div className={styles.menuBar}>
<nav>
  <ul>
    <li>
      <Link href="/">
        Home
      </Link>
    </li>
    <li>
      <Link href="/lookup">
        Lookup
      </Link>
    </li>
    <li>
      <Link href="/github">
        <SiGithub/>
      </Link>
    </li>
    <li>
      <Link href="/donate">
        <SiBuymeacoffee className='hover:fill-buymeacoffee'/>
      </Link>
    </li>
  </ul>
</nav>
</div>
    )
}
export { SiteNavigationMenu }