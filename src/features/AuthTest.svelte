<script>
    import Textfield from '@smui/textfield';
    import Button, {Label} from '@smui/button';
    import {AuthService} from "./AuthService";

    let name = ''

    $: result = ''

    async function handleCreate() {
        try {

            const service = new AuthService()
            const credentials = await service.createCredentials(name, "abcdef1234")
            localStorage.setItem('credentials', JSON.stringify(credentials))
            result = "Done"
        } catch (e) {
            result = e.message
        }
    }

</script>

<div>
    <h1>Auth</h1>
    <p>Auth Test</p>
    <small>{result}</small>

    <Textfield bind:value={name} label="Label"/>

    <Button on:click={handleCreate} variant="raised"><Label>Register</Label></Button>

</div>
