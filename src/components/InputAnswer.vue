<script lang="ts">

export interface DataInputAnswer {
    index: number
    content: string,
}

    export default {
        name: 'InputAnswer',
        data(){
            return {
                index: this.propIndex,
                content: ''
            }as DataInputAnswer
        },
        props: {
            propIndex: Number
        },
        components: {
        },
        methods: {
            handleUpdateContent(){
                console.log(this.propIndex);
                this.$emit('inputContent', {index: this.index ,content: this.content})
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