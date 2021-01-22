import {writable} from "svelte/store";
import {isClientSide} from "../utils/isClientSide";

const AuthIdKey = 'authId'

const DefaultStore = {
    authId: ''
}

export const authStore$ = writable(DefaultStore, set => {
    if(!isClientSide()) return
    const authId = localStorage.getItem(AuthIdKey)
    set({authId})
    return () => {
        set(DefaultStore)
    }
})

export const setAuthId = (authId) => {
    localStorage.setItem(AuthIdKey, authId)
    authStore$.update((state) => ({
        ...state,
        authId
    }))
}

export const resetAuth = () => {
    localStorage.removeItem(AuthIdKey)
    authStore$.update((state) => DefaultStore)
}
