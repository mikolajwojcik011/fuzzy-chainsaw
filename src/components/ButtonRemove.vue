<script lang="ts">
    import { XCircleIcon } from '@heroicons/vue/24/solid';

    export default {
        name: 'ButtonRemove',
        components: {
            XCircleIcon,
        }
    }
</script>
<template>
    <button class="text-rose-600 hover:text-rose-500 transition-all">
        <XCircleIcon class="w-8"></XCircleIcon>
    </button>
</template>