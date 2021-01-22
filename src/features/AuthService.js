import {encode} from "../utils/base64url";

export class AuthService {
    constructor() {
    }

    async getRandomValues() {
        const randomBuffer = new Uint8Array(64)
        crypto.getRandomValues(randomBuffer)
        return randomBuffer
    }

    async createCredential() {
        const challenge = await this.getRandomValues()
        console.log('challenge', encode(challenge))
        const userId = await this.getRandomValues()
        const credentials = await navigator.credentials.create({
            publicKey: {
                challenge,
                rp: {id: document.domain, name: "Burst PocketPay"},
                user: {
                    id: userId,
                    name: 'Pocket Pay User',
                    displayName: 'Pocket Pay User'
                },
                pubKeyCredParams: [
                    // {type: "public-key", alg: -36}, // ES512
                    // {type: "public-key", alg: -35}, // ES384
                    {type: "public-key", alg: -7}, // ES256
                    {type: "public-key", alg: -257}
                ],
                attestation: 'direct',
                timeout: 60*1000
            }
        });
        await navigator.credentials.preventSilentAccess();
        return credentials
    }

    async getCredential(challenge) {
        const credentials = await navigator.credentials.get({
            publicKey: {
                challenge,
                rp: {id: document.domain, name: "Burst PocketPay"},
            }
        })

        return credentials
    }
}

