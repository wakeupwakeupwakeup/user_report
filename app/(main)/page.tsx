'use client'

import React, { useState } from "react";
import CardsArray from "@/components/CardsArray";

export default function Home() {
    const [searchInput, setSearchInput] = useState("");



    return (
        <div className={"flex flex-col py-16 px-20"}>
            <div className={"mb-8"}>
                <input type={"search"} name={"search"} id={"search"} className={"rounded-full shadow h-[48px] w-full px-4"} onChange={(e) => {
                    setSearchInput(e.target.value)
                }} required={true}/>
            </div>
            <div>
                <CardsArray searchInput={searchInput}/>
            </div>
        </div>
    )
}
