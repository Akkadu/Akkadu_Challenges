import Vue from 'vue'

//phone number filter
Vue.filter('phoneFilter' , (value) => {
    //check if phone have x charcter
    if (value.indexOf("x") !== -1) {
        //split at point of x and shift()
        return value.split("x").shift();
      } else {
        //return value directly 
        return value;
      }
})