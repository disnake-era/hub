import Image from "next/image"
import { Tag, Star, FileText as License } from "react-feather"
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
    latestRelease: string | null,
    license: string | null,
    stars: number | null,
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
                <span className={ styles.cardStars }>
                    <Star className={ styles.cardStarsIcon } />
                    <span className={ styles.cardStarsText }>{ data.stars }</span>
                </span>
            </div>
            <hr className={ styles.cardDescriptionSeparator } />
            <div className={ styles.cardDescription }>
                { /* I trust GitHub 😊 */ }
                <span dangerouslySetInnerHTML={{ __html: data.descriptionHTML }} />
            </div>
            <div className={ styles.cardMetadata }>
                <div className={ styles.cardMetadataField }>
                    <Tag className={ styles.cardMetadataFieldIcon } />
                    <span className={ styles.cardMetadataFieldText }>{ data.latestRelease ? data.latestRelease : <i>No releases yet.</i> }</span>
                </div>
                <div className={ styles.cardMetadataField }>
                    <License className={ styles.cardMetadataFieldIcon } />
                    <span className={ styles.cardMetadataFieldText }>License: { data.license ? data.license : "none." }</span>
                </div>
            </div>
        </div>
    )
}
