<script setup lang="ts">
const is_grid_view = shallowRef(true);

defineProps<{ books: Book[]; page: string }>();
</script>

<template>
    <div class="border-b border-neutral-200 p-2 flex gap-1 items-center">
        <h1 class="text-md font-semibold flex-grow pl-2">
            {{ page }}
        </h1>

        <UiButton
            apperance="text"
            center
            square
            :icon="is_grid_view ? 'ph:squares-four' : 'ph:list-bullets'"
            @click="is_grid_view = !is_grid_view"
        />
    </div>

    <main
        :class="[
            'flex-grow overflow-y-auto max-h-full',
            is_grid_view
                ? 'p-4 grid gap-4 md:(grid-cols-2 bg-green) xl:(grid-cols-3 bg-yellow) 3xl:(grid-cols-4 bg-red)'
                : '',
        ]"
    >
        <template v-for="book of books" :key="book.id">
            <DataGrid v-if="is_grid_view" :book="book" />
        </template>
    </main>
</template>
