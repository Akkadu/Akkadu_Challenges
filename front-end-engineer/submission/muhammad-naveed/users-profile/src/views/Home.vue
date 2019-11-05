<template>
    <div class="main">
        <div class="home" v-show="!user">
            <div v-show="users.length">
                <h1 class="page-title h1">User Profiles</h1>
                <div
                        class="sub-title"
                >Here's a list of some of our awesome users living in Long Horn, FuXingMen.
                </div>
                <div class="list-wrapper">
                    <ListItem v-for="item in users" :user="item" :key="item.id"/>
                </div>
            </div>
            <div v-show="!users.length && !isLoading">
                <div class="empty-view">
                    <img src="@/assets/empty-dolly.png" class="img-fluid" alt="Empty dolly image"/>
                    <p>Looks like you have no more users to view. Click the "Request Users" button to request for more
                        users.</p>
                    <button @click.stop.prevent="getUsersProfile">Request Users</button>
                </div>
            </div>
            <div v-show="isLoading">
                <div class="loader">
                    <i class="fa fa-spinner fa-spin"></i>
                </div>
            </div>
        </div>
        <Profile v-if="user"/>
    </div>
</template>

<script>
    // @ is an alias to /src
    import {mapGetters} from 'vuex'
    import Profile from "@/components/Profile.vue";
    import ListItem from "@/components/ListItem.vue";

    export default {
        name: "home",
        data() {
            return {
                isLoading: false
            };
        },
        components: {
            Profile,
            ListItem
        },
        mounted() {
            this.getUsersProfile();
        },
        methods: {
            // To fetch the users data from the endpoint.
            getUsersProfile() {
                this.isLoading = true;
                fetch(
                    "https://akkadu-careers.s3.cn-north-1.amazonaws.com.cn/challenges/fe/data/json/users.json"
                )
                    .then(resp => resp.json())
                    .then(data => {
                        // after getting the data from endpoint we populate the users array with this data in vuex store.
                        this.$store.commit("setUsers", data);
                    })
                    .catch(error => {
                        console.log(error);
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            }
        },
        computed: {
            //this map function will map the getters from the store to this component as computed properties.
            ...mapGetters({
                users: 'getUsers',
                user: 'getSelectedUser',
            })
        }
    };
</script>
<style lang="scss" scoped>
</style>
