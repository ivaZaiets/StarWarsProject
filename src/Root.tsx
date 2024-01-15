import { HashRouter as Router, Routes, Route } from "react-router-dom";

import { App } from "./App";
import './components/CharactersFilters/SelectStyles.scss';
import { HomePage } from "./pages/HomePage/HomePage";
import { CharactersPage } from "./pages/CharactersPage/CharactersPage";
import { CharacterPage } from "./pages/CharacterPage/CharacterPage";


export const Root = () => (
    <Router>
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<HomePage />} />
                <Route path="characters" element={<CharactersPage />} />
                <Route path="characters/:characterId?" element={<CharacterPage />} />
            </Route>
        </Routes>
    </Router>
);