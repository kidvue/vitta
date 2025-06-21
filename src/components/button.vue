<script setup lang="ts">
import {} from "reka-ui";
type Size = "large" | "medium" | "small";

const { size = "medium" } = defineProps<{
    size: Size;
}>();

const sizes: Record<Size, string[]> = {};
</script>

<button :class="flex gap-1">
    <slot />
</button>
