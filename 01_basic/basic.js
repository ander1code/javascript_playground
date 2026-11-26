

/*Lista de Exercícios em JavaScript*/

/* 1. Demonstre a diferença no uso de variáveis e escopo (var e let) 
com o modo estrito habilitado ("use strict") e desabilitado. */

	/* 
		"use strict": serve para ativar o modo estrito (strict mode) no JavaScript, 
		transformando erros que antes eram silenciosos em exceções visíveis 
		e proibindo práticas inseguras ou problemáticas 
		da linguagem.
	*/

function no_use_strict()
{
	{
		variable1 = "Hello, World!";
	}

	console.log(variable1);
}


function use_strict()
{
	"use strict";

	{
		variable2 = "Hello, World!";
	}

	console.log(variable2);
}

/* 2. Execute e explique operações matemáticas de soma e multiplicação 
entre um número e uma string numérica (número entre aspas simples), 
bem como entre um número e uma string alfanumérica. */

function operation_alpha()
{
	let result1 = 10 * 'A';
	console.log(result1);
	let result2 = 10 * '3';
	console.log(result2);
	let result3 = 10 * Number('45');
	console.log(result3);

	//let result4 = 10 * Number("45");
	//console.log(result4);

	let result5 = '10' * '4';
	console.log(result5);

	let result6 = 10 + 'A';
	console.log(result6);
}


/* 3. Demonstre o comportamento da palavra-chave this em funções com 
e sem o uso de "use strict". */

function this_without_use_strict()
{
	console.log(this);
}

function this_with_use_strict()
{
	"use strict";
	console.log(this); // undefined 
}

/* 4. Implemente o uso do tipo primitivo Symbol utilizando suas duas 
formas de declaração (Symbol() e Symbol.for()). */

function create_symbol()
{
	function symbol_execution_01()
	{
		let sid = Symbol("id");
		let sname = Symbol("name");
		let saddress = Symbol("address");
		let scompetencies = Symbol("competencies");
		let person = {};

		person[sid] = 123;
		person[sname] = "Anderson";
		person[saddress] = {
			street: "Street Home",
			number: 100
		};
		person[scompetencies] = ["Programmer", "DBA"];
		console.log(person);
	}

	function symbol_execution_02()
	{
		let sid = Symbol("id");
		let sname = Symbol("name");
		let saddress = Symbol("address");
		let scompetencies = Symbol("competencies");
		
		let person = {
			[sid]: 123,
			[sname]: "Anderson",
			[saddress]: {
				street: "Street Home",
				number: 100
			},
			[scompetencies]: ["Programmer", "DBA"],
		};

		// Symbol.for("<FIELD>");
		console.log(person);
	    let status1 = Symbol.for("status");
	    let status2 = Symbol.for("status");
	    console.log(status1);
	    console.log(status2);
	    console.log(status1 === status2); // true
	}

	symbol_execution_01();
	symbol_execution_02();
}

/* 5. Declare um array unidimensional e um multidimensional e exiba 
o tamanho (length) de cada um. */

function create_array()
{
	let vetor = [5,6,4,7,3,8,2,9,1,0];
	console.log(vetor.length); // 10

	let matrix = [[0,1,2],[3],[4,5,6,7],[8],[9]];
	console.log(matrix.length); // 5
}

/* 6. Escreva um código que utilize Expressões Regulares (REGEX) em 
JavaScript e demonstre o uso do método match(). */

function create_regex()
{
	let text = "A Djash djash R$50, daskhd asj R$ 1000, -R$700; Asjhd js R$ 2000, R$699";

	let pattern1 = /R\$ (\d+)/g;

	console.log(text.match(pattern1));

	let pattern2 = /R\$\s?(\d+)/g;

	console.log(text.match(pattern2));
}

/* 7. Desenvolva uma solução que utilize a classe Map e seus principais 
métodos disponíveis. Explique qual é a diferença/relação entre um Map 
e um objeto simples (ex: const obj = {};). */

function create_map()
{
	/*
		A principal diferença é que Map é uma estrutura de dados própria 
		para armazenar pares chave → valor, enquanto um objeto ({}) 
		é um objeto JavaScript que também pode ser usado para armazenar 
		propriedades.
	*/

	let person_map = new Map();
	person_map.set("id", 123);
	person_map.set("name", "Anderson");
	person_map.set("address", {
		street: "Street Home",
		number: 100
	});
	person_map.set("competencies", ["Programmer", "DBA"]);
	console.log(person_map);

	// keys(), values(), entries() e

	console.log(person_map.size); // property, not function!
	console.log(`Name: ${person_map.get("name")}`);
	console.log(person_map.get("status"), person_map.has("status"));
	person_map.set("something", "data");
	console.log(person_map);
	person_map.delete("something");
	console.log(person_map);

	for(let k of person_map.keys())
	{
		console.log(k);
	}

	for(let v of person_map.values())
	{
		console.log(v);
	}

	for(let [k,v] of person_map.entries())
	{
		if(k === 'address')
		{
			console.log(v);
			continue;
		}

		if(v instanceof Array)
		{
			console.log("competencies: ");
			v.forEach((item) => {
				console.log(`- ${item}`);
			});
			continue;
		}

		console.log(`${k}: ${v}`);
	}

	person_map.clear();
	console.log(person_map); // Map(0) {}  

}

function create_object()
{
	let person_obj = {
		id: 123,
		name: "Anderson",
		address: {
			street: "Street Home",
			number: 100
		},
		competencies: ["Programmer", "DBA"]
	};

	console.log(person_obj);
}

// create_map();

// create_object();

/* 8. Crie um objeto que utilize a palavra-chave this e atribua a 
ele um método que referencie seus atributos dinamicamente. */

function using_this()
{
	let person = {
		id: 123,
		name: "Anderson",
	};

	function method(){
		console.log(`ID: ${this.id}, Name: ${this.name}`);
	}

	person.show_data = method;

	person.show_data();
}

/* 9. Desenvolva um código que utilize a classe Set e explore 
seus métodos disponíveis. */

function create_set()
{
	/*
	add()	Adiciona um valor	set.add(10)
	has()	Verifica se existe	set.has(10)
	delete()	Remove um valor	set.delete(10)
	clear()	Remove todos os valores	set.clear()
	values()	Retorna um iterador com os valores	set.values()
	keys()	Retorna um iterador dos valores	set.keys()
	entries()	Retorna [valor, valor]	set.entries()
	forEach()	Percorre os valores	set.forEach(...)
	*/

	let s1 = new Set([1,1,2,6,7]);
	let s2 = new Set([2,2,3,4,9]);

	// adding...
	s1.add(9);
	s2.add(6);

	// has...
	console.log(s1.has(9));
	console.log(s2.has(5));

	// delete
	s1.add(100);
	console.log(s1);
	s1.delete(100);
	console.log(s1);

	// values
	console.log(s1.values()); // [Set Iterator] { 1, 2, 6, 7, 9 }  

	// keys
	console.log(s1.keys());   // [Set Iterator] { 1, 2, 6, 7, 9 }  

	// entries
	for(let[k, v] of s1.entries())
	{
		console.log(`${k}: ${v}`);
	}

	// forEach
	s2.forEach((item) => console.log(item));

	// clear
	s1.clear();
	console.log(s1);
	s2.clear();
	console.log(s2);
}

/* 10. Declare um array e liste seus itens utilizando os diferentes 
tipos de laços de repetição disponíveis em JS (for...in, for...of 
e forEach). */

function using_for()
{
	let vetor = [5,6,4,7,3,8,2,9,1,0];
	
	console.log("\nfor...in:");
	for(let n in vetor)
	{
		console.log(n); // index
	}

	console.log("\nfor...of:");
	for(let n of vetor)
	{
		console.log(n); // values
	}

	console.log("\nforEach:");
	vetor.forEach((n) => console.log(n)); // values

	vetor.forEach((v, k) => console.log(k, v)); // keyPair/values
}

/* 11. Demonstre a diferença prática no uso dos operadores de 
igualdade ampla (==) e igualdade estrita (===). */

function equal_operations()
{
	let num1 = 3;
	let num2 = "3";

	// Igualdade ampla: permite conversão de tipos
	console.log(num1 == num2); // true

	// Igualdade estrita: compara valor e tipo
	console.log(num1 === num2); // false
}

/* 12. Escreva exemplos práticos que demonstrem o uso dos 
operadores bitwise:
a) | (OR)
b) & (AND)
c) ~ (NOT)
d) ^ (XOR) */

function bitwise_operations()
{
	// B = 8 4 2 1
	// 5 = 0 1 0 1
	// 3 = 0 0 1 1
	// R = 0 1 1 1 = 7

	let b1 = 5;
	let b2 = 3;

	// B = 8 4 2 1
	// 5 = 0 1 0 1
	// 3 = 0 0 1 1
	// R = 0 1 1 1 = 7
	console.log(b1 | b2);

	// B = 8 4 2 1
	// 5 = 0 1 0 1
	// 3 = 0 0 1 1
	// R = 0 0 0 1 = 1
	console.log(b1 & b2);

	// NOT:
	// Inverte os bits.
	// ~5 = -6
	// ~3 = -4
	console.log(~b1, ~b2);

	// B = 8 4 2 1
	// 5 = 0 1 0 1
	// 3 = 0 0 1 1
	// R = 0 1 1 0 = 6
	console.log(b1 ^ b2); 
}

/* 13. Escreva exemplos práticos que demonstrem o uso dos 
operadores de deslocamento bitwise (bitwise shift):
a) << (Left Shift)
b) >> (Right Shift) */

function bitwise_shift()
{
	let num1 = 5;
	let num2 = 4;

	console.log(num1 << num2); // 80
	console.log(num1 >> num2); // 0
	// O >> desloca os bits para a direita.
	// 5 em binário: 0101
	// 0101 >> 4 = 0000
	// Portanto, 5 >> 4 resulta em 0.
}

/* 14. Demonstre a atribuição via desestruturação (destructuring) 
de um vetor de dados para um vetor de variáveis/letras. */

function destructuring_vetor()
{
	function destruct_vetor([a,b,c,d,e])
	{
		console.log(a,b,c,d,e);
	}
	destruct_vetor([1,2,3,4,5]);

	function destruct_vetor([a,b,c,d,e])
	{
		console.log(a,b,c,d,e);
	}
	destruct_vetor([1,2,3]);

	/* ERROR!
	function destruct_vetor([a,b,c])
	{
		console.log(a,b,c,d,e);
	}
	destruct_vetor([1,2,3,4,5]);
	*/
}

/* 15. Demonstre a atribuição via desestruturação (destructuring) 
de um objeto (dicionário) de dados para variáveis/letras. */

function destructuring_object()
{
	function destruct_obj({a,b,c,d,e})
	{
		console.log(a,b,c,d,e);
	}
	destruct_obj({a:1,b:2,c:3,d:4,e:5}); // passar keyPair/Value, não só o valor;

	function destruct_obj({a,b,c,d,e})
	{
		console.log(a,b,c,d,e);
	}
	destruct_obj({a:1,b:2,c:3});

	/* 	ERROR!
	function destruct_obj({a,b,c})
	{
		console.log(a,b,c,d,e);
	}
	destruct_obj({1,2,3,4,5});
	*/
	
}

/* 16. Execute a desestruturação de um objeto para variáveis sem 
a utilização da palavra-chave let (por exemplo, utilizando 
atribuição a variáveis pré-declaradas). */

function destructuring_object_to_variable()
{
	{
		let a=1,m=5,c=-7,z=13,e=2;
		let numbers = {a:1, b:2, c:3, d:4, e:5};
		({a,b,c,d,e} = numbers);
		console.log(a,b,c,d,e);
	}

	{
		let k=9, w=8, x=7, y=6, z=5;
		let numbers = {a:1, b:2, c:3, d:4, e:5};
		({k,w,x,y,z} = numbers);
		console.log(k,w,x,y,z);
	}
}

/* 17. Realize a atribuição via desestruturação de um vetor de 
dados para um vetor de letras com quantidade de itens menor do que 
o vetor original. */

function destruct_vetor([a,b,c,d,e])
{
	console.log(a,b,c,d,e);
}

/* 18. Crie um objeto com um método para retornar seus próprios 
dados (utilizando this). Em seguida, utilize o operador delete 
para excluir um atributo e exiba o objeto novamente. */

function return_with_this()
{
	let person = {
		id: 123,
		name: "Anderson",
		get_data: function(){
			return `ID: ${this.id}, Name: ${this.name}`;
		}
	}

	console.log(person.get_data());

	delete person.get_data(); // deleting object property.

	try{
		console.log(person.get_data());
	}catch(error){
		console.log(error);
	}
}

/* 19. Crie uma classe com o método constructor e verifique seu 
tipo utilizando os operadores typeof e instanceof. */

function create_class()
{
	class Person{
		constructor(){
			console.log("object created!");
		}
	}

	let obj = new Person();
	console.log(`typeof obj: ${typeof obj}`);
	console.log(`instanceof obj: ${obj instanceof Person}`);
}

/* 20. Desenvolva uma aplicação simples utilizando a classe 
Date e explore seus principais métodos e atributos. */

function using_datatime()
{
	let date = new Date();
	console.log(date);
	console.log(Date.now());
	console.log(new Date(Date.now())); 

	let birthday = new Date(2000,4,1,10,30); 
	console.log(birthday);

	// exibitions format:
	console.log(birthday.toLocaleString()); 
	console.log(birthday.toDateString()) 
	console.log(birthday.toTimeString());
	console.log("JSON: " + birthday.toJSON());

	// BR
	console.log(birthday.toLocaleString("pt-BR")); 
	console.log(birthday.toLocaleDateString("pt-BR"));  
	console.log(birthday.toLocaleTimeString("pt-BR")); 

	// US
	console.log(birthday.toLocaleDateString("en-US")); 
	console.log(birthday.toLocaleTimeString("en-US")); 

	// ISO
	console.log(birthday.toISOString());
	console.log(birthday.getTimezoneOffset()); 

	console.log(birthday.toUTCString()); 

	console.log(typeof birthday);
	console.log(birthday instanceof Date);
}

/* 21. Instancie objetos de classes diferentes e valide-os 
utilizando os operadores typeof e instanceof. */

function check_objects(){

	let vetor = [1, "A", new Date(), true, [1,2,3], new Set().add(10), {id:123, name:"Anderson"}, 1213.55,];
	let objects = 0;
	let nactives = 0;
	for(let item of vetor){
		(typeof item === "object") ? objects++ : nactives++;
	};

	console.log(`\nobjects: ${objects} \nactives: ${nactives}`);

	objects = 0;
	nactives = 0;

	for(let item of vetor){
		(item instanceof Object) ? objects++ : nactives++;
	};

	console.log(`\nobjects: ${objects} \nactives: ${nactives}`);
}

/* 22. Demonstre a utilização da instrução break rotulada 
(labeled break statement) em JavaScript. */

function labeled_break(){
	let sum = 0;
	label: {
		for(let i = 0; i < 100; i++){
			sum+=i;
			if(i == 33)
			{
				break label;
			}
		}
	}
	console.log("finished!");
	console.log(`result = ${sum}`);
}

/* 23. Crie uma função e atribua-a a uma variável. Em seguida, 
atribua essa função como um método de um objeto. Nesse mesmo 
objeto, defina um método utilizando a sintaxe enxuta/sem 
chave (ex: invoke()). */

function object_with_invoke_function(){

	function method(){
		console.log(`ID: ${this.id}, Name: ${this.name}`);
	}

	let person = {
		id: 123,
		name: "Anderson",
		show_data: method, // Atenção: sem parentes()
		invoke(){
			console.log(`ID: ${this.id}, Name: ${this.name}`);
		}
	}

	person.show_data();
	person.invoke();
}

/* 24. Declare uma função de duas maneiras diferentes: utilizando 
a notação tradicional e a notação de função 
seta (arrow function). */

function function_declarations(){

	function common_declaration(){
		console.log("common_declaration!");
	}

	let arrow_declaration = () => {
		console.log("arrow_declaration!");
	};

	common_declaration();
	arrow_declaration();
}

/* 25. Demonstre o uso da desestruturação de argumentos de funções 
(tanto para arrays quanto para objetos). */

function destructuring_functions(){

	function destruct_array([a,b,c,d,e]){
		console.log(a,b,c,d,e);
		console.log([a,b,c,d,e]);
	}

	destruct_array([1,2,3,4,5]);

	function destruct_object({a,b,c,d,e}){
		console.log(a,b,c,d,e);
		console.log({a,b,c,d,e});
	}

	destruct_object({a:6,b:7,c:8,d:9,e:0})
}

/* 26. Crie um vetor de objetos com estruturas semelhantes 
(ex: person com id e name) e faça com que cada objeto invoque uma 
função externa (utilizando call, apply ou bind), sem atribuir 
a função diretamente ao objeto. */

function manipulate_this(){

	function show_data(){
		console.log(`ID: ${this.id}, Name: ${this.name}`);
	}

	function show_data_with_home(city, country){
		console.log(`ID: ${this.id}, Name: ${this.name}, City: ${city}, Country: ${country}`);
	}

	// call
	{
		let people = [
			{id:1, name:"Anderson"},
			{id:2, name:"Lucy"},
			{id:3, name:"Carmen"},
		];

		people.forEach((p) => {
			show_data.call(p);
		});
	}

	// apply
	{
		let person = {
			id: 123, 
			name: "Anderson"
		};

		show_data_with_home.apply(person, ["Rio de Janeiro", "Brazil"]);
	}

	// bind
	{

		/*
			bind() não executa a função imediatamente. 
			Ele cria uma nova função com o this definido.
		*/

		let person = {
			id: 123, 
			name: "Anderson"
		};

		let show_data_person = show_data.bind(person);
		show_data_person();
	}
}

/* 27. Implemente um exemplo de closure para ler e escrever dados 
internos a ela (ex: controle de bandas cadastradas). */

function create_closure(){

	/*
		Closure é quando uma função consegue acessar e manter variáveis 
		do escopo onde foi criada, mesmo depois desse escopo 
		ter terminado.

		Closure é quando uma função consegue acessar variáveis de um 
		escopo externo que normalmente não estaria mais disponível. 🔒🧠
	*/

	let closure;
	{
		let bands = ["Oasis", "Silverchair", "Bon Jovi", "Aerosmith", "U2", "Gin Blossons"];
		closure = {
			get: function(){
				return bands;
			},
			set: function(band){
				bands.push(band);
			}
		}
	}

	console.log(closure.get());
	closure.set("Oingo Boingo");
	console.log(closure.get());

}

/* 28. Implemente um exemplo de closure para ler e escrever dados 
internos, porém retornando um objeto com métodos para manipular 
e acessar as variáveis e atributos internos através 
desse objeto retornado. */

function closure_person(){

	function create_person(id, name) {

		let person = {
			id: id,
			name: name
		};

		return {
			get_id: function() {
				return person.id;
			},

			get_name: function() {
				return person.name;
			},

			set_id: function(new_id) {
				person.id = new_id;
			},

			set_name: function(new_name) {
				person.name = new_name;
			}
		};
	}

	let person = create_person(1, "Anderson");

	console.log(person.get_id());    // 1
	console.log(person.get_name());  // Anderson

	person.set_id(10);
	person.set_name("Lucy");

	console.log(person.get_id());    // 10
	console.log(person.get_name());  // Lucy
}

/* 29. Implemente um exemplo de closure em que uma função externa receba 
um valor, retorne uma função interna e essa função retornada consiga acessar 
e utilizar o valor recebido pela função externa, mesmo após sua execução 
ter terminado.*/

function greeting_closure(){
	function greet(greeting){
		function wrap(name){
			return `${greeting}, ${name}!`;
		}
		return wrap;
	}

	console.log(greet("Olá")("Mundo"));
	console.log(greet("Hello")("Anderson"));
	console.log(greet("Privet")("Sasha"));
	console.log(greet("Hola!")("Sanches"));
	console.log(greet("Ciao")("Giuseppe"));
}

/* 30. Demonstre o uso de IIFE (Immediately Invoked Function Expression - 
Funções Auto-executáveis) em suas duas formas: utilizando a 
notação tradicional e a notação de arrow function. */

function auto_executable_function(){

	// common-declaration:
	(function(){
		console.log("common-execute!");
	})();

	// arrow-declaration:
	(() => {
		console.log("arrow-execute!");
	})();
}

/* 31. Demonstre as diferenças práticas no uso de let e var em relação 
ao escopo de bloco e escopo de função. */

function scope_variable_declarations(){

	{
		var variable1 = 33;
		{
			console.log(variable1);
		}
	}
	console.log(variable1);

	{
		let variable2 = 10;
		{
			console.log(variable2);
		}
	}
	// console.log(variable2); // Atenção: ERROR!
}

/* 32. Crie um array heterogêneo (com números, objetos, vetores, 
funções, NaN, undefined, etc.) e demonstre a utilização de seus 
atributos e métodos, tais como: push, shift, unshift, concat, 
copyWithin, fill, slice e splice. */

function heterogeneous_array(){

	// Array heterogêneo
	let array = [
		10,
		"JavaScript",
		{ id: 1, name: "Anderson" },
		[1, 2, 3],
		function(){
			console.log("Função executada!");
		},
		NaN,
		undefined
	];

	console.log(array);


	// Acessando elementos
	console.log(array[0]);        // 10
	console.log(array[2].name);   // Anderson
	console.log(array[3][1]);     // 2

	// Executando a função armazenada no array
	array[4]();


	// push
	array.push("Oasis");
	console.log(array);


	// shift
	let first = array.shift();
	console.log(first);
	console.log(array);


	// unshift
	array.unshift(100);
	console.log(array);


	// concat
	let other_array = [true, false, null];
	let concatenated = array.concat(other_array);
	console.log(concatenated);


	// copyWithin
	let copy = [1, 2, 3, 4, 5];
	copy.copyWithin(0, 3);
	console.log(copy); // [4, 5, 3, 4, 5]


	// fill
	let filled = [1, 2, 3, 4, 5];
	filled.fill(0, 1, 4);
	console.log(filled); // [1, 0, 0, 0, 5]


	// slice
	let sliced = array.slice(1, 4);
	console.log(sliced);


	// splice
	let spliced = [...array];

	spliced.splice(1, 2, "HTML", "CSS");
	console.log(spliced);
}

heterogeneous_array();


/* 33. Desenvolva exemplos de transformação de dados utilizando o 
método map(), incluindo o uso de verificações condicionais 
dentro do mapeamento. */

function mapping_array(){
	let array = [0,1,2,3,4,5,6,7,8,9];
	
	let result_map = array.map((x) => x * 5);
	console.log(result_map);

	let condition_map = array.map((x) => x % 2 == 0);
	console.log(condition_map); // true, false... 
}

/* 34. Demonstre a filtragem condicional de elementos em um 
array utilizando o método filter(). */

function filtering_array(){
	let array = [0,1,2,3,4,5,6,7,8,9];
	
	let condition_flt = array.filter((x) => x % 2 == 0);
	console.log(condition_flt); // [ 0, 2, 4, 6, 8 ]    
}

/* 35. Demonstre o uso do método filter() combinando-o com 
operações aritméticas. */

function filtering_array_arith(){
	let array = [0,1,2,3,4,5,6,7,8,9];
	let result_flt = array.filter((x) => x * 5);
	console.log(result_flt); // 1, 2, 3, 4, 5, ...
}

/* 36. Demonstre a agregação de dados em um array utilizando o 
método reduce(). */

function reducing_array(){

	let array = [0,1,2,3,4,5,6,7,8,9];
	let reducing = array.reduce((sum, x) => sum + x);
	console.log(reducing); // 45
}

/* 37. Implemente uma função que receba um array de números 
e calcule o fatorial do último elemento (ou a multiplicação 
acumulada) utilizando exclusivamente o método reduce(). */

function fake_factorial_by_reducing_array(){
	let array = [1,2,3,4,5];
	let factorial = array.reduce((f, n) => f * n);
	console.log(factorial); // 120
}

fake_factorial_by_reducing_array();

/*
Bônus
A - Aritmética por repetição (Looping):
*/

/* a) Crie uma função que calcule o fatorial por repetição 
(looping); */

function factorial_by_looping(n)
{
	let f = 1;
	for(let i = 1; i < n + 1; i++)
	{
		f*=i;
	}
	return f;
}

/* b) Crie uma função que calcule a sequência de Fibonacci 
por repetição (looping); */

function fibonacci_by_looping(n)
{
	let a = 0;
	let b = 1;
	let p = 0;

	if(n < 0)
	{
		return -1;
	}

	if(n === 0)
	{
		return 0;
	}

	if(n === 1)
	{
		return 1;
	}

	while(n >= 1)
	{
		p = a + b;
		a = b;
		b = p;
		n--;
	}

	return a;
}

/* c) Crie uma função que calcule o Múltiplo Comum/MÁXIMO 
Divisor Comum (GCD/MDC) por repetição (looping); */

function gcd_by_looping(m, n)
{
	let r;
	let min = m < n ? m : n; 

	for(let i = 1; i <= min; i++)
	{
		if((m % i === 0) && (n % i === 0))
		{
			r = i;
		}
	}

	return r;
}

/* d) Crie uma função que calcule o somatório dos números 
de 0..N por repetição (looping). */

function summation_by_looping(n)
{
	let s = 0;
	for(let i = 0; i < n + 1; i++)
	{
		s+=i;
	}
	return s;
}

/*
B - Aritmética por recursão:
*/

/* a) Crie uma função que calcule o fatorial por recursão; */

function factorial_by_recursion(n)
{
	if((n === 0) || (n === 1))
		return 1;
	return factorial_by_recursion(n - 1) * n;
}

/* b) Crie uma função que calcule a sequência de Fibonacci 
por recursão; */

function fibonacci_by_recursion(n)
{
	if(n === 0)
		return 0;
	if(n === 1)
		return 1;
	return fibonacci_by_recursion(n - 1) + fibonacci_by_recursion(n - 2);
}

/* c) Crie uma função que calcule o MÁXIMO Divisor 
Comum (GCD/MDC) por recursão; */

function gcd_by_recursion(m, n)
{
	if(n === 0)
		return m;
	return gcd_by_recursion(n, m % n);
}

/* d) Crie uma função que calcule o somatório dos 
números de 0..N por recursão. */

function summation_by_recursion(n)
{
	if(n === 0)
		return 0;
	return summation_by_recursion(n - 1) + n;
}

