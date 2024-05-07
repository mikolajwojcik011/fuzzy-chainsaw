<script lang="ts">
    import { MinusCircleIcon } from '@heroicons/vue/24/solid';

    export default {
        name: 'ButtonRemove',
        components: {
            MinusCircleIcon,
        }
    }
</script>
<template>
    <button class="text-rose-600 hover:text-rose-500">
        <MinusCircleIcon class="w-8"></MinusCircleIcon>
    </button>
</template>