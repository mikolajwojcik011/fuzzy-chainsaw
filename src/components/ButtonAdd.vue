<script lang=ts>
import { PlusIcon } from '@heroicons/vue/24/outline'

export default {
    name: 'ButtonAdd',
    components: {
        PlusIcon,
    }
}
</script>

<template>
    <button @click.prevent="" class="flex justify-center bg-white mt-6 cursor-pointer p-1 border-dashed border-indigo-600 text-indigo-600 rounded-2xl border-2 hover:border-solid rounded-2xl border-2 transition-all">
        <PlusIcon class="w-8 text-inherit self-center"></PlusIcon>
    </button>
</template>