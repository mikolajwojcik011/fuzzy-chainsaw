<script lanf="ts">
export default {
    name: 'AppQuestionTemplate'
}
</script>

<template>
    <div ref="scrto" class="flex flex-col w-full bg-gray-100 rounded-xl pt-2 my-6 ring-1 ring-inset ring-gray-300">
        <div class="flex w-full px-6">
            <div class="flex w-full items-start self-center">
                <h2 class="text-lg tracking-tight text-gray-900 truncate">Pytanie identyfikujące</h2>
            </div>
        </div>
        <div class="w-full flex flex-col bg-white mt-2 py-20 sm:px-8 lg:px-10 rounded-b-xl ring-1 ring-inset ring-gray-300">
            <slot></slot>
        </div>   
    </div>
</template>