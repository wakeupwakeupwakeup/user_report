import React, { ChangeEvent } from 'react';
import Image from "next/image";
import {useUsers} from "@/store";
import { debounce } from 'lodash'

const SearchBar = () => {
    const getUsersBySearch = useUsers(state => state.getUsersBySearch)

    const  handleSearch = debounce( async(event: ChangeEvent<HTMLInputElement>)=> {
        const query = event.target.value
        await getUsersBySearch(query)
    }, 500)

    return (
        <div className={"mb-8 flex gap-4 items-center"}>
            <input type={"text"} className={"rounded-full shadow h-[48px] w-full px-4"} onChange={
                handleSearch
            } required={true}/>
            <Image src={"/SearchBar/search_icon.svg"} alt={"Search"} width={24} height={24} />
        </div>
    );
};

export default SearchBar;

