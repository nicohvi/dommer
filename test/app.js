import $ from '../lib';

const items = $('.items .item');

console.log(items.length);

$(document).find('body').addClass('body');
console.log($('input').val())

// Extension testing

function useless () {
  console.log("useless");
};

$.fn(useless);

$(document).useless();

