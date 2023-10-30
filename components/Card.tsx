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
        <div className={styles.Card}>
            {CardHeader(data)}
            <hr className={styles.CardDescriptionSeparator} />
            {CardDescription(data)}
            {CardMetadata(data)}
        </div>
    )
}

function CardHeader(data: Repo) {
    return <div className={styles.CardHeader}>
        <Image src={data.owner.avatarUrl} className={styles.CardOwnerAvatar} width="32" height="32" alt="" />
        {CardSlug(data)}
        {CardStars(data)}
    </div>
}

function CardSlug(data: Repo) {
    return <span className={styles.CardSlug}>
        <a href={data.owner.url}>{data.owner.login}</a>
        <span className={styles.CardSlugSlash}>/</span>
        <a href={data.url}>{data.name}</a>
    </span>
}

function CardStars(data: Repo) {
    return <span className={styles.CardStars}>
        <Star className={styles.CardStarsIcon} />
        <span className={styles.CardStarsText}>{data.stars}</span>
    </span>
}

function CardDescription(data: Repo) {
    return (
        <div className={styles.CardDescription}>
            { /* I trust GitHub 😊 */ }
            <span dangerouslySetInnerHTML={{ __html: data.descriptionHTML }} />
        </div>
    )
}

function CardMetadata(data: Repo) {
    return (
        <div className={styles.CardMetadata}>
            {CardMetadataField({ icon: Tag, value: data.latestRelease ? data.latestRelease : <i>No releases yet.</i> })}
            {CardMetadataField({ icon: License, value: data.license ? data.license : <i>Unknown license.</i> })}
            {CardMetadataField({ icon: Clock, value: "Updated " + dayjs(data.updatedAt).fromNow() })}
        </div>
    )
}

function CardMetadataField(props: { icon: Icon, value: any }) {
    return (
        <div className={styles.CardMetadataField}>
            <props.icon className={styles.CardMetadataFieldIcon} />
            <span className={styles.CardMetadataFieldText}>{props.value}</span>
        </div>
    )
}
