Ext.define('nx.form.PanelSingleUpload',{
	extend: 'Ext.form.Panel',
	alias: ['widget.nxFormSingleUpload'],
	config: {
		title: 'File Upload Form',
		frame: true,
		width: 300,
		hieght: 200,
		bodyPadding: '10 10 0'
	},
	initComponent: function() {
		var me = this;
		
		Ext.applyIf(this, {			
            items: [{            
            	xtype: 'fileuploadfield',
            	emptyText: 'Select a File',
            	fieldLabel: 'File',
            	name: 'file',            	            	           
            	buttonText: '파일 찾기',
            	anchor: '100%',
				msgTarget: 'side',
				labelWidth: 50,
            	buttonConfig: {
            		text : '',
            		iconCls: 'file-uploads-image-add'
            	}           	
            },{
            	xtype: 'hiddenfield',
            	name: 'pgmId'
            },{
            	xtype: 'hiddenfield',
            	name: 'fk'
            }]
		});
		
		me.dockedItems = [{
			xtype: 'toolbar',
			dock: 'bottom',
			ui: 'footer',
			items: [
				{xtype: 'tbfill'},
				{ xtype: 'button', text: 'Upload', handler: 'fnUpload', scope: this },
				{ xtype: 'button', text: 'Reset', handler: 'fnReset', scope: this }
			]
		}];
		
		me.callParent();
	},
	fnUpload : function() {		
		
		var form = this.getForm();
    	if(form.isValid()){
        	form.submit({
                //url: '/cmn/file/uploadFile.do',
                url: '/hrm/employee/exeEmployeeImg.do',
                waitMsg: 'Uploading file...',
                success: function(fp, o) {
                    Ext.Msg.alert('Success', 'Your photo "' + o.result.file + '" has been uploaded.');
                }
            });
        }
	},
	fnReset : function() {		
		this.getForm().reset(); 
	},
	fnInit: function(pgmId, fk) {
		this.getForm().findField('pgmId').setValue(pgmId);
		this.getForm().findField('fk').setValue(fk);			
	}
	
});