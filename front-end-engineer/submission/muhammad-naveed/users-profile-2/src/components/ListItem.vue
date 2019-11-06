<template>
    <div class="card">
        <router-link :to="{name: 'profile', params: {id: user.id}}" class="card-body">
            <img :src="user.photo" class="list-thumbnail" alt="user picture"/>
            <div class="user-details">
                <h2 class="user-name">{{ user.name }}</h2>
                <ul class="info-list">
                    <li>
                        <i class="fa fa-envelope"></i>
                        {{ user.email }}
                    </li>
                    <li>
                        <i class="fa fa-phone"></i>
                        {{ user.phone | trimPhoneNumber }}
                    </li>
                    <li>
                        <i class="fa fa-building"></i>
                        {{ user.company.name }}
                    </li>
                    <li>
                        <i class="fa fa-map-pin"></i>
                        {{ user.company.catchPhrase }}
                    </li>
                </ul>
            </div>
        </router-link>
        <span class="delete-btn" @click="deleteUser(user)">
      <i class="fa fa-times-thin"></i>
    </span>
    </div>
</template>

<script>
    export default {
        name: "ListItem",
        props: {
            user: Object
        },
        methods: {
            //to remove the user by id from the users array in vuex store.
            deleteUser(user) {
                this.$store.dispatch("deleteUser", user.id);
            }
        },
        filters: {
            //to trim the extra string from the end of the phone number.
            trimPhoneNumber(ph) {
                if (ph.indexOf("x") !== -1) {
                    return ph.split("x").shift();
                } else {
                    return ph;
                }
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
