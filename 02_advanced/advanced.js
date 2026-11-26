"use strict";

/*
1 - Crie um objeto person com as propriedades id, name, birthday, 
gender e status; exiba-o no console; percorra suas chaves e valores 
usando for...in; e tente iterar sobre ele com for...of dentro de 
um bloco try...catch para tratar o erro resultante.
*/

function working_object_with_for()
{
	let person = {
		id: 123, 
		name: "Anderson", 
		birthday: (new Date(2000,4,1,10,30,0)).toLocaleString("pt-BR"), 
		gender: 'M',
		status: true,
	};

	console.log(person);

	for(let item in person)
	{
		console.log(item);
	}

	try{
		for(let item of person)
		{
			console.log(item);
		}
	}catch(error){
		/*
			Objetos comuns não são iteráveis com for...of.
			O for...of precisa receber algo que implemente o protocolo de iteração, 
			como um Array, String, Map etc.
		*/
		console.log(`Error: ${error}`); 
	}
}

/*
2 - Crie duas funções, exercise_02_1 e exercise_02_2, onde a primeira cria um 
objeto person com um identificador Symbol, uma propriedade comum e um método 
show_data usando this para exibi-los, demonstrando também a omissão de Symbols 
em laços for...in; e a segunda cria um objeto literal com uma propriedade 
message e um método dinâmico show_message que retorna esse valor 
utilizando o contexto do this.
*/

function exercise_02_1()
{
	let sname = Symbol("name");

	let person = {
		id: 123,
		[sname]: "Anderson",
		show_data: function(){
			console.log(`ID: ${this.id}, Name: ${this[sname]}`);
		}
	};

	person.show_data();
	
	for(let d in person){
		 console.log(d); // id é mostrado e Symbol omitido!
	}

	console.log(person);
}

function exercise_02_2()
{
	function show_message(){
		return this.message;
	}

	let obj = {
		message: "Hello, World!",
	};

	{
		obj.show_hello = show_message;
		console.log(obj.show_hello());
	}

	{
		console.log(show_message.call(obj));
	}
}

/*
3 - Crie uma classe Person com contador estático e método show_data, defina 
funções externas get_name e set_name, adicione-as dinamicamente ao 
Object.prototype junto com uma propriedade status, instancie um objeto 
para testá-las, valide seu tipo, e utilize um laço for para instanciar 
outros objetos (incluindo um sem parâmetros) exibindo a contagem total 
de instâncias através de Person.count.
*/

function create_person_class(){
	class Person{
		static count = 0

		#name;

		constructor(name){
			this.name = name;
			Person.count++;
		}

		show_data(){
			console.log(`Name: ${this.name}, Status: ${this.status}`);
		}
	}	

	function set_name(name){
		this.name = name;
	}

	function get_name(){
		return this.name;
	}

	Object.prototype.get_name = get_name;
	Object.prototype.set_name = set_name;
	Object.prototype.status = true;

	let person = new Person();
	person.set_name("Anderson");
	console.log(person.get_name());
	person.show_data();


	for(let i = 0; i < 9; i++){
		new Person();
	}

	console.log(`Objects: ${Person.count}`);
}

/*
4 - Crie uma função construtora f que receba uma propriedade band e a atribua 
via this, adicione o método get_band e a propriedade padrão country ao seu 
prototype, instancie quatro objetos, sobrescreva a propriedade country 
em apenas um deles para demonstrar o sombreamento de propriedades (shadowing), 
e exiba o nome da banda e o país de cada instância no console.
*/

function counstructor_function(){



}


counstructor_function();

/*
5 - Crie uma classe MyClass com um construtor que aciona métodos de instância 
e estáticos, implemente o método de instância instance_method, métodos 
estáticos static_method e static_callback demonstrando o contexto correto 
do this e a restrição de acesso a instâncias, e realize testes instanciando 
a classe e chamando seus métodos externamente.
*/

function scope_this_function(){

	class MyClass{

		constructor(){
			this.instance_method("constructor");
			this.constructor.static_method("constructor");
		}

		instance_method(origin){
			console.log(`${origin}: instance_method!`);
			this.constructor.static_method("instance_method");
			MyClass.static_method("instance_method");
		}

		static static_method(origin){
			console.log(`${origin}: static_method!`);
		}

		static static_callback(origin){
			console.log(`${origin}: static_callback!`);
		}
	}

	let obj = new MyClass();
	obj.instance_method("external");
	MyClass.static_method("external");
}

/*
6 - Crie uma classe base Person com construtor para id e name e um método get_data, 
e uma classe derivada NaturalPerson que estenda Person, reutilize o construtor 
com super, adicione uma propriedade cpf, sobrescreva o método get_data usando 
super.get_data() para concatenar o CPF, e teste instanciando a classe e exibindo 
o resultado no console.
*/

function create_class_with_inheritance(){

	class Person{
	
		#id;
		#name;

		constructor(id, name){
			this.id = id;
			this.name = name;
		}

		get_data(){
			return `ID: ${this.id}, Name: ${this.name}`;
		}
	}

	class NaturalPerson extends Person{
		
		#cpf;

		constructor(id, name, cpf){
			super(id, name);
			this.cpf = cpf;
		}

		get_data(){
			return `${super.get_data()}, CPF: ${this.cpf}, `;
		}
	}


	let p = new NaturalPerson(123, "Anderson", "54215314231");
	console.log(p.get_data());
}

/*
7 - Crie duas funções, exercise_07_1 e exercise_07_2, onde a primeira define 
herança entre objetos literais usando __proto__ para que natural_person herde 
de person e acesse propriedades e métodos, e a segunda demonstra a herança inline, 
a sobrescrita de método chamando o pai via 
Object.getPrototypeOf(this).get_data.call(this) para preservar o contexto do 
this, além de referenciar propriedades do pai e exibir os resultados
no console.
*/

function inheritance_object_function(){

	function exercise_07_1(){

		let person = {
			id: 123,
			name: "Anderson",
		};

		let natural_person = {
			cpf: "02154542154",
			get_data: function(){
				return `ID: ${this.id}, Name: ${this.name}, CPF: ${this.cpf}`;
			}
		}

		console.log(person);
		console.log(natural_person);
		console.log(natural_person.get_data());

		natural_person.__proto__ = person;

		console.log(natural_person.get_data());
	}

	function exercise_07_2(){

		let person = {
			id: 123,
			name: "Anderson",
			get_data: function(){
				return `ID: ${this.id}, Name: ${this.name}`;
			}
		};

		let natural_person = {
			cpf: "02154542154",
			__proto__: person,
			get_data: function(){
				return `${Object.getPrototypeOf(this).get_data.call(this)}, CPF: ${this.cpf}`;
			}
		};

		console.log(natural_person.get_data());
	}

	exercise_07_1();
	exercise_07_2();
}

/*
8 - Crie uma classe base Parent com construtor para x, y e title, e um método sum();
e uma classe derivada Child que estenda Parent, reutilize o construtor com super(x, y), 
sobrescreva a propriedade title e o método sum() utilizando super.sum() para 
reaproveitar a lógica da adição somada a z; por fim, instancie e teste ambas 
as classes.
*/

function create_inheritance_class(){

	class Parent{
		constructor(x, y){
			this.x = x;
			this.y = y;
		}

		sum(){
			return this.x + this.y;
		}
	}

	class Child extends Parent{
		constructor(x, y, z){
			super(x,y);
			this.z = z;
		}

		sum(){
			return super.sum() + this.z;
		}
	}

	let obj1 = new Parent(1,2);
	console.log(obj1.sum());

	let obj2 = new Child(1,2,4);
	console.log(obj2.sum());
}

/*
9 - Crie duas funções, exercise_09_1 e exercise_09_2, onde a primeira instancia um Map, 
adiciona diferentes tipos de dados usando .set(), exibe o tamanho com .size, 
recupera um valor com .get(), itera com for...of, e testa a inclusão de uma chave
Symbol com tratamento de erro em try...catch; e a segunda demonstra a inicialização 
alternativa passando um array bidimensional diretamente no construtor new Map([...]), 
iterando e imprimindo seus elementos.
*/


function create_map(){

	function exercise_09_1(){

		let map = new Map();

		map.set("id", 123);
		map.set("name", "Anderson");
		map.set("address", {street: "Street Home", number: 100});
		map.set("gender", 'M');
		map.set("competencies", ["Programmer","Analyst"]);
		map.set("salary", 1542.11);
		map.set("status", true);

		console.log(map);
		console.log(map.size)
		console.log(`Name: ${map.get("name")}`);
		
		// entries and for...of		
		for(let[k,v] of map.entries()){
			console.log(`${k}: ${v}`);
		}

		// Adding Symbol...
		let sfield = Symbol("field");
		map.set(sfield, "data");
		console.log(map);

		// keys() and values()
		console.log(map.keys());
		console.log(map.values());

		// for...of
		try{
			for(let[k,v] of map.entries()){
				console.log(`${k}: ${v}`);
			}
		}catch(error){
			console.log(`Error: ${error}`); // Error: TypeError: Cannot convert a Symbol value to a string   
		}
	}


	function exercise_09_2(){

		let map = new Map([
			["id", 123],                                                                                                                                         
			["name", "Anderson"],                                                                                                                                     
			["address", {street: "Street Home", number: 100}],                                                                                                                     
			["gender", "M"],                                                                                                                                          
			["competencies", ["Programmer","Analyst"]],                                                                                                        
			["salary", 1542.11],                                                                                                                                    
			["status", true],  
		]);

		console.log(map);
	}

	exercise_09_1();
	exercise_09_2();
}

/*
10 - Crie uma função que declare um objeto person, exiba-o no console, 
remova sua referência atribuindo null para torná-lo elegível ao garbage collector, 
e utilize um bloco try...catch para tentar acessar sua propriedade e capturar 
o erro resultante.
*/

function using_garbage_collection(){

	let person = {
		id: 123, name: "Anderson"
	};

	console.log(person);
	// removing reference assigning null
	person = null;

	try{
		console.log(person);
		console.log(person.name)
	}catch(error){
		console.log(`Error: ${error}`); // Error: TypeError: Cannot read properties of null (reading 'name')   
	}
}

/*
11 - Crie uma função que declare múltiplos objetos para servirem de chaves, 
instancie dois WeakMap (map1 via .set() e map2 via array bidimensional no construtor), 
utilize métodos como .get() para recuperar e executar valores (como funções), 
e reforce as características do WeakMap quanto à exigência de chaves de tipo 
objeto e à ausência de iterabilidade.
*/

function create_weakmap(){

	function create_weakmap_with_set(){

		// chaves precisam ser objetos:
		let sid = Symbol("id");
		let sname = Symbol("name");
		let saddress = Symbol("address");
		let sgender = Symbol("gender");
		let scompetencies = Symbol("competencies");
		let ssalary = Symbol("salary");
		let sstatus = Symbol("status");

		let map = new WeakMap();
		map.set(sid, 123);
		map.set(sname, "Anderson");
		map.set(saddress, {street: "Street Home", number: 100});
		map.set(sgender, "M");
		map.set(scompetencies, ["Programmer","Analyst"]);
		map.set(ssalary, 1234.65);
		map.set(sstatus, true);

		console.log(`Name: ${map.get(sname)}`);
	}

	function create_weakmap_with_bidimensional_array(){

		// chaves precisam ser objetos:
		let sid = Symbol("id");
		let sname = Symbol("name");
		let saddress = Symbol("address");
		let sgender = Symbol("gender");
		let scompetencies = Symbol("competencies");
		let ssalary = Symbol("salary");
		let sstatus = Symbol("status");

		let map = new WeakMap([
			[sid, 123],
			[sname, "Anderson"],
			[saddress, {street: "Street Home", number: 100}],
			[sgender, "M"],
			[scompetencies, ["Programmer","Analyst"]],
			[ssalary, 1234.65],
			[sstatus, true],
		]);
		
		console.log(`Name: ${map.get(sname)}`);
	}

	create_weakmap_with_set();

	create_weakmap_with_bidimensional_array();
}

/*
12 - Crie duas funções, onde a primeira 
instancia Set (via .add() e via construtor com array) e itera com for...of e .entries() 
para exibir valores e tipos; e a segunda instancia WeakSet (com restrição a objetos e 
funções, via .add() e via construtor direto), exibindo-os no console sem utilizar 
laços de iteração ou .size.
*/

function create_set(){

	function create_set(){

		{
			let s1 = new Set();
			s1.add(1);
			s1.add(2);
			s1.add(2);
			s1.add(4);

			let s2 = new Set();
			s2.add(0);
			s2.add(1);
			s2.add(3);
			s2.add(3);
			s2.add(5);

			console.log(s1.entries());
			console.log(s2.entries());

			console.log(s1, s2);
		}

		{
			let s1 = new Set([1,2,2,4]);
			let s2 = new Set([0,1,3,3,5]);
			
			
			console.log(s1.entries());
			console.log(s2.entries());

			console.log(s1, s2);

			for(let[k,v] of s1.entries()){
				console.log(k, v, typeof v); // no Set, key e value possuem o mesmo valor.
			}
		}
	}

	function create_weakset(){

		{
			let s1 = new Set([1,2,2,4]);
			let s2 = new Set([0,1,3,3,5]);
			const ws = new WeakSet([s1, s2]); // não iteravel!

			console.log(ws.has(s1));

			for(let item of s1){
				console.log(item);
			}

			for(let[k,v] of s1.entries()){
				console.log(k, v, typeof v); // no Set, key e value possuem o mesmo valor.
			}
		}
	}

	create_set();

	create_weakset();
}

/*
13 - Crie uma função que demonstre a divisão por zero resultando em Infinity 
e utilize uma estrutura try...catch...finally para tentar acessar uma variável não 
declarada, capturando e exibindo as propriedades message, stack e name do erro no 
bloco catch, e garantindo a execução de uma mensagem de encerramento no finally.
*/

function division_numbers(){

	function division(num1, num2){
		if(num2 == 0){
			return `Division by zero error: ${num1 / num2}.`;
		}
		return num1 / num2;
	}

	let num1 = 13;
	let num2 = 10;
	console.log(division(num1, num2));

	let num3 = 13;
	let num4 = 0;
	console.log(division(num3, num4));

	try{
		console.log(variable);
	}catch(error){
		console.log(`Error: ${error}.`);
		console.log(`Name: ${error.name}.`);
		console.log(`Stack: ${error.stack}.`);
		console.log(`Message: ${error.message}.`);
	}finally{
		console.log("Execution finished.");
	}
}

/*  ESTUDAR O REGEX:
14 - Crie uma função exercise_14 com uma string de exemplo contendo valores monetários 
e demonstre o uso de RegExp aplicando .match() com padrões para espaços obrigatórios 
e opcionais, .search() para localizar índices, .replace() para substituir siglas, 
e um laço while com .exec() para extração iterativa de grupos de captura.
*/

function create_regexp(){

	let text = "R$ 400, R$500, US$ 652, R$ 700";

	// .match() - espaço obrigatório
	let regex_required_space = /R\$ (\d+)/g;

	console.log("Espaço obrigatório:");
	console.log(text.match(regex_required_space));


	// .match() - espaço opcional
	let regex_optional_space = /R\$\s?(\d+)/g;

	console.log("Espaço opcional:");
	console.log(text.match(regex_optional_space));


	// .search() - localizar índice
	let regex_search = /US\$/;

	console.log("Índice do US$:");
	console.log(text.search(regex_search));


	// .replace() - substituir sigla
	let text_replaced = text.replace(/US\$/g, "R$");

	console.log("Texto substituído:");
	console.log(text_replaced);


	// .exec() - extração iterativa com grupos de captura
	let regex_exec = /(R\$)\s?(\d+)/g;

	let result;

	while((result = regex_exec.exec(text)) !== null){
		console.log(`Sigla: ${result[1]}, Valor: ${result[2]}`);
	}
}

// Browser

/*
15 - Crie uma função que simule ou utilize a manipulação do DOM 
selecionando elementos via document.getElementById(), demonstre a diferença 
entre textContent (para textos puros e seguros) e innerHTML (para injeção e 
renderização de tags HTML), e inclua comentários sobre os riscos de segurança 
relacionados a ataques de Cross-Site Scripting (XSS) ao utilizar innerHTML 
com dados não higienizados.
*/

/*
16 - Crie uma função que demonstre a manipulação avançada do DOM 
e formulários, utilizando querySelector e querySelectorAll, alterando estilos 
e propriedades de botões, manipulando classes CSS (add, remove, contains, 
toggle, className), iterando sobre NodeList com for...of, e associando 
eventos como o onclick.
*/

/*
17 - Crie uma função que demonstre a estilização de elementos 
do DOM selecionando-os com `querySelector`, aplicando múltiplos estilos de 
uma vez via atribuição direta de string (`.style`) no primeiro elemento, 
e estilizando propriedades individuais em notação `camelCase` 
(como `backgroundColor`, `borderRadius`, etc.) no segundo 
elemento.
*/

/*
18 - Crie uma função que demonstre a criação dinâmica de nós no 
DOM utilizando querySelectorAll, createElement, appendChild, manipulação de 
atributos com setAttribute e removeAttribute, além de estilizá-los e 
aninhá-los em diferentes linhas do documento.
*/

/*
19 - Crie uma função que demonstre o uso de Data Attributes 
(data-*) e da propriedade .dataset no DOM, criando atributos personalizados 
via .setAttribute(), lendo-os via notação de ponto, e iterando sobre suas 
chaves e valores com Object.entries() e Object.values().
*/

/*
20 - Crie uma função que demonstre a manipulação de eventos no 
DOM comparando a propriedade .onclick com o método .addEventListener(), 
implemente eventos de mouse (mouseenter e mouseleave) para alternar classes 
de estado em um elemento (.inactive e .active), controle estados dinâmicos 
em botões, e utilize temporizadores (setTimeout e setInterval) para disparar 
eventos de forma programática.
*/


/*
21 - Crie uma função que demonstre a propagação de eventos no DOM 
com bubbling e o uso de event.stopPropagation(), o gerenciamento de eventos de 
foco (focusin, focusout e focus), e o carregamento dinâmico de rotinas e 
ouvintes utilizando mouseenter e removeEventListener().
*/


/* 
22 - Referente ao estudo sobre jQuery 
*/


/*
23 - Crie um programa em JavaScript que demonstre o uso de módulos em Node.js, 
abrangendo a diferença conceitual e prática entre CommonJS (module.exports e require) 
dentro da função e ECMAScript Modules (export e import restrito 
ao escopo global) dentro da função exercise_23_2, além de destacar as 
boas práticas de extensão (.js vs .mjs).
*/


/*
24 - Crie uma função que demonstre o carregamento de 
Módulos ECMAScript (ESM) no navegador, abordando restrições de CORS 
ao usar o protocolo file://, a necessidade de um 
servidor local (http:// ou https://), o uso obrigatório do atributo 
type="module", o isolamento de escopo e boas práticas de extensão e 
gerenciamento de cache.
*/


/*
25 - Crie uma função que demonstre requisições HTTP assíncronas no 
navegador através de três rotinas: a API tradicional XMLHttpRequest (xmlhttprequest_exec), 
a moderna API Fetch baseada em Promises (fetch_exec), e a 
abordagem com Async/Await (async_await_exec), abordando métodos GET/POST, 
prevenção de cache, tratamento de erros e restrições de ambiente 
(como a ausência nativa do XMLHttpRequest no Node.js).
*/