<template>
  <div class="home-page">
    <section class="intro">
      <h1>Get the latest tech news!</h1>
    </section>
    <post-list :posts="loadedPosts"/> 
  </div>
</template>

<script>

export default {
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts
    }
  }
  // asyncData(context, callback) {
  //   //we can return new Promise() or use callback
  //   setTimeout(() => {
  //     callback(null, {
  //       loadedPosts: [
  //         { 
  //           id: '1', 
  //           title: "Lorem ipsum", 
  //           previewText: 'Lorem ipsum...', 
  //           thumbnail: 'https://images.pexels.com/photos/414630/pexels-photo-414630.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb'
  //         },
  //         { 
  //           id: '2', 
  //           title: "Lorem ipsum2", 
  //           previewText: 'Lorem ipsum...', 
  //           thumbnail: 'https://images.pexels.com/photos/414630/pexels-photo-414630.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb'
  //         },
  //       ]
  //     });
  //   }, 500)
  // },
  // data() {
  //   return {

  //   }
  // }
}
</script>

<style scoped>
  .intro {
    height: 300px;
    position: relative;
    padding: 30px;
    box-sizing: border-box;
    background-image: url('~assets/main-image.jpeg');
    /* background-position: center; */
    background-size: cover;
  }

  .intro h1 {
    position: absolute;
    top: 10%;
    left: 5%;
    width: 90%;
    font-size: 1.5rem;
    color: black;
    background-color: rgb(211, 211, 211);
    padding: 10px;
    border-radius: 10px;
    box-shadow: 3px 3px 3px black;
    box-sizing: border-box;
    border: 1px solid black;
  }

  @media (min-width: 768px) {
    .intro h1 {
      font-size: 2rem;
    }
  }

  .featured-posts {
    display: flex;
    padding: 20px;
    box-sizing: border-box;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
</style>
