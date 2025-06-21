<script setup lang="ts">
const route = useRoute();
const aside_compact = ref(false);
</script>

<template>
    <nav
        :class="[
            'flex flex-col gap-4 p-4 border-r border-neutral-200',
            aside_compact ? 'min-w-10' : 'min-w-64',
        ]"
    >
        <div class="font-bold h-10 flex items-center text-xl">vitta</div>

        <button class="bg-indigo-600 text-white h-12 rounded-lg cursor-pointer">
            Create book
        </button>

        <div class="flex-grow flex flex-col gap-1">
            <nuxt-link
                v-for="tab in ASIDE_TABS"
                :key="tab.label"
                :href="tab.href"
                :class="[
                    'flex gap-2 px-2 h-10 rounded-md items-center transition',
                    tab.href === route.path
                        ? 'bg-light-700'
                        : 'text-black/60 hover:(bg-light-700 text-black)',
                ]"
            >
                <Icon :name="tab.icon" />

                <span
                    :class="[
                        'text-sm',
                        tab.href === route.path && 'font-semibold',
                    ]"
                >
                    {{ tab.label }}
                </span>
            </nuxt-link>
        </div>
    </nav>
</template>
