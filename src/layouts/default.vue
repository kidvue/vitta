<script setup lang="ts">
import IconPlus from "~icons/lucide/plus";
import IconGrid from "~icons/lucide/grid";
import IconSettings from "~icons/lucide/settings";

import {
    PopoverAnchor,
    PopoverArrow,
    PopoverClose,
    PopoverContent,
    PopoverPortal,
    PopoverRoot,
    PopoverTrigger,
} from "reka-ui";

const links = [
    { path: "/", name: "Overview", icon: IconGrid },
    { path: "/transactions", name: "Transactions", icon: IconGrid },
    { path: "/budgets", name: "Budgets", icon: IconGrid },
    { path: "/accounts", name: "Accounts", icon: IconGrid },
    { path: "/settings", name: "Settings", icon: IconGrid },
];

const route = useRoute();
</script>

<template>
    <div class="sticky top-0 flex items-center justify-center gap-4 p-4">
        <div class="bg-white border shadow-lg px-2 rounded-lg flex">
            <nuxt-link
                v-for="link in links"
                :key="link.path"
                :to="link.path"
                :class="[
                    'h-14 px-4 transition flex flex-col justify-center gap-1 items-center relative font-medium',
                    route.path === link.path
                        ? 'text-vue-green'
                        : 'text-black/60',
                ]"
            >
                <component :is="link.icon" />
                <span
                    :class="[
                        'transition-all',
                        route.path === link.path ? 'text-sm' : 'text-[0em]',
                    ]"
                >
                    {{ link.name }}
                </span>
                <!--
                <span
                    :class="[
                        'block h-3px bg-vue-green rounded-full bottom-1.5 absolute transition-all',
                        route.path === link.path ? 'w-4' : 'w-1 opacity-0',
                    ]"
                /> -->
            </nuxt-link>
        </div>

        <PopoverRoot>
            <PopoverTrigger
                class="bg-vue-navy text-white h-12 w-12 rounded-lg flex items-center justify-center shadow-lg"
                aria-label=""
            >
                <IconPlus />
            </PopoverTrigger>
            <PopoverAnchor />
            <PopoverPortal>
                <PopoverContent
                    side="bottom"
                    :side-offset="0"
                    class="bg-white border"
                >
                    hello
                    <PopoverClose />
                    <PopoverArrow />
                </PopoverContent>
            </PopoverPortal>
        </PopoverRoot>
    </div>

    <slot />
</template>

<style>
body {
    font-family: "Poppins", sans-serif;
}
</style>
