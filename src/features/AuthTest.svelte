<script>
    import Button, {Label} from '@smui/button';
    import CBOR from 'cbor-js'
    import {AuthService} from "./AuthService";
    import {authStore$, setAuthId, resetAuth} from "./authStore";
    import {decode, encode} from "../utils/base64url";

    let name = ''
    let message = ''

    $: authId = $authStore$.authId
    $: hasCredentials = !!authId
    async function handleCreateCredentials() {
        try {
            const service = new AuthService()
            const {
                challenge,
                credentials
            } = await service.createCredential()
            setAuthId(credentials.id)
            console.log("Credentials", credentials)
            const attestationObject = CBOR.decode(credentials.response.attestationObject)
            console.log("attestationObject", attestationObject),
            console.log("clientDataJSON", JSON.parse(atob(encode(credentials.response.clientDataJSON))))
            message = `${credentials.id} stored`
        } catch (e) {
            message = e.message
        }
    }

    async function handleGetCredentials() {
        try {
            const service = new AuthService()
            const credentials = await service.getCredential(authId)
            console.log('authenticated', credentials)
            console.log("clientDataJSON", JSON.parse(atob(encode(credentials.response.clientDataJSON))))
            const userHandle = credentials.response.userHandle
            message = userHandle ? `UserHandle [${encode(userHandle)}] found` : `No resident key supported`
        } catch (e) {
            message = e.message
        }
    }

    async function handleResetCredentials() {
        resetAuth()
    }

</script>

<div>
    <h1>Auth</h1>
    <p>Auth Test</p>
    <small>{message}</small>

    {#if !hasCredentials}
        <Button on:click={handleCreateCredentials} variant="raised"><Label>Register</Label></Button>
    {:else}
        <Button on:click={handleGetCredentials} variant="raised"><Label>Authenticate</Label></Button>
        <Button on:click={handleResetCredentials}><Label>Reset Credentials</Label></Button>
    {/if}

</div>
