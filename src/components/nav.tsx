import styles from './MenuBar.module.css';
import Link from "next/link"; // Add this import statement
import * as React from "react"
import { SiGithub, SiBuymeacoffee, } from "@icons-pack/react-simple-icons";

function SiteNavigationMenu() {
        return (
// wrap this in a translucent bar to make it sticky full width

<div className={styles.menuBar}>
<nav className='w-screen'>
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
    </ul>
    <div className={styles.socials}>
    <li>
      <Link href="https://github.com/ikifar2012/publicipme-site">
        <SiGithub/>
      </Link>
    </li>
    <li>
      <Link href="https://www.buymeacoffee.com/mathesonstep">
        <SiBuymeacoffee className='hover:fill-buymeacoffee'/>
      </Link>
    </li>
    </div>
</nav>
</div>
    )
}
export { SiteNavigationMenu }