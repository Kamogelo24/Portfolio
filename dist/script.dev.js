"use strict";

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
}); // Add active class to current section in viewport

var sections = document.querySelectorAll('section');
var navItems = document.querySelectorAll('nav ul li a');
window.addEventListener('scroll', function () {
  var current = '';
  sections.forEach(function (section) {
    var sectionTop = section.offsetTop;
    var sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop - 300) {
      current = section.getAttribute('id');
    }
  });
  navItems.forEach(function (item) {
    item.classList.remove('active');

    if (item.getAttribute('href') === "#".concat(current)) {
      item.classList.add('active');
    }
  });
}); // Form validation would go here if you add a contact form