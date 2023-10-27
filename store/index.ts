import {getAllUsers, getUsersBySearch} from "@/services/getUsers";
import {createWithEqualityFn} from "zustand/traditional";
import { User } from "@/components/CardsArray";


type Users = {
    users: User[],
    selectedUser: User | null,
    isLoading: boolean,
    badResponse: boolean,
    hasResults: boolean,
    getAllUsers: () => Promise<void>,
    getUsersBySearch: (value: string) => Promise<void>,
    setSelectedUser: (user: any) => void
}

export const useUsers = createWithEqualityFn<Users>((set) => ({
    users: [],
    selectedUser: null,
    isLoading: false,
    badResponse: false,
    hasResults: true,
    getAllUsers: async () => {
        set({isLoading: true})
        const users = await getAllUsers()
        if (users === null) {
            set({badResponse: true})
        } else {
            set({users, isLoading: false})
        }
    },
    getUsersBySearch: async (term: string) => {
        set({isLoading: true})
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (!term) {
            const users = await getAllUsers()
            set({users, isLoading: false, hasResults: true})
        }
        const users = await getUsersBySearch(term)
        if (users === null) {
            set({badResponse: true})
        } else if (users.length === 0) {
            set({hasResults: false})
        } else {
            set({users})
        }
        set({isLoading: false})

    },
    setSelectedUser: (user: User) => {
        set({selectedUser: user})
    }
}))