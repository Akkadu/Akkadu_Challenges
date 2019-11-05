<template>
    <div class="card" @click="setSelectedUser">
        <div class="card-body">
            <img :src="user.photo" class="list-thumbnail" alt="user picture"/>
            <div class="user-details">
                <h2 class="user-name">{{ user.name }}</h2>
                <div>
          <span class="widget">
            <i class="fa fa-envelope"></i>
            {{ user.email }}
          </span>
                    <span class="widget">
            <i class="fa fa-phone"></i>
            {{ user.phone | trimPhoneNumber }}
          </span>
                    <br/>
                    <span class="widget">
            <i class="fa fa-building"></i>
            {{ user.name }} - {{ user.company.catchPhrase }}
          </span>
                </div>
            </div>
        </div>
        <span class="delete-btn" @click.stop="deleteUser(user)">
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
            },
            setSelectedUser() {
                this.$store.dispatch('setSelectedUser', this.user)
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
