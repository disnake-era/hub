import styles from './Label.module.css';

export default function Label({ header, subheader }: { header: string, subheader: string }) {
    return (
        <div className={ styles.label }>
            <div className={ styles.labelHeader }>{ header }</div>
            <div className={ styles.labelSubHeader }>{ subheader }</div>
        </div>
    )
}
