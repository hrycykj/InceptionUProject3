// require("dotenv").config()
import { GoogleAuthProvider } from "@firebase/auth"
import { useIdTokenAuthRequest } from 'expo-auth-session/providers/google'
import { maybeCompleteAuthSession } from "expo-web-browser"
// import { EXPO_CLIENT_ID } from "@env"

maybeCompleteAuthSession()

const expoClientId = (EXPO_CLIENT_ID) ? EXPO_CLIENT_ID : ""
console.log ('client ID',expoClientId) 

const login = (id_token) => {
    console.log (`Signing in with Google... ${id_token}`)

    try {
        const credential = GoogleAuthProvider.credential (id_token)
        return credential
    } catch (error) {
        throw error
    }
}

const useGoogleAuthentication = () => {
    const [request, fullResult, promptAsync] = useIdTokenAuthRequest ({
        "expoClientId": expoClientId,
        "scopes": ["email"]
    })

    const prompt = async () => {
        console.log('inside prompt function')
        const response = await promptAsync()

        if (response?.type !== 'success') {
            throw new Error(response.type)
        }
        const credential = login (response.params.id_token)
        // console.log ('google response parameters',fullResult)

        return [credential]
    }

    return [request, prompt]
}

export default useGoogleAuthentication