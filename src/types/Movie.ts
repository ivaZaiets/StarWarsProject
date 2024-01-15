import { Character } from "./Character";

export interface Movie {
    title: string,
    director: string,
    producer: string,
    characters: Character[],
    url: string,
}
