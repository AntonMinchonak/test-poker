<template>
    <div class="login-page-form">
        <input v-model="login" type="text" placeholder="Enter login..." class="login-page-form__input" />
        <input v-model="password" type="password" placeholder="Password" class="login-page-form__input" />
        <button class="login-page-form__confirm" @click="submit">
            {{ isLoading ? ' Loading...' : 'Login' }}
        </button>
        <div v-if="errorText" class="login-page-form__error">
            {{ errorText }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useApiLogin } from '@/shared/composables/useApiLogin.ts';

const { load, isLoading, errorText } = useApiLogin();

const login = ref('');
const password = ref('');
function submit() {
    load(login.value, password.value);
}
</script>

<style lang="scss" scoped>
.login-page-form {
    display: flex;
    flex-direction: column;
    gap: 10rem;
    align-items: center;

    &__confirm {
        display: flex;
        justify-content: center;
        padding: 10rem;
        width: 100%;
        background: hsl(231, 40%, 47%);
        border: none;
        font-weight: 700;
        border-radius: 5rem;
    }

    &__input {
        outline: none;
        border: none;
        padding: 10rem;
        border-radius: 5rem;
    }

    &__error {
        color: hsl(0deg, 100%, 60%);
    }
}
</style>
