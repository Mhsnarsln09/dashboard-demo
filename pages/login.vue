<template>
    <div class="login">
        <div class="login-form">
            <div class="flex flex-column gap-2">
                <label for="username">Username</label>
                <InputText id="username" v-model="loginBody.username" aria-describedby="username-help" />
            </div>
            <div class="flex flex-column gap-2">
                <label for="password">Password</label>
                <Password id="password" v-model="loginBody.password" :feedback="false" />
            </div>
            <Button label="Login" @click="login" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { LoginBody } from '~/models/entities/Auth';
import { AuthService } from '~/services/AuthService';
import { useAuthStore } from '~/store/authStore';

const authService = new AuthService();
const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();
const loginBody = ref<LoginBody>({
    username: '',
    password: ''
});


const login = () => {
    authService.Login(loginBody.value).then((res:any) => {
        if(res.status === 200) {
            authStore.setToken(res.jwt);
            toast.add({ severity: 'success', summary: 'Success', detail: 'Login successful', life: 2500 });
            router.push('/');
        }
    }).catch((err:any) => {
        toast.add({ severity: 'error', summary: 'Error', detail: err.message, life: 2500 });
    });
}
</script>