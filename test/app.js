import $ from '../lib';

const items = $('.items .item');

console.log(items.length);

$(document).find('body').addClass('body');
console.log($('input').val())

const parent = $('.item').parent('.items');
console.log(parent.data('name'));

const body = $('.item').parent('body');
console.log(body.data('name'));

// Extension testing

function useless () {
  console.log("useless");
};

$.fn(useless);

$(document).useless();



