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
            <h2 class="w-2/3 text-md self-center tracking-tight text-gray-900 truncate">{{ id }}</h2>
                <div class="w-1/3 flex justify-end">
                    <slot name="slotHeader"></slot>
                </div>
        </div>
        <div class="mt-6 px-4">
            <slot name="slotInputLabel"></slot>
        </div>
        <div class="mt-2 px-4 pb-4">
            <slot name="slotInputFormat"></slot>
        </div>
    </div>
</template>