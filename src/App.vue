<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      
    }
  },
  mounted(){
    this.getdata()
  },
  methods: {
    getdata() {
      //  axios.post('/dimension/getDimensions').then(res=>{
      // console.log(res);
    // }) 
    }
  },
}
</script>
<style lang="scss">

</style>
