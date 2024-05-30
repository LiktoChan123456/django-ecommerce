import {create} from 'zustand'
import {mountStoreDevtool} from 'simple-zustand-devtool'

const useAuthStore = create((set, get)=> ({
    allUserData: null,
    loading: false

    user: () => ({ /* created a function called user, returning user-related information*/
    user_id: get().allUserData?.user_id || null,
    user_name: get().allUserData?.user_name || null,
    }), 

    setUser:(user) => set({allUserData: user}),
    setLoading: (loading) => set({loading}),
    setLoggedIn: () => get().allUserData !== null,
}))


if (import.meta.env.DEV){
    mountStoreDevtool("Store", useAuthStore)

}

export {useAuthStore}

