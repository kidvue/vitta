<script setup lang="ts">
type Size = "large" | "medium" | "small";
type Spacing = "large" | "medium" | "small";
type Apperance = "primary" | "soft" | "outlined" | "text";
type ButtonProps = {
    size?: Size;
    apperance?: Apperance;
    spacing?: Spacing;
    square?: boolean;
    block?: boolean;
    center?: boolean;
};

const SIZES: Record<Size, string[]> = {
    large: ["h-12 rounded-lg text-lg"],
    medium: ["h-10 rounded-md"],
    small: ["h-8 rounded"],
};
const SPACING: Record<Spacing, string[]> = {
    large: ["gap-4 px-4"],
    medium: ["gap-2 px-2"],
    small: ["gap-1 px-1"],
};
const APPERANCES: Record<Apperance, string[]> = {
    outlined: [],
    primary: ["bg-vue-green cursor-pointer"],
    soft: ["bg-vue-navy/25"],
    text: ["", "hover:(bg-neutral-200)"],
};

defineProps<ButtonProps>();
</script>

<template>
    <button
        :class="[
            'flex items-center',
            ...SIZES[size || 'medium'],
            ...APPERANCES[apperance || 'outlined'],
            ...SPACING[spacing || 'medium'],
            square && 'aspect-square px-0',
            block && 'w-full',
            center && 'justify-center',
        ]"
    >
        <slot />
    </button>
</template>
