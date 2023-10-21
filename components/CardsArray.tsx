import React, { useEffect, useState } from 'react';
import axios from "axios";


interface User {
    name: string
    phone: string
    email: string
    address: string
    position_name: string
    department: string
    hire_date: string
}

function UserCard(item: User, index:number) {
    return (
        <div key={index} className={"flex-col min-h-[314px] p-6 shadow rounded"}>
            <div className={"mb-6"}>
                <span className={"text-2xl font-bold"}>{item.name}</span>
            </div>
            <div className={"text-sm"}>
                <div>
                    <span>{item.phone}</span>
                </div>
                <div>
                    <span>{item.email}</span>
                </div>
            </div>
        </div>
    )
}

const CardsArray = ({ searchInput }: { searchInput: string}) => {
    const [Users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])


    useEffect(() => {
        axios
            .get(`https://127.0.0.1:8080/`)
            .then((res) => {
                setUsers(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    useEffect(() => {
        const filteredData = Users.filter((name) => {
            return Object.values(name)
                .join("")
                .toLowerCase()
                .includes(searchInput.toLowerCase())
        })
        console.log(filteredData)
        setFilteredUsers(filteredData)
    }, [Users, searchInput])
    return (
        <div className={"grid grid-cols-3 gap-6"}>
            {
                filteredUsers.length === 0 && !searchInput ?
                    Users.map((item: User, index: number) =>  UserCard(item, index)) :
                    filteredUsers.map((item: User, index: number) => UserCard(item, index))
            }
        </div>
    )
};

export default CardsArray;
