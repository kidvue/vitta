<script setup lang="ts">
const is_grid_view = UseIsGridView();

defineProps<{ books: Book[]; page: string }>();
</script>

<template>
    <div class="border-b border-neutral-200 p-4 flex gap-1 items-center">
        <h1 class="text-md font-semibold flex-grow">
            {{ page }}
        </h1>

        <button
            class="h-10 w-10 rounded-md grid place-items-center hover:(bg-neutral-200)"
            @click="is_grid_view = !is_grid_view"
        >
            <Icon
                :name="is_grid_view ? 'ph:squares-four' : 'ph:list-bullets'"
            />
        </button>
    </div>

    <main
        :class="[
            'flex-grow overflow-y-auto max-h-full',
            is_grid_view ? 'p-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3' : '',
        ]"
    >
        <DataGrid v-if="is_grid_view" :books="books" />
    </main>
</template>
