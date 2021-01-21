import base64url from "base64url";

function publicKeyCredentialToJSON(pubKeyCred) {
    if (pubKeyCred instanceof ArrayBuffer) {
        return base64url.encode(pubKeyCred);
    } else if (pubKeyCred instanceof Array) {
        return pubKeyCred.map(publicKeyCredentialToJSON);
    } else if (pubKeyCred instanceof Object) {
        const obj = {};
        for (let key in pubKeyCred) {
            obj[key] = publicKeyCredentialToJSON(pubKeyCred[key]);
        }
        return obj;
    } else return pubKeyCred;
}


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
                    userVerification: "required"
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

