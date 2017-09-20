Ext.define('nx.form.field.Checkbox', {
    extend: 'Ext.form.field.Checkbox',
    alias: ['widget.nxcheck','widget.nxcheckbox'],    
		
    initComponent: function () {
    	var me = this;
                	
    	me.inputValue = 'Y';
	 	me.uncheckedValue = 'N';
	 	
      	me.callParent();  
      	
       	me.inputValue = 'Y';
	 	me.uncheckedValue = 'N';
	 	
    }

});
