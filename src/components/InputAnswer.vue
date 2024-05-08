<script lang="ts">
import { UniversalTestCreationEvent } from '../interface/universal_test_creation_event';


export interface DataInputAnswer {
    aIndex: number,
    qIndex: number,
    content: string,
}

    export default {
        name: 'InputAnswer',
        data(){
            return {
                qIndex: this.qPropIndex,
                aIndex: this.aPropIndex,
                content: this.propContent,
            }as DataInputAnswer
        },
        props: {
            aPropIndex: Number,
            qPropIndex: Number,
            propContent: String,
        },
        components: {
        },
        methods: {
            handleUpdateContent(){
                console.log('j1');
                this.$emit('updateContent', {qIndex: this.qIndex, aIndex: this.aIndex, payload: this.content} as UniversalTestCreationEvent)
            }
        }
    }
</script>

<template>
    <div class="w-full flex">
        <textarea name="answer" type="text" v-model="content" required @input="handleUpdateContent"
            class="min-h-12 h-7 block w-full rounded-b-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
    </div>
</template>