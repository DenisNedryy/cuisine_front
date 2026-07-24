import { Search } from "./search/Search";
import { Navigation } from "./navigation/Navigation";
import { useState } from "react";

export function Header() {

    return (
        <div className="header">
            <Search />
        </div>
    );
};