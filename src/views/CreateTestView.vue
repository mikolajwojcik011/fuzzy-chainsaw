<script lang="ts">
import { PlusIcon } from "@heroicons/vue/24/outline";

import InputIdentifyUser from "../components/InputIdentifyUser.vue";
import InputIndexStyle from "../components/InputIndexStyle.vue";
import InputAnswer from "../components/InputAnswer.vue";
import AppCustomQuestion from "../components/AppCustomQuestion.vue";
import AppQuestionTemplate from "../components/AppQuestionTemplate.vue";
import AppCustomQuestionBody from "../components/AppCustomQuestionBody.vue";
import ButtonAdd from "../components/ButtonAdd.vue";
import ButtonRemove from "../components/ButtonRemove.vue";
import ButtonMark from "../components/ButtonMark.vue";

import { IdQuestion } from "../interface/id_question";
import { Question } from "../interface/question";
import { Answer } from "../interface/answer";
import { TestSchema } from "../interface/test_schema";

import { v4 as uuidv4 } from "uuid";
import { generate } from "random-words";

export default {
  name: "CreateTestView",
  components: {
    PlusIcon,
    InputIdentifyUser,
    AppCustomQuestion,
    ButtonAdd,
    AppQuestionTemplate,
    ButtonRemove,
    InputIndexStyle,
    InputAnswer,
    ButtonMark,
    AppCustomQuestionBody,
  },
  data() {
    return {
      test: {
        public_key: "",
        private_key: "",
        IdQuestionArr: [{ id: uuidv4(), label: "", format: "" }],
        QuestionArr: [],
        animateKeys: false,
      } as TestSchema,
    };
  },
  methods: {
    handleUpdateIndexStyle({ qInx, index_style }: any) {
      this.test.QuestionArr[qInx].index_style = index_style;
    },
    addIdQuestion() {
      let newIdQ: IdQuestion = {
        id: uuidv4(),
        label: "",
        format: "Text",
      };
      this.test.IdQuestionArr.push(newIdQ);
    },
    removeIdQuestion(qIndex: number) {
      this.test.IdQuestionArr.splice(qIndex, 1);
    },
    addCustomQuestion() {
      let newQuestion: Question = {
        id: uuidv4(),
        head: "",
        answerArr: [],
        index_style: 1,
      };
      this.test.QuestionArr.push(newQuestion);
    },
    removeQuestion(qInx: number) {
      this.test.QuestionArr.splice(qInx, 1);
    },
    addAnswer(qInx: any) {
      let answer: Answer = {
        id: uuidv4(),
        content: "",
        is_true: false,
      };
      if (this.test.QuestionArr[qInx].answerArr)
        this.test.QuestionArr[qInx].answerArr.push(answer);
    },
    markAnswer(qInx: number, aInx: number) {
      this.test.QuestionArr[qInx].answerArr[aInx].is_true =
        !this.test.QuestionArr[qInx].answerArr[aInx].is_true;
    },
    removeAnswer(qInx: number, aInx: number) {
      console.log(aInx);

      this.test.QuestionArr[qInx].answerArr.splice(aInx, 1);
    },
    generateKeys() {
      this.test.private_key = generate({
        exactly: 1,
        wordsPerString: 2,
        separator: "-",
        minLength: 4,
        maxLength: 8,
      })[0];
      this.test.public_key = generate({
        exactly: 1,
        wordsPerString: 2,
        separator: "-",
        minLength: 4,
        maxLength: 8,
      })[0];
    },
    submitFrom() {
      let payload: TestSchema = this.test;

      fetch("http://57.128.200.162:5000/create-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Not OK");
          }
          return res.json();
        })
        .then((data) => {
          console.log("Test submited with ID:", data._id);
        })
        .catch((err) => {
          console.error("There was a problem with the fetch operation:", err);
        });
    },
  },
  mounted() {
    this.generateKeys();
  },
};
</script>
<template>
  <div class="min-h-screen">
    <header class="bg-white shadow">
      <div class="mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">
          Tworzenie testu
        </h1>
      </div>
    </header>
    <form @submit.prevent="submitFrom">
      <div
        class="relative mx-auto max-w-7xl min-h-screen pt-6 pb-32 sm:px-6 lg:px-8"
      >
        <transition-group name="fade">
          <AppQuestionTemplate key="1" :header="'Klucze dostępu'">
            <template #slotBody>
              <div class="flex justify-center gap-6">
                <div class="w-1/3">
                  <label
                    for="public_key"
                    class="block text-sm font-medium leading-6 text-gray-900"
                    >Klucz publiczny</label
                  >
                  <input
                    required
                    v-model="test.public_key"
                    id="public_key"
                    name="public_key"
                    type="text"
                    class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div class="w-1/3">
                  <label
                    for="private-key"
                    class="block text-sm font-medium leading-6 text-gray-900"
                    >Klucz prywatny</label
                  >
                  <input
                    required
                    v-model="test.private_key"
                    id="private-key"
                    name="private-key"
                    type="text"
                    class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <button
                type="submit"
                @click.prevent="generateKeys"
                class="self-center mt-10 w-1/3 flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Wygeneruj klucze
              </button>
            </template>
          </AppQuestionTemplate>
          <transition-group name="fade">
            <AppQuestionTemplate key="1" :header="'Tytuł'">
              <template #slotBody>
                <div class="flex flex-col justify-center gap-6">
                  <div class="w-1/3 self-center">
                    <label
                      for="title"
                      class="block text-sm font-medium leading-6 text-gray-900"
                      >Tytuł</label
                    >
                    <input
                      required
                      id="title"
                      name="title"
                      type="text"
                      class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div class="w-1/3 self-center">
                    <label
                      for="time"
                      class="block text-sm font-medium leading-6 text-gray-900"
                      >Ilość czasu</label
                    >
                    <input
                      required
                      id="time"
                      name="title"
                      value="00:00:00"
                      type="time"
                      step="1"
                      class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </template>
            </AppQuestionTemplate>
          </transition-group>
          <AppQuestionTemplate key="2" :header="'Pytanie identyfikujące'">
            <template #slotBody>
              <div class="flex flex-wrap gap-6 justify-center">
                <transition-group name="fade">
                  <InputIdentifyUser
                    v-for="({ id }, qInx) in test.IdQuestionArr"
                    :key="id"
                    :header="id"
                  >
                    <template #slotHeader>
                      <ButtonRemove
                        @click.prevent="removeIdQuestion(qInx)"
                      ></ButtonRemove>
                    </template>
                    <template #slotInputLabel>
                      <label
                        :for="'label-' + id"
                        class="block text-sm font-medium leading-6 text-gray-900"
                        >Label</label
                      >
                      <input
                        v-model="test.IdQuestionArr[qInx].label"
                        :id="'label-' + id"
                        :name="'label-' + id"
                        type="text"
                        class="block rounded-md border-0 py-1 w-9/12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </template>
                    <template #slotInputFormat>
                      <label
                        :for="'format-' + id"
                        class="block text-sm font-medium leading-6 text-gray-900"
                        >Fromat</label
                      >
                      <select
                        v-model="test.IdQuestionArr[qInx].format"
                        :id="'format-' + id"
                        :name="'format-' + id"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      >
                        <option>Tekst</option>
                        <option>E-mail</option>
                      </select>
                    </template>
                  </InputIdentifyUser>
                  <ButtonAdd
                    key="iiubutton"
                    class="w-80 mt-0 min-h-52"
                    @click.prevent="addIdQuestion"
                  ></ButtonAdd>
                </transition-group>
              </div>
            </template>
          </AppQuestionTemplate>
          <AppQuestionTemplate
            v-for="({ id, answerArr }, qInx) in test.QuestionArr"
            :key="id"
            :header="id"
          >
            <template #slotHeader>
              <InputIndexStyle
                :qInx="qInx"
                @update-index-style="handleUpdateIndexStyle"
              ></InputIndexStyle>
              <ButtonRemove
                @click.prevent="removeQuestion(qInx)"
              ></ButtonRemove>
            </template>
            <template #slotBody>
              <AppCustomQuestionBody>
                <template #slotHeader>
                  <label
                    for="head"
                    class="block text-xl font-medium leading-6 text-gray-900 self-center"
                    >Treść pytania</label
                  >
                  <textarea
                    v-model="test.QuestionArr[qInx].head"
                    id="head"
                    name="head"
                    type="text"
                    class="mt-8 min-h-14 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </template>
                <template #slotBody>
                  <h3
                    class="block mb-4 text-xl font-medium leading-6 text-gray-900 self-center"
                  >
                    Odpowiedzi:
                  </h3>
                  <ol class="flex w-full flex-col justify-center">
                    <transition-group name="fade">
                      <li
                        v-for="({ id, is_true }, aInx) in answerArr"
                        :key="id"
                        class="mt-4 self-center w-10/12 bg-gray-100 ring-1 ring-inset ring-gray-300 rounded-md"
                      >
                        <div
                          class="w-full text-md gap-2 px-4 flex justify-end p-2"
                        >
                          <h2 class="w-full self-center truncate">{{ id }}</h2>
                          <div class="flex ml-4">
                            <ButtonMark
                              :isTrue="is_true"
                              @click.prevent="markAnswer(qInx, aInx)"
                            ></ButtonMark>
                            <ButtonRemove
                              @click.prevent="removeAnswer(qInx, aInx)"
                            ></ButtonRemove>
                          </div>
                        </div>
                        <textarea
                          v-model="answerArr[aInx].content"
                          :name="'answer-' + id"
                          type="text"
                          class="min-h-12 h-7 block w-full rounded-b-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </li>
                    </transition-group>
                    <ButtonAdd
                      @click.prevent="addAnswer(qInx)"
                      class="h-9 w-10/12 self-center rounded-lg mt-4"
                    ></ButtonAdd>
                  </ol>
                </template>
              </AppCustomQuestionBody>
            </template>
          </AppQuestionTemplate>
        </transition-group>
        <div
          class="fixed bottom-6 left-0 right-0 z-10 w-full h-22 flex justify-center sm:px-6 lg:px-8"
        >
          <div
            class="flex gap-6 bg-gray-100 ring-1 ring-inset ring-gray-300 rounded-xl p-6"
          >
            <button
              class="flex self-center rounded-md bg-indigo-600 px-10 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Zapisz test
            </button>
            <button
              @click.prevent="addCustomQuestion"
              class="h-9 w-52 px-6 rounded-md self-center justify-around flex bg-white cursor-pointer py-1 border-dashed border-indigo-600 text-indigo-600 border-2 hover:border-solid transition-all"
            >
              Dodaj pytanie
              <PlusIcon class="w-6 h-6 text-inherit self-center"></PlusIcon>
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<style>
.fade-enter-from {
  opacity: 0;
  transform: translateX(-10%);
}

.fade-enter-active {
  transition: all 0.4s ease;
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(25%);
}

.fade-leave-active {
  transition: all 0.3s ease;
  position: absolute; /* for move transition after item leaves */
}

.fade-move {
  transition: all 0.3s ease;
}

.jump-enter-active {
  animation: jump-up 0.2s;
}

.jump-leave-active {
  animation: jump-up 0.2s reverse;
}

@keyframes jump-up {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>