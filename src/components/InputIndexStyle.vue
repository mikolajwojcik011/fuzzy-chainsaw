<script lang=ts>
interface Data {
	optionArr: option[]
	selectedOption: number
}

interface option{
	id: number
	label: string
}

export default {
	name: 'InputIndexStyle',
  	data() {
    	return {
      	optionArr: [
        	{ id: 1, label: 'A.' },
        	{ id: 2, label: '1.' },
	        { id: 3, label: 'I.' }
		],
	      selectedOption: 1,
	    } as Data
	  },
	  emits: [
		'updateIndexStyle',
	  ],
	  methods: {
    	handleUpdateIndexStyle(optionId: number) {
      		this.$emit('updateIndexStyle', {index_style: optionId})
			this.selectedOption = optionId
    	},
		getClassObj(optionId: number) {
			if(optionId != this.selectedOption) return {'bg-gray-600':true, 'bg-emerald-600':false}
			return {'bg-emerald-600':true, 'bg-gray-600':false }
		}
  	}
}
</script>

<template>
    <div class="mr-1" v-for="{id, label} in optionArr" 
		:key="id" 
		:class="[getClassObj(id),'inline-block transition-all self-center font-medium text-white cursor-pointer w-20 h-7 p-0.5 flex justify-center a rounded-lg hover:bg-emerald-500']">
			<input class="hidden" type="radio" :id="'option-' + id" :value="id" v-model="selectedOption">
			<label @click="handleUpdateIndexStyle(id)" class="text-inherit cursor-pointer self-center w-full text-center">{{ label }}</label>
    </div>
</template>

<style>
</style>