<template>
    <div class="">
        <h3 class="font-bold text-lg">
            {{ index + 1 }}. {{ question.question }}
        </h3>
        <div class="grid gap-3 grid-cols-12">
            <div class="mt-3 col-span-9">
                <label :for="'question_text_' + question.data">Question text</label>
                <input type="text" :name="'question_text_' + question.data" v-model="question.question"
                       class="rounded-lg border-gray-500 w-full"
                       @click="dataChange" :id="'question_text_' + question.data">
            </div>

            <div class="mt-3 col-span-3">
                <label for="question_type"> Select the question type</label>
                <select name="question_type" id="question_type" class="rounded-lg border-gray-500 w-full"
                        v-model="question.type" @click="typeChange">
                    <option v-for="type in questionTypes" :key="type" :value="type">
                        {{ upperCaseFirst(type) }}
                    </option>
                </select>

            </div>

            <div class="mt-3 col-span-12">
                <label :for="'question_description_' + question.id">description</label>
                <textarea type="text" class="rounded-lg border-gray-500  w-full"
                          :name="'question_description_' + question.id" v-model="question.description"
                          @click="dataChange" :id="'question_description_' + question.id"> </textarea>
            </div>

        </div>
        <div class="flex items-center">
            <button @click="addQuestion()" class="mr-2
            flex justify-center items-center p-2 rounded-full bg-green-400 text-gray-50">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>

            </button>

            <button @click="deleteQuestion(question)"
                    class="flex justify-center items-center  p-2 rounded-full bg-red-400 text-gray-50">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transform rotate-45" fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
            </button>
        </div>
    </div>

    <div class="mt-4">
        <div v-if="shouldHaveOption()">
            <h4 class="flex justify-between">
                <div class="font-bold">
                    Option
                </div>

                <button @click="addOption()" class="text-sm flex justify-center items-center bg-gray-700 text-gray-50 px-2 py-1 rounded-lg">
                    <span>
                        Add option
                    </span>
                </button>
            </h4>
            <div v-if="!question.data.option.length" class="text-center text-gray-600">
                you don't have any option defined
            </div>

            <div v-for="(option, index) in question.data.option" :key="option.uuid" class="mb-2">
                <span class="w-6">{{ index + 1 }}. </span>
                <input type="text" v-model="option.text" class="mr-2 rounded-lg border-gray-400" @change="dataChange">

                <button @click="removeOption(option)" class="mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500 transform rotate-45" fill="none"
                         viewBox="0 0 24 24"
                         stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                    </svg>
                </button>

            </div>


        </div>
    </div>
</template>

<script setup>
import {ref, computed} from 'vue';
import store from '../../store';
import {v4 as uuidv4} from 'uuid'

const props = defineProps({
    survey: Object,
    question: Object,
    index: Number,
})
const questionTypes = computed(() => store.state.questionTypes);

function upperCaseFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function shouldHaveOption() {
    return ["select", "radio", "checkbox"].includes(props.question.type);
}

function getOption() {
    return props.question.data.option
}

function setOption(options) {
    props.question.data.option = options
}

function addOption() {
    setOption([...getOption(),
        {uuid: uuidv4(), text: ''}]);
    dataChange();
}

function removeOption(ob) {
    setOption(getOption().filter((option) => option !== ob));
    dataChange();
}

function typeChange() {
    if (shouldHaveOption()) {
        setOption(getOption() || []);
    }
    dataChange();
}

function dataChange() {
    const data = JSON.parse(JSON.stringify(props.question));
    if (!shouldHaveOption()) {
        data.data.option = getOption();
    }
}

function addQuestion() {
    emit('addQuestion', props.index + 1)
}

function deleteQuestion(qu) {
    emit('deleteQuestion', qu)
}

const emit = defineEmits(["change", "addQuestion", "deleteQuestion",])
const model = ref(JSON.stringify(props.question))
</script>
