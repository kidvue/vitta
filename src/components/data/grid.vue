<script setup lang="ts">
type Props = { books: Book[] };
type CalculateTransactionOptions = {
    book: Book;
    earliest?: Date;
    type: Book["pages"][0]["type"];
};

const { books } = defineProps<Props>();
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
    <nuxt-link
        v-for="book of books"
        :key="book.id"
        :href="`/b/${book.id}`"
        class="border rounded-xl p-4 bg-white border-neutral-200 text-left transition hover:(bg-neutral-100) space-y-4"
    >
        <div class="flex justify-between pointer-events-none">
            {{ book.name }}

            <span class="text-xl">
                ${{
                    calculateTransaction({ book, type: "income" }) -
                    calculateTransaction({ book, type: "expense" })
                }}
            </span>
        </div>
        <div class="flex gap-1 overflow-hidden pointer-events-none">
            <span
                class="min-w-1 bg-red h-4 rounded"
                :style="{
                    width: `${book_expense_percentage(book)}%`,
                    background:
                        'repeating-linear-gradient(-45deg ,#F00, 2px, #ffffff 2px, #ffffff 4px)',
                }"
            />
            <span
                class="min-w-1 bg-green h-4 rounded"
                :style="{
                    width: `${book_income_percentage(book)}%`,
                    background:
                        'repeating-linear-gradient(-45deg ,#0F0, 2px, #ffffff 2px, #ffffff 4px)',
                }"
            />
            <span
                class="min-w-1 flex-grow bg-neutral-300 h-4 rounded magic-pattern"
                :style="{
                    opacity: 0.25,
                    background:
                        'repeating-linear-gradient(-45deg ,#000000, 2px, #ffffff 2px, #ffffff 4px)',
                }"
            />
        </div>

        <div class="flex justify-between gap-1 pointer-events-none">
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
    </nuxt-link>
</template>

<style>
.magic-pattern {
}
</style>
