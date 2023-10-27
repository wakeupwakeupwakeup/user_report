'use client'

import React, { useEffect } from 'react';
import UserCard from "./UserCard";
import UserModal from "@/components/UserModal";
import SearchBar from "@/components/SearchBar";
import { useUsers } from "@/store";
import { shallow } from "zustand/shallow";

export interface User {
    name?: string,
    phone?: string,
    email?: string,
    address?: string,
    position_name?: string,
    department?: string,
    hire_date?: string,
    [key: string]: any
}

const CardsArray = () => {
    const [users, isLoading, badResponse, hasResults, selectedUser, getAllUsers, setSelectedUser] = useUsers(state => [
        state.users,
        state.isLoading,
        state.badResponse,
        state.hasResults,
        state.selectedUser,
        state.getAllUsers,
        state.setSelectedUser
    ], shallow)

    useEffect(() => {
        getAllUsers()
    },[getAllUsers]);

    return (
        <div className={"px-20 py-16"}>
            <SearchBar />
            <div>
                {
                    badResponse?
                        <div className={"flex w-full h-full items-center justify-center"}>
                            <span className={"text-lg font-bold"}>Server doesn&apos;t response</span>
                        </div> :
                        isLoading?
                            <div className={"flex w-full h-full items-center justify-center"}>
                                <span className={"text-lg font-bold"}>Searching...</span>
                            </div> :
                            hasResults?
                                <div className={"grid grid-cols-3 gap-6"}>
                                    {
                                        users.map((user: User, index: number) => <UserCard key={index} userInfo={user}/>)
                                    }
                                </div> :
                                <div className={"flex w-full h-full items-center justify-center"}>
                                    <span className={"text-lg font-bold"}>No results</span>
                                </div>
                }
            </div>
            <div>
                {
                    selectedUser ? <UserModal /> : null
                }
            </div>
        </div>
    )
};

export default CardsArray;
