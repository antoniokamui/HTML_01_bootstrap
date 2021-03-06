

var request, db;


// verifica a compatibilidade com browsers
	window.indexedDB = window.indexedDB
	 || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction
			|| window.mozIDBTransaction || window.msIDBTransaction;
	window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange
			|| window.mozIDBKeyRange || window.msIDBKeyRange;
	
	if (!window.indexedDB) {
		
	// alert("Seu navegador não suporta o recurso IndexedDB.")
	}else{
		request = window.indexedDB.open("DBInscricao", 1);
		request.onerror = function(event) {
			alert("Erro ao abrir o banco de dados");
		}
		request.onupgradeneeded = function(event) {
			//alert("Banco de dados preparado para uso");
			db = event.target.result;
			var objectStore = db.createObjectStore("candidatos", { keyPath : "email" });
			objectStore.createIndex("nome", "nome", { unique: false });
			objectStore.createIndex("email", "email", { unique: true });
			objectStore.createIndex("curso", "curso", { unique: false });
		};
		request.onsuccess = function(event) {
		//alert("Banco de dados aberto com sucesso");
			db = event.target.result;
		}
	
	}

	



// evento para listar os candidatos, adicionando-os em uma lista <li>

function listar() {
	$("#listaCandidatos").empty();
		var	request = db.transaction([ "candidatos" ], "readonly").objectStore("candidatos");
			request.openCursor().onsuccess = function(event) {
				var cursor = event.target.result;
				if (cursor) {
					
					$("#listaCandidatos").append("<li> Nome: <label id ='nome'>" + cursor.value.nome + "</label> </li>"  + "<li> Email: <label id='email'>" + cursor.value.email + " </label></li>" + "<li> Curso: <label id='curso'>" + cursor.value.curso + "</label></li><br><br>" );
					cursor.continue();
				}
			};
			
			request.openCursor().onerror = function(event) {
				alert("Erro ao listar Candidatos");
			};
		};





$("#btnExcluir").click(function(){
	var email = $("#emailExcluir").val();
	var request;
	var excluiExiste;
	email = email.replace(/^\s+|\s+$/g,"");
	
	if(email != null && email != "" ){
	emailExiste = 0;
		
		
		  $( "ul li label" ).each(function( index, element ) {
			  if($( this ).is("#email") ){
				  if($(this).text().indexOf(email) != -1  ){
					  emailExiste++;
					  
			  }
			  }
			  
		  });
		

			
		
		 if(emailExiste == 0){
				 alert("email informado não existe na lista de inscritos");
				}else{
					
					request = db.transaction([ "candidatos" ],  "readwrite").objectStore("candidatos").delete(email);	

					request.onsuccess = function(event){
					alert("Removido!");
					listar();
					$("#emailExcluir").val("");
					};	
					request.onerror = function(event){
						alert("Ao tentar excluir email!");
					};	
				} 
		
	}else{
		alert("Ao tentar excluir o campo esta nullo");
	}
});
