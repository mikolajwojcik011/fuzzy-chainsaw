<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, reactive } from "vue";
import AppQuestionTemplate from "../components/AppQuestionTemplate.vue";
import AppCustomQuestionBody from "../components/AppCustomQuestionBody.vue";
import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/vue/24/solid";
import { IdQuestion } from "../interface/id_question.ts";
import { Question } from "../interface/question.ts";

const route = useRoute();
const publicKey = route.params.publicKey;

const store = reactive({
  question_arr: [] as any[],
  question_id_arr: [] as any[],
  identify: false as boolean,
  currentQuestion: 0 as number,
  handout: [] as any[],
  id_handout: [] as any[],
});

onMounted(async () => {
  try {
    await getTest();
    createHandout();
    createIdHandout();
  } catch (err) {
    console.error(err);
  }
});

interface Test {
  "question-arr": Question[];
  "question-id-arr": IdQuestion[];
}

const getTest = async () => {
  await fetch("http://57.128.200.162:5000/get-test/" + publicKey)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch test. Error: ${response.status}`);
      }
      return response.json();
    })
    .then((data: Test) => {
      console.log(data);
      store.question_arr = data["question-arr"];
      store.question_id_arr = data["question-id-arr"];
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

const submitForm = () => {
  let payload = {
    public_key: publicKey,
    answer_arr: store.id_handout.concat(store.handout),
  };

  console.log(payload);

  fetch("http://57.128.200.162:5000:5000/submit-test", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to submit test. Error: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log("Test submited:", data);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

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
      type: 1,
      id: question.id,
      answer: "",
    };
  });
};

const createIdHandout = () => {
  store.id_handout = store.question_id_arr.map((question) => {
    return {
      type: 0,
      id: question.id,
      answer: "",
    };
  });
};

const createClassObjForSpan = (inx: number) => {
  console.log(`store.handout[${inx}]:`, store.handout[inx]); // Add this line

  if (store.handout[inx]) {
    if (store.currentQuestion === inx) {
      return {
        "text-white": true,
        "ring-indigo-600": true,
        "bg-indigo-600": true,
      };
    }

    if (store.handout[inx].answer !== "") {
      return {
        "ring-green-300": true,
        "bg-green-100": true,
      };
    }
  }

  return {
    "ring-gray-300": true,
    "bg-gray-100": true,
  };
};
</script>

<template>
  <div class="h-screen w-full flex overflow-hidden">
    <div class="w-full h-screen overflow-y-scroll relative">
      <form @submit.prevent="submitForm">
        <div class="flex flex-col w-full items-center" v-show="!store.identify">
          <AppQuestionTemplate
            class="w-1/2"
            :header="question.id"
            v-for="(question, inx) in store.question_id_arr"
            :key="question.id"
            v-model="store.id_handout[inx].answer"
          >
            <template #slotBody>
              <label
                class="text-sm font-medium leading-6 text-gray-900"
                :for="question.id"
                >{{ question.label }}</label
              >
              <input
                :id="question.id"
                class="block rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type="text"
                v-model="store.id_handout[inx].answer"
                :name="question.id"
              />
            </template>
          </AppQuestionTemplate>
          <button
            class="self-center mt-12 lg:w-1/3 xl:w-1/5 flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            v-if="!store.identify"
            @click="store.identify = true"
          >
            Start
          </button>
        </div>
        <div class="p-10 flex flex-col" v-show="store.identify">
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

                          <input
                            :key="id"
                            :id="id"
                            :name="question.id"
                            type="radio"
                            :value="id"
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
              :disabled="
                store.currentQuestion !== store.question_arr.length - 1
              "
              :class="{
                'opacity-50 pointer-events-none bg-rose-400':
                  store.currentQuestion !== store.question_arr.length - 1,
              }"
              class="self-center gap-8 xl:w-1/5 lg:w-1/3 flex justify-center rounded-md bg-rose-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
            >
              Zakończ
            </button>
            <button
              @click.prevent="nextQuestion"
              :class="{
                'opacity-50 pointer-events-none bg-indigo-400':
                  store.currentQuestion === store.question_arr.length - 1,
              }"
              class="self-center gap-8 mt-10 md:mt-0 lg:w-1/3 xl:w-1/5 flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Następne pytanie
              <ArrowLongRightIcon
                class="w-6 h-6 text-inherit self-center"
              ></ArrowLongRightIcon>
            </button>
          </div>
        </div>
      </form>
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