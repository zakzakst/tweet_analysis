new Vue({
  el: '#app',
  data () {
    return {
      tweets: null,
      loading: true,
      errored: false
    }
  },
  mounted () {
    axios
      .get('../tweets.json')
      .then(response => {
        this.tweets = response.data;
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
  }
});
