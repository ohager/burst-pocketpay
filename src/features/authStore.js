import {writable} from "svelte/store";

const DefaultStore = {
    authId: ''
}

export const authStore = writable(DefaultStore, set => {
    const authId = localStorage.getItem('authId')
    set({authId})
    return () => {
        set(DefaultStore)
    }
})

export const setAuthId = (authId) => {
    authStore.update((state) => ({
        ...state,
        authId
    }))
}

export const resetAuth = () => {
    authStore.update((state) => DefaultStore)
}
