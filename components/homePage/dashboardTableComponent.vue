<template>
    <div class="table">
            <div class="table-title">Transactions History</div>
            <div class="table-content">
                <DataTable :value="data"
                    :pt="{ headercontent: 'header-content', headertitle: 'table-header', bodycell: 'body-cell' }">
                    <Column field="type" header="Type"></Column>
                    <Column field="location" header="Location"></Column>
                    <Column field="rental" header="Rental Period"></Column>
                    <Column field="ipcount" header="Number of IP"></Column>
                    <Column field="purpose" header="SpesificPurpose"></Column>
                    <Column field="date" header="Date">
                        <template #body="item">
                            {{ converDate(item.data.date) }}
                        </template>
                    </Column>
                    <Column header="Actions">
                        <template #body="item">
                            <ClientOnly>
                                <div class="dropdown">
                                    <button
                                        @click.stop="dropBtnClick(item.index), isOpen[item.index] = !isOpen[item.index]"
                                        class="dropbtn">Actions &nbsp;
                                        <span>
                                            <svg width="12" height="7" viewBox="0 0 12 7" fill="none"
                                                v-if="!isOpen[item.index]" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M11 1L6.88388 5.11612C6.39573 5.60427 5.60427 5.60427 5.11612 5.11612L1 1"
                                                    stroke="black" stroke-width="2" stroke-linecap="round" />
                                            </svg>
                                            <svg width="12" height="7" viewBox="0 0 12 7" fill="none" v-else
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M1 5.48224L5.11612 1.36612C5.60427 0.877966 6.39573 0.877967 6.88388 1.36612L11 5.48224"
                                                    stroke="#4359CA" stroke-width="2" stroke-linecap="round" />
                                            </svg>
                                        </span>
                                    </button>
                                    <div :id="`myDropdown-${item.index}`" class="dropdown-content">
                                        <p @click="writeConsole(item.data.ipcount)">Home</p>
                                        <p @click="writeConsole(item.data.ipcount)">About</p>
                                        <p @click="writeConsole(item.data.ipcount)">Contact</p>
                                    </div>
                                </div>
                            </ClientOnly>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
</template>

<script setup lang="ts">
import type { DashboardTable } from '~/models/entities/Dasboard';


const props = defineProps({
    data: {
        type: Array as PropType<DashboardTable[]>,
        required: true
    }
});

const isOpen = ref<boolean[]>([]);
const converDate = (dateString: string) => {

const monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const date = new Date(dateString);

const day = date.getDate();
const month = monthNamesShort[date.getMonth()];
const year = date.getFullYear();

return `${day} ${month} ${year}`;
}

const dropBtnClick = (index: number) => {
const dropdown = document.getElementById(`myDropdown-${index}`) as HTMLElement;
dropdown.classList.toggle("show");
const btn = document.getElementsByClassName('dropbtn')[index] as HTMLElement;
btn.classList.toggle("active");
}

const writeConsole = (ipcount: string) => {
console.log(ipcount);
}

onMounted(() => {
    setTimeout(() => {
        document.addEventListener('click', (event: any) => {
            const dropdowns = document.getElementsByClassName("dropdown-content");
            const buttons = document.getElementsByClassName('dropbtn');
            for (let i = 0; i < dropdowns.length; i++) {
                const openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');

                }
                const btn = buttons[i] as HTMLElement;
                if (btn.classList.contains('active')) {
                    btn.classList.remove('active');
                }
                isOpen.value[i] = false;
            }
        });
    }, 50);
})

onBeforeUnmount(() => {
    document.removeEventListener('click', () => { })
})


function defineProps(arg0: { data: { type: PropType<DashboardTable[]>; required: boolean; }; }) {
  throw new Error('Function not implemented.');
}
</script>