Backbone.bindings
=================

    Backbone.View.extend({
      bindings : {
        // Изменение элемента с классом title обновляет свойство titleAttr в this.model
        'model.titleAttr<:.title'			: 'value',
        // Изменение свойства title в this.model изменяет значение елемента .title
        'model.title:>.title'			: 'value',
        // Полная привязка свойства модели к элементу
        'model.title<>.title'			: 'value',
      },
      render: function() {
        ...
        this.checkBindings();
        ...
      }
