<!-- start Simple Custom CSS and JS -->
<script type="text/javascript">
jQuery(document).ready(function( $ ){
  // ADICIONA SVG NO ÍCONE DA SACOLA
  $('.mhb-col.right .mhb-extras').prepend('<a href="/carrinho"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="40" viewBox="0 0 57.283 52"><path id="Caminho_341" data-name="Caminho 341" d="M828.1,210.4h-8.51l-13.82-16.891a2.848,2.848,0,0,0-4.263,0L787.69,210.4h-8.51A4.18,4.18,0,0,0,775,214.577l7.4,25.707a6.213,6.213,0,0,0,5.9,4.262h30.68a6.213,6.213,0,0,0,5.9-4.262l7.4-25.707A4.18,4.18,0,0,0,828.1,210.4Zm-24.461,22.583a5.508,5.508,0,1,1,5.508-5.508A5.509,5.509,0,0,1,803.642,232.979ZM794.807,210.4l8.835-10.8,8.835,10.8Z" transform="translate(-775 -192.546)" fill="#262525"/></svg></a>');

  // CAROUSEL DE CATEGORIAS
  $('#carousel_categorias .responsive').slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
  
  $('#carousel_categorias .image-frame').height($('#carousel_categorias .image-frame').width());

  // ADICIONA SVG NAS SETAS DO CAROUSEL
  $(' .responsive .slick-prev ').prepend('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" viewBox="0 0 30 54.006"><path id="Caminho_344" data-name="Caminho 344" d="M50.507,28.543,27,4.976,3.5,28.543a2.042,2.042,0,0,1-2.9-.005h0a2.072,2.072,0,0,1,0-2.918L25.555.6a2.042,2.042,0,0,1,2.9,0L53.4,25.621a2.072,2.072,0,0,1,0,2.918h0A2.042,2.042,0,0,1,50.507,28.543ZM51.96,30" transform="translate(0 54.006) rotate(-90)" fill="#262525"/></svg>');
  $(' .responsive .slick-next ').append('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" viewBox="0 0 30 54.006"><path id="Caminho_344" data-name="Caminho 344" d="M50.507,28.543,27,4.976,3.5,28.543a2.042,2.042,0,0,1-2.9-.005h0a2.072,2.072,0,0,1,0-2.918L25.555.6a2.042,2.042,0,0,1,2.9,0L53.4,25.621a2.072,2.072,0,0,1,0,2.918h0A2.042,2.042,0,0,1,50.507,28.543ZM51.96,30" transform="translate(27 0) rotate(90)" fill="#262525"/></svg>');

});</script>
<!-- end Simple Custom CSS and JS -->
