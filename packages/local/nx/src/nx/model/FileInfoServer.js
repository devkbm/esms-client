Ext.define('nx.model.FileInfoServer', {
	extend: 'Ext.data.Model',	    
	idProperty: 'pkFile',	
	fields: [	      
			 {name: 'pkFile',		type: 'string'},
			 {name: 'pgmId',		type: 'string'},
			 {name: 'userId',		type: 'string'},
			 {name: 'contentType',	type: 'string'},
			 {name: 'uuid',			type: 'string'},
			 {name: 'path',			type: 'string'},
			 {name: 'fileNm',		type: 'string'},
	         {name: 'size',			type: 'string'},
	         {name: 'downloadCnt',	type: 'int'},
	         {name: 'fk',			type: 'string'}
	]
}); 