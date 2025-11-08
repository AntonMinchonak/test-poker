<template>
    <div class="main-page">
        <MainPageSidebar class="main-page__sidebar" />
        <MainPageList class="main-page__list" />
    </div>
</template>

<script setup lang="ts">
import MainPageSidebar from '@/pages/Main/ui/components/MainPageSidebar.vue';
import MainPageList from '@/pages/Main/ui/components/MainPageList.vue';
</script>

<style lang="scss" scoped>
.main-page {
    display: flex;
    max-height: 100dvh;
    flex-wrap: wrap;
    overflow: hidden;

    &__sidebar {
        flex: 1 1;
        min-width: 220rem;
    }

    &__list {
        min-width: 280rem;
        flex: 6 1 440rem;
        width: 100%;
        height: 100%;
    }
}
</style>
