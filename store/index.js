import Vuex from 'vuex';
import axios from 'axios';
import Cookie from 'js-cookie';

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: [],
            token: null
        },
        mutations: {
            setPosts(state, posts) {
                state.loadedPosts = posts;
            },
            addPost(state, post) {
                state.loadedPosts.push(post);
            },
            editPost(state, editedPost) {
                const postIndex = state.loadedPosts.findIndex(post => post.id === editedPost.id);
                state.loadedPosts[postIndex] = editedPost;
            }, setToken(state, token) {
                state.token = token;
            },
            clearToken(state) {
                state.token = null;
            }
        },
        actions: {
            //when using spa mode this don't work - need to use mounted or created Vue hooks 
            //or using asyncData or fetch()
            nuxtServerInit(vuexContext, context) {
                return context.app.$axios //to use module @nuxtjs/axios
                    .$get('/posts.json') //we already set baseURL
                    .then(data => {
                        const postsArray = [];
                        for (const key in data) {
                            postsArray.push({ ...data[key], id: key })
                        }
                        vuexContext.commit('setPosts', postsArray);
                    })
                    .catch(e => console.log(e));

                // return new Promise((resolve, reject) => {
                //     setTimeout(() => {
                //       vuexContext.commit('setPosts', [
                //           { 
                //             id: '1', 
                //             title: "A very important post", 
                //             previewText: 'Lorem ipsum...', 
                //             thumbnail: 'https://images.pexels.com/photos/414630/pexels-photo-414630.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb'
                //           },
                //           { 
                //             id: '2', 
                //             title: "This post will change a lot for you :)", 
                //             previewText: 'Lorem ipsum...', 
                //             thumbnail: 'https://images.pexels.com/photos/414630/pexels-photo-414630.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb'
                //           },
                //         ]
                //       );
                //       resolve();
                //   }, 500);
                //   })
                //   .then(data => {
                //     context.store.comit('setPosts', data.loadedPosts)
                //   })
                //   .catch(e => {
                //     context.error(e);
                //   });
            },
            addPost(vuexContext, post) {
                const createdPost = { 
                    ...post, 
                    updatedDate: new Date() 
                    }
                return axios.post(process.env.baseUrl + '/posts.json?auth=' + vuexContext.state.token, createdPost)
                    .then(res => {
                        vuexContext.commit('addPost', { ...createdPost, id: res.data.name });
                    })
                    .catch(e => console.log(e));
            },
            editPost(vuexContext, editedPost) {
                return axios.put(process.env.baseUrl + '/posts/' + editedPost.id +".json?auth=" + vuexContext.state.token, editedPost)
                    .then(res => {
                        vuexContext.commit('editPost', editedPost);
                    })
                    .catch(e => console.log(e))
            },
            setPosts(vuexContext, posts) {
                vuexContext.commit('setPosts', posts)
            },
            authenticateUser(vuexContext, authData) {
                let authUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + process.env.fbAPIKey;
                if(!authData.isLogin) {
                    authUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + process.env.fbAPIKey;
                } 
                return axios.post(authUrl, {
                    email: authData.email,
                    password: authData.password,
                    returnSecureToken: true,
                }).then(result => {
                    vuexContext.commit('setToken', result.data.idToken);
                    localStorage.setItem('token', result.data.idToken);
                    localStorage.setItem('tokenExpiration', new Date().getTime() + Number.parseInt(result.data.expiresIn) * 1000);
                    Cookie.set('jwt', result.data.idToken);
                    Cookie.set('expirationDate', new Date().getTime() + +result.data.expiresIn * 1000);
                    // vuexContext.dispatch('setLogoutTimer', result.data.expiresIn * 1000)
                    return this.$axios.$post('http://localhost:3000/api/track-data', {data: 'Authenticated!'});
                }).catch(e => console.log(e))
            },
            // setLogoutTimer(vuexContext, duration) {
            //     setTimeout(() => {
            //         vuexContext.commit('clearToken')
            //     }, duration)
            // },
            initAuth(vuexContext, req) {
                let token;
                let expirationDate;
                if (req) {
                    if (!req.headers.cookie) return;
                    const jwtCookie = req.headers.cookie.split(';')
                        .find(c => c.trim().startsWith('jwt='));
                    if (!jwtCookie) return;
                    token = jwtCookie.split('=')[1];
                    
                    expirationDate = req.headers.cookie
                        .split(';')
                        .find(c => c.trim()
                        .startsWith('expirationDate='))
                        .split('=')[1];

                } else if (process.client) {
                    token = localStorage.getItem('token');
                    expirationDate = localStorage.getItem('tokenExpiration');
                } 
                
                if(new Date().getTime() > +expirationDate || !token) {
                    vuexContext.dispatch('logout');
                    return;
                }
                // vuexContext.dispatch('setLogoutTimer', +expirationDate - new Date().getTime());
                vuexContext.commit('setToken', token);
            },
            logout(vuexContext) {
                vuexContext.commit('clearToken');
                Cookie.remove('jwt');
                Cookie.remove('expirationDate');
                if (process.client) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('tokenExpiration');
                }
            }
        },
        getters: {
            loadedPosts(state) {
                return state.loadedPosts
            },
            isAuthenticated(state) {
                return state.token != null
            }
        }
    })
}

export default createStore;