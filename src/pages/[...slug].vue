<script setup lang="ts">
import { faker } from "@faker-js/faker";

const route = useRoute();
const books = useBooks();
const is_grid_view = shallowRef(true);
const current_page = computed(() => {
    const page = ASIDE_TABS.find((v) => v.href === route.path);
    return page?.label;
});
const filtered_books = computed(() => {
    const page = ASIDE_TABS.find((v) => v.href === route.path);
    if (page) return page.filter(books.value);
    return books.value;
});
const book_income_percentage = computed(() => {
    return (book: Book) => {
        const income = calculateTransaction({ book, type: "income" });
        return (income / book.budget.amount) * 100;
    };
});
const book_expense_percentage = computed(() => {
    return (book: Book) => {
        const income = calculateTransaction({ book, type: "expense" });
        return (income / book.budget.amount) * 100;
    };
});

type CalculateTransactionOptions = {
    book: Book;
    earliest?: Date;
    type: Book["pages"][0]["type"];
};

function calculateTransaction(opts: CalculateTransactionOptions) {
    const pages = opts.book.pages.filter((v) => v.type === opts.type);
    let result = 0;

    for (const page of pages) {
        for (const transaction of page.transactions) {
            result += transaction.amount;
        }
    }

    return result;
}
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

        <div class="flex-grow flex flex-col pr-2">
            <Header />

            <div
                class="border-t border-r border-neutral-200 rounded-tr-lg max-h-full h-full"
            >
                <div
                    class="border-b border-neutral-200 p-4 flex gap-1 items-center"
                >
                    <h1 class="text-md font-semibold flex-grow">
                        {{ current_page }}
                    </h1>

                    <button
                        class="h-10 w-10 rounded-md grid place-items-center hover:(bg-neutral-200)"
                        @click="is_grid_view = !is_grid_view"
                    >
                        <Icon
                            :name="
                                is_grid_view
                                    ? 'ph:squares-four'
                                    : 'ph:list-bullets'
                            "
                        />
                    </button>
                </div>

                <main
                    :class="[
                        'flex-grow overflow-y-auto max-h-full',
                        is_grid_view
                            ? 'p-4 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
                            : '',
                    ]"
                >
                    <button
                        v-for="book of filtered_books"
                        :key="book.id"
                        class="border rounded-xl p-4 bg-white border-neutral-200 text-left transition hover:(bg-neutral-100) space-y-4"
                    >
                        <div class="text-xl">{{ book.name }}</div>
                        <div class="flex gap-1 overflow-hidden">
                            <span
                                :class="['min-w-1 bg-red h-4 rounded']"
                                :style="{
                                    width: `${book_expense_percentage(book)}%`,
                                }"
                            />
                            <span
                                :class="['min-w-1 bg-green h-4 rounded']"
                                :style="{
                                    width: `${book_income_percentage(book)}%`,
                                }"
                            />
                            <span
                                :class="[
                                    'min-w-1 flex-grow bg-neutral-300 h-4 rounded',
                                ]"
                            />
                        </div>

                        <div class="grid grid-cols-3 gap-1">
                            <div>
                                <p class="text-sm text-black/50">Expense</p>
                                <p>
                                    ${{
                                        calculateTransaction({
                                            book,
                                            type: "expense",
                                        })
                                    }}
                                </p>
                            </div>
                            <div>
                                <p class="text-sm text-black/50">Earning</p>
                                <p>
                                    ${{
                                        calculateTransaction({
                                            book,
                                            type: "income",
                                        })
                                    }}
                                </p>
                            </div>
                            <div>
                                <p class="text-sm text-black/50">Budget</p>
                                <p>${{ book.budget.amount }}</p>
                            </div>
                        </div>
                    </button>
                </main>
            </div>
        </div>
    </div>
</template>
