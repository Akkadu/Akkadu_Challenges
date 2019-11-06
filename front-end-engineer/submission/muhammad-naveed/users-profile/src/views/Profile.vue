<template>
    <div class="profile">
        <router-link :to="{name: 'home'}" class="back-btn">
            <i class="fa fa-arrow-left"></i> Back to Profiles
        </router-link>
        <div class="profile-content" v-if="user">
            <div class="left-col">
                <img :src="user.photo" :alt="user.name"/>
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
                    <button class="del-btn"
                            @click.stop.prevent="deleteProfile(user.id)">
                        <i class="fa fa-trash-o"></i> Delete
                    </button>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="loader">
                <i class="fa fa-spinner fa-spin"></i>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "Profile",
        methods: {

            /**
             * This will remove the user from vuex store and
             * route back to the home component.
             * @param user
             */
            deleteProfile(user) {
                this.$store.dispatch("deleteUser", user);
                this.$router.push({name: 'home'});
            },
        },
        mounted(){
            if(!this.$store.state.users.length)
            {
                this.$router.push({name: 'home'});
            }
          window.scrollTo(0, 0);
        },
        computed: {
            user() {
                return this.$store.getters.getUserById(this.$route.params.id)
            }
        },
        filters: {
            /**
             * To trim the extra string from the end of the phone number.
             * @param phone
             * @returns {string|*}
             */
            trimPhoneNumber(phone) {
                if (phone.indexOf("x") !== -1) {
                    return phone.split("x").shift();
                } else {
                    return phone;
                }
            }
        },
    };
</script>
<style lang="scss" scoped>
    @import "@/scss/_variables.scss";
    @import "@/scss/_mixins.scss";

    .profile {
        .back-btn {
            color: $color-800;
            margin: 1rem 0 2rem 1rem;
            font-size: 1.5rem;
            cursor: pointer;
            text-decoration: none;

            i.fa {
                padding-right: 1rem;
            }
        }
    }

    .profile-content {
        display: flex;
        flex-direction: column !important;
        padding-top: 2rem;

        .left-col {
            width: 100%;
            padding: 0;
            text-align: center;

            img {
                width: 12rem;
                font-weight: normal;
            }

            p {
                font-weight: 800;
                font-size: 1.6rem;
                margin: 0.5rem 0 1rem 0;
            }
        }

        .right-col {
            width: 100%;

            h1 {
                margin: 0;
                font-size: 3.5rem;
                font-weight: bold;
                display: none;
            }

            .user-info {
                display: flex;
                justify-content: center;
            }

            .fa-ul {
                margin-bottom: 3rem;

                li {
                    font-size: 1.2rem;
                    margin: 0.8rem 0;
                }
            }

            .action-bar {
                padding-left: 10vw;

                .del-btn {
                    @include btn(#dc3545, #ffffff, 0.7rem, 2rem);
                }
            }
        }
    }

    // Small devices (landscape phones, 576px and up)
    @media (min-width: 576px) {
        .profile {
            .back-btn {
                display: none;
            }
        }
        .profile-content {
            .left-col {
                img {
                    width: 15rem;
                    font-weight: normal;
                }

                p {
                    font-weight: 800;
                    font-size: 2.2rem !important;
                }
            }

            .right-col {
                padding: 1rem;

                .fa-ul {
                    li {
                        font-size: 1.4rem;
                    }
                }

                .action-bar {
                    padding-left: 0;
                }
            }
        }
    }

    // Medium devices (tablets, 768px and up)
    @media (min-width: 768px) {
        .profile-content {
            flex-direction: row !important;

            .left-col {
                padding: 1rem;
                width: 30% !important;

                p {
                    margin-top: 1rem;
                    font-size: 1.5rem !important;
                    font-weight: normal;
                }
            }

            .right-col {
                width: 60% !important;

                h1 {
                    display: block !important;
                    font-size: 2.5rem;
                }

                .user-info {
                    justify-content: flex-start;
                }
            }
        }
    }
</style>
