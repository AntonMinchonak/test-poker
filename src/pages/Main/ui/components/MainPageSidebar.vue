<template>
    <div class="main-page-sidebar">
        <div class="main-page-sidebar__balance">{{ userStore.balance }} {{ userStore.currency }}</div>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/entities/User/store/UserStore.ts';

const userStore = useUserStore();
</script>

<style lang="scss" scoped>
.main-page-sidebar {
    background: hsl(228, 10%, 10%);
    padding: 10rem;

    &__balance {
        display: flex;
        justify-content: center;
        text-align: center;
        align-items: center;
        background: hsl(231, 10%, 27%);
        padding: 10rem;
        border-radius: 20rem;
    }
}
</style>
