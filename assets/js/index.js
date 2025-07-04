$(document).ready(function () {
    $('.faq-item button').on('click', function () {
      const $button = $(this);
      const $faqContent = $button.next('.faq-content');
      const $icon = $button.find('.faq-icon');

      // Slide toggle this FAQ
      $faqContent.slideToggle(200).toggleClass('show');

      // Rotate the icon
      $icon.toggleClass('rotated');

      // Optionally close others:
      $('.faq-content').not($faqContent).slideUp(200).removeClass('show');
      $('.faq-icon').not($icon).removeClass('rotated');
    });
  });