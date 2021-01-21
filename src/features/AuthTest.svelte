<script>
    import Button, {Label} from '@smui/button';
    import {AuthService} from "./AuthService";
    import {authStore, setAuthId, resetAuth} from "./authStore";

    let name = ''

    $: result = ''

    $: hasCredentials = !!$authStore$.authId

    async function handleCreateCredentials() {
        try {
            const service = new AuthService()
            const credentialResponse = await service.createCredential()
            setAuthId(credentialResponse.id)
            result = `${JSON.stringify(credentialResponse)} stored`
        } catch (e) {
            result = e.message
        }
    }

    async function handleGetCredentials() {
        try {
            const service = new AuthService()
            const credentialResponse = await service.getCredential($authStore$.id)
            result = `${JSON.stringify(credentialResponse)} found`
        } catch (e) {
            result = e.message
        }
    }

    async function handleResetCredentials() {
        resetAuth()
    }

</script>

<div>
    <h1>Auth</h1>
    <p>Auth Test</p>
    <small>{result}</small>

    {#if !hasCredentials}
        <Button on:click={handleCreateCredentials} variant="raised"><Label>Register</Label></Button>
        <Button on:click={handleResetCredentials}><Label>Reset Credentials</Label></Button>
    {:else}
        <Button on:click={handleGetCredentials} variant="raised"><Label>Authenticate</Label></Button>

    {/if}

</div>
