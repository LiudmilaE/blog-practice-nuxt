<template>
    <section class="post-list">
      <post-preview 
        id="1" 
        title="Lorem ipsum1" 
        previewText="Text - lorem ipsum" 
        thumbnail="https://images.pexels.com/photos/414630/pexels-photo-414630.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb"/>
      <post-preview 
        id="2" 
        title="Lorem ipsum2" 
        previewText="Text - lorem ipsum" 
        thumbnail="https://images.pexels.com/photos/414630/pexels-photo-414630.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb"/>
      <post-preview 
        id="3" 
        title="Lorem ipsum3" 
        previewText="Text - lorem ipsum" 
        thumbnail="https://images.pexels.com/photos/414630/pexels-photo-414630.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb"/>
    </section>
</template>

<script>
import PostPreview from '@/components/Posts/PostPreview'

export default {
  components: {
    PostPreview
  }
}
</script>


<style scoped>
.post-list {
    display: flex;
    padding: 20px;
    box-sizing: border-box;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
</style>

