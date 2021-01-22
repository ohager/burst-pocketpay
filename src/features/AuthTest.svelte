<script>
    import Button, {Label} from '@smui/button';
    import {AuthService} from "./AuthService";
    import {authStore$, setAuthId, resetAuth} from "./authStore";
    import {decode} from "../utils/base64url";

    let name = ''
    let message = ''

    $: authId = $authStore$.authId
    $: hasCredentials = !!authId

    async function handleCreateCredentials() {
        try {
            const service = new AuthService()
            const credentialResponse = await service.createCredential()
            setAuthId(credentialResponse.id)
            const t = decode(credentialResponse.id)
            console.log(t)
            message = `${credentialResponse.id} stored`
        } catch (e) {
            message = e.message
        }
    }

    async function handleGetCredentials() {
        try {
            const service = new AuthService()
            const credentialResponse = await service.getCredential(authId)
            message = `${JSON.stringify(credentialResponse)} found`
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
        <Button on:click={handleResetCredentials}><Label>Reset Credentials</Label></Button>
    {:else}
        <Button on:click={handleGetCredentials} variant="raised"><Label>Authenticate</Label></Button>
    {/if}

</div>
