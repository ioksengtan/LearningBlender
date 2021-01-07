const appResources = "https://script.google.com/macros/s/AKfycbyz7TsoPaQzvJtidUv4j1ZB7aG5U5PbNVAhj4eWlQ/exec";
const appMap = "https://script.google.com/macros/s/AKfycbyG0jwoZdvSgH6J84ZtRuTpY0LdH-53eohtGxRT/exec";	
$(document).ready(function(){
	  //setTimeout(render_content('#main', tmp), 1000);
	  $('#list_all').click(function(){
			clear_content()
			render_content('#main', tmp_objects)
			render_content('#main', tmp)
	  })
	  
/*
    npc_sets = [];
    NpcRole = [];
	$.get(appMap, {
        "map_id": 1,
        "command": "GetNPCsFromMapID"
    }, function (data) {
		console.log(data)
	});
	*/
	/*
    $.getJSON("https://spreadsheets.google.com/feeds/cells/1EA0FNh6uL8xEUK6r2tC21WcGoctYu5VTLHrHmYD4n14/1/public/values?alt=json"
		
	
    , function (data) {
		console.log(data);
	});
	*/
	$.get("https://script.google.com/macros/s/AKfycbzD39SyYlxCaCCmD2GbWCh3pm6wK9L_Zt5SaxoeUbPenzX_jX8/exec");
	
});
function render_object_tag(div_id, string){
	$(div_id).append(string)
}
function render_content(div_id, string){
	$(div_id).append(string)
}

function clear_content(div_id){
	$(div_id).empty()
}

function object2string(object){
	string = '<button type="button" class="btn btn-outline-primary">'+ object +'</button> '
	return string

}

function data2string(thumbnail, title, description, tags_str, date, version, source, object){
	if(tags_str=='' & object==''){
		return ''
	}
	string = '<div class="row mt-3">'
string+='<div class="col-3">'
string+='        <img src="'+ thumbnail + '" class="rounded float-start img-thumbnail" alt="...">'
string+='</div><br/>'
string+='<div class="col-9">'
string+='        <p><b>' + title + '</b></p>'
string+='        <p>'+description+'</p>'
if(object!=''){
	string+='        <button type="button" class="btn btn-outline-primary">'+object+'</button>'
}
string+='        <button type="button" class="btn btn-outline-secondary">'+source+'</button>'
if(typeof(version)!='undefined'){
	string+='<button type="button" class="btn btn-outline-primary">Blender '+ version +'</button>'
}
if(typeof(tags_str)!='undefined'){
	tags = tags_str.split(',')
	if(tags!=''){
		for(i=0;i<tags.length;i++){
			string+='        <button type="button" class="btn btn-primary">'+tags[i].trim()+'</button>'
		}
	}
}else{
	tags = ''
}



string+='        <p>'+date+'</p>'

string+='</div>'
string+='</div>'
	return string
}
