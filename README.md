#Waypoint InfiniteCallbackable

Um Waypoint Infinite diferente, que utiliza de callbacks para tirar do plugin a responsabilidade sobre o conteúdo, 
deixando ele somente com a obrigação de chamar o ajax e gerenciar o comportamento do waypoint.

```javascript
new Waypoint.InfiniteCallbackable({
            element: $('#posts-container'),
            getUrl: function() {
                var newPage = parseInt($postsContainer.data('page')) + 1;
                return $postsContainer.data('url') + '?page=' + newPage;
            },
            addCallback: function(item) {
                addProduto(item, $postsContainer, postNormalTmpl, true);
            },
            addLoadingClass: function() {
                $('#posts-container-load').removeClass('hide');
            },
            removeLoadingClass: function() {
                $('#posts-container-load').addClass('hide');
            },
            onAfterPageLoad: function(items) {
                var newPage = parseInt($postsContainer.data('page')) + 1;
                $postsContainer.data('page', newPage);
            }
        });
```
