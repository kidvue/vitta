<script setup lang="ts">
import type { Book } from "#imports";

type Props = {
    filter?: (v: Book[]) => Book[];
};

const { filter = (v) => v } = defineProps<Props>();
const books_state = useBooks();
const books = computed(() => filter(books_state.value));
</script>

<template>
    <div v-for="book of books" :key="book.id">
        {{ book }}
    </div>
</template>
