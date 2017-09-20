/**
 * Created by bmkim on 2015-05-22.
 */
Ext.define('nx.form.field.CKEditor', {
    extend: 'Ext.form.field.TextArea',
    alias: 'widget.ckeditor',
    
    defaultListenerScope: true,
    
    listeners: {
      instanceReady: 'instanceReady',
      resize: 'resize',
      boxready : 'onBoxReady'
    },

    editorId: null,
    
    editor:null,
    CKConfig: {},
	initData:null,
    constructor: function () {
        this.callParent(arguments);
    },

    initComponent: function () {
        this.callParent(arguments);
        this.on("afterrender", function () {
           	Ext.apply(this.CKConfig, {
                height: this.getHeight(),
                width: this.getWidth()
            });

            this.editor = CKEDITOR.replace(this.inputEl.id, this.CKConfig);
            this.editorId = this.inputEl.id;
            this.editor.name = this.name;

            this.editor.on("instanceReady", function (ev) {
                this.fireEvent(
                    "instanceReady",
                    this,
                    this.editor
                );
            }, this);
			            
        }, this);
        
        
    },
    instanceReady : function (ev) {
        // Set read only to false to avoid issue when created into or as a child of a disabled component.
        //ev.editor.setReadOnly(false);		
    	//console.log(this.editor.getData());
    	
    	var eid = this.editorId,
            editor = CKEDITOR.instances[this.editorId];     
        if (!Ext.isEmpty(CKEDITOR.instances[this.editorId])){
            CKEDITOR.instances[this.editorId].resize(this.getWidth(), this.getHeight());
        }
        
        // 모델에서 데이터 로드시 사라지는 버그가 있음 - 초기값 저장후 인스턴스 생성시 값입력
        this.editor.setData(this.initData);
    },
    onRender: function (ct, position) {
        if (!this.el) {
            this.defaultAutoCreate = {
                tag: 'textarea',
                autocomplete: 'off'
            };
        }
        this.callParent(arguments);
    },

    setValue: function (value) {
    	this.callParent(arguments);
    	
        if (this.editor) {
            this.editor.setData(value);
            this.initData = value;
        }
    },

    getValue: function () {
        if (this.editor) {
            return this.editor.getData();
        }
        else {
            return ''
        }
    },

    getRawValue: function() {
        if (this.editor) {            
            return this.editor.getData();
        } else {
            return '';
        }
    },

    destroy: function(){
        // delete instance
        if(!Ext.isEmpty(CKEDITOR.instances[this.editorId])){
            delete CKEDITOR.instances[this.editorId];
        }
		this.callParent(arguments);
    },

    resize: function( comp , width , height , oldWidth , oldHeight , eOpts )  {
        var eid = this.editorId,
            editor = CKEDITOR.instances[this.editorId];     
        if (!Ext.isEmpty(CKEDITOR.instances[this.editorId])){
            //CKEDITOR.instances[this.editorId].resize(width-2, height+8);

	        Ext.Function.defer(function(w,h) {	        	
	          CKEDITOR.instances[this.editorId].resize(w-2, h+8);	          
	        }, 300, this, [width,height]);
        	
        }                       
    },
    onBoxReady : function(win, width, height, eOpts){
        // used to hook into the resize method
    }
});
