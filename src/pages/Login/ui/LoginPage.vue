<template>
    <div class="login-page">
        <div class="login-page__title">Authorization</div>
        <LoginPageForm class="login-page__form" />
    </div>
</template>

<script setup lang="ts">
import LoginPageForm from '@/pages/Login/ui/components/LoginPageForm.vue';
</script>

<style lang="scss" scoped>
.login-page {
    display: grid;
    grid-template-rows: auto 1fr;
    justify-items: center;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    &__title {
        font-size: 24rem;
        margin: 20rem 0;
    }
}
</style>
