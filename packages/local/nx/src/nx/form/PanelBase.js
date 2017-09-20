Ext.define('nx.form.PanelBase',{
	extend: 'Ext.form.Panel',
	alias: ['widget.nxForm'],
	requires: [
		'nx.form.field.Checkbox',
		'nx.form.field.CKEditor'
	],
	config: {
		model: null,
		loadCallback: null
	},
	initComponent: function() {
		var me = this;
		
		me.callParent();
	},
	fnBindModel: function(model) {
        this.model = model;
        this.loadRecord(model);
    },
    fnResetRecord: function(model) {
    	this.reset();
    	this.model = Ext.create(model);        
    },
	fnLoad : function(model, id, params) {
		model.getProxy().setExtraParams(params);
		this.model = model.load(id,{
			scope: this,
		    failure: function(record, operation) {
		        this.reset();
		    },
		    success: function(record, operation) {
				if (record) {
		    		this.loadRecord( record );
				} else {
					this.reset();
				}				
		    },
		    callback: function(record, operation, success) {
		    	if (Ext.isFunction(this.loadCallback)) {
					Ext.callback(this.loadCallback, this, [record]);
				}
		    }
		});		 				
	},
	fnFindField : function(field) {
		return this.getForm().findField(field);
	},
	fnFind: function() {
		
	},
	fnSave: function(extraParams) {
		if (this.form.isDirty()) {
            this.form.updateRecord(this.model);
			
            //console.log(extraParams);
            if ( !Ext.isEmpty(extraParams) ) {
            	this.model.getProxy().extraParams = extraParams
            }
            
			this.model.save({
				scope: this,
			    failure: function(record, operation) {
			        // do something if the save failed
			    	this.reset();
			    },
			    success: function(record, operation) {
			        // do something if the save succeeded
			    	this.loadRecord( record );
			    },
			    callback: function(record, operation, success) {
			        // do something whether the save succeeded or failed
			    	this.fireEvent('aftersaved', this, record, operation, success );
			    }
			});	
		}
	},
	fnDelete: function(model, id, extraParams) {		
				
		if ( !Ext.isEmpty(extraParams) ) {
        	this.model.getProxy().extraParams = extraParams;
        }
        
        this.model = model.load(id,{
			scope: this,
		    failure: function(record, operation) {
		        this.reset();
		    },
		    success: function(record, operation) {
				if (record) {
		    		this.loadRecord( record );
				} else {
					this.reset();
				}				
		    },
		    callback: function(record, operation, success) {
				record.erase({
					scope: this,
				    failure: function(record, operation) {
				        // do something if the erase failed		    	
				    },
				    success: function(record, operation) {
				        // do something if the erase succeeded
				    },
				    callback: function(record, operation, success) {
				        // do something whether the save succeeded or failed
				    	this.fireEvent('afterdeleted', this, record, operation, success );
				    }
				});	    	
		    }
		});	
        
        
	}
});