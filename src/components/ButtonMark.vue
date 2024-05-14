<script lang="ts">
import { CheckCircleIcon } from '@heroicons/vue/24/solid'


export default {
    name: 'ButtonMark',
    components: {
        CheckCircleIcon
    },
    props: {
        isTrue: Boolean
    },
    methods: {
        getClassObj(is_true: boolean){
            if(is_true) return { 'text-emerald-600': true, 'text-gray-600': false }
            return {'text-emerald-600': false, 'text-gray-600': true }
        },
    }
}
</script>
<template>
    <button>
        <CheckCircleIcon  :class="[getClassObj(isTrue),'w-8 cursor-pointer hover:text-emerald-500 transition-all']"></CheckCircleIcon>
    </button>    
</template>