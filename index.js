
var appUrl = 'https://script.google.com/macros/s/AKfycbzD39SyYlxCaCCmD2GbWCh3pm6wK9L_Zt5SaxoeUbPenzX_jX8/exec';
var sheetsUrl = 'https://docs.google.com/spreadsheets/d/186yfVAcTNnUT7ckTxNNBQMHMAlES89zopGOQ_qbgjBY/edit#gid=0'; //$('#sheetsUrl'),
var sheetName = 'Resources';
var inputdata = '';
var time_format = 'xxxx-xx-xx';
var selected_dict = {};
parameter = {
            url: sheetsUrl,
            name: sheetName,
            command: 'getAllResources'
        };
		
$(document).ready(function() {
	
    //setTimeout(render_content('#main', tmp), 1000);
    $('#list_all').click(function() {
        //clear_content()
        //render_content('#main', tmp_objects)
        //render_content('#main', tmp)
        
		//render_content('#main', input_buffer_str)
        
    })
	
	$('#list_all').text('loading...')
	$.get(appUrl, parameter, function(data) {
            //console.log(data);
			
            input_buffer = JSON.parse(data);
			input_buffer_str = '';
			schema = ['source', 'subject', 'tags', 'link', 'title',	'description',	'thumbnail', 'time', 'version'];
			var num_data = 0;
			var all_tags = [];
			if(is_schema_valid(Object.keys(input_buffer.table[0]), schema)){
				for(var i=0;i<input_buffer.table.length;i++){
					var reg_str = json_data2html_youtube_component(input_buffer.table[i]);
					var reg_tags = input_buffer.table[i].tags;
					
					if (typeof(reg_tags) != 'undefined') {
						var tmp_tags = reg_tags.trim().split(',')
						//console.log(tags);
						if (tmp_tags != '') {
							for (var j = 0; j < tmp_tags.length; j++) {
								if(tmp_tags[j]!=''){
									if(all_tags.includes(tmp_tags[j].trim())){	
									}else{
										//console.log(tmp_tags[j].trim());
										all_tags.push(tmp_tags[j].trim());
									}
								}
							}
						}
					}
					
					if (reg_str!=''){
						input_buffer_str+= reg_str;
						num_data++;
					}
				}
				console.log(num_data + ' records to display');
				
			}
			//$('#list_all').text("List of all tutorial videos by subject's alphabets");
			update_statistics();
			all_tags.sort();
			for(var j=0;j<all_tags.length;j++){
				selected_dict[all_tags[j].replaceAll(' ','_')] = true;
			}
			update_subject_tags(all_tags);			
			//console.log('tags:'+all_tags);
			render_content('#main', input_buffer_str)
        });

 

});
data2 = {};
data2['table'] = [];
fields = [];
function update_statistics(){
	
}

function is_schema_valid(record, schema){
	if(record.length >= schema.length){
		for(var i in schema){
			if(record.includes(schema[i])){
				continue;
			}else{
				console.log('the schema is: '+schema);
				console.log(record[i]+' is not included in the schema');
				return false;
			}
		}
		return true;
	}else{
		console.log('length of record (' + record.length + ') < schema(' + schema.length + ').');
		return false;
	}
}

function format_data(table_schema, rawdata) {
    num_field = table_schema.length;
    num_rows = rawdata.feed.entry.length / num_field;
    num_records = num_rows - 1; // exclude header row. 
    reg_id_record = 0;
    for (i_cell = 0; i_cell < rawdata.feed.entry.length; i_cell++) {
        //console.log('i_cell:',i_cell);
        if (parseInt(rawdata.feed.entry[i_cell].gs$cell.row) == 1) {
            //header
            i_field = rawdata.feed.entry[i_cell].gs$cell.col - 1;
            fields[i_field] = rawdata.feed.entry[i_cell].content.$t;
            //console.log(fields);
        } else {
            id_record = parseInt(rawdata.feed.entry[i_cell].gs$cell.row) - 2;
            id_field = parseInt(rawdata.feed.entry[i_cell].gs$cell.col) - 1;
            //console.log(id_record + ' ' + id_field+' '+reg_id_record);
            if (typeof(reg_record) == "undefined") {
                reg_record = {};
            } else if (i_cell == rawdata.feed.entry.length - 1) {
                reg_record[fields[id_field]] = rawdata.feed.entry[i_cell].content.$t
                data2['table'].push(reg_record);
                console.log('total ' + id_record + ' records imported.');

            } else if (id_field == 0) {
                data2['table'].push(reg_record);
                reg_record = {};
                reg_record[fields[id_field]] = rawdata.feed.entry[i_cell].content.$t
                //console.log('reset reg_record');
            } else {
                reg_record[fields[id_field]] = rawdata.feed.entry[i_cell].content.$t
                //console.log(reg_record);
            }
            reg_id_record = id_record;
        }
    }
}
function subject_click(elemnt){	
	elemnt_value = elemnt.innerText;
	console.log(elemnt);
	console.log(elemnt_value);
	if(selected_dict[elemnt_value.replaceAll(' ','_')]){
		selected_dict[elemnt_value.replaceAll(' ','_')] = false;
		var tmp_flag = '#flag_' + elemnt_value.replaceAll(' ','_');
		$(tmp_flag).removeClass('bg-primary');
		$(tmp_flag).addClass('bg-secondary');
		$('.tag_'+elemnt_value.replaceAll(' ','_')).hide();
		$('.subject_'+elemnt_value.replaceAll(' ','_')).hide();
	}else{
		selected_dict[elemnt_value.replaceAll(' ','_')] = true;
		var tmp_flag = '#flag_' + elemnt_value.replaceAll(' ','_');
		$(tmp_flag).removeClass('bg-secondary');
		$(tmp_flag).addClass('bg-primary');
		$('.tag_'+elemnt_value.replaceAll(' ','_')).show();
		$('.subject_'+elemnt_value.replaceAll(' ','_')).show();
	}
}
var is_all_selected = true;
function subject_selectAll(){
	if(is_all_selected){		
		$('.flag').removeClass('bg-primary');
		$('.flag').addClass('bg-secondary');
		$('#flag_all').removeClass('bg-primary');
		$('#flag_all').addClass('bg-secondary');
		is_all_selected = false;
		for(item_id in selected_dict){
			selected_dict[item_id] = false;
		}
		$('.records').hide();
	}else{		
		$('.flag').removeClass('bg-secondary');
		$('.flag').addClass('bg-primary');
		$('#flag_all').removeClass('bg-secondary');
		$('#flag_all').addClass('bg-primary');
		is_all_selected = true;
		$('.records').show();
	}
}

function update_subject_tags(all_tags){
	var reg_str = '';
	reg_str += '<span class="badge bg-primary" id="flag_all" onclick="subject_selectAll()">ALL</span>\n';
	for(var i=0;i<all_tags.length;i++){
		//reg_str+= '<button type="button" class="btn btn-outline-primary" id="flag_'+ all_tags[i].trim().replaceAll(' ','_') +'" onclick="subject_click(this)">' + all_tags[i] + '</button> ';
		reg_str+= '<span class="badge bg-primary flag" id="flag_'+ all_tags[i].replaceAll(' ','_') +'" onclick=subject_click(this)>'+ all_tags[i]	 +'</span>\n'
	}
	//console.log(reg_str);
	render_content('#div_tags', reg_str);
}
/*
function render_object_tag(div_id, string) {
    $(div_id).append(string)
}
*/
function render_content(div_id, string) {
    $(div_id).append(string)
}

function clear_content(div_id) {
    $(div_id).empty()
}

function object2string(object) {
    string = '        <button type="button" class="btn btn-outline-primary">' + object + '</button> '
    return string

}

function json_data2html_youtube_component(json_data) {
	title = json_data.title;
	description = json_data.description;
	tags_str = json_data.tags;
	time = json_data.time;
	version = json_data.version;
	source = json_data.source;
	subject = json_data.subject; 
	thumbnail = json_data.thumbnail;

	
	link = json_data.link;
    if (tags_str == '' & subject == '') {
        return ''
    }
    string = '<div class="row mt-3 records subject_' + subject.replaceAll(' ','_')+' ';
	for(var j=0;j<tags_str.split(',').length;j++){
		string+= 'tag_'+tags_str.split(',')[j].trim().replaceAll(' ','_') + ' ';
	}
	string += '">';
    string += '<div class="col-3">'
    string += '        <img src="' + thumbnail + '" class="rounded float-start img-thumbnail" alt="...">'
    string += '</div><br/>'
    string += '<div class="col-9">'
    string += '        <p><a href="' +link+'" target="_blank"><b>' + title + '</b></a></p>'
    //string += '        <p>' + description + '</p>'
    if (subject != '') {
        //string += '        <button type="button" class="btn btn-outline-primary">' + subject + '</button>'
		string += '<span class="badge bg-danger">'+ subject +'</span>\n'
    }
    //string += '        <button type="button" class="btn btn-outline-secondary">' + source + '</button> '
	string += '<span class="badge bg-light text-dark">'+ source +'</span>\n'
    if (typeof(version) == 'undefined') {
	}else if (version == ''){
		//string += '<span class="badge bg-dark">Blender ver: NA</span>\n'
	}else{
        //string += '<button type="button" class="btn btn-outline-primary">Blender ' + version + '</button>'
		string += '<span class="badge bg-dark">Blender ver:'+ version +'</span>\n'
    }
    if (typeof(tags_str) != 'undefined') {
        tags = tags_str.trimEnd().split(',')
		//console.log(tags);
        if (tags != '') {
			
            for (i = 0; i < tags.length; i++) {
				if(tags[i]!=''){
					//string += '        <button type="button" class="btn btn-primary">' + tags[i].trim() + '</button>'
					string += '<span class="badge bg-primary">'+ tags[i].trim() +'</span>\n'
				}
            }
        }
    } else {
        tags = ''
    }
	
	if(typeof(time)=='undefined'){
		
	}else{
		string += '        <p>' + time.slice(0, time_format.length) + '</p>'
	}
	
    string += '</div>'
    string += '</div>'
	console.log(string);
    return string
}

function data2string(thumbnail, title, description, tags_str, date, version, source, object) {
    if (tags_str == '' & object == '') {
        return ''
    }
    string = '<div class="row mt-3">'
    string += '<div class="col-3">'
    string += '        <img src="' + thumbnail + '" class="rounded float-start img-thumbnail" alt="...">'
    string += '</div><br/>'
    string += '<div class="col-9">'
    string += '        <p><b>' + title + '</b></p>'
    string += '        <p>' + description + '</p>'
    if (object != '') {
        string += '        <button type="button" class="btn btn-outline-primary">' + object + '</button>'
    }
    string += '        <button type="button" class="btn btn-outline-secondary">' + source + '</button>'
    if (typeof(version) != 'undefined') {
        string += '<button type="button" class="btn btn-outline-primary">Blender ' + version + '</button>'
    }
    if (typeof(tags_str) != 'undefined') {
        tags = tags_str.split(',')
        if (tags != '') {
            for (i = 0; i < tags.length; i++) {
                string += '        <button type="button" class="btn btn-primary">' + tags[i].trim() + '</button>'
            }
        }
    } else {
        tags = ''
    }



    string += '        <p>' + date + '</p>'

    string += '</div>'
    string += '</div>'
    return string
}