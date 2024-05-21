<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, reactive } from "vue";
import { Question } from "../interface/question.ts";
import { IdQuestion } from "../interface/id_question.ts";

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

const store = reactive({
  question_arr: [] as Question[],
  question_id_arr: [] as IdQuestion[],
  identify: false as boolean,
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
  <div class="h-screen w-full flex">
    <div class="w-4/5">
      <VeeForm>
        <div v-if="!store.identify">
          <div v-for="question in store.question_id_arr" :key="question.id">
            <label :for="question.id">{{ question.label }}</label>
            <VeeField :name="question.id" type="text" />
          </div>
          <button @click="store.identify = true">Dalej</button>
        </div>
        <div v-if="store.identify">
          <div v-for="question in store.question_arr" :key="question.id">
            <h2>{{ question.head }}</h2>
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
          </div>
        </div>
      </VeeForm>
    </div>
    <div class="w-1/5 shadow relative px-4">
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
            class="w-12 h-12 p-2 bg-gray-100 flex justify-center items-center text-gray-900 rounded-xl ring-1 ring-inset ring-gray-300 cursor-pointer"
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