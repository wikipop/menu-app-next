'use client'
import Image from "next/image"
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import type {meal} from "@/types/api";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { AspectRatio } from "@/components/ui/aspect-ratio"

type SearchProps = {
    searchFunction: (query: string) => Promise<{meals: [meal]} | null>
}

const Search = ({searchFunction}: SearchProps) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<{meals: [meal]} | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        searchFunction(query).then((data) => {
            setResults(data);
        });
    }

    return (
        <div className="m-12">
            <form onSubmit={handleSubmit} className="inline-flex mb-3">
                <Input type="text" placeholder="Search for the meal!" value={query} onChange={handleChange} className="border-2 border-black"/>
                <Button type="submit">Search</Button>
            </form>
            <div className="grid grid-cols-5 gap-2">
                {results?.meals && results.meals.map((result) => (
                    <Card key={result.idMeal}>
                        <CardHeader>
                            <CardTitle>
                                <AspectRatio ratio={16 / 9}>
                                    <Image src={result.strMealThumb} alt={result.strMeal} className="rounded-md object-cover" fill />
                                </AspectRatio>
                            </CardTitle>
                            <CardDescription>{result.strMeal}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="truncate">{result.strInstructions}</p>
                        </CardContent>
                        <CardContent>
                            <Sheet>
                                <SheetTrigger><Button>Read More!</Button></SheetTrigger>
                                <SheetContent className="!max-w-[42rem]">
                                    <SheetHeader>
                                        <SheetTitle>{result.strMeal}</SheetTitle>
                                        <SheetDescription>
                                            <AspectRatio ratio={16 / 9}>
                                                <Image src={result.strMealThumb} alt={result.strMeal} className="rounded-md object-cover" fill />
                                            </AspectRatio>
                                        </SheetDescription>
                                        <SheetDescription className="text-slate-950">
                                            <p>
                                                {result.strInstructions}
                                            </p>
                                        </SheetDescription>
                                    </SheetHeader>
                                </SheetContent>
                            </Sheet>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>

    )
}

export default Search;