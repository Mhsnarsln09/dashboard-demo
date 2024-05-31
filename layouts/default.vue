<template>
    <ClientOnly>
        <div class="whenTheUserNotLoggedIn" v-if="!isUserHasToken">
            <main>
                <slot />
            </main>
        </div>
        <div class="whenTheUserLoggedIn">
            <aside>
                <div class="aside-bar">
                    <div class="logo">
                        <img src="~/assets/images/logo.png" alt="logo" />
                    </div>
                    <div class="link active-tab">
                        <img src="~/assets/images/home.png" alt="">
                    </div>
                    <div class="link">
                        <img src="~/assets/images/card.png" alt="">
                    </div>
                    <div class="link">
                        <img src="~/assets/images/person.png" alt="">
                    </div>
                    <div class="link">
                        <img src="~/assets/images/logout.png" alt="" @click="logout">
                    </div>
                </div>
            </aside>
            <main>
                <div class="main-header">
                    <div class="notification">
                        <p>Special Offer! Get Complete Free Proxy 10 MB Proxy, without credit card. <span>Start Free
                                Trial</span></p>
                        <div class="close">
                            <img src="~/assets/images/close.png" alt="" @click="closeNotification">
                        </div>
                    </div>
                    <div class="title">
                        Proxies & Scraping Infrastructure
                    </div>
                    <div class="tab">
                        <div v-for="tab in tabs" :key="tab.tabId">
                            <div :class="`tab-link tabId-${tab.tabId}`"
                                @click="activeTab(tab.tabId), dashboardStore.tab = tab.tabId">
                                {{ tab.name }}
                            </div>
                        </div>
                    </div>
                    <Divider :pt="{ root: 'divider-root' }" />
                </div>
                <div>
                    <slot />
                </div>
            </main>
        </div>
    </ClientOnly>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/authStore';
import { useDashboardStore } from '~/store/dashboardStore';

const authStore = useAuthStore();
const dashboardStore = useDashboardStore();
const router = useRouter();
const route = useRoute();

const isUserHasToken = computed(() => {
    return authStore.token.length;
});

onMounted(() => {
    if (authStore.token.length && route.path === '/login') {
        router.push('/');
    } else if (!authStore.token.length && route.path == '/') {
        router.push('/login');
    }
    activeTab(dashboardStore.tab);
});

const tabs = ref([
    {
        name: 'My Proxies',
        tabId: 0
    },
    {
        name: 'Dashboard',
        tabId: 1
    }
]);

const activeTab = (tabId: number) => {
    setTimeout(() => {
        const tabLinks = document.querySelectorAll('.tab-link') as NodeListOf<HTMLElement>;
        tabLinks.forEach((tabLink) => {
            tabLink.classList.remove('active-tab-link');
        });
        const tab = document.querySelector(`.tabId-${tabId}`) as HTMLElement;
        tab.classList.add('active-tab-link');
    }, 50);

}


const closeNotification = () => {
    const notification = document.querySelector('.notification') as HTMLElement;
    notification.style.display = 'none';
}

const logout = () => {
    authStore.logout();
}
</script>
