export class AuthService {
    constructor() {
    }

    async randomChallenge() {
        const randomBuffer = new Uint8Array(64)
        crypto.getRandomValues(randomBuffer)
        return randomBuffer
    }

    async getRandomHash() {
        navigator.userAgent
        const randomBuffer = new Uint8Array(64)
        return await crypto.subtle.digest("SHA-256", randomBuffer)
    }

    async createCredential() {
        const challenge = await this.getRandomHash()
        const userId = await this.getRandomHash()
        const credentials = await navigator.credentials.create({
            publicKey: {
                authenticatorSelection: {
                    authenticatorAttachment: "cross-platform",
                    userVerification: "preferred"
                },
                challenge,
                rp: {id: document.domain, name: "Burst PocketPay"},
                user: {
                    id: userId,
                    name: 'Pocket Pay User',
                    displayName: 'Pocket Pay User'
                },
                pubKeyCredParams: [
                    {type: "public-key", alg: -36}, // ES512
                    {type: "public-key", alg: -35}, // ES384
                    {type: "public-key", alg: -7}, // ES256
                ]
            }
        });
        await navigator.credentials.preventSilentAccess();
        return credentials
    }

    async getCredential() {

    }
}

