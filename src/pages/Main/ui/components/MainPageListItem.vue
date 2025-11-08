<template>
    <router-link :to="{ name: RouteName.GAME_PAGE, params: { id } }" :key="title" class="main-page-list-item">
        <div class="main-page-list-item__image-wrapper">
            <img :src="image" :alt="title" class="main-page-list-item__image" />
        </div>
        <div class="main-page-list-item__title">{{ title }}</div>
        <div class="main-page-list-item__play">Play</div>
    </router-link>
</template>

<script setup lang="ts">
import RouteName from '@/app/router/constants/RouteName.ts';

defineProps<{
    title: string;
    image: string;
    id: number | string;
}>();
</script>

<style lang="scss" scoped>
.main-page-list-item {
    $self: &;

    background: hsl(231, 10%, 27%);
    border-radius: 10rem;
    max-height: 180rem;
    display: flex;
    flex-direction: column;
    overflow: clip;
    position: relative;
    cursor: pointer;
    transition: 0.2s ease-in-out;

    &:hover {
        background: hsl(231, 10%, 20%);
        #{$self}__play {
            background: hsl(0deg, 60%, 50%, 90%);
            transform: scale(1.1);
        }
    }

    &__title {
        font-weight: 700;
        padding: 5rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    &__image-wrapper {
        overflow: hidden;
        width: 100%;
        height: 100%;
        background: hsl(231, 10%, 35%);
    }

    &__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &__play {
        position: absolute;
        right: 0;
        top: 0;
        color: hsl(0deg, 100%, 100%);
        padding: 5rem 10rem;
        margin: 5rem;
        background: hsl(0deg, 60%, 30%, 40%);
        border-radius: 10rem;
        border: 1rem solid hsl(0deg, 80%, 40%, 80%);
        transition: 0.15s linear;
    }
}
</style>
