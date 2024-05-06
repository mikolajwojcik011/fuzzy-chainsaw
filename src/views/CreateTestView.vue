<script lang="ts">
import { PlusIcon } from '@heroicons/vue/24/outline'
import InputIdentifyUser from '../components/InputIdentifyUser.vue';
import {IdQuestion} from '../interface/id_question'
import AppCreateCustomQuestion from '../components/AppCreateCustomQuestion.vue';
import { v4 as uuidv4 } from 'uuid';

interface DataInterface {
  IdQuestionArr: IdQuestion[],
  QuestionArr: [],
}


export default {
    name: "CreateTestView",
    components: {
        PlusIcon,
        InputIdentifyUser,
        AppCreateCustomQuestion
    },
    data(){
      return {
        IdQuestionArr: [
          {id: 0, label: 'Imię', format: 'Tekst'}
        ],
        QuestionArr: []
      } as DataInterface
    },
    methods: {
      handleInputData(data: IdQuestion){
        if(this.IdQuestionArr[data.id]){
          this.IdQuestionArr[data.id].format = data.format
          this.IdQuestionArr[data.id].label = data.label
        }
      },
      handleRemoveQuestion(data){
        this.QuestionArr.splice(data.id, 1)
      },
      addIdQuestion(){
        let newIdQ: IdQuestion = {
          id: this.IdQuestionArr.length,
          label: '',
          format: 'Text',
        }
        this.IdQuestionArr.push(newIdQ)
      },
      addCustomQuestion(){
        let newQuestion = {
          id: uuidv4()
        }
        this.QuestionArr.push(newQuestion)
      }
    }
}
</script>
<template>
     <div class="min-h-full">
    <header class="bg-white shadow">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Tworzenie testu</h1>
      </div>
    </header>
    <form>
      <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div class="w-full bg-gray-100 rounded-xl py-6 sm:px-6 lg:px-8">
            <h2 class="text-2xl font-bold tracking-tight text-gray-900">Pytanie identyfikujące</h2>
            <div class="py-5 flex flex-wrap gap-y-8 items-end">
                <InputIdentifyUser :propId="id" :propLabel="label" :propFromat="format" @input-data="handleInputData" v-for="{id, label, format} in IdQuestionArr" :key="id"></InputIdentifyUser>
                <!-- <div @click="addIdQuestion" class="flex justify-center bg-white mt-6 w-60 h-24 cursor-pointer p-1 border-solid border-indigo-600 text-indigo-600 rounded-2xl border-2 hover:bg-indigo-600  hover:text-white  rounded-2xl border-2 transition-all">
                    <PlusIcon class="w-8 text-inherit"></PlusIcon>
                </div> -->
            </div>
        </div>
        <AppCreateCustomQuestion @remove-question="handleRemoveQuestion" :id="index" v-for="(question, index) in QuestionArr" :key="index"></AppCreateCustomQuestion>
        <div @click="addCustomQuestion" class="flex justify-center bg-white mt-6 w-full h-24 cursor-pointer p-1 border-solid border-indigo-600 text-indigo-600 rounded-2xl border-2 hover:bg-indigo-600  hover:text-white transition-all">
            <PlusIcon class="w-8 text-inherit"></PlusIcon>
        </div>
      </div>
    </form>
  </div>
</template>