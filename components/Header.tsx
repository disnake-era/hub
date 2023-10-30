import Image from "next/image";
import tinycolor2 from "tinycolor2";

import styles from "./Header.module.css";

export default function Header() {
    return (
        <div className={ styles.Header }>
            <span className={ styles.HeaderName }>Disnake Extension Hub</span>
            <span className={ styles.HeaderDescription }>An automatically collected list of disnake extensions.</span>
        </div>
    )
}
