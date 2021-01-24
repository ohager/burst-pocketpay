import {encode, decode} from "../utils/base64url";

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
        console.log('challenge', challenge)
        const userId = await this.getRandomValues()
        console.log('userId', userId, encode(userId))
        const credentials = await navigator.credentials.create({
            publicKey: {
                challenge,
                rp: {id: document.domain, name: "Burst PocketPay"},
                user: {
                    id: userId,
                    name: 'Pocket Pay User',
                    displayName: 'Pocket Pay User'
                },
                authenticatorSelection: {
                    requireResidentKey: true,
                },
                pubKeyCredParams: [
                    {type: "public-key", alg: -36}, // ES512
                    {type: "public-key", alg: -35}, // ES384
                    {type: "public-key", alg: -7}, // ES256
                    {type: "public-key", alg: -257}
                ],
                attestation: 'none',
                timeout: 60*1000,
            }
        });
        await navigator.credentials.preventSilentAccess();
        return {
            credentials,
            challenge
        }
    }

    async getCredential(id) {
        const challenge = await this.getRandomValues()
        const credentials = await navigator.credentials.get({
            publicKey: {
                challenge,
                rp: {id: document.domain, name: "Burst PocketPay"},
                allowCredentials: [
                    {
                        type: "public-key",
                        id: decode(id)

                    }
                ],
                userVerification: 'preferred'
            }
        })
        return credentials
    }
}

