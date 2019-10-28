<template>
    <div class="profile">
        <router-link :to="{name: 'home'}" class="back-btn">
            <i class="fa fa-arrow-left"></i>&nbsp;&nbsp;&nbsp;&nbsp; Back to Profiles
        </router-link>
        <div class="profile-content" v-if="typeof user !== 'undefined'">
            <div class="left-col">
                <img :src="user.photo" alt="User profile photo"/>
                <p>{{ user.name }}</p>
            </div>
            <div class="right-col">
                <h1>{{ user.name }}</h1>
                <div class="user-info">
                    <ul class="fa-ul">
                        <li>
                            <i class="fa-li fa fa-envelope"></i>
                            {{ user.email }}
                        </li>
                        <li>
                            <i class="fa-li fa fa-phone"></i>
                            {{ user.phone | trimPhoneNumber }}
                        </li>
                        <li>
                            <i class="fa-li fa fa-building"></i>
                            {{ user.company.name }}
                            <br/>
                            {{ user.company.catchPhrase }}
                        </li>
                        <li>
                            <i class="fa-li fa fa-map-pin"></i>
                            {{ user.address.street }}
                        </li>
                        <li>
                            <i class="fa-li fa fa-globe"></i>
                            {{ user.website }}
                        </li>
                    </ul>
                </div>
                <div class="action-bar">
                    <button @click.stop.prevent="deleteProfile(user.id)" class="del-btn">
                        <i class="fa fa-trash-o"></i> Delete
                    </button>
                </div>
            </div>
        </div>
        <div v-else>
            <router-link :to="{name: 'home'}" class="back-btn">
                No data found go to <i class="fa fa-home"></i>
            </router-link>
        </div>
    </div>
</template>
<script>
    export default {
        name: "Profile",
        data() {
            return {
                //this will load the user form vuex store by user id(passed via router params).
                user: this.$store.getters.getUserById(this.$route.params.id)
            };
        },
        created() {
            if (!this.$store.state.users.length) {
                this.$router.push({name: 'home'});
            }
        },
        mounted() {
            //to scroll to the top of the window on profile load, for better user experience.
            window.scrollTo(0, 0);
        },
        methods: {
            //this will remove the user from vuex store and route back to the home component.
            deleteProfile(user) {
                this.$store.dispatch("deleteUser", user);
                this.$router.push({name: 'home'});
            },
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
        },
    };
</script>
