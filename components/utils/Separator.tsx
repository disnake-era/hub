import styles from "./Separator.module.css";

export default function Separator({ thickness, color, rotate }: { thickness: number, color: string, rotate: string }) {
    return (
        <hr className={ styles.Separator } style={{ height: thickness, backgroundColor: color, rotate }} />
    )
}
