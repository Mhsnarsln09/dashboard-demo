<template>
    <div class="dashboard">
        <div class="info">
            <div class="info-item">
                <div class="item-title">Subscription expires on</div>
                <div class="item-content">{{ dashboardInfo.expireTime }}</div>
            </div>
            <div class="info-item">
                <div class="item-title">Last charge</div>
                <div class="item-content">
                    {{ dashboardInfo.lastChargeAmount }} <span>{{ dashboardInfo.lastCharge }}</span>
                </div>
            </div>
            <div class="info-item">
                <div class="item-title bold-900">Total Usage Data</div>
                <div class="item-content bold-900">{{ formatNumericData(dashboardInfo.totalDataUsage) }}</div>
            </div>
            <div class="info-item">
                <div class="item-title bold-900">Daily Usage Data</div>
                <div class="item-content bold-900">{{ formatNumericData(dashboardInfo.dailyUsage) }}</div>
            </div>
        </div>
        <DasboardGraphicComponent />
        <DashboardTableComponent :data="dashboardTable" />
    </div>
</template>

<script setup lang="ts">
import { DashboardInfo, DashboardTable } from '~/models/entities/Dasboard';
import { DashboardService } from '~/services/DashboardService';

const DashboardTableComponent = defineAsyncComponent(() => import('~/components/homePage/dashboardTableComponent.vue'));
const DasboardGraphicComponent = defineAsyncComponent(() => import('~/components/homePage/dashboardGraphicComponent.vue'));

const dashboardService = new DashboardService();

onMounted(() => {
    getDashboardInfo();
    getDashboardTable();
});


const dashboardInfo = ref<DashboardInfo>(new DashboardInfo());

const dashboardTable = ref<DashboardTable[]>(new Array<DashboardTable>());

const getDashboardInfo = () => {
    dashboardService.GetInfo().then((response) => {
        dashboardInfo.value = response;
    });
}

const getDashboardTable = () => {
    dashboardService.GetTable().then((response) => {
        dashboardTable.value = response.data;
    });
}

const formatNumericData = (data: string) => {
    return `${data.replace(/\B(?=(\d{3})+(?!\d))/g, '.')} GB`
}

</script>