import Search from "@/components/search";
import type {meal} from "@/types/api";

const fetcher = async (url: string) => fetch(url).then((res) => res.json());

type mealResults = {
    meals: [meal]
}

const fetchSearch = async (query: string): Promise<mealResults> => {
    "use server"

    return await fetcher(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
}

export default function Home() {
    return (
        <main className="w-screen h-screen">
            <Search searchFunction={fetchSearch}/>
        </main>
    )
}
