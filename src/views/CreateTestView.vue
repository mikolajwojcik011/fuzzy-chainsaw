<script lang="ts">
import { PlusIcon } from '@heroicons/vue/24/outline'

import InputIdentifyUser from '../components/InputIdentifyUser.vue';
import AppCustomQuestion from '../components/AppCustomQuestion.vue';
import ButtonAdd from '../components/ButtonAdd.vue';

import {IdQuestion} from '../interface/id_question'
import { Question } from '../interface/question';
import { Answer } from '../interface/answer';

import { v4 as uuidv4 } from 'uuid';
import { DataInputAnswer } from '../components/InputAnswer.vue';
import { UniversalTestCreationEvent } from '../interface/universal_test_creation_event';


interface DataInterface {
  IdQuestionArr: IdQuestion[],
  QuestionArr: Question[],
}


export default {
    name: "CreateTestView",
    components: {
        PlusIcon,
        InputIdentifyUser,
        AppCustomQuestion,
        ButtonAdd
    },
    data(){
      return {
        IdQuestionArr: [
          {id: 0, label: 'Imię', format: 'Tekst'}
        ],
        QuestionArr: [
          
        ]
      } as DataInterface
    },
    methods: {
      handleInputData(data: IdQuestion){
        if(this.IdQuestionArr[data.id]){
          this.IdQuestionArr[data.id].format = data.format
          this.IdQuestionArr[data.id].label = data.label
        }
      },
      handleRemoveQuestion({qIndex}: any){
        this.QuestionArr.splice(qIndex, 1)
      },
      handleAddAnswer({qIndex}: any){
        let answer: Answer = {
                id: uuidv4(),
                content: '',
                is_true: false
            }
        if(this.QuestionArr[qIndex].answerArr) this.QuestionArr[qIndex].answerArr.push(answer)
      },
      handleRemoveAnswer({qIndex, aIndex}: any){
        this.QuestionArr[qIndex].answerArr.splice(aIndex, 1)
      },
      handleMarkAsCorrect({qIndex, aIndex}: any){
        this.QuestionArr[qIndex].answerArr[aIndex].is_true = !this.QuestionArr[qIndex].answerArr[aIndex].is_true
      },
      handleUpdateHead({qIndex, payload}: any){
        this.QuestionArr[qIndex].head = payload
      },
      handleUpdateContent({qIndex, aIndex, payload}: any){
        this.QuestionArr[qIndex].answerArr[aIndex].content = payload
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
        let newQuestion: Question = {
            id: uuidv4(),
            head: '',
            answerArr: [],
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
      <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 pb-80">
        <div class="w-full bg-gray-100 rounded-xl py-6 sm:px-6 lg:px-8">
            <h2 class="text-2xl font-bold tracking-tight text-gray-900">Pytanie identyfikujące</h2>
            <div class="py-5 flex flex-wrap gap-y-8 items-end">
                <InputIdentifyUser :propId="id" :propLabel="label" :propFromat="format" @input-data="handleInputData" v-for="{id, label, format} in IdQuestionArr" :key="id"></InputIdentifyUser>
                <!-- <div @click="addIdQuestion" class="flex justify-center bg-white mt-6 w-60 h-24 cursor-pointer p-1 border-solid border-indigo-600 text-indigo-600 rounded-2xl border-2 hover:bg-indigo-600  hover:text-white  rounded-2xl border-2 transition-all">
                    <PlusIcon class="w-8 text-inherit"></PlusIcon>
                </div> -->
            </div>
        </div>
        <AppCustomQuestion 
          @remove-question="handleRemoveQuestion" 
          @add-answer="handleAddAnswer"
          @remove-answer="handleRemoveAnswer"
          @mark-as-correct="handleMarkAsCorrect"
          @update-content="handleUpdateContent"
          @update-head="handleUpdateHead"
          v-for="({id, answerArr}, qIndex) in QuestionArr" 
          :qPropIndex="qIndex"
          :qPropAnswerArr="answerArr"
          :key="id">
        </AppCustomQuestion>
        <ButtonAdd @click.prevent="addCustomQuestion" class="h-24 w-full"></ButtonAdd>
      </div>
    </form>
  </div>
</template>