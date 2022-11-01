import type { NextPage } from 'next';
import NavigationMenu from "@components/navigationMenu/NavigationMenu";

const Home: NextPage = () => {
    const elements = [
        {
            id: 1,
            href: '/1',
            label: "Первый пункт меню"
        },
        {
            id: 2,
            href: '/2',
            label: "Второй пункт меню"
        }
    ]
    return (
        <div style={{ display:'flex', justifyContent:'center' }}>
            <h1>Hello World </h1>
            <NavigationMenu linksInfo={elements}/>
        </div>
    );
};

export default Home;
