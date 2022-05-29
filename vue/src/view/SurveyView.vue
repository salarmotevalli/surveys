<template>
    <PageComponent title="View or create survey">
        <template v-slot:header>
            <div class="flex justify-between ">
                <h1 class="text-3xl font-bold text-gray-900">View or create survey</h1>
                {{ model.id ? model.title : 'Create new survey' }}
            </div>
            <pre>
                {{model}}
            </pre>
            <form @submit.prevent="saveSurvey">
                <div class="shadow sm:rounded-md sm:overflow-hidden">

                    <div class="p-5 space-y-6 sm:p-6">
                        <!-- image -->
                        <div>
                            <label class="block text-gray-700">
                                image
                            </label>
                            <div class="mt-2 flex items-center">
                                <img v-if="model.image" :src="model.image" :alt="model.title"
                                     class="w-64 h-48 object-cover">
                                <span v-else
                                      class="flex justify-center items-center h-12 w-12 rounded-full overflow-hidden bg-gray-100 text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                    </svg>
                                </span>
                                <button type="button"
                                        class="relative overflow-hidden bg-white py-2 ml-3 rounded-sm shadow text-gray-700">
                                    change
                                    <input type="file" name="" id=""
                                           class="absolute left-0 top-0 right-0 bottom-0 cursor-pointer opacity-0">
                                </button>
                            </div>
                        </div>
                        <!-- title -->
                        <div>
                            <label for="title" class="block text-gray-700">
                                title
                            </label>
                            <input type="text" name="title" v-model="model.title"
                                   class="mt-1 block w-full shadow rounded border-gray-400">
                        </div>

                        <!-- description -->
                        <div>
                            <label for="description" class="block text-gray-700">
                                description
                            </label>
                            <textarea type="text" name="description" v-model="model.description" cols="30" rows="5"
                                      class="mt-1 block w-full shadow rounded border-gray-400"
                                      placeholder="Describe your survey">
                            </textarea>
                        </div>

                        <!-- expire date -->
                        <div>
                            <label for="expire_date" class="block text-gray-700">
                                expire date
                            </label>
                            <input type="date" name="expire_date" v-model="model.expire_date"
                                   class="mt-1 block w-full shadow rounded border-gray-400">
                        </div>

                        <!-- status -->
                        <div>
                            <label for="status" class="block text-gray-700">
                                status
                            </label>
                            <input type="checkbox" name="status" v-model="model.status"
                                   class="mt-1 block  shadow rounded border-gray-400">
                        </div>

                        <!-- questions -->
                        <div class="flex justify-end">
                            <button type="button" @click="addQuestion"
                                    class="bg-gray-700 text-white px-2 py-1 rounded-lg text-sm flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                </svg>
                                add question
                            </button>

                        </div>
                        <div v-if="!model.questions.length" class="text-center">
                            you don't have any question yet
                        </div>
                        <div v-for="(question , index) in model.questions" :key="question.id">
                            <QuestionEditor
                                :question="question"
                                :index="index"
                                :survey="model"
                                @change="questionChange"
                                @addQuestion="addQuestion"
                                @deleteQuestion="deleteQuestion"
                            />
                        </div>

                        <div class="flex justify-end">
                            <button type="submit" class="bg-green-500 text-white rounded-lg  p-2 ">
                                save
                            </button>
                        </div>
                    </div>

                </div>
            </form>
        </template>

    </PageComponent>
</template>


<script setup>
import {useRoute} from 'vue-router';
import PageComponent from '../components/PageComponent.vue';
import {ref} from 'vue';
import QuestionEditor from '../components/editor/QuestionEditor.vue';
import store from "../store";
import {v4 as uuidv4} from 'uuid'

const route = useRoute();


let model = ref({
    title: '',
    status: false,
    description: null,
    image: null,
    expire_date: null,
    questions: [],
})

if (route.params.id) {
    model.value = store.state.survey.find((s)=> s.id=== parseInt(route.params.id) );

}


function saveSurvey(){
    console.log(1234)
}


function addQuestion(index) {
    const newQuestion = {
        id: uuidv4(),
        type: 'text',
        question: '',
        description: null,
        data: {
            option: []
        }
    }

    model.value.questions.splice(index, 0, newQuestion);
}

function deleteQuestion(question) {
    model.value.questions = model.value.questions.filter(
        (q) => {
           return  q.id !== question.id;
        }
    )
}


function questionChange(question) {
    model.value.questions = model.value.questions.map((q) => {
            if (q.id === question.id){
                return JSON.parse(JSON.stringify(question))
            }
            return q;
        }
    )
}
</script>
