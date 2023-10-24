import Label from '../components/Label';
import Card from '../components/Card';

const branch = "feat/actual-cards";
const dataUrl = `https://raw.githubusercontent.com/disnake-era/hub/${branch}/data.json`

export default async function Home() {
    let repos: Array<any> = await (await fetch(dataUrl)).json();

    return (
        <>
            <Label header="Disnake Extension Hub" subheader="The unofficial official hub for disnake extension developers." />
            <div style={{ display: 'flex', justifyContent: "space-evenly", flexWrap: "wrap", gap: "10px", marginLeft: "10px", marginRight: "10px" }}>
                { repos.map((v, i) => <Card data={v} key={i}></Card>) }
            </div>
        </>
    )
}
