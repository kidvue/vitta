<template>
    <header class="sticky top-0 p-4 pr-2 select-none dark:(bg-one-900)">
        <div class="flex gap-2 justify-between">
            <div
                class="w-2xl max-w-full flex items-center relative rounded-lg border border-neutral-200 bg-neutral-100 overflow-hidden dark:(bg-dark-950 border-dark-800)"
            >
                <Icon
                    name="ph:magnifying-glass"
                    class="absolute left-2 pointer-events-none opacity-50"
                />

                <input
                    type="text"
                    placeholder="Search for books..."
                    class="pl-8 pr-4 outline-0 w-full h-10 bg-transparent"
                />
            </div>

            <div>
                <UiButton href="/settings" apperance="text" icon="ph:gear" />
            </div>
        </div>
    </header>
</template>
