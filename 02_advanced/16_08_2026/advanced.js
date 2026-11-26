"use strict";

/*
1 - Crie um objeto person com as propriedades id, name, birthday, 
gender e status; exiba-o no console; percorra suas chaves e valores 
usando for...in; e tente iterar sobre ele com for...of dentro de 
um bloco try...catch para tratar o erro resultante.
*/

function create_person_object(){

	let person = {
		id: 123,
		name: "Anderson",
		birthday: new Date(2000,0,1).toLocaleDateString(),
		gender: 'M',
		status: true,
	};

	console.log(person);

	// iterando sobre os indices:
	for(let d in person){
		console.log(d);
	}

	try{
		// iterando sobre os valores:
		for(let d of person){				//error!
			console.log(d);
		}
	}catch(error){
		console.log(`${error.name}: ${error.message}`)
	}

	try{
		// iterando sobre os indice/valor:
		for(let[k,v] of person){ 			//error!
			console.log(`${k}: ${v}`); 
		}
	}catch(error){
		console.log(`${error.name}: ${error.message}`)
	}

	for(let k of Object.keys(person)){				
		console.log(k);
	}

	for(let v of Object.values(person)){				
		console.log(v);
	}

	for(let[k,v] of Object.entries(person)){ 			
		console.log(`${k}: ${v}`); 
	}

	try{
		// iterando sobre os indice/valor com forEach:
		person.forEach((v,k) => {
			console.log(`${k}: ${v}`); 
		});
	}catch(error){
		console.log(`${error.name}: ${error.message}`)
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

function exercise_02_1(){

	let sid = Symbol("id");
	let person = {
		[sid]: 123,
		name: "Anderson",
		show_data: function(){
			console.log(`ID: ${this[sid]}, name: ${this.name}`);
		}
	};

	console.log(person);
	person.show_data();

	for(let i in person){
		console.log(i);
		/*
			name                                                                                      
			show_data 
			*Há a omissão do [sid] (Symbol) no for..in..
		*/
	}

	for(let v of Object.values(person)){
		console.log(v);

		/*
			Anderson                                                                                      
			[Function: show_data]  
			*Há a omissão do [sid] (Symbol) no for..in..
		*/
	}
}

function exercise_02_2(){

	let obj = {
		message: "Hello, World!",
	}

	function show_message(){
		console.log(this.message);
	}

	{
		obj.show_message = show_message;
		obj.show_message();
	}

	{
		show_message.call(obj);
	}

	{
		show_message.apply(obj);
	}

	{
		let bound = show_message.bind(obj);
		bound();
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

function create_class(){

	class Person{

		static count = 0;

		constructor(id=0, name="unknown"){
			this.id = id;
			this.name = name;
			Person.count++;
		}

		show_data(){
			console.log(`ID: ${this.id}, name: ${this.name}, status: ${this.status}`);
		}
	}

	function set_name(name){
		this.name = name;
	}

	function get_name(name){
		return this.name;
	}

	let p = new Person(1, "Anderson");

	console.log(p);

	Object.prototype.set_name = set_name;
	Object.prototype.get_name = get_name;

	p.set_name("Anderson C.");
	console.log(`Name: ${p.get_name()}`);

	Object.prototype.status = true;

	p.show_data();

	console.log(`Count: ${Person.count}`);

	for(let i = 0; i < 9; i++){
		new Person();
	}

	console.log(`Count: ${Person.count}`);
}



/*
4 - Crie uma função construtora f que receba uma propriedade band e a atribua 
via this, adicione o método get_band e a propriedade padrão country ao seu 
prototype, instancie quatro objetos, sobrescreva a propriedade country 
em apenas um deles para demonstrar o sombreamento de propriedades (shadowing), 
e exiba o nome da banda e o país de cada instância no console.
*/

function create_object_constructor(){

	
	// Alternativa ao uso de classes;

	let f = function(band){
		this.band = band;
	}

	// Atenção: uso do "new aqui"!

	let bd1 = new f("Oasis");
	let bd2 = new f("Oingo Boingo");
	let bd4 = new f("Alice Chains");
	let bd3 = new f("Bon Jovi");

	console.log(bd1, bd2, bd3, bd4);

	let get_band = function(){
		return this.band;
	}

	let get_country = function(){
		return this.country;
	}

	f.prototype.get_band = get_band;

	f.prototype.get_country = get_country;

	function show_bands(){

		console.log(`Band: ${bd1.get_band()}, country: ${bd1.get_country()}`);
		console.log(`Band: ${bd2.get_band()}, country: ${bd2.get_country()}`);
		console.log(`Band: ${bd3.get_band()}, country: ${bd3.get_country()}`);
		console.log(`Band: ${bd4.get_band()}, country: ${bd4.get_country()}`);
	}

	show_bands();

	f.prototype.country = "USA";

	show_bands();

	bd1.country = "England!";

	show_bands();
}




/*
5 - Crie uma classe MyClass com um construtor que aciona métodos de instância 
e estáticos, implemente o método de instância instance_method, métodos 
estáticos static_method e static_callback demonstrando o contexto correto 
do this e a restrição de acesso a instâncias, e realize testes instanciando 
a classe e chamando seus métodos externamente.
*/

function create_class_methods(){

	class Class{

		constructor(){
			console.log(`constructor!`);
			this.instance_method("constructor");
			Class.static_method("constructor");
		}

		instance_method(name){

			console.log(`${name} call instance_method.`);

			try{
				this.static_method("instance_method");
			}catch(error){
				console.log(`${error.name}: ${error.message}`);
			}

			/*
				Mecanismos de chamada cruzada corretos (como o uso de 
				this.constructor.static_method ou o nome direto da classe 
				Class.static_method dentro de métodos de 
				instância).
			*/

			this.constructor.static_method("instance_method");

			Class.static_method("instance_method");
		}

		static static_method(name){
			console.log(`${name} call static_method.`);

			try{
				this.instance_method("static_method");
			}catch(error){
				console.log(`${error.name}: ${error.message}`);
			}
			
			this.static_callback("static_method");
		}

		static static_callback(name){
			console.log(`${name} call static_callback.`);

			// this.static_method("static_callback"); // funciona mas da recursão!
		}
	}

	let obj = new Class();

	obj.instance_method("external");

	try{
		obj.static_method("external");
	}catch(error){
		console.log(`${error.name}: ${error.message}`);
	}

	Class.static_method("external");

	/*
		constructor!                                                                                                                                       
		constructor call instance_method.                                                                                                                  
		TypeError: this.static_method is not a function                                                                                                    
		instance_method call static_method.                                                                                                                
		TypeError: this.instance_method is not a function                                                                                                  
		static_method call static_callback.                                                                                                                
		instance_method call static_method.                                                                                                                
		TypeError: this.instance_method is not a function                                                                                                  
		static_method call static_callback.                                                                                                                
		constructor call static_method.                                                                                                                    
		TypeError: this.instance_method is not a function                                                                                                  
		static_method call static_callback.                                                                                                                
		external call instance_method.                                                                                                                     
		TypeError: this.static_method is not a function                                                                                                    
		instance_method call static_method.                                                                                                                
		TypeError: this.instance_method is not a function                                                                                                  
		static_method call static_callback.                                                                                                                
		instance_method call static_method.                                                                                                                
		TypeError: this.instance_method is not a function                                                                                                  
		static_method call static_callback.                                                                                                                
		TypeError: obj.static_method is not a function                                                                                                     
		external call static_method.                                                                                                                       
		TypeError: this.instance_method is not a function                                                                                                  
		static_method call static_callback. 
	*/
}

create_class_methods();

/*
6 - Crie uma classe base Person com construtor para id e name e um método get_data, 
e uma classe derivada NaturalPerson que estenda Person, reutilize o construtor 
com super, adicione uma propriedade cpf, sobrescreva o método get_data usando 
super.get_data() para concatenar o CPF, e teste instanciando a classe e exibindo 
o resultado no console. Crie uma versão com campos encapsulados (privados e protected).
*/

function inheritance_class(){

	class Person{
		constructor(id, name){
			this.id = id;
			this.name = name;
		}

		get_data(){
			return `ID: ${this.id}, name: ${this.name}`;
		}
	}

	class NaturalPerson extends Person{
		constructor(id, name, cpf){
			super(id, name);
			this.cpf = cpf;
		}

		get_data(){
			return `${super.get_data()}, CPF: ${this.cpf}`;
		}
	}

	let n = new NaturalPerson(1, "Anderson", 65478943212);
	console.log(n.get_data());
}

inheritance_class();

function inheritance_class_with_encapsuling(){

	class Person{

		// declarando protected attributes:
		_id;
		_name;

		/*
			Se um campo for declarado como estritamente privado 
			(#id ou #name) na classe Person, a classe derivada 
			NaturalPerson não conseguirá acessá-lo de forma direta 
			(ou seja, fazendo this.#id ou this.#name dentro de 
			NaturalPerson gerará um erro de sintaxe).
		*/

		constructor(id, name){
			this._id = id;
			this._name = name;
		}

		get_data(){
			return `ID: ${this._id}, name: ${this._name}`;
		}
	}

	class NaturalPerson extends Person{

		// declarando protected attributes:
		#cpf;

		constructor(id, name, cpf){
			super(id, name);
			this.#cpf = cpf;
		}

		get_data(){
			return `${super.get_data()}, CPF: ${this.#cpf}`;
		}
	}

	let n = new NaturalPerson(1, "Anderson", 65478943212);
	console.log(n.get_data());
}

inheritance_class_with_encapsuling();


/*
7 - Crie duas funções, exercise_07_1 e exercise_07_2, onde a primeira define 
herança entre objetos literais usando __proto__ para que natural_person herde 
de person e acesse propriedades e métodos, e a segunda demonstra a herança inline, 
a sobrescrita de método chamando o pai via 
Object.getPrototypeOf(this).get_data.call(this) para preservar o contexto do 
this, além de referenciar propriedades do pai e exibir os resultados
no console.
*/

function exercise_07_1(){

	let person = {
		id: 123,
		name: "Anderson",
	};

	let natural_person = {
		cpf: "65478943215",
		show_data: function(){
			return `ID: ${this.id}, name: ${this.name}, CPF: ${this.cpf}`;
		},
	};

	natural_person.__proto__ = person;

	console.log(natural_person.show_data());
}


function exercise_07_2(){

	let person = {
		id: 123,
		name: "Anderson",
		get_data: function(){
			return `ID: ${this.id}, name: ${this.name}`;
		},
	};

	let natural_person = {
		cpf: "65478943215",
		get_data: function(){
			return `${Object.getPrototypeOf(this).get_data.call(this)}, CPF: ${this.cpf}`;
		},
		__proto__: person, // inline!
	};

	console.log(natural_person.get_data());
}

exercise_07_1();
exercise_07_2();

/*
8 - Crie uma classe base Parent com construtor para x, y e title, e um método sum();
e uma classe derivada Child que estenda Parent, reutilize o construtor com super(x, y), 
sobrescreva a propriedade title e o método sum() utilizando super.sum() para 
reaproveitar a lógica da adição somada a z; por fim, instancie e teste ambas 
as classes.
*/

function create_class_02(){

	class Parent{

		constructor(x,y,title){
			this.x = x;
			this.y = y;
			this.title = title;
		}

		sum(){
			return this.x + this.y;
		}
	}

	class Child extends Parent{

		constructor(x,y,z){
			super(x,y, "parent class!");
			this.z = z;
			this.title = "child class!";
		}

		sum(){
			return super.sum() + this.z;
		}
	}

	let c = new Child(1,2,4);
	console.log(c.sum());
	console.log(c.title);
	let p = new Parent(1,2);
	console.log(p.sum());
	console.log(p.title);
}

create_class_02();


/*
9 - Crie duas funções, exercise_09_1 e exercise_09_2, onde a primeira instancia um Map, 
adiciona diferentes tipos de dados usando .set(), exibe o tamanho com .size, 
recupera um valor com .get(), itera com for...of, e testa a inclusão de uma chave
Symbol com tratamento de erro em try...catch; e a segunda demonstra a inicialização 
alternativa passando um array bidimensional diretamente no construtor new Map([...]), 
iterando e imprimindo seus elementos.
*/

function exercise_09_1(){

	const map = new Map();
	map.set("id", 123);
	map.set("name", "Anderson");
	map.set("birthday", new Date(2000,0,1,10,30,20).toLocaleDateString());
	map.set("gender", 'M');
	map.set("status", true);
	map.set("competencies", ["programmer", "analyst"]);

	// size:
	console.log(`Size: ${map.size}`);

	// get:
	console.log(`Name: ${map.get("name")}`);

	let stest = Symbol("test");
	map.set(stest, "something!");
	
	// only values
	for(let v of map){
		console.log(v);
	}

	// key/value
	try{
		for(let[k,v] of map){
			console.log(`${k}: ${v}`);
		}

	}catch(error){
		console.log(`${error.name}: ${error.message}`);

		map.delete(stest); // removendo o symbol

		// novamente iterando, porem, sem o symbol

		for(let[k,v] of map){
			console.log(`${k}: ${v}`);
		}
	}
}

exercise_09_1();

function exercise_09_2(){

	const map = new Map([
		["id", 123],
		["name", "Anderson"],
		["birthday", new Date(2000,0,1,10,30,20).toLocaleDateString()],
		["gender", 'M'],
		["status", true],
		["competencies", ["programmer", "analyst"]],
	]);
	
	// size:
	console.log(`Size: ${map.size}`);

	// get:
	console.log(`Name: ${map.get("name")}`);

	let stest = Symbol("test");
	map.set(stest, "something!");
	
	// only values
	for(let v of map){
		console.log(v);
	}

	// key/value
	try{
		for(let[k,v] of map){
			console.log(`${k}: ${v}`);
		}

	}catch(error){
		console.log(`${error.name}: ${error.message}`);

		map.delete(stest); // removendo o symbol

		// novamente iterando, porem, sem o symbol

		for(let[k,v] of map){
			console.log(`${k}: ${v}`);
		}
	}
}

exercise_09_2();

/*
10 - Crie uma função exercise_10 que declare um objeto person, exiba-o no console, 
remova sua referência atribuindo null para torná-lo elegível ao garbage collector, 
e utilize um bloco try...catch para tentar acessar sua propriedade e capturar 
o erro resultante.
*/

function garbage_collection_exec(){

	let person = {
		name: "Anderson",
	};

	console.log(`Object: ${person}`);
	console.log(`Name..: ${person.name}`);

	person = null;

	try{
		console.log(`Object: ${person}`); 
		console.log(`Name..: ${person.name}`); // tentando acessar a propriedade.

	}catch(error){
		console.log(`${error.name}: ${error.message}`);
	}
}

garbage_collection_exec();

/*
11 - Crie uma função exercise_11 que declare múltiplos objetos para servirem de chaves, 
instancie dois WeakMap (map1 via .set() e map2 via array bidimensional no construtor), 
utilize métodos como .get() para recuperar e executar valores (como funções), 
e reforce as características do WeakMap quanto à exigência de chaves de tipo 
objeto e à ausência de iterabilidade.
*/

function create_weakmap_01(){

	let obj1 = {id:1,};
	let obj2 = {id:2,};
	let obj3 = {id:3,};
	let obj4 = {id:4,};
	let obj5 = {id:5,};
	let obj6 = {id:6,};

	const wmap = new WeakMap();
	wmap.set(obj1, "Anderson");
	wmap.set(obj2, "Carmen");
	wmap.set(obj3, "Alice");
	wmap.set(obj4, "Tiffany");
	wmap.set(obj5, "Lucy");
	wmap.set(obj6, "Sonya");

	// size:
	console.log(`Size: ${wmap.size}`);

	// get:
	let obj = obj1;
	console.log(`ID: ${obj.id}, Name: ${wmap.get(obj)}`);

	try{
		for(let v of wmap){
			console.log(v);
		}

	}catch(error){
		console.log(`${error.name}: ${error.message}`);
	}
}

create_weakmap_01();

function create_weakmap_02(){

	let obj1 = {id:1,};
	let obj2 = {id:2,};
	let obj3 = {id:3,};
	let obj4 = {id:4,};
	let obj5 = {id:5,};
	let obj6 = {id:6,};

	const wmap = new WeakMap([

		[obj1, "Anderson"],
		[obj2, "Carmen"],
		[obj3, "Alice"],
		[obj4, "Tiffany"],
		[obj5, "Lucy"],
		[obj6, "Sonya"],

	]);

	// size:
	console.log(`Size: ${wmap.size}`);

	// get:
	let obj = obj1;
	console.log(`ID: ${obj.id}, Name: ${wmap.get(obj)}`);

	try{
		for(let v of wmap){
			console.log(v);
		}

	}catch(error){
		console.log(`${error.name}: ${error.message}`);
	}
}

create_weakmap_02();

/*
12 - Crie duas funções, exercise_12_1 e exercise_12_2, onde a primeira 
instancia Set (via .add() e via construtor com array) e itera com for...of e .entries() 
para exibir valores e tipos; e a segunda instancia WeakSet (com restrição a objetos e 
funções, via .add() e via construtor direto), exibindo-os no console sem utilizar 
laços de iteração ou .size.
*/

function exercise_12_1(){

	const set1 = new Set();
	set1.add(123);
	set1.add("Anderson");
	set1.add(new Date(2000,0,1,10,30,20).toLocaleDateString());
	set1.add('M');
	set1.add(true);
	set1.add(["programmer", "analyst"]);

	for(let i in set1){
		console.log(`${i}: ${set[i]}`);
	}

	for(let v of set1){
		console.log(v);
	}

	for(let k of set1.keys()){
		console.log(`${k}`);
	}

	for(let v of set1.values()){
		console.log(`${v}`);
	}

	for(let [k] of Object.keys(set1)){
		console.log(`${k}`);
	}

	for(let [v] of Object.values(set1)){
		console.log(`${v}`);
	}

	for(let [k,v] of set1.entries()){
		console.log(`${k}: ${v}`);
	}

	for(let [k,v] of Object.entries(set1)){
		console.log(`${k}: ${v}`);
	}

	const set2 = new Set([
		123,
		"Anderson",
		new Date(2000,0,1,10,30,20).toLocaleDateString(),
		'M',
		true,
		["programmer", "analyst"],
	]);

	console.log(set2);

	for(let v of set2){
		console.log(`${v}`);
	}
}

exercise_12_1();

function exercise_12_2(){

	let symbol = Symbol("data");
	let obj = {id: 123};
	let fn = function(){console.log("Hello, World!")};
	let date = new Date(2000,0,1,10,30,20);
	let array = new Array([1,2,3]);

	const wset1 = new WeakSet();
	wset1.add(symbol);
	wset1.add(obj);
	wset1.add(fn);
	wset1.add(date);
	wset1.add(array);
	
	console.log(wset1);

	console.log(wset1.has(fn));

	const wset2 = new Set([
		symbol,
		obj,
		fn,
		date,
		array,
	]);

	/*
		Diferentemente do weakmap, você não consegue extrair uma função 
		de dentro de um WeakSet para executá-la.

	*/
	
	/*
		Resumo:
		Set aceita qualquer tipo de dado (primitivos e objetos).

		WeakSet aceita estritamente objetos e funções, e não possui 
		propriedades como .size nem métodos de iteração (como for...of), 
		exatamente como o enunciado orientou!
	*/
}

exercise_12_2();

/*
13 - Crie uma função try_except_finally_execution que demonstre a divisão por 
zero resultando em Infinity e utilize uma estrutura try...catch...finally para 
tentar acessar uma variável não declarada, capturando e exibindo as propriedades 
message, stack e name do erro no bloco catch, e garantindo a execução de uma 
mensagem de encerramento no finally.
*/

function try_except_finally_execution(){

	let num1 = 10;
	let num2 = 0;
	console.log(num1 / num2);

	// segundo try..catch..finally
	//let variable = "Hello, World!";
	try{
		console.log(variable); // Hello, World! 
	}catch(error){
		console.log(`${error.name}: ${error.message}`); // TypeError: Cannot read properties of null (reading 'message')    
		console.log(`${error.stack}`);
	}finally{
		console.log("finished!");
	}

	// segundo try..catch..finally
	try{
		console.log(obj.message); // Hello, World! 
		delete obj.message;
		console.log(obj); // {}
		obj = null;
		console.log(obj.message);

	}catch(error){
		console.log(`${error.name}: ${error.message}`); // TypeError: Cannot read properties of null (reading 'message')    
		console.log(`${error.stack}`);
	}finally{
		console.log("finished!");
	}
}

try_except_finally_execution();

/*
14 - Crie uma função exercise_14 com uma string de exemplo contendo valores monetários 
e demonstre o uso de RegExp aplicando .match() com padrões para espaços obrigatórios 
e opcionais, .search() para localizar índices, .replace() para substituir siglas, 
e um laço while com .exec() para extração iterativa de grupos de captura.
*/

function regex(){

	const salesReport = `### Sales and Budget Report

		At the close of the last quarter, the company recorded 
		significant revenue across several sectors. 
		The best-selling product reached the mark of R$ 1,500.75 
		in physical stores, while in e-commerce the amount reached 
		R$1,500.75 with no change to the calculation base.

		For customers registered in the loyalty plan, special 
		discount coupons were made available. A customer purchased 
		a promotional package for only R$ 89, saving compared 
		to the list price which was R$150.00.

		In addition, new investments were allocated for the 
		next semester:
		* Network infrastructure: R$ 45000
		* Software licensing: R$12350
		* Team training: R$ 3200
		* Preventive maintenance: R$850

		The projected final balance for the next financial statement 
		is approximately R$1250000, consolidating the annual 
		goal stipulated by the board of directors.`
	;
	console.log(salesReport);

	{
		let pattern = /R\$ (\d+)/g;
		console.log(salesReport.match(pattern));
	}

	{
		let pattern = /R\$\s?(\d+)/g;
		console.log(salesReport.match(pattern));
	}

	{
		let pattern = /R\$ (\d+)/g;
		let regex = new RegExp(pattern)
		console.log(salesReport.match(regex));
	}

	{
		let pattern = /R\$\s?(\d+)/g;
		let regex = new RegExp(pattern)
		console.log(salesReport.match(regex));
	}

	{
		/*
			O método .search() encontra apenas a primeira ocorrência 
			e retorna o índice (a posição numérica) em que ela 
			começa.
		*/
		let pattern = /R\$\s?12350/g;
		console.log(salesReport.search(pattern)); // position: 660
	}

	{
		let pattern = /R\$\s?/g;
		console.log(salesReport.replace(pattern, "US$")); // R$ to U$S
	}

	{
		let pattern = /R\$\s?12350/g;
		let m;

		while((m = pattern.exec(salesReport)) !== null){
			console.log(m[0]);
		}
	}
}

regex();

// via browser

/*
15 - Simule ou utilize a manipulação do DOM selecionando elementos 
via document.getElementById(), demonstre a diferença entre textContent 
(para textos puros e seguros) e innerHTML (para injeção e renderização 
de tags HTML).
*/



/*
16 - Demonstre a manipulação avançada do DOM e formulários, utilizando 
querySelector e querySelectorAll, alterando estilos 
e propriedades de botões, manipulando classes CSS (add, remove, contains, 
toggle, className), iterando sobre NodeList com for...of, e associando 
eventos como o onclick.
*/


/*
17 - Crie uma função `exercise_17` que demonstre a estilização de elementos 
do DOM selecionando-os com `querySelector`, aplicando múltiplos estilos de 
uma vez via atribuição direta de string (`.style`) no primeiro elemento, 
e estilizando propriedades individuais em notação `camelCase` 
(como `backgroundColor`, `borderRadius`, etc.) no segundo 
elemento.
*/

/*
18 - Demonstre a criação dinâmica de nós no 
DOM utilizando querySelectorAll, createElement, appendChild, manipulação de 
atributos com setAttribute e removeAttribute, além de estilizá-los e 
aninhá-los em diferentes linhas do documento.
*/

/*
19 - Demonstre o uso de Data Attributes 
(data-*) e da propriedade .dataset no DOM, criando atributos personalizados 
via .setAttribute(), lendo-os via notação de ponto, e iterando sobre suas 
chaves e valores com Object.entries() e Object.values().
*/

// PAREI AQUI NO 19


/*
20 - Demonstre a manipulação de eventos no 
DOM comparando a propriedade .onclick com o método .addEventListener(), 
implemente eventos de mouse (mouseenter e mouseleave) para alternar classes 
de estado em um elemento (.inactive e .active), controle estados dinâmicos 
em botões, e utilize temporizadores (setTimeout e setInterval) para disparar 
eventos de forma programática.
*/


/*
21 - Crie uma função exercise_21 que demonstre a propagação de eventos no DOM 
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
dentro da função exercise_23_1 e ECMAScript Modules (export e import restrito 
ao escopo global) dentro da função exercise_23_2, além de destacar as 
boas práticas de extensão (.js vs .mjs).
*/

function exercise_23_1_1(){
	
	const {name, greeting} = require("./modules/module-cjs.js");
	console.log(greeting(name));
}

exercise_23_1_1();

function exercise_23_1_2(){
	// executar o arquivo: exercise_23_1_2.js
}

exercise_23_1_2();

/*
24 - Crie uma função exercise_24 que demonstre o carregamento de 
Módulos ECMAScript (ESM) no navegador, abordando restrições de CORS 
ao usar o protocolo file://, a necessidade de um 
servidor local (http:// ou https://), o uso obrigatório do atributo 
type="module", o isolamento de escopo e boas práticas de extensão e 
gerenciamento de cache.
*/


/*
25 - Crie uma função exercise_25 que demonstre requisições HTTP assíncronas no 
navegador através de três rotinas: a API tradicional XMLHttpRequest (xmlhttprequest_exec), 
a moderna API Fetch baseada em Promises (fetch_exec), e a 
abordagem com Async/Await (async_await_exec), abordando métodos GET/POST, 
prevenção de cache, tratamento de erros e restrições de ambiente 
(como a ausência nativa do XMLHttpRequest no Node.js).
*/

/*
	create_person_object();
	exercise_02_1();
	exercise_02_2();
	create_class();
	create_object_constructor();
*/