
<template>
    <div class="utility-bar-container">
        <div class="user-info-box">
            <div class="header">Hi, Hater!</div>
            <div class="text-center">
                <img class="user-profile-img" src="images/user_icon.png" @click="printUser()">
            </div>
            <div>{{ username }}</div>
        </div>
        <div class="utility-menu">
            <div class="utility-menu-option" @click="showSearchBoard()">
                <i class="material-icons">search</i>
                <span>Search</span>
            </div>
            <div class="utility-menu-option" @click="showSearchByKeyword()">
                <img src="images/around_me_icon_24.png">
                <span>Recent</span>
            </div>
            <div class="utility-menu-option">
                <img src="images/hot_icon.png">
                <span>Hots</span>
            </div>
            <div v-show="!user.authenticated" class="utility-menu-option" @click="showLoginDialog()">
                <i class="material-icons">exit_to_app</i>
                <span>Login</span>
            </div>
            <div v-show="user.authenticated" class="utility-menu-option" @click="onLogout()">
                <i class="material-icons">exit_to_app</i>
                <span>Logout</span>
            </div>
        </div>
    </div>
</template>

<script>

    import auth from '@components/services/auth';

    export default {
        data: function(){
            return {
                user: auth.user,
                'userObj': {
                    isLogin: false
                }
            }
        },
        computed: {
            username: function(){
                if(this.user.info == null){
                    return 'Anonymous';
                }
                return this.user.info.name;
            }
        },
        components:{
            
        },
        methods:{
            printUser: function(){
                console.log('User:', this.user.info.name);
            },
            showSearchBoard: function(){
                Event.fire('showSearchBoard');
            },
            showSearchByKeyword: function(){
                Event.fire('showSearchByKeyword');
            },
            showLoginDialog: function(){
                Event.fire('showLoginDialog');
            },
            onLogout: function(){
                auth.logout();
            }
        },
        mounted: function(){
            
        }
    }
</script>