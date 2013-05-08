/*!
 * Ext JS Library 3.0.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.ns('Ext.ux.grid');
/**
 * @class Ext.ux.grid.GroupHeaderCustomizer
 * @extends Ext.grid.GroupingView
 * A GridPanel plugin that hides the group header when there is not more
 * than 1 record in the group
 */
Ext.ux.grid.GroupHeaderCustomizer = Ext.extend(Ext.grid.GroupingView, {
 /**
  * @cfg {String} showGroupHeaderCondition
  * Set it to the condition that when it evaluates to true, it renders the group header visible (defaults to 'true').
  */
 //showGroupHeaderCondition : 'values.rs[0].data["batchID"] != ""',
 showGroupHeaderCondition : 'true',
 
 /**
  * @cfg {Boolean} addGroupHeaderCheckbox
  * Set it to false to disable rendering a checkbox in the same row as the group header (defaults to true).
  */
 addGroupHeaderCheckbox : true,
 
 /**
  * @cfg {String} showGroupRowBodyCondition
  * Set it to the condition that when it evaluates to true, it renders the group row body visible (defaults to 'true').
  */
 //showGroupRowBodyCondition : 'values.rs[0].data["batchComment"] != ""',
 showGroupRowBodyCondition : 'true',
 
 /**
  * @cfg {String} groupSubTextTpl
  * Set it to the text you want to appear in the row body.
  */
 groupSubTextTpl : '',
    init: function(grid) {
         var gview = grid.getView();
         
   gview.interceptMouse = gview.interceptMouse.createInterceptor(function(e) {
    var obj = e.getTarget('.x-grid3-grouphd-checker');
    var obj2 = e.getTarget('.grid-batch-action-icon');
    var obj3 = e.getTarget('.x-grid3-td-checker');
    if (obj) {
     //toggle group header checkbox
     var hd = Ext.fly(obj.parentNode)
     var checked = !hd.hasClass('x-grid3-grouphd-checker-on');
     if (checked) {
      hd.addClass('x-grid3-grouphd-checker-on');
     } else {
      hd.removeClass('x-grid3-grouphd-checker-on');
     }
     
     //toggle group row checkbox(es)
     var groupId = obj.id.replace(/ext-gen[0-9]+-gp-/, '');
     var records;
     var store = grid.getStore();
     if (groupId) {
      var re = new RegExp(RegExp.escape(groupId));
      records = store.queryBy(function(r) {
       return r._groupId.match(re);
      });
      records = records ? records.items : [];
     }
     var sm = grid.getSelectionModel();
     for(i = 0, len = records.length; i < len; i++){
      if (checked) {
       sm.selectRow( store.indexOf(records[i]) , true );
      } else {
       sm.deselectRow( store.indexOf(records[i]) );
      }
     }
     
     //prevent group collapse/expand
     return false;
    }
    else if (obj2)
    {
     //prevent group collapse/expand
     return false;     
    }
    else if (obj3)
    {
     //prevent group collapse/expand
     return false;     
    }    
   });
         
         gview.startGroup = new Ext.XTemplate(
            '<div id="{groupId}" class="x-grid-group {cls}">',
             '<div id="{groupId}-hd" class="x-grid-group-hd" style="{[',this.showGroupHeaderCondition,' ? "" : "display:none;"]}">',
              '<div class="x-grid3-row x-grid3-row-expanded" style="width: 100%; height:auto !important;">',
               '<table class="x-grid3-row-table" cellspacing="0" cellpadding="0" border="0" style="width:100%;">',
                '<tbody>',
                 '<tr>',
                  '<td class="x-grid3-col x-grid3-cell x-grid3-td-checker" tabindex="0" style="width: 18px; {[',this.addGroupHeaderCheckbox,' ? "" : "display:none;"]}"><div class="x-grid3-cell-inner x-grid3-col-checker" unselectable="on"><div id="{groupId}" class="x-grid3-grouphd-checker"> </div></div></td>',
                  '<td class="x-grid3-col x-grid3-cell x-grid3-td-title" tabindex="0" style="width: 100%;"><div class="x-grid-group-title">', gview.groupTextTpl, '</div></td>',
                 '</tr>',
                 '<tr class="x-grid3-row-body-tr" style="{[',this.showGroupRowBodyCondition,' ? "" : "display:none;"]}">',
                  '<td class="x-grid3-body-cell" hidefocus="on" tabindex="0" colspan="2"><div class="x-grid3-row-body" style=" height:auto !important;">', gview.groupSubTextTpl ,'</div></td>',
                 '</tr>',
                '</tbody>',
               '</table>',
              '</div>',
             '</div>',
             '<div id="{groupId}-bd" class="x-grid-group-body">'
         );
    }
});
