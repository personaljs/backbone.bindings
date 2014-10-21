Backbone.bindings
=================

    Backbone.View.extend({
      bindings : {
        // Изменение элемента с классом title обновляет свойство titleAttr в this.model
        'model.titleAttr<:.title'			: 'value',
        // Изменение свойства title в this.model изменяет значение элемента .title
        'model.title:>.title'			: 'value',
        // Полная привязка свойства модели к элементу
        'model.title<>.title'			: 'value',
      },
      render: function() {
        ...
        this.checkBindings();
        ...
      }

Backbone.Bindings.getters служит для операций с DOM-элементами и его можно расширять своими методами:

    Backbone.Bindings.getters = _.extend(Backbone.Bindings.getters, {
      custom : function (model, attr, el) {
        ...
      }
    });
    
Backbone.Bindings.setters нужен для операций с моделями и расширяется аналогично.

    Backbone.Bindings.setters = _.extend(Backbone.Bindings.setters, {
      custom : function (el, model, val) {
        ...
      }
    });
