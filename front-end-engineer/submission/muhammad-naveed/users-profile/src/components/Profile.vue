<template>
    <div class="profile">
        <span class="back-btn" @click="setSelectedUser">
            <i class="fa fa-arrow-left"></i>&nbsp;&nbsp;&nbsp;&nbsp; Back to Profiles
        </span>
        <div class="profile-content">
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
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "Profile",
        methods: {
            //this will remove the user from vuex store and route back to the home component.
            deleteProfile(user) {
                this.$store.dispatch("deleteUser", user);
                this.$store.dispatch('setSelectedUser', null)
            },
            //hides the user profile by setting the selected user to null
            setSelectedUser() {
                this.$store.dispatch('setSelectedUser', null)
            }
        },
        computed: {
            ...mapGetters({
                user: 'getSelectedUser'
            })
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
