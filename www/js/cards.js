var cards = (function(){
	var db = window.openDatabase("MyPasswords", "1.0", "MyPasswords Database", 200000);
	$("body").append("<input type='hidden' id='currentId' value='-1'>");

	//initialize database
	db.transaction(function(tx){
//		tx.executeSql('DROP TABLE IF EXISTS passwords');
		tx.executeSql('CREATE TABLE IF NOT EXISTS passwords (id INTEGER PRIMARY KEY AUTOINCREMENT, title, url, username, password, memo)');
//		tx.executeSql('insert into passwords(id, title,url) values(2, "d","df")');
	});
	
	var showCards = function(){
		setCurrentId(-1);
		db.transaction(function(tx){
		     tx.executeSql('SELECT * FROM passwords', [], _doShowCards);
		});
	};
	
	var _doShowCards = function(tx, results) {
		
		$("fieldset.ui-grid-b").html("");
		var rows = results.rows;
        for(var i=0; i < rows.length; i++){
        	var item = rows.item(i);
        	var cardId = "card_" + item.id;
        	var html = '<div class="ui-block-b"><div class="ui-btn ui-input-btn ui-corner-all ui-shadow">'
        		+item.title+'<input type="button" id="'+cardId+'" value="'+item.title+'"></div></div>';
        	$("fieldset.ui-grid-b").append(html);
        	$("fieldset.ui-grid-b").find("#"+cardId).on("tap",function(event){
        		setCurrentId(this.id.substr(5));
        		$.mobile.changePage( "#addpage", {transition: "slideup"});
        	});
        }
    };
	
    var showCardById = function(id){
    	db.transaction(function(tx){
		     tx.executeSql('SELECT * FROM passwords where id=?', [id], function(tx, results){
		    	 var item = results.rows.item(0);
		    	 $("#ftitle").val(item.title);
			     $("#furl").val(item.url);
			     $("#fuser").val(item.username);
			     $("#fpass").val(item.password);
			     $("#fmemo").val(item.memo);
		     });
		});
    }
    
    var addOrCard = function(item) {
    	db.transaction(function(tx){
    		if(getCurrentId() == -1){
	    		tx.executeSql('insert into passwords(title, url, username, password, memo) values(?, ?, ?, ?, ?)',
	    				[item.title, item.url, item.username, item.password, item.memo], function(){
	    			
	    			tx.executeSql('select last_insert_rowid() as rowid', [], function(tx, results){
	    				var rowid = results.rows.item(0).rowid;
	    				var cardId = "card_" + rowid;
	    				var html = '<div class="ui-block-b"><div class="ui-btn ui-input-btn ui-corner-all ui-shadow">'
	                		+item.title+'<input type="button" id="'+cardId+'" value="'+item.title+'"></div></div>';
	                	$("fieldset.ui-grid-b").append(html);
	                	$("fieldset.ui-grid-b").find("#"+cardId).on("tap",function(event){
	                		setCurrentId(this.id.substr(5));
	                		$.mobile.changePage( "#addpage", {transition: "slideup"});
	                	});
	                	
	    			}, _dbError);
	    		}, _dbError);
    		}else{ //update
    			var id = getCurrentId();
    			tx.executeSql('update passwords set title=?, url=?, username=?, password=?, memo=? where id=?',
	    				[item.title, item.url, item.username, item.password, item.memo, id], function(){
    				setCurrentId(-1);
//    				$("fieldset.ui-grid-b").find("#"+id).val(item.title);
//    				$("fieldset.ui-grid-b").find("#"+id).parent.text(item.title);
    				showCards();
    			}, _dbError);
    		}
    	});
    };
    
    var deleteById = function(id){
    	db.transaction(function(tx){
		     tx.executeSql('delete FROM passwords where id=?', [id], function(tx, results){
//		    	 $("fieldset.ui-grid-b").find("#card_"+id).parentsUntil(".ui-block-b").remove();
		    	 showCards();
		     });
		});
    }
    
    var _dbError = function(tx, err){
    	alert("Error processing SQL: "+err.message);
    };
    
    var setCurrentId = function(cardId) {
    	$("#currentId").val(cardId);
    };
    
    var getCurrentId = function(){
    	return $("#currentId").val();
    };
    
    return {
    	currentId: getCurrentId,
    	setCurrentId: setCurrentId,
    	showCards: showCards,
    	addOrCard: addOrCard,
    	deleteById: deleteById,
    	showCardById: showCardById
    };
	
})();