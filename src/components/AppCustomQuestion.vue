<script lang="ts">
import { MinusCircleIcon } from '@heroicons/vue/24/solid';
import { PlusIcon } from '@heroicons/vue/24/outline'
import ButtonAdd from './ButtonAdd.vue'
import { Question } from '../interface/question';

export default {
    name: 'CustomQuestion',
    components:{
        MinusCircleIcon,
        PlusIcon,
        ButtonAdd,
    },
    data(){
        return{
                id: this.propId,
                layout: '',
                correct_answer: 1,
                head: '',
        } as Question
    },
    props: {
        propId: String,
        index: Number
    },
    methods: {
        handleRemoveQuestion(){
            this.$emit('removeQuestion', {index: this.index})
        }
    },
    mounted(){
        let el: any = this.$refs.scrto
        el.scrollIntoView({ behavior: 'smooth' })
    }
}
</script>

<template>
    <div ref="scrto" class="flex flex-col w-full bg-gray-100 rounded-xl pt-6 lg:pb-8 sm:pb-6 my-6 sm:px-6 lg:px-8">
        <div class="flex w-full">
            <div class="flex w-1/4 items-start ">
                <h2 class="text-2xl font-bold tracking-tight text-gray-900 w-1/4">{{ index + 1 }}.</h2>
            </div>
            <div class="flex w-9/12 justify-end">
                <button @click="handleRemoveQuestion" class="text-rose-600 hover:text-rose-500">
                    <MinusCircleIcon class="w-8"></MinusCircleIcon>
                </button>
            </div>
        </div>
        <div class="w-full flex flex-col justify-center bg-white mt-6 py-20 sm:px-8 lg:px-10 rounded-xl">
            <div class="flex flex-col w-7/12 self-center">
              <label for="head" class="block text-xl font-medium leading-6 text-gray-900 self-center">Treść pytania</label>
              <div class="mt-8">
                <textarea id="head" name="head" type="text" required=""
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div class="w-full flex flex-col h-80 mt-20">
                <h3 for="head" class="block text-xl font-medium leading-6 text-gray-900 self-center">Odpowiedzi:</h3>
                <ButtonAdd class="h-full"></ButtonAdd>
            </div>
        </div>
        
    </div>
</template>