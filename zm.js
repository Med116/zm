/*
* ZML: Zero Markup Language dot js
* This script defines BasrTag function that
* parents all html tags. "<div>" being the default tag
* Author: Mark Davis
*/
	var Zm =  {

	 Utils : {
		 	appendToBody: function(zm_content){
		 		// make an element based on the tag_info
		 		var element = document.createElement(zm_content.tag_info.tag_name);
		 		var content_str  = zm_content.getContentString();
		 		element.innerHTML = content_str;
		 		document.body.appendChild(element);
			},
			escapeHtml: function(content){
				return content.replace(/</g, "&lt;").replace(/>/g, "&gt;");

			}
	},

	BaseTag : function(content){

		if (content){
			this.addContent(content);
		}
	 
		this.tag_info = {
				empty:false,
				tag_name:"div"
		};
	 
		this.content_arr = new Array();
		this.class_arr = new Array(); 
		this.attr = new Array();
	 
	 
		this.setAttr = function(attr, value){
			this.attr.push({'attr':attr, 'value':value});
		};
	 
		this.addClass = function(class_str){
			//extra space before is neccessary
			//so two class strings don't stick together 
			// from subsequent calls to addClass()
			this.class_arr.push( " " + class_str);
			return this;
		}
		this.addContent = function(content){
			if(typeof(content) == "string"){
				this.content_arr.push(content);
			}else if(typeof(content) == "object"){
				// we have to turn the object into a string, and push it to content array;
				this.content_arr.push(content.print());
			}else{
				console.log("addContent was not provided an argument that was useful, most likey a blank string");
			}
		
			return this;
		},
		// alias , addContent is used often
		this.akon = this.addContent;
	 
		this.print = function(){
			var tag_str = "<" + this.tag_info.tag_name + " " + this.getClassesString() + " " +  this.getAttributesString() +  " >";
			tag_str += this.getContentString();
			if(this.tag_info.empty == true){
				tag_str = tag_str.replace(/>$/, "/>");
			}else{
				tag_str += "</" + this.tag_info.tag_name + ">";
			}
		
			return tag_str;
	 
	 
		},

		this.getContentString = function(){
			var tmp_str = "";
			var content_length = this.content_arr.length;
			if(content_length > 0){
				for(var i = 0; i < content_length; i++){
					tmp_str += this.content_arr[i];
				}
			}
			return tmp_str;
		},
	 
	 
		this.getClassesString = function(){
			var classes_str = "";
			if(this.class_arr.length == 0){
				return classes_str;
			}else{
				for( var i = 0; i < this.class_arr.length; i++ ){
					classes_str += this.class_arr[i];
				}
				// trim extra white space
				return "class=" + "\"" + classes_str.replace(/\s+/g, " ") + "\"";
			
			}
		}
	 
		this.getAttributesString = function(){

			var attr_str = "";
			if(this.attr.length == 0){
				return attr_str;
			}else{
				for ( var i = 0; i < this.attr.length; i++ ){
					attr_str += " " + this.attr[i]['attr'] + '="' + this.attr[i]['value'] + '"';
				}
				return attr_str;
			}
		}
	 
	 return this;
	},


	Span : function(content){
	 	var base_tag = new Zm.BaseTag();
	 	base_tag.addContent(content);
	 	base_tag.tag_info.tag_name = "span";
	 	return base_tag;
	 },
	 
	 P:function(content){
	 	var p = new Zm.BaseTag();
	 	p.addContent(content);
	 	p.tag_info.tag_name = "p";
	 	return p;
	},

	 Div:function(content){
	 	var div = new Zm.BaseTag();
	 	div.addContent(content);
	 	div.tag_info.tag_name = "div";
	 	return div;
	},

	H1 : function(content){
		var h1 = new Zm.BaseTag();
		h1.addContent(content);
		h1.tag_info.tag_name = "h1";
		return h1;
	},
	Form : function(action, method){
		var tag = new Zm.BaseTag();
		if(action){
			tag.setAttr("action", action);
		}
		if(method){
			tag.setAttr("method", method);
		}else{
			tag.setAttr("method", "POST");
		}
	 	tag.tag_info.tag_name = "form";
	 	return tag;
	},
	 InputText : function(){
		var tag = new Zm.BaseTag();
	 	tag.tag_info.tag_name = "input";
	 	tag.tag_info.empty = true;
	 	return tag;
	},
	Table : function(){
		var tag = new Zm.BaseTag();
		tag.tag_info.tag_name = "table";
		tag.addRow = function(array_of_columns){
			var row_count = array_of_columns.length;
			var tr = new Zm.Tr();
			for (var i = 0; i < row_count; i++){
				var td = new Zm.Td();
				td.addClass("border_thick padding_5");
				td.addContent(array_of_columns[i]);
				tr.addContent(td);
			}
			this.addContent(tr);
			return this;
		}
		return tag;
	},
	Tr :  function(){
		var tag = new Zm.BaseTag();
		tag.tag_info.tag_name = "tr";
		return tag;
	},
	Td : function(){
		var tag = new Zm.BaseTag();
		tag.tag_info.tag_name = "td";
		return tag;
	}


}
