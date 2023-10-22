'use client'

import React, { useEffect, useState } from 'react';
import axios from "axios";
import Image from "next/image"

interface User {
    name?: string,
    phone?: string,
    email?: string,
    address?: string,
    position_name?: string,
    department?: string,
    hire_date?: string,
    [key: string]: string | undefined
}

const InfoMapping = {
    'Телефон': 'phone',
    'Почта' : 'email',
    'Дата приема': 'hire_date',
    'Должность': 'department',
    'Подразделение': 'position_name',
}

const CardsArray = () => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [usersList, setUsersList] = useState([])

    function UserCard(userInfo: User, index:number) {
        return (
            <div key={index} className={"cursor-pointer flex-col min-h-[314px] p-6 shadow-md rounded"} onClick={() => setSelectedUser(userInfo)}>
                <div className={"mb-6"}>
                <span className={"text-2xl font-bold"}>
                    {userInfo.name}
                </span>
                </div>
                <div className={"text-sm flex flex-col gap-3"}>
                    <div className={"flex gap-1"}>
                        <Image src={"/phone_icon.svg"} alt={"Phone"} width={24} height={24}/>
                        <span>{userInfo.phone}</span>
                    </div>
                    <div className={"flex gap-1"}>
                        <Image src={"/email_icon.svg"} alt={"Phone"} width={24} height={24} />
                        <span>{userInfo.email}</span>
                    </div>
                </div>
            </div>
        )
    }

    function UserModal() {
        return (
            <div className={"fixed top-0 left-0 w-screen h-screen modal"}>
                <div className={"flex items-center justify-center w-screen h-screen"}>
                    <div className={"flex flex-col gap-10 bg-white p-6 pb-12 rounded-xl max-w-[500px]"}>
                        <div className={"flex justify-between items-center"}>
                            <span className={"text-2xl font-bold"}>{selectedUser.name}</span>
                            <Image className={"cursor-pointer"} src={"/close_icon.svg"} alt={"Close"} width={20} height={20} onClick={() => {setSelectedUser(null)}}/>
                        </div>
                        <ModalInfo userInfo={selectedUser}/>
                        <div>
                            <span className={"text-lg mb-3"}>Дополнительная информация:</span>
                            <p className={"text-gray-400"}>
                                Разработчики используют текст в качестве заполнителя макета страницы. Разработчики
                                используют текст в качестве заполнителя макета страницы.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

    function ModalInfo({ userInfo }: { userInfo: User }) {
        return (
            <div className={"grid gap-y-3 gap-x-10"}>
                {
                    Object.entries(InfoMapping).map(([key, value], index) => {
                        return (
                            <div key={index} className={"grid grid-cols-2"}>
                                <span className={"text-lg"}>{key}</span>
                                <span className={"text-base text-gray-400"}>{userInfo[value]}</span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('https://127.0.0.1:8080', {
                    params: { term: searchTerm }
                })
                setUsersList(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchUsers()

    }, [searchTerm]);

    return (
        <div className={"px-20 py-16"}>
            <div className={"mb-8 flex gap-4 items-center"}>
                <input type={"text"} className={"rounded-full shadow h-[48px] w-full px-4"} onChange={(e) => {
                    setSearchTerm(e.target.value)
                }} required={true}/>
                <Image src={"/search_icon.svg"} alt={"Search"} width={24} height={24} />
            </div>
            <div>
                <div className={"grid grid-cols-3 gap-6"}>
                    {
                        usersList.map((user: User, index: number) =>  UserCard(user, index))
                    }
                </div>
                <div>
                    {selectedUser? <UserModal /> : null}
                </div>
            </div>
        </div>
    )
};

export default CardsArray;
