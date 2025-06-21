<script setup lang="ts">
import { DataTable } from "#components";

const route = useRoute();
const books = useBookState();
const current_page = computed(() => {
    const page = ASIDE_TABS.find((v) => v.href === route.path);
    return page?.label;
});
const filtered_books = computed(() => {
    const page = ASIDE_TABS.find((v) => v.href === route.path);
    if (page) return page.filter(books.value);
    return books.value;
});

loadBooks();
</script>

<template>
    <Body class="font-sans dark:(bg-neutral-900 text-white) overflow-hidden" />

    <Head>
        <title>
            {{ current_page ? current_page + " - " : "" }}KidVue Vitta
        </title>
    </Head>

    <div class="flex h-screen w-screen overflow-hidden">
        <Aside />

        <div class="flex-grow flex flex-col pr-4">
            <Header />

            <div
                class="border-t border-r border-neutral-200 rounded-tr-lg max-h-full h-full"
            >
                <DataTable
                    v-if="current_page"
                    :page="current_page"
                    :books="filtered_books"
                />

                <div
                    v-else
                    class="h-full flex flex-col items-center justify-center gap-8"
                >
                    <h1 class="text-5xl">Oh no!</h1>

                    <p>This page has probably been abducted!</p>

                    <SvgTaken class="size-xs" />
                </div>
            </div>
        </div>
    </div>
</template>
