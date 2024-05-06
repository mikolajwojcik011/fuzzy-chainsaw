<script lang="ts">
export interface IdQuestion {
  id: number;  
  label: string;
  format: string;
}

export default {
    name: 'InputIdentifyUser',
    data(){
        return{
            id: null,
            label: null,
            format: 'Text'
        }
    },
    props: {
        propId: Number,
    },
    methods: {
        handleData(){ 
            if (this.label && this.format) {
                this.$emit('inputData', { id: this.propId, label: this.label, format: this.format });          
            }
        }
    }

}

</script>

<template>
    <div class="mr-6">
        <div class="mt-2">
            <label for="label" class="block text-xs font-medium leading-6 text-gray-900">Label</label>
            <input v-model="label" @input="handleData" id="label" name="label" type="text"
                                class="block w-full rounded-md border-0 py-0 w-9/12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
        <div class="mt-2">
            <label for="format" class="block text-sm font-medium leading-6 text-gray-900">Fromat</label>
            <select v-model="format" @change="handleData" id="format" name="format"
                class="block w-60 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" >
                    <option>Tekst</option>
                    <option>E-mail</option>
            </select>
        </div>
    </div>
</template>