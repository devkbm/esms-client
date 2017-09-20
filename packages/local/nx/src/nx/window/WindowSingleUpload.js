Ext.define('nx.window.WindowSingleUpload',{
	extend: 'Ext.window.Window',
	alias: ['widget.nxWindowSingleUpload'],
	requires: [
		'nx.form.PanelSingleUpload'
	],
	config: {
		title: 'File Upload Form',
		height: 500,
		width: 600,
		layout: 'fit'
	},
	initComponent: function() {
		var me = this;
		
		Ext.applyIf(this, {
            items: [{
            	itemId: 'nxUpload',
            	xtype: 'nxFormSingleUpload',
            	title: '',
            	frame: false
            }]
		});
		
		me.callParent();
	},
	fnInit: function(pgmId, fk) {
		console.log(this.getComponent('nxUpload'));
		this.getComponent('nxUpload').fnInit(pgmId,fk);
	}
});