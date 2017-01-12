App = Ember.Application.create();

  App.Router.map(function(){
    this.resource('about');
    this.resource('posts', function(){
      // this nested resource inside a function for 'posts' created a child route
      this.resource('post', { path: ':post_id' });
    });
  
    
   });
   
/*
   // json attempt
   App.PostsRoute = Ember.Route.Extend({
     model:function(){
     var soundCloudapi = 'https://api.soundcloud.com/playlists.format?consumer_key=apigee&q=bobbydigital7878&filter=public';
       return $.getJSON('soundCloudapi').then(function(data))
       return data.posts.map(function(post){
         post.body = post.content;
         return post;
       });
     }
   });
*/

/*
(function() {
  var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
  $.getJSON( flickerAPI, {
    tags: "kate upton",
    tagmode: "any",
    format: "json"
  })
    .done(function( data ) {
      $.each( data.items, function( i, item ) {
        $( "<img>" ).attr( "src", item.media.m ).appendTo( ".below-the-fold" );
        if ( i === 3 ) {
          return false;
        }
      });
    });
})();
*/
  
  // Route Model Hook - creates a subclass of the route object
    App.PostsRoute = Ember.Route.extend({
        model:function() {
            return posts;
        }
  });
  
    // Singular posts model passes in dynamic post id as param for URL
    App.PostRoute = Ember.Route.extend({
        model:function(params) {
            return posts.findBy('id', params.post_id);
        }
  });
  
  
  // Controller 
    App.PostController = Ember.ObjectController.extend({
      isEditing: false, 
      
        // actions hash contains methods for the actions in dom (buttons)
        actions: {
            edit: function(){
              this.set('isEditing', true);
            },
            doneEditing: function() {
              this.set('isEditing', false);
            }
        }
    });
    
    //handlebars Helper, uses the moment.js library
    
    Ember.Handlebars.helper('format-date', function(date){
      return moment(date).fromNow();
    });
    
    // Important to make sure to escape any returned HTMl to avoid XSS attacks http://goo.gl/gGdV
   var showdown = new Showdown.converter();
      Ember.Handlebars.registerBoundHelper('markdown', function(input) {
      return new Ember.Handlebars.SafeString(showdown.makeHtml(input));
   });
    
    
    //Objects
    var posts = [{
    id: '1',
    title: "Rails is Omakase",
    author: { name: "d2h" },
    date: new Date('11-11-2013'),
    excerpt: "There are lots of à la carte software environments in this world. Places where in order to eat, you must first carefully look over the menu of options to order exactly what you want.",
    body: "I want this for my ORM, I want that for my template language, and let's finish it off with this routing library. Of course, you're going to have to know what you want, and you'll rarely have your horizon expanded if you always order the same thing, but there it is. It's a very popular way of consuming software.\n\nRails is not that. Rails is omakase."
  }, {
    id: '2',
    title: "The Parley Letter",
    author: { name: "d2h" },
    date: new Date('11-09-2013'),
    excerpt: "My [appearance on the Ruby Rogues podcast](http://rubyrogues.com/056-rr-david-heinemeier-hansson/) recently came up for discussion again on the private Parley mailing list.",
    body: "A long list of topics were raised and I took a time to ramble at large about all of them at once. Apologies for not taking the time to be more succinct, but at least each topic has a header so you can skip stuff you don't care about.\n\n### Maintainability\n\nIt's simply not true to say that I don't care about maintainability. I still work on the oldest Rails app in the world."  
  }];

  