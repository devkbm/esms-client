Ext.define('nx.grid.GridBase',{
	extend: 'Ext.grid.Panel',
	alias: ['widget.nxGrid'],
	
	requires: [
        'Ext.grid.plugin.RowEditing'
	],
	
	config: {
		querycols : null,
		querystr : null,
		
		/**
		 * 그리드 디테일 : 배열로 입력
		 * [{obj: xx, fk:'fkfield'}]
		 */
		gridDetail: null,
		
		/**
		 * 그리드 마스터 : 객체로 설정 
		 */
		gridMaster: null
	},
	initComponent: function() {
		var me = this;
		
        this.plugins = [ Ext.create('Ext.grid.plugin.RowEditing', { pluginId: 'rowEditing', clickToMoveEditor: 0, autoCancel: true})];
		
		me.on({		    
		    select: {fn: this.onSelect, scope: this}				    			     
		});
				
		me.callParent();
		
		me.getStore().on({
			load: {fn :this.onAfterLoad, scope: this}
		})
	},	
	onSelect: function( rowModel, record, index, eOpts ) {		
		this.fnDetailGridLoad(record);
	},
	onAfterLoad: function (store, records, successful, operation, eOpts ) {
		this.fnDetailGridClear();	
	},
	fnSetExtraParam : function(name, value) {
		this.store.getProxy().setExtraParam(name, value);   
	},
	fnClearExtraParam : function() {
		this.store.getProxy().setExtraParams({});		
	},
	fnLoad : function() {		
		this.store.load({			
		    scope: this,
		    callback: function(records, operation, success) {
				if (records)
					Ext.toast(records.length + ' 건 조회가 완료되었습니다.', '조회 완료', 'tr','x-fa fa-search');
		        
		    	this.fnDetailGridClear();
		    }
		});
	},
	fnLoadParam : function(param) {
		this.fnClearExtraParam();				
		this.store.getProxy().setExtraParams(param);
		this.store.load({			
		    scope: this,
		    callback: function(records, operation, success) {					
				if (records)
					Ext.toast(records.length + ' 건 조회가 완료되었습니다.', '조회 완료', 'tr','x-fa fa-search');
				this.fnDetailGridClear();
		    }
		});
	},
	fnSave: function() {
		this.store.sync({
			callback : function(batch, options) {
				Ext.toast('저장이 완료되었습니다.', '저장 완료', 'tr','x-fa fa-save');				
			}
		});
	},
	/**
	 * 디테일 그리드로 설정된 그리드를 조회
	 * @param {} record
	 * @return {Boolean}
	 */
	fnDetailGridLoad: function(record) {				
		var rtn = false; 
						
		if (this.gridDetail instanceof Array) {
			for (i in this.gridDetail) {				
				
				var gridObj = this.gridDetail[i];				
				var rec = {};
				
				if ( Ext.isEmpty(record) ) {					
					gridObj.obj.getStore().loadData([],false);	
				} else {
					console.log(record);
					rec[gridObj.fk] = record.getId();
					gridObj.obj.fnLoadParam(rec);
					rtn = true;					
				}					
			}		
		}
		
		return rtn;
	
	},
	fnDetailGridClear: function() {
		if (this.gridDetail instanceof Array) {
			for (i in this.gridDetail) {								
				var gridObj = this.gridDetail[i];											
				gridObj.obj.getStore().loadData([],false);										
			}		
		}
	},
	/**
	 * 그리드 행추가 기능
	 * @param grid		현재 그리드
	 * @param rec       행추가할 레코드
	 * @param idx       행추가할 레코드 위치
	 * @param colIdx    에디터가 활성화될 위치
	 * @param callback  행추가 후 실행될 callback function
	 * @param scope     scope
	 */
	fnAddRecord: function(grid, rec, idx, colIdx, callback, scope ) {		
		var store = grid.getStore();		
		var selModel = grid.getSelectionModel();
		var edit = grid.getPlugin('rowEditing');
		
		if (Ext.isEmpty(rec)) {
            rec = Ext.create(grid.getStore().getModel(),{});
        }

        if (Ext.isNumber(idx) && idx >= 0) {
			store.insert(idx, rec);
		} else {
			store.add(rec);
		}		
		
		edit.cancelEdit();
		selModel.select(store.indexOf(rec));        		
		edit.startEdit(rec,colIdx);
		
		if (Ext.isEmpty(scope)) {
			scope = grid;			
		}
		
		if (Ext.isFunction(callback)) {
			Ext.callback(callback, scope, [selectionModel.getSelection()]);
		}			
	},
	fnDelRecord: function(grid, callback, scope) {		
		var sel = grid.getSelection();
		var store = grid.getStore();		
		
		if (!sel[0].isModel) {
			Ext.log({mgs: 'Row를 선택해주세요.', level: "error" });
		}
		
		store.remove(sel);		
				
		if (Ext.isFunction(callback)) {
			Ext.callback(callback, scope, [sel]);
		}
		
	},
	fnGetMasterPkVal: function() {
		var rtn = null
		var sel = this.gridMaster.getSelection()[0];
		if (sel.isModel) {
			rtn = sel.get(sel.idProperty);
		}
		return rtn;
	}
})
