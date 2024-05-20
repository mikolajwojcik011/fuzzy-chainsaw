<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted } from "vue";

const route = useRoute();
const publicKey = route.params.publicKey;

async function getTest() {
  const response = await fetch("http://127.0.0.1:5000/get-test/" + publicKey);

  if (!response.ok) {
    throw new Error(`Failed to fetch test. Error: ${response.status}`);
  }
  return await response.json();
}

let question_arr: any = null;
onMounted(async () => {
  try {
    question_arr = await getTest();
    console.log(question_arr);
  } catch (err) {
    console.error(err);
  }
  question_arr = await getTest();
});
</script>

<template>
  <p>{{ question_arr }}</p>
</template>