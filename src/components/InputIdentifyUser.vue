<script lang="ts">
export default {
    name: 'InputIdentifyUser',
    data(){
        return{
            id: this.propId,
            label: this.propLabel,
            format: this.propFromat,
            index: this.propqIndex
        }
    },
    props: {
        propId: String,
        propLabel: String,
        propFromat: String,
        propqIndex: Number
    },
    methods: {
        handleData(){ 
            if (this.label && this.format) {
                this.$emit('inputData', { index: this.index, label: this.label, format: this.format });          
            }
        }
    }

}

</script>

<template>
    <div class="w-80 rounded-md ring-1 ring-inset ring-gray-300">
        <div class="flex w-full bg-gray-100 rounded-t-md ring-1 ring-inset ring-gray-300 px-4 py-1">
            <slot></slot>
        </div>
        <div class="mt-6 px-4">
            <label :for="'label-' + propId" class="block text-sm font-medium leading-6 text-gray-900">Label</label>
            <input v-model="label" @input="handleData" :id="'label-' + propId" name="label" type="text"
                class="block w-11/12 rounded-md border-0 py-1 w-9/12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
        <div class="mt-2 px-4 pb-4">
            <label :for="'format-' + propId" class="block text-sm font-medium leading-6 text-gray-900">Fromat</label>
            <select v-model="format" @change="handleData" :id="'format-' + propId" name="format"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" >
                    <option>Tekst</option>
                    <option>E-mail</option>
            </select>
        </div>
    </div>
</template>