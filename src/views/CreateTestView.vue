<script lang="ts">
import { PlusIcon } from '@heroicons/vue/24/outline'
import InputIdentifyUser, { IdQuestion } from '../components/InputIdentifyUser.vue';

interface DataInterface {
  IdQuestionArr: IdQuestion[],
  Questions: [],
}


export default {
    name: "CreateTestView",
    components: {
        PlusIcon,
        InputIdentifyUser
    },
    data(){
      return {
        IdQuestionArr: [
        ],
        Questions: []
      } as DataInterface
    },
    methods: {
      handleInputData(data: IdQuestion){
        if(this.IdQuestionArr[data.id]){
          this.IdQuestionArr[data.id].format = data.format
          this.IdQuestionArr[data.id].label = data.label
        }
      },
      addIdQuestion(){
        let newIdQ: IdQuestion = {
          id: this.IdQuestionArr.length,
          label: '',
          format: 'Text',
        }
        this.IdQuestionArr.push(newIdQ)
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
            <h2 class="text-lg font-bold tracking-tight text-gray-900">Pytanie identyfikujące</h2>
            <div class="py-5 flex flex-wrap gap-y-8 items-end">
                <InputIdentifyUser :propId="id" @input-data="handleInputData" v-for="{id} in IdQuestionArr" :key="id"></InputIdentifyUser>
                <div @click="addIdQuestion" class="flex justify-center mt-6 w-60 h-24 cursor-pointer p-1 border-dashed border-slate-700 hover:border-indigo-600 hover:text-indigo-600  rounded-md border-2">
                    <PlusIcon class="w-8 text-inherit"></PlusIcon>
                </div>
            </div>
        </div>
        <div class="w-full bg-gray-100 rounded-xl py-6 my-6 sm:px-6 lg:px-8">
            <h2 class="text-lg font-bold tracking-tight text-gray-900">1.</h2>
        </div>
      </div>
    </form>
  </div>
</template>