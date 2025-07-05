<script setup lang="ts">
import {} from "@vueuse/core";

type CalculateTransactionOptions = {
    book: Book;
    earliest?: Date;
    type: Book["pages"][0]["type"];
};

const element = shallowRef();
const is_hovered = shallowRef(false);
const selected_books = useSelectedBooks();

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

defineProps<{ book: Book }>();
</script>

<template>
    <nuxt-link
        :href="`/b/${book.id}`"
        class="border rounded-xl p-4 bg-white border-neutral-200 text-left transition hover:(bg-neutral-100) space-y-4"
        @onmouseover="() => (is_hovered = true)"
        @onmouseleave="() => (is_hovered = false)"
    >
        <div class="flex justify-between pointer-events-none">
            <div class="relative flex items-center">
                <button
                    :class="[
                        'border rounded h-4 w-4 pointer-events-auto ',
                        is_hovered ? '' : '',
                    ]"
                ></button>

                <span :class="['', is_hovered ? '' : '']">
                    {{ book.name }}
                </span>
            </div>

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
                }"
            />
            <span
                class="min-w-1 bg-vue-green h-4 rounded"
                :style="{
                    width: `${book_income_percentage(book)}%`,
                }"
            />
            <span
                class="min-w-1 flex-grow h-4 rounded bg-white"
                :style="{
                    opacity: 0.75,
                    background:
                        'repeating-linear-gradient(-45deg ,#35495e, 2px, #ffffff 2px, #ffffff 4px)',
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
