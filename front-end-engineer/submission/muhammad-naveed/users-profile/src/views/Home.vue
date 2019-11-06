<template>
    <div class="main">
        <div class="home">
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
            <div v-show="!users.length && !isBusy">
                <div class="empty-view">
                    <img src="@/assets/empty-dolly.png" class="img-fluid" alt="Empty dolly image"/>
                    <p>Looks like you have no more users to view. Click the "Request Users" button to request for more
                        users.</p>
                    <button @click.stop.prevent="getUsersProfile">Request Users</button>
                </div>
            </div>
            <div v-show="isBusy">
                <div class="loader">
                    <i class="fa fa-spinner fa-spin"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import {mapGetters} from 'vuex'
    import ListItem from "@/components/ListItem.vue";

    export default {
        name: "home",
        components: {
            ListItem
        },
        created() {
            /** On mounted hook calls the getUser function to populate the vuex store. */
            this.getUsersProfile()
        },

        methods: {
        /**
         * This will call the action on Vuex store to populate the users array.
         */
          getUsersProfile(){
            this.$store.dispatch('setUsers');
          }
        },
        computed: {
            /** To map the vuex getters from the store to this component as computed properties. */
            ...mapGetters({
                users: 'getUsers',
                isBusy: 'getBusyState',
            })
        }
    };
</script>
<style lang="scss" scoped>
    @import "@/scss/_variables.scss";
    @import "@/scss/_mixins.scss";

    .home {
        /*width: 90vw;*/
        margin: 0 auto;
        padding: 0 .3rem;

        .page-title {
            margin: 0.4rem 0;
            font-size: 3rem;
        }

        .sub-title {
            font-size: 1.3rem;
            margin-top: 1.5rem;
        }

        .list-wrapper {
            margin-top: 2rem;
        }
    }

    .empty-view {
        text-align: center;

        p {
            font-size: 1.3rem;
            text-align: center;
            margin: 2.5rem 0 3rem 0;
        }

        button {
            @include btn($color-800, #FFFFFF, 1rem, 2rem);
        }

        .img-fluid {
            width: 5rem;
        }
    }

    // Small devices (landscape phones, 576px and up)
    @media (min-width: 576px) {
        .home {
            /*width: 86%;*/
            padding: 0 2.5rem;
        }
        .img-fluid {
            width: 10rem !important;
        }
    }

    // Medium devices (tablets, 768px and up)
    @media (min-width: 768px) {
        .home {
            /*width: 70%;*/
            padding: 0 6rem;
        }
    }

    // Large devices (desktops, 992px and up)
    @media (min-width: 992px) {
        .home {
            /*width: 55%;*/
            padding: 0 15rem;
        }
    }

    // Extra large devices (large desktops, 1200px and up)
    @media (min-width: 1200px) {
        .home {
            /*width: 45%;*/
            padding: 0 20rem;
        }
    }
</style>
