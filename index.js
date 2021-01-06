const appResources = "https://script.google.com/macros/s/AKfycbyz7TsoPaQzvJtidUv4j1ZB7aG5U5PbNVAhj4eWlQ/exec";
const appMap = "https://script.google.com/macros/s/AKfycbyG0jwoZdvSgH6J84ZtRuTpY0LdH-53eohtGxRT/exec";	
inputdata = '';
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
		 tmp = data;
		//console.log(data)
	});
	*/

    $.getJSON("https://spreadsheets.google.com/feeds/cells/1EA0FNh6uL8xEUK6r2tC21WcGoctYu5VTLHrHmYD4n14/1/public/values?alt=json"
		
	
    , function (data) {
		inputdata = data;
		let table_schema = [
			{'name': 'source','type':'string'},
			{'name': 'subjects', 'type':'string'},
			{'name': 'tags', 'type':'string'},
			{'name': 'link', 'type':'string'},
			{'name': 'title', 'type':'string'},
			{'name': 'description', 'type':'string'},
			{'name': 'thumbnail', 'type':'string'},
			{'name': 'time', 'type':'string'},
		];
		formed_data = format_data(table_schema, data);
		//console.log(data);
	});
	
});
data2 = {};
data2['table'] = [];
fields = [];
function format_data(table_schema, rawdata){
	num_field = table_schema.length;
	num_rows = rawdata.feed.entry.length/num_field;
	num_records = num_rows - 1; // exclude header row. 
	reg_id_record = 0;
	for(i_cell=0;i_cell< rawdata.feed.entry.length;i_cell++){
		//console.log('i_cell:',i_cell);
		if(parseInt(rawdata.feed.entry[i_cell].gs$cell.row) == 1){
			//header
			i_field = rawdata.feed.entry[i_cell].gs$cell.col-1;
			fields[i_field] = rawdata.feed.entry[i_cell].content.$t;
			//console.log(fields);
		}else{
			id_record = parseInt(rawdata.feed.entry[i_cell].gs$cell.row)-2;
			id_field = parseInt(rawdata.feed.entry[i_cell].gs$cell.col)-1;
			//console.log(id_record + ' ' + id_field+' '+reg_id_record);
			if(typeof(reg_record) == "undefined"){
				reg_record = {};
			}else if(i_cell == rawdata.feed.entry.length-1){
				reg_record[ fields[id_field] ] = rawdata.feed.entry[i_cell].content.$t
				data2['table'].push(reg_record);
				console.log('total '+ id_record + ' records imported.');

			}else if(id_field == 0 ){
				data2['table'].push(reg_record);
				reg_record = {};
				reg_record[ fields[id_field] ] = rawdata.feed.entry[i_cell].content.$t
				//console.log('reset reg_record');
			}else{
				reg_record[ fields[id_field] ] = rawdata.feed.entry[i_cell].content.$t
				//console.log(reg_record);
			}
			reg_id_record = id_record;
		}		
	}
}
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
