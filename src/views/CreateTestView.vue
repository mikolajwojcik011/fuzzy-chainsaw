<script lang="ts">
import { PlusIcon } from '@heroicons/vue/24/outline'

import InputIdentifyUser from '../components/InputIdentifyUser.vue';
import AppCustomQuestion from '../components/AppCustomQuestion.vue';
import AppQuestionTemplate from '../components/AppQuestionTemplate.vue';
import ButtonAdd from '../components/ButtonAdd.vue';

import {IdQuestion} from '../interface/id_question'
import { Question } from '../interface/question';
import { Answer } from '../interface/answer';

import { v4 as uuidv4 } from 'uuid';
import ButtonRemove from '../components/ButtonRemove.vue';
import { TestSchema } from '../interface/test_schema';

export default {
    name: "CreateTestView",
    components: {
        PlusIcon,
        InputIdentifyUser,
        AppCustomQuestion,
        ButtonAdd,
        AppQuestionTemplate,
        ButtonRemove
    },
    data(){
      return {
					public_key: '',
					private_key: '',
					IdQuestionArr: [{id: uuidv4(), label: '', format: ''}],
        	QuestionArr: [],
			} as TestSchema
    },
    methods: {
      handleInputData({index, format, label}: any){
        if(this.IdQuestionArr[index]){
          this.IdQuestionArr[index].format = format
          this.IdQuestionArr[index].label = label
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
      handleUpdateIndexStyle({qIndex, payload}: any){      
        this.QuestionArr[qIndex].index_style = payload
      },
      removeIdQuestion(qIndex: number){
        this.IdQuestionArr.splice(qIndex, 1)
      },
      addIdQuestion(){
        let newIdQ: IdQuestion = {
          id: uuidv4(),
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
            index_style: 1,
          }
        this.QuestionArr.push(newQuestion)
      },
      submitFrom(){
        let payload = {
          public_key: this.public_key,
          private_key: this.private_key,
          questionArr: this.QuestionArr,
          idQuestionArr: this.IdQuestionArr,
        } as TestSchema

        console.log(payload);
        
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
    <form @submit.prevent="submitFrom">
      <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 pb-80">
        <AppQuestionTemplate :header="'Klucze dostępu'">
          <div class="flex justify-center gap-6">
            <div class="w-1/3">
              <label for="public_key" class="block text-sm font-medium leading-6 text-gray-900">Klucz publiczny</label>
              <div class="mt-2">
                <input :v-model="public_key" id="public_key" name="public_key" type="text"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div class="w-1/3">
              <label for="private-key" class="block text-sm font-medium leading-6 text-gray-900">Klucz prywatny</label>
              <div class="mt-2">
                <input :v-model="private_key" id="private-key" name="private-key" type="text"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
          </div>
        </AppQuestionTemplate>
        <AppQuestionTemplate :header="'Pytanie identyfikujące'">
          <div class="flex flex-wrap gap-6 justify-center">
            <InputIdentifyUser :propId="id" :propLabel="label" :propqIndex="qIndex" :propFromat="format"
              @input-data="handleInputData" v-for="({id, label, format}, qIndex) in IdQuestionArr" :key="id">
              <h2 class="w-2/3 text-md self-center tracking-tight text-gray-900 truncate">{{ id }}</h2>
              <div class="w-1/3 flex justify-end">
                <ButtonRemove @click.prevent="removeIdQuestion(qIndex)"></ButtonRemove>
              </div>
            </InputIdentifyUser>
            <ButtonAdd class="w-80 mt-0 min-h-52" @click.prevent="addIdQuestion"></ButtonAdd>
          </div>
        </AppQuestionTemplate>
        <AppCustomQuestion @remove-question="handleRemoveQuestion" @add-answer="handleAddAnswer"
          @remove-answer="handleRemoveAnswer" @mark-as-correct="handleMarkAsCorrect"
          @update-content="handleUpdateContent" @update-head="handleUpdateHead"
          @update-index-style="handleUpdateIndexStyle" v-for="({id, answerArr}, qIndex) in QuestionArr" :qPropId="id"
          :qPropIndex="qIndex" :qPropAnswerArr="answerArr" :key="id">
        </AppCustomQuestion>
        <ButtonAdd @click.prevent="addCustomQuestion" class="h-24 w-full"></ButtonAdd>
        <button>submit</button>
      </div>
    </form>
  </div>
</template>