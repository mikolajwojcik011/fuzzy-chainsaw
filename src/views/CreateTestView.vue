<script lang="ts">
import { PlusIcon } from '@heroicons/vue/24/outline'

import InputIdentifyUser from '../components/InputIdentifyUser.vue';
import AppCustomQuestion from '../components/AppCustomQuestion.vue';
import AppQuestionTemplate from '../components/AppQuestionTemplate.vue';
import ButtonAdd from '../components/ButtonAdd.vue';
import ButtonRemove from '../components/ButtonRemove.vue';

import {IdQuestion} from '../interface/id_question'
import { Question } from '../interface/question';
import { Answer } from '../interface/answer';
import { TestSchema } from '../interface/test_schema';

import { v4 as uuidv4 } from 'uuid';
import { generate } from 'random-words';

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
      generateKeys(){
        this.private_key = generate({ exactly: 1, wordsPerString: 2, separator: "-", minLength: 4, maxLength: 8 })[0] 
        this.public_key = generate({ exactly: 1, wordsPerString: 2, separator: "-", minLength: 4, maxLength: 8 })[0]
      },
      submitFrom(){
        let payload = {
          public_key: this.public_key,
          private_key: this.private_key,
          QuestionArr: this.QuestionArr,
          IdQuestionArr: this.IdQuestionArr,
        } as TestSchema

        fetch('http://127.0.0.1:5000/create-test', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        }).then(res => {
          if(!res.ok){
            throw new Error('Not OK');
          }
          return res.json()
        }).then(data => {
          console.log('Test created with ID:', data._id);
        }).catch(err => {
          console.error('There was a problem with the fetch operation:', err);
        })
      },
    },
    mounted(){
      this.generateKeys()
    }
}
</script>
<template>
  <div class="min-h-screen">
    <header class="bg-white shadow">
      <div class="mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Tworzenie testu</h1>
      </div>
    </header>
    <form @submit.prevent="submitFrom">
      <div class="relative mx-auto max-w-7xl min-h-screen pt-6 pb-32 sm:px-6 lg:px-8">
        <AppQuestionTemplate :header="'Klucze dostępu'">
          <div class="flex justify-center gap-6">
            <div class="w-1/3">
              <label for="public_key" class="block text-sm font-medium leading-6 text-gray-900">Klucz publiczny</label>
              <div class="mt-2">
                <input v-model="public_key" id="public_key" name="public_key" type="text"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div class="w-1/3">
              <label for="private-key" class="block text-sm font-medium leading-6 text-gray-900">Klucz prywatny</label>
              <div class="mt-2">
                <input v-model="private_key" id="private-key" name="private-key" type="text"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
          </div>
            <button type="submit"
              @click.prevent="generateKeys"
              class="self-center mt-10 w-1/3 flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Wygeneruj klucze</button>
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
        <div class="fixed bottom-6 left-0 right-0 z-10 w-full h-24 flex justify-center sm:px-6 lg:px-8">
          <div class="flex gap-6 bg-gray-100 ring-1 ring-inset ring-gray-300 rounded-xl p-6">
            <button @click.prevent="submitFrom" 
              class="flex self-center rounded-md bg-indigo-600 px-10 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Zapisz test
            </button>
            <button @click.prevent="addCustomQuestion" class="h-9 w-52 px-6 rounded-lg self-center justify-around flex bg-white cursor-pointer py-1 border-dashed border-indigo-600 text-indigo-600 border-2 hover:border-solid transition-all">
              <h3>Dodaj pytanie</h3>
              <PlusIcon class="w-6 h-6 text-inherit self-center"></PlusIcon>
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>