<template>
    <PageComponent>
        <template v-slot:header>
            <div class="flex justify-between item-center">
                <h1 class="text-3xl font-bold text-gray-900">Surveys</h1>
                <router-link :to="{ name: 'SurveyCreate'}"
                    class="py-2 px-3 flex justify-between item-center text-white bg-emerald-500 rounded-lg hover:bg-emerald-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>
                        Add new survey
                    </span>
                </router-link>
            </div>
        </template>

         <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            <div v-for="survey in surveys" :key="survey.id"
                class="flex flex-col py-4 px-6 shadow bg-white hove:bg-gray-100 h-[470px]">
                <img :src="survey.image" alt="" class="w-full h-48 object-cover">
                <h4 class="mt-4 text-md font-bold">{{ survey.title }}</h4>
                <div v-html="survey.description" class="overflow-hidden flex-1"></div>

                <div class="flex justify-between items-center mt-3">
                    <router-link :to="{ name: 'SurveyEdit', params: { id: survey.id } }"
                        class="py-2 px-4 flex border border-transparent text-md rounded-full hover:bg-green-100  text-green-500">

                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </router-link>
                    <button v-if="survey.id"
                    type="button"
                    @click="deleteSurvey(survey)"
                    class="w-8 h-8 flex items-center hover:bg-red-100 justify-center rounded-full text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
                    </button>
                </div>
            </div>
        </div>
    </PageComponent>
</template>

<script setup>
import store from '../store';
import { computed } from 'vue'
import PageComponent from '../components/PageComponent.vue';


const surveys = computed(() => store.state.survey);

function deleteSurvey(survey) {
    if (confirm('Are you sure?')) {
        store.dispatch('deleteSurvey', survey.id);
    }
}
</script>
