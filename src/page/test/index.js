'use strict';
require('./index.css');
// var tpl = require('./index.tpl');
// var template = require("ejs-compiled!./index.ejs");

var template = require("./index.ejs")



var page = {
    init: function () {
        this.bindEvent();

    },
    bindEvent: function () {
        var data = {
            title: '我是头部',
            lists: ['皮卡丘', '小火龙', '杰尼龟'],
            font:"&nbsp;",
            class:"mm"
        }
        $('.div3').html( template(data))

      
    }
}

$(function () {
    page.init();
})
