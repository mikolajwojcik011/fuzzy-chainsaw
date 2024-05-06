<script lang="ts">
import { MinusIcon } from '@heroicons/vue/24/outline';

export default {
    name: 'CreateCustomQuestion',
    components:{
        MinusIcon,
    },
    data(){
        return{
            id: this.id
        }
    },
    props: {
        id: Number
    },
    methods: {
        handleRemoveQuestion(){
            this.$emit('removeQuestion', {id: this.id})
        }
    }
}
</script>

<template>
    <div class="flex w-full bg-gray-100 rounded-xl py-6 my-6 sm:px-6 lg:px-8">
        <div class="flex">
            <h2 class="text-2xl font-bold tracking-tight text-gray-900">{{ id + 1 }}.</h2>
        </div>
        <div class="flex w-full justify-end">
            <div @click="handleRemoveQuestion" class="flex justify-center cursor-pointer p-1 border-solid border-rose-600 bg-white text-rose-600 rounded-xl border-2 hover:bg-rose-600  hover:text-white transition-all">
                <MinusIcon class="w-6"></MinusIcon>
            </div>
        </div>
    </div>
</template>