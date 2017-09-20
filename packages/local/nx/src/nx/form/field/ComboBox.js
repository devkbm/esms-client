Ext.define('nx.form.field.ComboBox', {
    extend: 'Ext.form.field.ComboBox',
    alias: ['widget.nxcombo','widget.nxcombobox'],
    requires: [
        'nx.model.CommonCode'
	],    
	
	config: {
		/**
		 * 코드 그룹
		 * @type string
		 */
		cdGroup : null,
		/**
		 * 기준정보를 가져오는 코드 스토어
		 * @type store 
		 */
		cdStore : null
	},    
    initComponent: function () {
    	var me = this;
        
    	me.queryMode = 'local';
      	me.displayField = 'codeName';
      	me.valueField = 'code';
    	
      	me.store = Ext.create('Ext.data.Store', {    		
	   		model: 'nx.model.CommonCode',
		    proxy: {
		    	type: 'ajax',
		        url: 'http://localhost:8090/common/codegroups/codes',
		        reader: {
		        	type: 'json',
		            rootProperty: 'data'
		        }
		    }
		});
      	
      	me.callParent();
            							      	      	         
      	me.on({		    
		    select: {fn: function(com, record, eOpts) {
				console.log(record);		    				    			     
		    }, scope: this},
		    afterrender: {fn: this.onAfterrenderer, scope: this}
		});
		      	      	      	  
    },
    onAfterrenderer: function(view, eOpts) {
    	this.store.proxy.setExtraParam('codeGroup', this.cdGroup); 
		this.store.proxy.setExtraParam('qType', 'combo'); 
      	
      	this.store.load({
      		scope: this,
      		params: {
      			cdGroup: this.cdGroup
      		}, 
      		callback: function(records, operations, success) {
      			      			
      			/*this.store = Ext.create('Ext.data.Store',{
      				fields: ['cd','cdName']
      			});
      			
      			for (var rec in records) {
      				console.log(rec);
      				console.log(records);
      				this.store.add({cd : records[rec].data.cd, cdName: records[rec].data.cdName});
      			}*/
      		}
      	});
    },
    fnFirstLoad : function(view, eOpts) {
    	//me.store.proxy.setExtraParam('cdGroup', this.cdGroup); 
      	/*
      	me.store.load({
      		params: {
      			cdGroup: this.cdGroup
      		}, 
      		callback: function(records, operations, success) {
      			
      		}
      	});
      	*/ 
    }

});
