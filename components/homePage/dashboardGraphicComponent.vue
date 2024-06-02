<template>
    <div class="graphic">
        <div class="graphic-title bold-900">Data usage per network</div>
        <div class="graphic-content">
            <canvas id="myChart"></canvas>
        </div>
    </div>
</template>

<script setup lang="ts">
import Chart from 'chart.js/auto';

const dayLabels = ref<string[]>([
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',

])

const config: any = {
    type: 'line',
    data: {
        labels: dayLabels.value,
        datasets: [{
            label: 'Data usage per network',
            data: [
                0,
                1.1,
                1.5,
                2.9,
                3.3,
                3.7,
                9
            ],
            borderColor: 'black',
            borderWidth: 2,
            fill: false,
            tension: 0.4,
            pointRadius: 0, // Noktaların gösterimini kaldır
            pointHoverRadius: 0 // Fare ile üzerine gelindiğinde noktanın büyümesini engelle
        }]
    },
    options: {
        scales: {
            x: {
                grid: {
                    display: false // Hide vertical grid lines for the x-axis
                },
            },
            y: {
                grid: {
                    borderDash: [0], // This can control the border style if border is visible
                    drawBorder: false, // Make sure the border is not drawn
                    color: (context: any) => {
                        return [0, 1, 3, 5, 10].includes(context.tick.value) ? 'rgba(0, 0, 0, 0.05)' : 'rgba(0, 0, 0, 0)';
                    }
                },
                ticks: {
                    stepSize: 1, // You can adjust step size as needed
                    callback: function (value: any) {
                        // Only display labels for specific values
                        return [0, 1, 3, 5, 10].includes(value) ? value + ' GB' : '';
                    }
                },
                min: 0,
                max: 10
            }
        },
        plugins: {
            legend: {
                display: false // Toggle legend display
            }
        }
    }
};

// Initialization in Vue component
onMounted(() => {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    ctx.getContext('2d');
    new Chart(ctx, config);
});

</script>