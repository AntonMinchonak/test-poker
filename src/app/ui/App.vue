<template>
    <div class="app">
        <router-view></router-view>
    </div>
</template>

<script setup lang="ts">
import { useRedirects } from '@/app/router/composables/useRedirects.ts';
import { useGlobalActions } from '@/app/composables/useGlobalActions.ts';

useRedirects();
useGlobalActions();
</script>

<style>
@import '@/app/style/style.scss';

.app {
    font-size: 16rem;
    height: 100%;
    flex: 1 1;
    flex-direction: column;
    display: grid;
    grid-template-rows: 1fr;
}
</style>
