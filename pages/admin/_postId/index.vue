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
  middleware: ['check-auth', 'auth'],
  components: {
      AdminPostForm
  },
	methods: {
		onSubmitted(editedPost) {
			this.$store.dispatch('editPost', editedPost)
				.then(() => {
					this.$router.push('/admin');
				});
		}
	},
	asyncData(context) {
		return axios
			.get(process.env.baseUrl + '/posts/' + context.params.postId +'.json')
			.then(res => {
				return {
					loadedPost: { ...res.data, id: context.params.postId }
				};
			})
			.catch(e => context.error());
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

