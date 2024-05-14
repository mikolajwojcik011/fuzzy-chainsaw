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
                this.$emit('updateContent', {qIndex: this.qIndex, aIndex: this.aIndex, payload: this.content} as UniversalTestCreationEvent)
            }
        }
    }
</script>

<template>
    <div class="w-full flex">
        
    </div>
</template>