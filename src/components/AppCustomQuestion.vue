<script lang="ts">
import { PlusIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'
import ButtonAdd from './ButtonAdd.vue'
import ButtonRemove from './ButtonRemove.vue'
import { Question } from '../interface/question';
import InputAnswer from './InputAnswer.vue';
import { Answer } from '../interface/answer';
import { v4 as uuidv4 } from 'uuid';

export default {
    name: 'CustomQuestion',
    components:{
        PlusIcon,
        ButtonAdd,
        InputAnswer,
        ButtonRemove,
        CheckCircleIcon
    },
    data(){
        return{
                id: this.propId,
                layout: '',
                head: '',
                answerArr: [],
        } as Question
    },
    props: {
        propId: String,
        index: Number
    },
    methods: {
        handleRemoveQuestion(){
            this.$emit('removeQuestion', {index: this.index})
        },
        addAnswer(){
            let answer: Answer = {
                id: uuidv4(),
                content: 'test',
                is_true: false
            }
            this.answerArr.push(answer)
        },
        removeAnswer(index: number){
            this.answerArr.splice(index, 1)
        },
        markAsCorrect(index: number){
            this.answerArr[index].is_true = !this.answerArr[index].is_true
        },
        getClassObj(answer: Answer): any{
            if(answer.is_true) return { 'text-emerald-600': true, 'text-gray-600': false }
            return {'text-emerald-600': false, 'text-gray-600': true }
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
                <h2 v-if="index" class="text-2xl font-bold tracking-tight text-gray-900 w-1/4">{{ index + 1 }}.</h2>
            </div>
            <div class="flex w-9/12 justify-end">
                <ButtonRemove @click="handleRemoveQuestion"></ButtonRemove>
            </div>
        </div>
        <div class="w-full flex flex-col justify-center bg-white mt-6 py-20 sm:px-8 lg:px-10 rounded-xl">
            <div class="flex flex-col w-7/12 self-center">
              <label for="head" class="block text-xl font-medium leading-6 text-gray-900 self-center">Treść pytania</label>
              <div class="mt-8">
                <textarea id="head" name="head" type="text"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div class="w-full flex flex-col min-h-80 mt-20">
                <h3 class="block mb-4 text-xl font-medium leading-6 text-gray-900 self-center">Odpowiedzi:</h3>
                <ol class="flex w-full flex-col justify-center">
                    <li v-for="(answer, index) in answerArr" class="mt-4 self-center w-9/12">
                        <div class="w-full gap-2 flex justify-end p-2 bg-gray-100 rounded-t-md ring-1 ring-inset ring-gray-300">
                            <CheckCircleIcon @click.prevent="markAsCorrect(index)" :class="[getClassObj(answer), 'w-8 cursor-pointer hover:text-emerald-500']"></CheckCircleIcon>
                            <ButtonRemove @click.prevent="removeAnswer(index)"></ButtonRemove>
                        </div>
                        <InputAnswer :index="index" :answer="answer" :key="answer.id"></InputAnswer>
                    </li>
                    <ButtonAdd @click.prevent="addAnswer" class="h-9 w-9/12 self-center rounded-lg"></ButtonAdd>
                </ol>
            </div>
        </div>
        
    </div>
</template>