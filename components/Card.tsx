import Image from "next/image"
import { Tag, Star } from "react-feather"
import styles from "./Card.module.css"

type Repo = {
    owner: {
        avatarUrl: string,
        login: string,
        url: string,
    },
    name: string,
    descriptionHTML: string | null,
    diskUsage: number,
    homepage: string | null,
    primaryLanguage: {
        color: string,
        name: string,
    } | null,
    latestRelease: {
        tagName: string,
        publishedAt: string,
    } | null,
    license: string | null,
    stars: number | null,
    stargazerCount: number | null,
    updatedAt: string,
    url: string,
}

export default function Card({ data }: { data: Repo }) {
    return (
        <div className={ styles.card }>
            <div className={ styles.cardHeader }>
                <Image src={ data.owner.avatarUrl } className={ styles.cardOwnerAvatar } width="32" height="32" alt="" />
                <span className={ styles.cardSlug }>
                    <a href={ data.owner.url }>{ data.owner.login }</a>
                    <span className={ styles.cardSlugSlash }>/</span>
                    <a href={ data.url }>{ data.name }</a>
                </span>
                <span className={styles.cardStars}>
                    <Star className={styles.cardStarsIcon} />
                    <span className={styles.cardStarsText}>{data.stars ? data.stars : data.stargazerCount}</span>
                </span>
            </div>
        </div>
    )
}
