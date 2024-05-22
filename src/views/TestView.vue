<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, reactive } from "vue";
import { IdQuestion } from "../interface/id_question.ts";
import AppQuestionTemplate from "../components/AppQuestionTemplate.vue";
import AppCustomQuestionBody from "../components/AppCustomQuestionBody.vue";

const route = useRoute();
const publicKey = route.params.publicKey;

async function getTest() {
  const response = await fetch("http://127.0.0.1:5000/get-test/" + publicKey);

  if (!response.ok) {
    throw new Error(`Failed to fetch test. Error: ${response.status}`);
  }
  let data = await response.json();
  console.log(data);
  store.question_arr = await data["question-arr"];
  store.question_id_arr = await data["question-id-arr"];

  return true;
}

const nextQuestion = () => {
  if (store.currentQuestion < store.question_arr.length - 1) {
    store.currentQuestion++;
  }
};

const prevQuestion = () => {
  if (store.currentQuestion > 0) {
    store.currentQuestion--;
  }
};

const store = reactive({
  question_arr: [] as any[],
  question_id_arr: [] as IdQuestion[],
  identify: false as boolean,
  currentQuestion: 0 as number,
});

onMounted(async () => {
  try {
    await getTest();
  } catch (err) {
    console.error(err);
  }
});
</script>

<template>
  <div class="h-screen w-full flex overflow-hidden">
    <div class="w-full h-screen overflow-y-scroll">
      <VeeForm>
        <div v-if="!store.identify">
          <div v-for="question in store.question_id_arr" :key="question.id">
            <label :for="question.id">{{ question.label }}</label>
            <VeeField :name="question.id" type="text" />
          </div>
          <button v-if="!store.identify" @click="store.identify = true">
            Start
          </button>
        </div>
        <div class="p-10 flex flex-col" v-if="store.identify">
          <div
            class="w-9/12 self-center"
            v-for="(question, inx) in store.question_arr"
            :key="question.id"
          >
            <AppQuestionTemplate
              :header="question.id"
              v-if="inx === store.currentQuestion"
            >
              <template #slotBody>
                <AppCustomQuestionBody>
                  <template #slotHeader>
                    <h2>{{ question.head }}</h2>
                  </template>
                  <template #slotBody>
                    <ol class="list-decimal p-8">
                      <li v-for="{ id, content } in question.answers" :key="id">
                        <div>
                          <VeeField
                            :key="id"
                            :name="question.id"
                            type="radio"
                            :value="id"
                          />
                          <label :for="id">{{ content }}</label>
                        </div>
                      </li>
                    </ol>
                  </template>
                </AppCustomQuestionBody>
              </template>
            </AppQuestionTemplate>
          </div>
          <div class="flex justify-center gap-10">
            <button
              class="self-center mt-10 w-1/5 flex justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              @click.prevent="prevQuestion"
            >
              Poprzednie pytanie
            </button>
            <button
              class="self-center mt-10 w-1/5 flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              @click.prevent="nextQuestion"
            >
              Następne pytanie
            </button>
          </div>
        </div>
      </VeeForm>
    </div>
    <div class="shadow relative px-4 2xl:w-1/3 xl:w-2/5 lg:w-2/5">
      <header class="bg-white">
        <div class="text-center mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">
            Jakis tam test
          </h1>
        </div>
      </header>
      <div class="flex justify-center">
        <div class="flex gap-4 flex-wrap">
          <span
            class="w-10 h-10 p-2 bg-gray-100 flex justify-center items-center text-gray-900 rounded-xl ring-1 ring-inset ring-gray-300 cursor-pointer"
            v-for="(question, inx) in store.question_arr"
            :key="question.id"
            >{{ inx + 1 }}</span
          >
        </div>
      </div>
      <div class="flex flex-col bg-red-200">
        <div class="text-center self-center absolute bottom-12">
          <h2 class="text-3xl tracking-tight text-gray-900">Pozostało:</h2>
          <p class="text-3xl font-bold tracking-tight text-gray-900"></p>
          <p class="text-7xl font-bold tracking-tight text-gray-900">
            00:29:59
          </p>
        </div>
      </div>
    </div>
  </div>
</template>