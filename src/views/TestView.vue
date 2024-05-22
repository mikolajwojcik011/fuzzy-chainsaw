<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, reactive } from "vue";
import { IdQuestion } from "../interface/id_question.ts";
import AppQuestionTemplate from "../components/AppQuestionTemplate.vue";
import AppCustomQuestionBody from "../components/AppCustomQuestionBody.vue";
import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/vue/24/solid";

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

const createHandout = () => {
  store.handout = store.question_arr.map((question) => {
    return {
      id: question.id,
      answer: question.answers.find((answer) => answer.id === question.id),
    };
  });
};

const store = reactive({
  question_arr: [] as any[],
  question_id_arr: [] as IdQuestion[],
  identify: false as boolean,
  currentQuestion: 0 as number,
  handout: [] as any[],
});

const createClassObjForSpan = (inx: number) => {
  if (store.currentQuestion === inx) {
    return {
      "text-white": true,
      "ring-indigo-600": true,
      "bg-indigo-600": true,
    };
  }

  if (store.handout[inx].answer) {
    return {
      "ring-green-300": true,
      "bg-green-100": true,
    };
  }

  return {
    "ring-gray-300": true,
    "bg-gray-100": true,
  };
};

onMounted(async () => {
  try {
    await getTest();
    createHandout();
  } catch (err) {
    console.error(err);
  }
});
</script>

<template>
  <div class="h-screen w-full flex overflow-hidden">
    <div class="w-full h-screen overflow-y-scroll relative">
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
            class="w-9/12 h-full self-center"
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
                    <h2 class="text-center font-bold text-xl">
                      {{ question.head }}
                    </h2>
                  </template>
                  <template #slotBody>
                    <ol class="list-decimal p-8">
                      <li
                        class="mt-4 pl-4 self-center w-full"
                        v-for="{ id, content } in question.answers"
                        :key="id"
                      >
                        <div>
                          <label
                            :class="
                              store.handout[inx].answer === id
                                ? 'ring-indigo-600 ring-2'
                                : 'ring-gray-300'
                            "
                            class="block bg-white w-full rounded-md border-0 py-1.5 px-5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            :for="id"
                            >{{ content }}</label
                          >
                          <VeeField
                            :key="id"
                            :id="id"
                            :name="question.id"
                            type="radio"
                            :value="id"
                            :label="content"
                            class="hidden"
                            v-model="store.handout[inx].answer"
                          />
                        </div>
                      </li>
                    </ol>
                  </template>
                </AppCustomQuestionBody>
              </template>
            </AppQuestionTemplate>
          </div>
          <div
            class="absolute bottom-10 left-0 w-full flex flex-wrap justify-center xl:gap-10 md:gap-4 md:px-40"
          >
            <button
              @click.prevent="prevQuestion"
              class="self-center gap-8 mt-10 md:mt-0 xl:w-1/5 lg:w-1/3 flex justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <ArrowLongLeftIcon class="w-6 h-6 text-inherit self-center">
              </ArrowLongLeftIcon>
              Poprzednie pytanie
            </button>
            <button
              @click.prevent="nextQuestion"
              class="self-center gap-8 mt-10 md:mt-0 lg:w-1/3 xl:w-1/5 flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Następne pytanie
              <ArrowLongRightIcon
                class="w-6 h-6 text-inherit self-center"
              ></ArrowLongRightIcon>
            </button>
          </div>
        </div>
      </VeeForm>
    </div>
    <div
      class="shadow xl:block relative px-4 2xl:w-1/3 xl:w-2/5 lg:w-2/5 py-10 md:hidden"
    >
      <header class="bg-white pb-10">
        <div class="text-center mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">
            Jakis tam test
          </h1>
        </div>
      </header>
      <div class="flex justify-center">
        <div
          class="flex gap-4 flex-wrap"
          :class="{
            'opacity-50 pointer-events-none': !store.identify,
          }"
        >
          <span
            @click.prevent="store.currentQuestion = inx"
            :class="[
              createClassObjForSpan(inx),
              'w-10 h-10 p-2 font-bold flex justify-center items-center ring-1 ring-inset text-gray-900 rounded-xl cursor-pointer',
            ]"
            v-for="(question, inx) in store.question_arr"
            :key="question.id"
            >{{ inx + 1 }}</span
          >
        </div>
      </div>
      <div class="flex flex-col bg-red-200">
        <div class="text-center self-center absolute bottom-10">
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