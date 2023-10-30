"use client"

import useSWR from 'swr';

import Card from '../components/Card';
import { Repo } from '../types/Repo';

import styles from "./page.module.css";
import Header from '../components/Header';
import Search from '../components/Search';

const dataUrl = `https://raw.githubusercontent.com/disnake-era/hub/feat/actual-cards/data.json`;

async function fetcher(url: string) {
    return await (await fetch(url)).json()
}

export default function Home() {
    const { data, error, isLoading } = useSWR(dataUrl, fetcher)

    if (error) {
        return <div>error occurred: {error}</div>
    }

    return (
        <>
            <Header />
            <main>
                { !isLoading ? MainContainer({ data }) : LoadingIndicator() }
            </main>
        </>
    )
}

function MainContainer({ data }) {
    return (
        <div className={styles.MainContainer}>
            <Search data={data} />
            <Cards data={data} />
        </div>
    )
}

function Cards({ data }: { data: Repo[] }) {
    return (
        <div className={ styles.Cards }>
            { data.map((repo, key) => <Card data={ repo } key={ key }></Card>) }
        </div>
    )
}

function LoadingIndicator() {
    return (
        <div className={ styles.Loading }>
            <div className={ styles.Spinner } />
            <span>Performing transcontinental data transmission, please stand by...</span>
        </div>
    )
}
