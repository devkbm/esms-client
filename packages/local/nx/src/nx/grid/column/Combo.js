Ext.define('nx.grid.column.Combo', {
    extend: 'Ext.grid.column.Column',    
    alias: 'widget.combocolumn',
    requires: [
        'nx.form.field.ComboBox'
	], 
	config: {
		cdGroup : null
	},
	
    initComponent: function () {
      var me = this;
      
      this.editor = Ext.create('nx.form.field.ComboBox',{
      	cdgroup: this.cdGroup
      });
      
      me.callParent();      
    },
    
    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
      var combo = metaData.column.getEditor();
      if(value && combo && combo.store && combo.displayField){
        var index = combo.store.findExact(combo.valueField, value);
        if(index >= 0){
          return combo.store.getAt(index).get(combo.displayField);
        }
      }
      return value;
    }

});
