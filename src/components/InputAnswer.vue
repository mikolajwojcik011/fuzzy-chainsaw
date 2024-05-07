<script lang="ts">
import ButtonRemove from './ButtonRemove.vue';

    export default {
        name: 'InputAnswer',
        props: {
            index: Number,
        },
        components: {
            ButtonRemove,
        },
        methods: {

        }
    }
</script>

<template>
    <div class="w-full flex">
        <textarea name="answer" type="text" required
            class="min-h-12 h-7 block w-full rounded-b-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
    </div>
</template>