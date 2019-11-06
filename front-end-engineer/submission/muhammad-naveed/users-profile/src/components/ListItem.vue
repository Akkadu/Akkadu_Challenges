<template>
    <router-link :to="{name: 'profile', params: {id: user.id}}" class="card">
        <div class="card-body">
            <img :src="user.photo" class="list-thumbnail" :alt="user.name"/>
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
        <span class="delete-btn"
              role="button"
              aria-label="Delete Button"
              tabindex="0"
              @click.stop.prevent="deleteUser(user)"
              @keydown.enter.space.prevent="deleteUser(user)">
            <i class="fa fa-times-thin"></i>
        </span>
    </router-link>
</template>

<script>
    export default {
        name: "ListItem",
        props: {
            user: Object
        },
        methods: {
            /** To remove the user by ID from the users array in vuex store. */
            deleteUser(user) {
                this.$store.dispatch("deleteUser", user.id);
            }
        },
        filters: {
            /** This function will trim the extra string from the end of the phone number. */
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
<style lang="scss" scoped>
    @import "@/scss/_variables.scss";
    @import "@/scss/_mixins.scss";

    .card {
        position: relative;
        text-decoration: none;
        display: block;
        background-color: #ffffff;
        margin: 1rem 0;
        border-radius: 5px;
        width: 100%;
        cursor: pointer;
        box-shadow: 0 1px 4px 1px rgba(50, 50, 50, 0.178);

        .delete-btn {
            position: absolute;
            right: 0;
            top: 0;
            padding: 0 5px 5px 5px;

            .fa {
                &.fa-times-thin:before {
                    content: "\00d7";
                    color: $color-800;
                    font-weight: bold;
                }
            }

            &:hover {
                cursor: pointer;
            }

            &:hover .fa-times-thin:before {
                color: #dc3545;
            }
        }

        &:hover {
            box-shadow: 0 1px 4px 3px rgba(50, 50, 50, 0.178);
        }

        .card-body {
            display: flex;
            padding: 0.7rem 0.5rem;
            text-decoration: none;
            color: $color-800;

            img {
                height: 2.5rem;
            }

            .user-details {
                padding: 0 1rem;

                .user-name {
                    font-size: 1rem;
                    margin: 0;
                }

                .widget {
                    font-size: 2.2vw;
                    padding-right: 10px;

                    i.fa {
                        padding-right: .50rem;
                    }
                }
            }
        }
    }

    // Small devices (landscape phones, 576px and up)
    @media (min-width: 576px) {
        .card {
            .card-body {
                padding: 1.1rem;

                img {
                    height: 4rem;
                }
            }

            .user-details {
                padding: 0 1.2rem;

                .user-name {
                    font-size: 1.6rem !important;
                }
            }

            .widget {
                font-size: 0.8rem !important;
            }
        }
        .img-fluid {
            width: 10rem !important;
        }
    }

    // Medium devices (tablets, 768px and up)
    @media (min-width: 768px) {
        .card {
            .card-body {
                padding: 1.3rem;

                img {
                    height: 4.5rem;
                }
            }

            .user-details {
                padding: 0 1.4rem;

                .user-name {
                    font-size: 1.8rem;
                }
            }

            .widget {
                font-size: 0.8rem !important;
            }
        }
    }

    // Large devices (desktops, 992px and up)
    @media (min-width: 992px) {
        .card {
            .card-body {
                padding: 0.8rem;

                img {
                    height: 4rem;
                }
            }

            .widget {
                font-size: 1rem;
            }
        }
    }

    // Extra large devices (large desktops, 1200px and up)
    @media (min-width: 1200px) {
        .card {
            .card-body {
                padding: 1rem;
            }

            .widget {
                font-size: 1rem !important;
            }
        }
    }
</style>
