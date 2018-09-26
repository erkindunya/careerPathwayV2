import * as $ from 'jquery';


$(document).on('click','.js-toggle-subnav',function(){
    $('.subnav-link').toggleClass('active');
    $('.subnav').slideToggle(200);
});