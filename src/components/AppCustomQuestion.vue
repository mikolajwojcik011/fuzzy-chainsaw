<script lang="ts">
import { PlusIcon } from "@heroicons/vue/24/outline";
import { CheckCircleIcon } from "@heroicons/vue/24/solid";
import ButtonAdd from "./ButtonAdd.vue";
import ButtonRemove from "./ButtonRemove.vue";
import ButtonMark from "./ButtonMark.vue";
import { Answer } from "../interface/answer";
import { UniversalTestCreationEvent } from "../interface/universal_test_creation_event";
import InputAnswer from "./InputAnswer.vue";
import InputIndexStyle from "./InputIndexStyle.vue";

interface AppCustomQuestionData {
  qId: string;
  head: string;
  qIndex: number;
  answerArr: Answer[];
}

export default {
  name: "CustomQuestion",
  components: {
    PlusIcon,
    ButtonAdd,
    ButtonRemove,
    CheckCircleIcon,
    InputAnswer,
    ButtonMark,
    InputIndexStyle,
  },
  data() {
    return {
      qId: this.qPropId,
      head: "",
      qIndex: this.qPropIndex,
      answerArr: this.qPropAnswerArr,
    } as AppCustomQuestionData;
  },
  props: {
    qPropAnswerArr: Array<Answer>,
    qPropIndex: Number,
    qPropId: String,
  },
  emits: [
    "removeQuestion",
    "addAnswer",
    "removeAnswer",
    "markAsCorrect",
    "updateContent",
    "updateHead",
    "updateIndexStyle",
  ],
  methods: {
    handleRemoveQuestion() {
      this.$emit("removeQuestion", {
        qIndex: this.qIndex,
      } as UniversalTestCreationEvent);
    },
    handleAddAnswer() {
      this.$emit("addAnswer", {
        qIndex: this.qIndex,
      } as UniversalTestCreationEvent);
    },
    handleRemoveAnswer(aIndex: Number) {
      this.$emit("removeAnswer", {
        qIndex: this.qIndex,
        aIndex: aIndex,
      } as UniversalTestCreationEvent);
    },
    handleMarkAsCorrect(aIndex: number) {
      this.$emit("markAsCorrect", {
        qIndex: this.qIndex,
        aIndex: aIndex,
      } as UniversalTestCreationEvent);
    },
    handleUpdateContent(payload: UniversalTestCreationEvent) {
      this.$emit("updateContent", payload as UniversalTestCreationEvent);
    },
    handleUpdateHead() {
      this.$emit("updateHead", {
        qIndex: this.qIndex,
        payload: this.head,
      } as UniversalTestCreationEvent);
    },
    handleUpdateIndexStyle({ index_style }: any) {
      this.$emit("updateIndexStyle", {
        qIndex: this.qIndex,
        payload: index_style,
      } as UniversalTestCreationEvent);
    },
  },
  mounted() {
    let el: any = this.$refs.scrto;
    el.scrollIntoView({ behavior: "smooth" });
  },
};
</script>

<template>
  <div
    ref="scrto"
    class="flex flex-col w-full bg-gray-100 rounded-xl pt-2 my-6 ring-1 ring-inset ring-gray-300">
    <div class="flex w-full px-6">
      <div class="flex w-full items-start self-center">
        <h2 class="text-lg tracking-tight text-gray-900 truncate">
          {{ qPropId }}
        </h2>
      </div>
      <div class="flex justify-end self-center">
        <InputIndexStyle
          @update-index-style="handleUpdateIndexStyle"></InputIndexStyle>
        <ButtonRemove class="ml-4" @click="handleRemoveQuestion"></ButtonRemove>
      </div>
    </div>
    <div
      class="w-full flex flex-col justify-center bg-white mt-2 py-20 sm:px-8 lg:px-10 rounded-b-xl ring-1 ring-inset ring-gray-300">
      <div class="flex flex-col w-7/12 self-center">
        <label
          for="head"
          class="block text-xl font-medium leading-6 text-gray-900 self-center"
          >Treść pytania</label
        >
        <div class="mt-8">
          <textarea
            v-model="head"
            @input="handleUpdateHead"
            id="head"
            name="head"
            type="text"
            class="min-h-14 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
      </div>
      <div class="w-full flex flex-col min-h-80 mt-20">
        <h3
          class="block mb-4 text-xl font-medium leading-6 text-gray-900 self-center">
          Odpowiedzi:
        </h3>
        <ol class="flex w-full flex-col justify-center">
          <li
            v-for="({ id, is_true, content }, aIndex) in answerArr"
            class="mt-4 self-center w-10/12 bg-gray-100 ring-1 ring-inset ring-gray-300 rounded-md">
            <div class="w-full text-md gap-2 px-4 flex justify-end p-2">
              <h2 class="w-full self-center truncate">{{ id }}</h2>
              <div class="flex ml-4">
                <ButtonMark
                  :propIsTrue="is_true"
                  @click.prevent="handleMarkAsCorrect(aIndex)"></ButtonMark>
                <ButtonRemove
                  @click.prevent="handleRemoveAnswer(aIndex)"></ButtonRemove>
              </div>
            </div>
            <InputAnswer
              @update-content="handleUpdateContent"
              :aPropIndex="aIndex"
              :qPropIndex="qIndex"
              :propContent="content"
              :key="id"></InputAnswer>
          </li>
          <ButtonAdd
            @click.prevent="handleAddAnswer"
            class="h-9 w-10/12 self-center rounded-lg mt-4"></ButtonAdd>
        </ol>
      </div>
    </div>
  </div>
</template>
