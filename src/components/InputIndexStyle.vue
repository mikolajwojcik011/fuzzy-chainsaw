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
			if(optionId != this.selectedOption) return {'bg-gray-600':true, 'bg-emerald-600':false, 'w-10': true, 'w-16': false}
			return {'bg-emerald-600':true, 'bg-gray-600':false, 'w-16': true, 'w-10': false }
		}
  	}
}
</script>

<template>
	<div class="flex ring-1 p-1 ring-inset ring-gray-300 gap-1 rounded-xl bg-white">
		<h3 class="px-2 font-medium">Numerowanie:</h3>
		<div v-for="{id, label} in optionArr" 
			:key="id" 
			:class="[getClassObj(id),'inline-block transition-all self-center font-medium text-white cursor-pointer h-6 flex rounded-lg hover:bg-emerald-500']">
				<input class="hidden" type="radio" :id="'option-' + id" :value="id" v-model="selectedOption">
				<label @click="handleUpdateIndexStyle(id)" class="text-inherit cursor-pointer self-center w-full text-center">{{ label }}</label>
		</div>
	</div>
</template>

<style>
</style>