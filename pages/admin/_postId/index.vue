<template>
  <div class="admin-post-page">
      <section class="update-form">
          <admin-post-form :post="loadedPost"/>
      </section>
  </div>
</template>

<script>
import AdminPostForm from '@/components/Admin/AdminPostForm';

export default {
  layout: 'admin',
  components: {
      AdminPostForm
  },
  data() {
      return {
          loadedPost: {
              author: "Liuda",
              title: "Cool post",
              content: "Best content",
              thumbnailLink: 'https://images.pexels.com/photos/414630/pexels-photo-414630.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb'
          }
      }
  }
}
</script>

<style scoped>
.update-form {
    width: 90%;
    margin: 20px auto;
}

@media (min-width: 768px) {
    .update-form {
        width: 500px;
    }
}
</style>

