$(document).ready(function(){
	  //setTimeout(render_content('#main', tmp), 1000);
	  $('#list_all').click(function(){
			clear_content()
			render_content('#main', tmp)
	  })
});

function render_content(div_id, string){
	$(div_id).append(string)
}

function clear_content(div_id){
	$(div_id).empty()
}
function data2string(thumbnail, title, description, tags_str, date, version, source){
	string = '<div class="row mt-3">'
string+='<div class="col-3">'
string+='        <img src="'+ thumbnail + '" class="rounded float-start img-thumbnail" alt="...">'
string+='</div><br/>'
string+='<div class="col-9">'
string+='        <p><b>' + title + '</b></p>'
string+='        <p>'+description+'</p>'
string+='        <button type="button" class="btn btn-outline-primary">'+source+'</button>'
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
