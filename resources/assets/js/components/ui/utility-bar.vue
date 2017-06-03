
<template>
    <div class="utility-bar-container">
        <div class="user-info-box">
            <div class="header">Hi, Hater!</div>
            <div class="text-center">
                <img class="user-profile-img" src="images/user_icon.png">
            </div>
            <div>Anonymous</div>
        </div>
        <div class="utility-menu">
            <div class="utility-menu-option">
                <i class="material-icons">search</i>
                <span>Search</span>
            </div>
            <div class="utility-menu-option">
                <img src="images/around_me_icon_24.png">
                <span>Recent</span>
            </div>
            <div class="utility-menu-option">
                <img src="images/hot_icon.png">
                <span>Hots</span>
            </div>
            <div class="utility-menu-option">
                <i class="material-icons">exit_to_app</i>
                <span>Login</span>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                map: null
            }
        },
        methods:{
            
        },
        mounted: function(){
            
        }
    }
</script>