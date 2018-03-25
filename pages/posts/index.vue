<template>
  <div class="posts-page">
    <post-list :posts="loadedPosts"/>
  </div>
</template>

<script>
import PostList from "@/components/Posts/PostList";
export default {
  components: {
    PostList
  },
  asyncData(context) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          loadedPosts: [
            { 
              id: '1', 
              title: "A very important post", 
              previewText: 'Lorem ipsum...', 
              thumbnail: 'https://images.pexels.com/photos/414630/pexels-photo-414630.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb'
            },
            { 
              id: '2', 
              title: "This post will change a lot for you :)", 
              previewText: 'Lorem ipsum...', 
              thumbnail: 'https://images.pexels.com/photos/414630/pexels-photo-414630.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb'
            },
          ]
        });
    }, 500);
    })
    .then(data => data)
    .catch(e => {
      context.error(e);
    });
  },
  created() {
    this.$store.dispatch('setPosts', this.loadedPosts)
  }
}
</script>


<style scoped>
  .posts-page {
    display: flex;
    justify-content: center;
    align-self: center;
  }
</style>

