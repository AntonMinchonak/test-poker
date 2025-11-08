<template>
    <div class="game-page">
        <router-link :to="{ name: RouteName.MAIN_PAGE }" class="game-page__back">Back</router-link>
        <iframe :src="gameURL" class="game-page__frame" width="100%" height="100%" frameborder="0" allowfullscreen />
        <div v-if="!gameURL">Not found</div>
    </div>
</template>

<script setup lang="ts">
import { useApiGetGameURL } from '@/shared/composables/useApiGetGameURL.ts';
import { onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import RouteName from '@/app/router/constants/RouteName.ts';

const route = useRoute();
const { load } = useApiGetGameURL();
const gameURL = ref('');

function testLog(event) {
    console.log(event);
}

onMounted(async () => {
    gameURL.value = await load(route.params.id as string);

    window.addEventListener('message', testLog);
});

onUnmounted(() => {
    window.removeEventListener('message', testLog);
});
</script>

<style lang="scss" scoped>
.game-page {
    display: grid;
    grid-template-rows: auto 1fr;

    &__back {
        padding: 5rem 10rem;
    }

    &__frame {
        width: 100%;
        height: 100%;
    }
}
</style>
