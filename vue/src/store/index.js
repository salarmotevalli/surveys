import { createStore } from 'vuex'
import axiosClient from '../axios'

const survey=
[
    {
        id: 1,
        title: "Survey 1",
        status:true,
        slug: "Survey-1",
        image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        description: 'hello <pre>     yessss    </pre> by',
        questions: []
    },
    {
        id: 2,
        title: "Survey 2",
        status:true,
        slug: "Survey-2",
        image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        description: 'hello <pre>     yessss    </pre> by',
        questions: []
    },
    {
        id: 3,
        title: "Survey 3",
        status:true,
        slug: "Survey-3",
        image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        description: 'hello <pre>     yessss    </pre> by',
        questions: []
    },

]



const store = createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem('TOKEN'),
        },
        survey: survey,
        questionTypes: ['text', 'textarea', 'radio', 'checkbox', 'select'],
    },
    getters: {},
    actions: {
        register: ({ commit }, user) => {
            axiosClient.post('/register', user)
                .then(({ data }) => {
                    commit('setUser', data)
                    return data;
                });
        },

        login: ({ commit }, user) => {
            axiosClient.post('/login', user)
                .then(({ data }) => {
                    commit('setUser', data)
                    return data;
                });
        },

        logout: ({ commit }) => {
            return axiosClient.post('/logout').then((response) => {
                commit('logout');
                return response;
            })
        }
    },
    mutations: {
        logout: (state) => {
            state.user.token = null;
            state.user.data = {};
            sessionStorage.removeItem('TOKEN');
        },
        setUser: (state, userData) => {
            state.user.token = userData.token;
            state.user.data = userData.data;
            sessionStorage.setItem('TOKEN', userData.token);
        }
    },
    modules: {}
})

export default store;
