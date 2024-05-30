import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
    id: 'auth-store',
    state: () => ({
        token: ''
    }),
    getters:{
        getToken(state) {
            return state.token
        }
    },
    actions: {
        setToken(token) {
            this.token = token
            localStorage.setItem('token', JSON.stringify(token))
        },
        logout() {
            const router = useRouter()
            this.token = ''
            localStorage.removeItem('token')
            router.push('/login')
        }
    },
    hydrate(state, initialState) {
        const token = localStorage.getItem('token')
        state.token = token ? JSON.parse( token) : ''
    }
})