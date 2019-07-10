<template>
    <footer class="footer-bottom">
        <p class="copyright">Copyright © 2018 - 2019<i class="fa fa-heart heart"></i> <a href="#">Saber 酱</a> All Rights Reserved</p>
    </footer>
</template>

<script>

import "font-awesome/css/font-awesome.min.css"

export default {

}
</script>

<style>
.footer-bottom {
    margin: 0 auto;
    position: fixed;
    bottom: 0;
    font-size: 15px;
    width: 100%;
    background: #fafafa;
    color: #777;
    text-transform: uppercase;
    text-align: center;
    font-family: "Raleway";
}

.footer-bottom p {
    padding: 10px;
}

.footer-bottom .fa {
    color: #dd1717;
    margin: 0 5px;
    font-size: 13px;
}

.footer-bottom a {
    color: #d3a8a8;
    text-decoration: none;
}

/* 心跳 */
@keyframes pound {
    50% {
        transform: scale(1.2);
    }
}

.heart {
    animation: pound .5s infinite;
}
</style>