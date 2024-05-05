<script lang="ts">
import { PlusIcon } from '@heroicons/vue/24/outline'
import InputIdentifyUser, { InputData } from '../components/InputIdentifyUser.vue';


export default {
    name: "CreateTestView",
    components: {
        PlusIcon,
        InputIdentifyUser
    },
    data(){
      return {
        IdQuestionData: [
          {id: 1, label: '', format: ''}
        ],
        Questions: []
      }
    },
    methods: {
      handleInputData(data: InputData){
        this.IdQuestionData.push(data)
      },
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
            <div class="py-5 flex items-end">
                <InputIdentifyUser @input-data="handleInputData" v-for="{id} in IdQuestionData" :key="id"></InputIdentifyUser>
                <div class="h-full cursor-pointer p-1 border-dashed border-slate-700 rounded-md border-2">
                    <PlusIcon class="w-6"></PlusIcon>
                </div>
            </div>
        </div>
      </div>
    </form>
  </div>
</template>