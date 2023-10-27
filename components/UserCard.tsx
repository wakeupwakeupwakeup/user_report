import Image from "next/image";
import React from "react";
import { User } from "@/components/CardsArray";
import { useUsers } from "@/store";

const UserCard = ({ userInfo }: { userInfo: User }) => {
    
    const infoToDisplay = ['phone', 'email']
    const setSelectedUser = useUsers(state => state.setSelectedUser)

    return (
        <div className={"cursor-pointer flex-col min-h-[314px] p-6 shadow-md rounded"} onClick={() => setSelectedUser(userInfo)}>
            <div className={"mb-6"}>
            <span className={"text-2xl font-bold"}>
                {userInfo.name}
            </span>
            </div>
            <div className={"text-sm flex flex-col gap-3"}>
                {
                    infoToDisplay.map((infoType: string, index: number) => {
                        return (
                            <div className={"flex gap-1"} key={index}>
                                <Image src={`/UserCard/${infoType}_icon.svg`} alt={`${infoType}`} width={24} height={24}/>
                                <span>{userInfo[infoType]}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default UserCard;
