<template>
    <div class="main-page-list">
        <MainPageListItem
            v-for="item in globalStore.gamesList"
            :key="item.title"
            :title="item.title"
            :id="item.id"
            :image="item.image"
        />
    </div>
</template>

<script setup lang="ts">
import MainPageListItem from '@/pages/Main/ui/components/MainPageListItem.vue';
import { useGlobalStore } from '@/shared/store/GlobalStore.ts';

const globalStore = useGlobalStore();
</script>

<style lang="scss" scoped>
.main-page-list {
    overflow-y: scroll;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240rem, 1fr));
    grid-auto-rows: 180rem;
    padding: 10rem;
    gap: 5rem;
}
</style>
