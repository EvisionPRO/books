angular.module('Books', [])
  .controller('BooksController', function() {
    var books = this;
    books.gallery = [
      {
          id: 1,
          name: 'Name01',
          book_img: '/img/img01.jpg',
          description: 'Description01'
      },
      {
          id: 2,
          name: 'Name02',
          book_img: '/img/img02.jpg',
          description: 'Description02'
      },      {
          id: 3,
          name: 'Name03',
          book_img: '/img/img03.jpg',
          description: 'Description03'
      }   
   ];
    
    books.showDescription = function(id){
        console.log(id);
    }



});