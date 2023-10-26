"use client"

import useSWR from 'swr';

import Header from '../components/Header';
import Card from '../components/Card';
import { Repo } from '../types/Repo';

import styles from "./page.module.css";

const dataUrl = `https://raw.githubusercontent.com/disnake-era/hub/feat/actual-cards/data.json`

async function fetcher(url: string) {
    return await (await fetch(url)).json()
}

export default function Home() {
    const { data, error, isLoading } = useSWR(dataUrl, fetcher)

    if (error) {
        return <div>error occurred: {error}</div>
    }

    return (
        <main>
            <Header header="Disnake Extension Hub" subheader="The unofficial official hub for disnake extension developers." />
            {!isLoading ? Cards(data) : LoadingIndicator() }
        </main>
    )
}

function Cards(data: Repo[]) {
    return (
        <div className={ styles.cards }>
            { data.map((repo, key) => <Card data={ repo } key={ key }></Card>) }
        </div>
    )
}

function LoadingIndicator() {
    return (
        <div className={ styles.loading }>
            <div className={ styles.spinner } />
            <span>Fetching data, please stand by...</span>
        </div>
    )
}
