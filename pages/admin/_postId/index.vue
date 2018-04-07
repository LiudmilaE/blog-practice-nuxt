<template>
  <div class="admin-post-page">
      <section class="update-form">
          <admin-post-form :post="loadedPost" @submit='onSubmitted'/>
      </section>
  </div>
</template>

<script>
import AdminPostForm from '@/components/Admin/AdminPostForm';
import axios from 'axios';

export default {
  layout: 'admin',
  components: {
      AdminPostForm
  },
	methods: {
		onSubmitted(editedPost) {
			axios.put('https://nuxt-blog-project.firebaseio.com/posts/' + this.$route.params.postId +".json", editedPost)
			.then(res => {
				console.log(res.data);
				this.$router.push('/admin');
				})
			.catch(e => console.log(e))
		}
	},
	asyncData(context) {
		return axios
			.get('https://nuxt-blog-project.firebaseio.com/posts/' + context.params.postId +'.json')
			.then(res => {
				return {
					loadedPost: res.data
				}
			}).catch(e => console.log(e));
  }

//   data() {
//       return {
//           loadedPost: {
//               author: "Liuda",
//               title: "Cool post",
//               content: "Best content",
//               thumbnailLink: 'https://images.pexels.com/photos/414630/pexels-photo-414630.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb'
//           }
//       }
//   }
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

