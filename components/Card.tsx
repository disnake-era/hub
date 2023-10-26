import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import tinycolor from "tinycolor2";
import Image from "next/image"
import { Tag, Star, FileText as License, Clock } from "react-feather"

import type { Icon } from "react-feather";

import styles from "./Card.module.css"
import { Repo } from "../types/Repo";

dayjs.extend(relativeTime);

// TODO: SPDX links
// const spdx_url = (id: string) => `https://spdx.org/licenses/${id}.html`;

export default function Card({ data }: { data: Repo }) {
    return (
        <div className={styles.card}>
            {CardHeader(data)}
            <hr className={styles.cardDescriptionSeparator} />
            {CardDescription(data)}
            {CardMetadata(data)}
        </div>
    )
}

function CardHeader(data: Repo) {
    return <div className={styles.cardHeader}>
        <Image src={data.owner.avatarUrl} className={styles.cardOwnerAvatar} width="32" height="32" alt="" />
        {CardSlug(data)}
        {CardStars(data)}
    </div>
}

function CardSlug(data: Repo) {
    return <span className={styles.cardSlug}>
        <a href={data.owner.url}>{data.owner.login}</a>
        <span className={styles.cardSlugSlash}>/</span>
        <a href={data.url}>{data.name}</a>
    </span>
}

function CardStars(data: Repo) {
    return <span className={styles.cardStars}>
        <Star className={styles.cardStarsIcon} />
        <span className={styles.cardStarsText}>{data.stars}</span>
    </span>
}

function CardDescription(data: Repo) {
    return (
        <div className={styles.cardDescription}>
            { /* I trust GitHub 😊 */ }
            <span dangerouslySetInnerHTML={{ __html: data.descriptionHTML }} />
        </div>
    )
}

function CardMetadata(data: Repo) {
    return (
        <div className={styles.cardMetadata}>
            {CardMetadataLanguage(data)}
            {CardMetadataField({ icon: Tag, value: data.latestRelease ? data.latestRelease : <i>No releases yet.</i> })}
            {CardMetadataField({ icon: License, value: data.license ? data.license : <i>Unknown license.</i> })}
            {CardMetadataField({ icon: Clock, value: "Updated " + dayjs(data.updatedAt).fromNow() })}
        </div>
    )
}

function CardMetadataLanguage(data: Repo) {
    if (!data.primaryLanguage) return;

    const backgroundColor = data.primaryLanguage.color;
    const borderColor = tinycolor(backgroundColor).darken(5).toHexString();

    return (
        <div className={styles.cardMetadataLanguage}>
            <span className={styles.cardMetadataLanguageIndicator} style={{ backgroundColor, borderColor }}></span>
            <span className={styles.cardMetadataLanguageText}>{data.primaryLanguage.name}</span>
        </div>
    )
}

function CardMetadataField(props: { icon: Icon, value: any }) {
    return (
        <div className={styles.cardMetadataField}>
            <props.icon className={styles.cardMetadataFieldIcon} />
            <span className={styles.cardMetadataFieldText}>{props.value}</span>
        </div>
    )
}
