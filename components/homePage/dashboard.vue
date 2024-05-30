<template>
    <div class="dashboard">
        <div class="info">

        </div>
        <div class="graphic"></div>
        <div class="table"></div>
    </div>
</template>

<script setup lang="ts">
import { DashboardService } from '~/services/DashboardService';
const dashboardService = new DashboardService();

onMounted(() => {
    dashboardService.GetInfo().then((response) => {
        console.log(response);
    });
    dashboardService.GetTable().then((response) => {
        console.log(response);
    });
});
</script>