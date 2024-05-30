import { defineStore } from 'pinia'

export const useDashboardStore = defineStore({
    id: 'dashboard-store',
    state: () => ({
        tab: 1
    }),
    getters:{
        getToken(state) {
            return state.tab
        }
    },
    actions: {
        setTab(tab: number) {
            this.tab = tab
        } 
    },
})