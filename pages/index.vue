<template>
    <div class="home-page">
        <Dashboard v-if="isDashboard" />
        <MyProxies v-else/>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/authStore';
import { useDashboardStore } from '~/store/dashboardStore';

const MyProxies = defineAsyncComponent(() => import('~/components/homePage/myProxies.vue'));
const Dashboard = defineAsyncComponent(() => import('~/components/homePage/dashboard.vue'));

const authStore = useAuthStore();
const dashboardStore = useDashboardStore();

const isDashboard = computed(() => dashboardStore.tab === 1);

</script>