Ext.define('nx.model.FileInfo', {
	extend: 'Ext.data.Model',	    
	idProperty: 'id',	
	fields: [	      
			 {name: 'id',			type: 'string'},
			 {name: 'lastModifiedDate',	type: 'date'},
			 {name: 'loaded',		type: 'string'},
			 {name: 'name',			type: 'string'},
			 {name: 'origSize',		type: 'int'},
			 {name: 'size',			type: 'int'},
			 {name: 'percent',		type: 'int'},
	         {name: 'status',		type: 'string'},
	         {name: 'type',			type: 'string'},
	         {name: 'msg',			type: 'string'},
	         {name: 'uuid',			type: 'string'},
			 {name: 'path',			type: 'string'}
	]
}); 