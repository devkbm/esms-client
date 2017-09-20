Ext.define('nx.model.CommonCode', {
	extend: 'Ext.data.Model',	    
	idProperty: 'pkCd',	
	fields: [	         
			 {name: 'sysDt',		type: 'date', dateFormat: 'c',	persist: false},
			 {name: 'sysUser',		type: 'string',	persist: false},
			 {name: 'updDt',		type: 'date', dateFormat: 'c',	persist: false},
			 {name: 'updUser',		type: 'string',	persist: false},	         	                
	         {name: 'pkCd',			type: 'int'},
	         {name: 'cd',			type: 'string'},
	         {name: 'cdName',		type: 'string'},
	         {name: 'cdAbbr',		type: 'string'},
	         {name: 'fromDd',		type: 'date', 	dateFormat: 'Ymd'},
	         {name: 'toDd',			type: 'date', 	dateFormat: 'Ymd'},
	         {name: 'seq',			type: 'int'},	         	        
	         {name: 'cmt',			type: 'string'},
	         {name: 'fkCdGroup',	type: 'string'}        
	]
}); 