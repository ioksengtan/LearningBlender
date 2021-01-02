$(document).ready(function(){
	  setTimeout(render_content('#main', tmp), 1000);
});

function render_content(div_id, string){
	$(div_id).append(string)
}
function data2string(thumbnail, title, description, tags_str, date, version){
	string = '<div class="row mt-3">'
string+='<div class="col-3">'
string+='        <img src="'+ thumbnail + '" class="rounded float-start img-thumbnail" alt="...">'
string+='</div><br/>'
string+='<div class="col-9">'
string+='        <p><b>' + title + '</b></p>'
string+='        <p>'+description+'</p>'
if(typeof(tags_str)!='undefined'){
	tags = tags_str.split(',')
}else{
	tags = ''
}
for(i=0;i<tags.length;i++){
	string+='        <button type="button" class="btn btn-primary">'+tags[i].trim()+'</button>'
}
string+='        <p>'+date+', '+ version +'</p>'
string+='</div>'
string+='</div>'
	return string
}
