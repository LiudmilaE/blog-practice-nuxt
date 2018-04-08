import Vuex from 'vuex';
import axios from 'axios';

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: []
        },
        mutations: {
            setPosts(state, posts) {
                state.loadedPosts = posts
            },
            addPost(state, post) {
                state.loadedPosts.push(post);
            },
            editPost(state, editedPost) {
                const postIndex = state.loadedPosts.findIndex(post => post.id === editedPost.id);
                state.loadedPosts[postIndex] = editedPost;
            }
        },
        actions: {
            nuxtServerInit(vuexContext, context) {
                return axios.get(process.env.baseUrl + '/posts.json')
                    .then(res => {
                        const postsArray = [];
                        for (const key in res.data) {
                            postsArray.push({ ...res.data[key], id: key })
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
                return axios.post(process.env.baseUrl + '/posts.json', createdPost)
                    .then(res => {
                        vuexContext.commit('addPost', { ...createdPost, id: res.data.name });
                    })
                    .catch(e => console.log(e));
            },
            editPost(vuexContext, editedPost) {
                return axios.put(process.env.baseUrl + '/posts/' + editedPost.id +".json", editedPost)
                    .then(res => {
                        vuexContext.commit('editPost', editedPost);
                    })
                    .catch(e => console.log(e))
            },
            setPosts(vuexContext, posts) {
                vuexContext.commit('setPosts', posts)
            }
        },
        getters: {
            loadedPosts(state) {
                return state.loadedPosts
            }
        }
    })
}

export default createStore;