<script lang="ts">
import ButtonMark from '../components/ButtonMark.vue';
import InputAnswer from '../components/InputAnswer.vue';
import ButtonRemove from '../components/ButtonRemove.vue';
import ButtonAdd from '../components/ButtonAdd.vue';


export default {
    name: 'AppCustomQuestionBody',
    components: {
        ButtonAdd,
        ButtonRemove,
        InputAnswer
    }
}
</script>
 
<template>
    <div class="flex flex-col w-7/12 self-center">
        <slot name="slotHeader"></slot>
    </div>
    <div class="w-full flex flex-col min-h-80 mt-20">
        <slot name="slotBody"></slot>
    </div>
</template>