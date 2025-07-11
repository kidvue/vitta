<script setup lang="ts">
import IconPlus from "~icons/lucide/plus";
import IconGrid from "~icons/lucide/grid";
import IconReceiptText from "~icons/lucide/receipt-text";
import IconPiggyBank from "~icons/lucide/piggy-bank";
import IconWallet from "~icons/lucide/wallet";
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
    { path: "/transactions", name: "Transactions", icon: IconReceiptText },
    { path: "/budgets", name: "Budgets", icon: IconPiggyBank },
    { path: "/accounts", name: "Accounts", icon: IconWallet },
    { path: "/settings", name: "Settings", icon: IconSettings },
];

const route = useRoute();
</script>

<template>
    <div class="sticky top-0 flex items-center justify-center gap-4 p-4">
        <div
            class="bg-white border shadow-lg rounded-xl grid grid-cols-5 gap-2 p-2 px-4"
        >
            <nuxt-link
                v-for="link in links"
                :key="link.path"
                :to="link.path"
                :class="[
                    'h-12 w-12 transition flex flex-col justify-center gap-1 items-center relative rounded-lg',
                    route.path !== link.path && 'hover:(bg-neutral-100)',
                ]"
            >
                <component :is="link.icon" :class="['']" />

                <span
                    :class="[
                        'absolute transition-all text-xs shadow-md pointer-events-none bg-white p-1 px-1.5 border rounded-md',
                        route.path === link.path
                            ? '-mt-16'
                            : 'opacity-0 -mt-10',
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
