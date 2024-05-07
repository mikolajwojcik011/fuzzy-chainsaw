<script lang="ts">
import { MinusIcon } from '@heroicons/vue/24/outline';

export default {
    name: 'CustomQuestion',
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
    <div class="flex flex-col w-full bg-gray-100 rounded-xl py-6 my-6 sm:px-6 lg:px-8">
        <div class="flex w-full">
            <div class="flex items-start ">
                <h2 class="text-2xl font-bold tracking-tight text-gray-900 w-1/4">{{ id + 1 }}.</h2>
            </div>
            <div class="flex w-9/12 justify-end">
                <button @click="handleRemoveQuestion" class="flex justify-center cursor-pointer p-0.5 border-solid border-rose-600 bg-white text-rose-600 rounded-md border-2 hover:bg-rose-600  hover:text-white transition-all">
                    <MinusIcon class="w-6"></MinusIcon>
                </button>
            </div>
        </div>
        <div class="w-full h-4 bg-white"></div>
    </div>
</template>