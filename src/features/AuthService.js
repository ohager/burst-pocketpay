export class AuthService {
    constructor() {
    }

    async digestMessage(message) {
        const encoder = new TextEncoder();
        const data = encoder.encode(message);
        const digest = await crypto.subtle.digest('SHA-512', data);
        return digest
    }

    async createCredentials(name, pin){
        const challenge = await this.digestMessage(pin)
        const userId = await this.digestMessage(name)
        const credentials = await navigator.credentials.create({
            publicKey: {
                authenticatorSelection: {
                    authenticatorAttachment: "platform",
                    userVerification: "required"
                },
                challenge,
                rp: { id: document.domain, name: "Burst PocketPay" },
                user: {
                    displayName: 'some name',
                    id: userId,
                    name
                },
                pubKeyCredParams: [
                    { type: "public-key", alg: -36 }, // ES512
                    { type: "public-key", alg: -35 }, // ES384
                    { type: "public-key", alg: -7 }, // ES256
                ]
            }
        });
        await navigator.credentials.preventSilentAccess();
        return credentials
    }
}

