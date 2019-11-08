if(process.browser){ //browser check as Nuxt is SSR so there will be no window object
    //nuxt onload app function 
    window.onNuxtReady((context) => {
        //get all user on every time loading app
        context.$store.dispatch('getAllUsers' )
    })
}