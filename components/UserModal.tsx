import React from 'react';
import Image from "next/image";
import { useUsers } from "@/store";


const UserModal = () => {
    const [selectedUser, setSelectedUser] = useUsers(state => [
        state.selectedUser,
        state.setSelectedUser
    ])

    const InfoMapping = {
        'Телефон': 'phone',
        'Почта' : 'email',
        'Дата приема': 'hire_date',
        'Должность': 'department',
        'Подразделение': 'position_name',
    }

    function ModalInfo() {
        return (
            <div className={"grid gap-y-3 gap-x-10"}>
                {
                    Object.entries(InfoMapping).map(([key, value], index) => {
                        return (
                            <div key={index} className={"grid grid-cols-2"}>
                                <span className={"text-lg"}>{key}</span>
                                <span className={"text-base text-gray-400"}>{selectedUser?.[value]}</span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    return (
        <div className={"fixed top-0 left-0 w-screen h-screen modal"}>
            {
                selectedUser?
                    <div className={"flex items-center justify-center w-screen h-screen"}>
                        <div className={"flex flex-col gap-10 bg-white p-6 pb-12 rounded-xl max-w-[500px]"}>
                            <div className={"flex justify-between items-center"}>
                                <span className={"text-2xl font-bold"}>{selectedUser.name}</span>
                                <Image className={"cursor-pointer"} src={"/UserModal/close_icon.svg"} alt={"Close"} width={20} height={20} onClick={() => {setSelectedUser(null)}}/>
                            </div>
                            <ModalInfo />
                            <div>
                                <span className={"text-lg mb-3"}>Дополнительная информация:</span>
                                <p className={"text-gray-400"}>
                                    Разработчики используют текст в качестве заполнителя макета страницы. Разработчики
                                    используют текст в качестве заполнителя макета страницы.
                                </p>
                            </div>
                        </div>
                    </div> : null
            }
        </div>
    );
};

export default UserModal
