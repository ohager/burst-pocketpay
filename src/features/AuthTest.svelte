<script>
    import Textfield from '@smui/textfield';
    import Button, {Label} from '@smui/button';
    import {AuthService} from "./AuthService";

    let name = ''

    $: result = ''

    async function handleCreate() {
        try {
            const service = new AuthService()
            const credentialResponse = await service.createCredential()
            localStorage.setItem('authId', credentialResponse.id)
            result = `${JSON.stringify(credentialResponse)} stored`
        } catch (e) {
            result = e.message
        }
    }

</script>

<div>
    <h1>Auth</h1>
    <p>Auth Test</p>
    <small>{result}</small>

    <Button on:click={handleCreate} variant="raised"><Label>Register</Label></Button>

</div>
