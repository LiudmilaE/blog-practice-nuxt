<template>
  <div class="single-post-page">
      <section class="post">
          <h1 class="post-title">{{ loadedPost.title }}</h1>
          <div class="post-details">
              <div class="post=detail">Last updated on {{ loadedPost.updatedDate | date }}. </div>
              <div class="post=detail">Written by {{ loadedPost.author }}</div>
          </div>
          <p class="post-content">{{ loadedPost.content }}</p>
      </section>
      <section class="post-feedback">
          <p>Let me know what you think about the post</p>
      </section>
  </div>
</template>

<script>
// import axios from 'axios'; //no need of import because we use @nuxtjs/axios

export default {
  asyncData(context) {
    return context.app.$axios.$get('/posts/' + context.params.id +'.json')
      .then(data => {
        return {
          loadedPost: { ...data, id: context.params.id }
        }
      }).catch(e => console.log(e));

    // setTimeout(()=> {
    //   callback(null, {
    //     loadedPost: { 
    //         id: '1', 
    //         title: "A very important post (ID: " + cntext.params.id + ")", 
    //         previewText: 'Lorem ipsum...', 
    //         author: 'Liuda',
    //         updatedDate: new Date(),
    //         content: 'Some dummy text',
    //         thumbnail: 'https://images.pexels.com/photos/414630/pexels-photo-414630.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb'
    //       }
    //   })
    // }, 500)
  }
}
</script>


<style scoped>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}

.post {
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}

.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
}

.post-feedback a {
  color: red;
  text-decoration: none;
}
</style>

