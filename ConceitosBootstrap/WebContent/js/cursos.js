 var cursos = [ {
	"id" : "curso-1",
	"titulo" : "Desenvolvimento de Soluções"
}, {
	"id" : "curso-2",
	"titulo" : "Arquitetura Java"
}, {
	"id" : "curso-3",
	"titulo" : "Arquitetura .NET"
}, {
	"id" : "curso-4",
	"titulo" : "Projetos Integrados"
}, {
	"id" : "curso-5",
	"titulo" : "Gestão de Processos"
}, {
	"id" : "curso-6",
	"titulo" : "Compiladores"
} ];

var lista = document.getElementById("curso");
function limparLista() {
	while (lista.firstChild) {
		lista.removeChild(lista.firstChild);
	}
}

function exibirCursos() {
	limparLista();

	for (var i = 0; i < cursos.length; i++) {
		var option = document.createElement("option");
		option.textContent = cursos[i].titulo;
		option.setAttribute("value", cursos[i].id);
		lista.appendChild(option);
	}
}
exibirCursos();

var request, db;


// verifica a compatibilidade com browsers
	window.indexedDB = window.indexedDB
	 || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction
			|| window.mozIDBTransaction || window.msIDBTransaction;
	window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange
			|| window.mozIDBKeyRange || window.msIDBKeyRange;
	
	if (!window.indexedDB) {
		
	 alert("Seu navegador não suporta o recurso IndexedDB.")
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

	



// evento para incluir um novo candidato
$("#btnADD").click(function() {
	
	var nome = $("#nome").val();
	var email = $("#email").val();
	var curso = $("#curso").find('option:selected').text();
	
	var request = db.transaction([ "candidatos" ],  "readwrite").objectStore("candidatos").add({
		nome : nome,
		email : email,
		curso : curso
	});	
	request.onsuccess = function(event) {
	//	$(location).attr("href", "http://localhost:8080/ConceitosBootstrap/lista.html");
		alert("Cadastrado com sucesso!");
		
	};
	request.onerror = function(event) {
		alert("Ocorreu um erro ao inserir candidato, verifique se o registro ja existe!");
	};
	
	
	});

// evento para listar os candidatos, adicionando-os em uma lista <li>
/*$("#btnListar").click(
		function() {
		var	request = db.transaction([ "candidatos" ], "readonly").objectStore("candidatos");
			request.openCursor().onsuccess = function(event) {
				var cursor = event.target.result;
				if (cursor) {
					$("#listaCandidatos").append("<li> Nome: " + cursor.value.nome + "</li>"  + "<li> Email: " + cursor.value.email + "</li>" + "<li> Nome: " + cursor.value.curso + "</li><br><br>" );
					cursor.continue();
				}
			};
			
			request.openCursor().onerror = function(event) {
				alert("Erro ao listar Candidatos");
			};
		});

*/


/*$("#btnListar").click(
function() {
	var request = db.transaction( "candidatos" ).objectStore("candidatos");
	request.openCursor().onsuccess = function(event) {
		var cursor = event.target.result;
		if (cursor) {
			$("<li> Nome: " + cursor.value.nome + "</li>"  + "<li> Email: " + cursor.value.email + "</li>" + "<li> Nome: " + cursor.value.curso + "</li><br><br>" ).append("#listaCandidatos");
			cursor.continue();
		}
	};
	
	request.openCursor().onerror = function(event) {
		alert("Erro ao listar Candidatos");
	};
});




$("#btnExcluir").click(function(){
	var email = $("#emailExcluir").val();
	if(email != null){
		 db.transaction([ "candidatos" ],  "readwrite").objectStore("candidatos").remove(email)({
				nome : nome,
				email : email,
				curso : curso
			});	
		
	 db.transaction(["candidatos"],"readwrite").objectStore("candidatos"),delete(email);
                      transaction.oncomplete = function(event){
		 alert("Removido!");
	};	}else{
		alert("Ao tentar excluir foi informado um espaço em branco ou o campo esta nullo.");
	}
});*/
