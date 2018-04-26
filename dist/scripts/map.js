var map = new AMap.Map("container", {
    resizeEnable: true,
    center:[121.598256,31.191171],
    zoom: 16
});
$(function(){
    $(".b_btn").click(function(){
      var city = $("#city").val();
      map.setCity(city);
    }); 
 });
var menu=new ContextMenu(map);
function ContextMenu(map) {
    var me = this;
    this.mouseTool = new AMap.MouseTool(map); //放到右键上
    this.contextMenuPositon = null;
    var content = [];
    content.push("<div>");
    content.push("    <ul class='context_menu'>");
    content.push("        <li onclick='menu.zoomMenu(0)'>最小</li>");
    content.push("        <li class='split_line' onclick='menu.zoomMenu(1)'>最大</li>");
    content.push("        <li class='split_line' onclick='menu.distanceMeasureMenu()'>距离</li>");
    content.push("        <li onclick='menu.addMarkerMenu()'>标记</li>");
    content.push("    </ul>");
    content.push("</div>");
    this.contextMenu = new AMap.ContextMenu({isCustom: true, content: content.join('')});
    map.on('rightclick', function(e) {
        me.contextMenu.open(map, e.lnglat);
        me.contextMenuPositon = e.lnglat; 
    });
}

ContextMenu.prototype.zoomMenu = function zoomMenu(tag) {//放大缩小
    if (tag === 0) {
        map.zoomOut();
    }
    if (tag === 1) {
        map.zoomIn();
    }
    this.contextMenu.close();
}
ContextMenu.prototype.distanceMeasureMenu=function () {  //距离
    this.mouseTool.rule();
    this.contextMenu.close();
}
ContextMenu.prototype.addMarkerMenu=function () {  //标记
    this.mouseTool.close();
    var marker = new AMap.Marker({
        map: map,
        position: this.contextMenuPositon 
    });
    this.contextMenu.close();
}