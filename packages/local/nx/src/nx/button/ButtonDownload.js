Ext.define('nx.button.ButtonDownload', {
    extend: 'Ext.button.Button',
    alias: ['widget.nxButtonDown'],    
	config: {
		//url: '/cmn/file/downloadFile.do'
		url: '/hrm/employee/getEmployeeImg.do'
		
	},
    initComponent: function () {
    	var me = this;
                	    	 	
      	me.callParent();        	       	 
    }, 
    fnDownload: function(downloadKey) {
    	// Keep using the same iframe
	    var iframe = Ext.get('downloadIframe');
	    iframe && Ext.destroy(iframe);
	 	
	    // Ext.String.format('<a href="/cmn/file/downloadFile.do?{0}">{1}</a>',Ext.Object.toQueryString({uuid:rec[0], path: rec[1], name:rec[2]}),rec[2]);  
	    Ext.DomHelper.append(document.body, {
	        tag: 'iframe',
	        id:'downloadIframe',
	        frameBorder: 0,
	        width: 0,
	        height: 0,
	        css: 'display:none;visibility:hidden;height: 0px;',
	        src: Ext.String.format('{0}?{1}',this.url, Ext.Object.toQueryString({fk: downloadKey}))
	    });
    }

});
