<script setup lang="ts">
import { UiButton } from "#components";

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

        <UiButton apperance="primary" size="large" center>
            Create book
        </UiButton>

        <div class="flex-grow flex flex-col gap-1">
            <nuxt-link
                v-for="tab in ASIDE_TABS"
                :key="tab.label"
                :href="tab.href"
            >
                <UiButton
                    block
                    :class="[
                        tab.href === route.path
                            ? 'bg-light-700'
                            : 'text-black/60 hover:(bg-light-700 text-black)',
                    ]"
                >
                    <Icon :name="tab.icon" class="size-5" />

                    <span
                        :class="[
                            'text-sm',
                            tab.href === route.path && 'font-semibold',
                        ]"
                    >
                        {{ tab.label }}
                    </span>
                </UiButton>
            </nuxt-link>
        </div>
    </nav>
</template>
