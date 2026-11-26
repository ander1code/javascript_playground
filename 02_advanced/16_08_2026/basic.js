"use strict";

/*Lista de Exercícios em JavaScript*/

/* 1. Demonstre a diferença no uso de variáveis e escopo (var e let) 
com o modo estrito habilitado ("use strict") e desabilitado. */

function var_and_let_without_use_strict(){

	{
		var data1 = "Hello, World!";
	}

	console.log(data1);

	{
		let data2 = "Hello, World!";
	}

	try{
		console.log(data2);
	}catch(error){
		console.log(`${error.name}: ${error.message}`);
	}
}

function var_and_let_with_use_strict(){

	"use strict";

	{
		var data1 = "Hello, World!";
	}

	console.log(data1);

	{
		let data2 = "Hello, World!";
	}

	try{
		console.log(data2);
	}catch(error){
		console.log(`${error.name}: ${error.message}`);
	}
}

/* 2. Execute e explique operações matemáticas de soma e multiplicação 
entre um número e uma string numérica (número entre aspas simples), 
bem como entre um número e uma string alfanumérica. */

function operation_with_alphanumerics(){

	let r1 = 10 * 3;
	console.log(r1);

	let r2 = 10 * "3";
	console.log(r2);

	let r3 = 10 + "A";
	console.log(r3);

	let r4 = 10 * "A";
	console.log(r4);

	let r5 = "10" * "A";
	console.log(r5);
}

/* 3. Demonstre o comportamento da palavra-chave this em funções com 
e sem o uso de "use strict". */

function this_without_use_strict(){
	console.log(this);
}

function this_with_use_strict(){
	"use strict";
	console.log(this);
}

/* 4. Implemente o uso do tipo primitivo Symbol utilizando suas duas 
formas de declaração (Symbol() e Symbol.for()). */

function create_symbol(){

	let sid = Symbol("id");
	let sname = Symbol("name");

	{
		let person = {
			[sid]: 123,
			[sname]: "Anderson"
		};

		console.log(person);
	}

	{
		let person = {};
		person[sid] = 123;
		person[sname] = "Anderson";

		console.log(person);
	}
}

/* 5. Declare um array unidimensional e um multidimensional e exiba 
o tamanho (length) de cada um. */

function create_array_01(){

	{
		let array = [1,2,3,4,5,6,7,8,9];
		console.log(array);
		console.log(`length: ${array.length}`);
	}


	{
		let array = [
			[0,1,2,3],
			[4],[5],
			[6,7],
			[8],
			[9]
		];
		console.log(array);
		console.log(`length: ${array.length}`);
	}
}

/* 6. Escreva um código que utilize Expressões Regulares (REGEX) em 
JavaScript e demonstre o uso do método match(). */

function regex_basic(){

	let text = "R$500, R$ 1000, -R$3, R$ 2000, R$700";

	{
		let pattern = /R\$ (\d+)/g;
		console.log(text.match(pattern));
	}

	{
		let pattern = /R\$\s?(\d+)/g;
		console.log(text.match(pattern));
	}
}

/* 7. Desenvolva uma solução que utilize

 a classe Map e seus principais 
métodos disponíveis. Explique qual é a diferença/relação entre um Map 
e um objeto simples (ex: const obj = {};). */

function create_map(){

	const map = new Map();

	map.set("id", 123);
	map.set("name", "Anderson");
	map.set("salary", 1234.63);
	map.set("birthday", new Date(2000,1,2));
	map.set("status", true);

	// size
	console.log(map.size);

	console.log(map);

	map.set("competencies", ["Programmer", "Analyst"]);

	// has
	console.log(map.has("status"));

	// get
	console.log(map.get("name"));

	console.log(map);

	// delete
	map.delete("competencies");

	console.log(map);

	// keys
	console.log("map.keys:");
	for(let k of map.keys()){
		console.log(k);
	}

	// values
	console.log("map.values:");
	for(let v of map.values()){
		console.log(v);
	}	

	// entries
	for(let[k,v] of map.entries()){
		console.log(`${k}: ${v}`);
	}

	// forEach

	map.forEach((v, k) => {
		console.log(`${k}: ${v}`);
	});


	// clear
	console.log(map.clear());

	console.log(map);

	
	// utiliza-se o objeto "simples" no dia a dia
	{
		const person = {};
		person.id = 123;
		person.name = "Anderson";
		person.salary = 1234.63;
		person.birthday = new Date(2000,1,2);
		person.status = true;

		console.log(person);
	}
}

/* 8. Crie um objeto que utilize a palavra-chave this e atribua a 
ele um método que referencie seus atributos dinamicamente. */

function object_and_this(){

	// implicito
	{
		const person = {
			id: 123,
			name: "Anderson",
			show_data(){
				console.log(`ID: ${this.id}, Name: ${this.name}`);
			}
		};

		person.show_data();
	}
	
	// explicito
	{
		const person = {
			id: 123,
			name: "Anderson",
		};

		function show_data(){
			console.log(`ID: ${this.id}, Name: ${this.name}`);
		}

		person.show_data = show_data;

		person.show_data();
	}
}

/* 9. Desenvolva um código que utilize a classe Set e explore 
seus métodos disponíveis. */

function create_set(){

	const set = new Set();

	set.add(123);
	set.add("Anderson");
	set.add(1234.63);
	set.add(new Date(2000,1,2));
	set.add(true);

	// size
	console.log(set.size);

	console.log(set);
	
	// has
	console.log(set.has("Anderson"));

	// delete
	let competencies = ["Programmer", "Analyst"];
	set.add(competencies);
	console.log(set);
	set.delete(["Programmer", "Analyst"]);
	console.log(set);

	// values
	console.log("map.values:");
	for(let v of set.values()){
		console.log(v);
	}	

	// entries
	for(let[v] of set.entries()){
		console.log(`${v}`);
	}

	// entries
	for(let[k,v] of set.entries()){
		console.log(`${k}: ${v}`);
	}
	
	// forEach
	set.forEach((v, k) => {
		console.log(`${k}: ${v}`);
	});


	// clear
	console.log(set.clear());

	console.log(set);
}

/* 10. Declare um array e liste seus itens utilizando os diferentes 
tipos de laços de repetição disponíveis em JS (for...in, for...of 
e forEach). */

function create_array_02(){

	let array = [
		// Symbol("id", 123), // error: nao funciona!
		"Anderson",
		1234.63,
		new Date(2000,1,2),
		true,
	];

	for(let i in array){
		console.log(`[${i}] = ${array[i]}`);
	}

	for(let i of array){
		console.log(`${i}`);
	}

	/*
		Resumo
		O Object aí funciona como uma caixa de ferramentas global 
		do JavaScript que permite inspecionar e extrair a estrutura 
		interna de qualquer objeto ou array da linguagem.
	*/

	for(let k of Object.keys(array)){
		console.log(`[${k}]`);
	}

	for(let v of Object.values(array)){
		console.log(`${v}`);
	}

	for(let[k,v] of Object.entries(array)){
		console.log(`${k}: ${v}`);
	}

	array.forEach((v, k) => {
		console.log(`${k}: ${v}`);
	})

	/*
		O que o seu código faz com perfeição:

			for...in: Percorre as chaves (índices) do array.

			for...of: Percorre diretamente os valores do 
			array de forma limpa.

			Object.keys() / values() / entries(): Demonstra como 
			tratar o array como um objeto para extrair índices, 
			valores ou ambos em pares.

			forEach(): Utiliza a função de alta ordem nativa 
			dos arrays para iterar passando o valor (v) e o 
			índice (k).
	*/
}

/* 11. Demonstre a diferença prática no uso dos operadores de 
igualdade ampla () e igualdade estrita (=). */

function is_equal(){

	let num1 = 10;
	let num2 = "10";
	console.log(`(Igualdade Ampla): ${num1 == num2}`);  // true
	console.log(`(Igualdade estrita): ${num1 === num2}`); // false
	console.log(`(Desigualdade Ampla): ${num1 != num2}`);  // false
	console.log(`(Desigualdade estrita): ${num1 !== num2}`); // true

}

/* 12. Escreva exemplos práticos que demonstrem o uso dos 
operadores bitwise:
a) | (OR)
b) & (AND)
c) ~ (NOT)
d) ^ (XOR) */

function bitwise_operators(){

	let a = 5;
	let b = 3;

	console.log(`a | b = ${a | b}`); 	   // 7
	console.log(`a & b = ${a & b}`);       // 1
	console.log(`~a = ${~a}, ~b = ${~b}`); // -6, -4
	console.log(`a ^ b = ${a ^ b}`); 	   // 6
}

/* 13. Escreva exemplos práticos que demonstrem o uso dos 
operadores de deslocamento bitwise (bitwise shift):
a) << (Left Shift)
b) >> (Right Shift) */

function bitwise_shift_operators(){

	let a = 5;
	let b = 4;

	console.log(`${a} << ${b} = ${a << b}`); // 80

	// colocando um valor maior:
	a = 80;

	console.log(`${a} >> ${b} = ${a >> b}`); // 5
}

/* 14. Demonstre a atribuição via desestruturação (destructuring) 
de um vetor de dados para um vetor de variáveis/letras. */

function vetor_destructuring_01(){

	let vetor = [1,2,3,4,5];
	let [a,b,c,d,e] = vetor;
	console.log(a,b,c,d,e);
}

/* 15. Demonstre a atribuição via desestruturação (destructuring) 
de um objeto (dicionário) de dados para variáveis/letras. */

function dictionary_destructuring(){

	let dict = {a:1,b:2,c:3,d:4,e:5};
	
	let a,b,c,x,y;
	({a,b,c,x,y} = dict);
	console.log(a,b,c,x,y);

	let z;
	({x,b,z} = dict);
	console.log(x,b,z);
}

/* 16. Execute a desestruturação de um objeto para variáveis sem 
a utilização da palavra-chave let (por exemplo, utilizando 
atribuição a variáveis pré-declaradas). */

function object_destructuring(){

	let dict = {a:1,b:2,c:3,d:4,e:5};
	let a,b,c;
	({a,b,c} = dict);
	console.log(a,b,c);
}

/* 17. Realize a atribuição via desestruturação de um vetor de 
dados para um vetor de letras com quantidade de itens menor do que 
o vetor original. */

function vetor_destructuring_02(){

	let dict = {a:1,b:2,c:3};
	let a,b,c,x,z;

	({a,b,c} = dict);
	console.log(a,b,c,x,z);

	({a,b,c,x,z} = dict);
	console.log(a,b,c,x,z);
}

/* 18. Crie um objeto com um método para retornar seus próprios 
dados (utilizando this). Em seguida, utilize o operador delete 
para excluir um atributo e exiba o objeto novamente. */

function object_with_this(){

	// implicito
	{
		let person = {
			id: 123,
			name: "Anderson",
			show_data: function(){
				console.log(`ID: ${this.id}, name: ${this.name}`);
			}
		}

		person.show_data();
	}

	// explicito
	{
		let person = {
			id: 123,
			name: "Anderson",
		}

		person.show_data = function(){
			console.log(`ID: ${this.id}, name: ${this.name}`);
		}

		person.show_data();

		delete person.id;

		person.show_data(); // ID: undefined, name: Anderson 

		console.log(person.id); // undefined / nao dispara exceção!
	}
}

/* 19. Crie uma classe com o método constructor e verifique seu 
tipo utilizando os operadores typeof e instanceof. */

function create_class(){

	class MyClass{
		constructor(){
			console.log("object created!");
		}
	}

	let obj = new MyClass();

	console.log(typeof obj);

	console.log(obj instanceof MyClass);
}

/* 20. Desenvolva uma aplicação simples utilizando a classe 
Date e explore seus principais métodos e atributos. */

function using_date(){

	// estaticos:
	console.log(Date.now()); // timestamp em milissegundos.
	console.log(Date.parse("2000-01-01")); // timestamp em milissegundos.

	// instanciados:
	let date = new Date(2000,1,1,10,30,20); // pegadinha: 1 significa fevereiro!
	console.log(date.toLocaleDateString());
	console.log(date.toDateString());
	console.log(date.toUTCString());
	console.log(date.getDate(), date.getMonth(), date.getFullYear(), date.getHours(), date.getMinutes(), date.getSeconds());
	console.log(date.toTimeString());
	console.log(date.toLocaleDateString("pt-BR"));
	console.log(date.toLocaleDateString("en-US"));

	date.setDate(13);
	date.setMonth(11);
	date.setFullYear(2001);
	console.log(`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`);
	console.log(date.getTime()); // timestamp em milissegundos.
	console.log(`${date.getUTCDate()}/${date.getUTCMonth()}/${date.getUTCFullYear()}`);

}

/* 21. Instancie objetos de classes diferentes e valide-os 
utilizando os operadores typeof e instanceof. */

function object_collection_vetor(){

	let count = 0;

	let objects = [
		new Date(),
		new Set(),
		new Map(),
		new Array(),
		new Date(),
	];

	for(let o of objects){
		if(o instanceof Date){
			count++;
			continue;
		}
		console.log(`${o}, ${typeof o}`);
	}
	console.log(`Dates: ${count}`);
}

/* 22. Demonstre a utilização da instrução break rotulada 
(labeled break statement) em JavaScript. */

function labeled_break(){

	my_looping: {
		for(let i = 0; i < 20; i++){
			for(let j = 0; j < 20; j++){
				if((i === 5) && (j === 10)){
					break my_looping;
				}
				console.log(`i: ${i}, j: ${j}`);
			}
		}
	}
	console.log("finished!");
}

/* 23. Crie uma função e atribua-a a uma variável. Em seguida, 
atribua essa função como um método de um objeto. Nesse mesmo 
objeto, defina um método utilizando a sintaxe enxuta/sem 
chave (ex: invoke()). */

function set_function_to_object(){

	let person = {
		id: 123,
		name: "Anderson",
		invoke(){
			console.log(`ID: ${this.id}, name: ${this.name}`);
		},
	}

	person.show_data = function(){
		console.log(`ID: ${this.id}, name: ${this.name}`);
	}

	person.invoke();
	person.show_data();
}

/* 24. Declare uma função de duas maneiras diferentes: utilizando 
a notação tradicional e a notação de função 
seta (arrow function). */

function function_declarations(){

	// default_notation:

	function greet_default(name){
		console.log(`Hello, ${name}!`);
	}

	greet_default("Anderson");

	// arrow_notation_01:

	let greet_arrow_01 = (name) => console.log(`Hello, ${name}!`);

	greet_arrow_01("Anderson");

	// arrow_notation_02:

	let greet_arrow_02 = ((name) => {
		console.log(`Hello, ${name}!`);
	});

	greet_arrow_02("Anderson");
}

/* 25. Demonstre o uso da desestruturação de argumentos de funções 
(tanto para arrays quanto para objetos). */

function function_destructuring(){

	function vetor_destructuring([a,b,c,d,e]){
		console.log(a,b,c,d,e);
	}

	function object_destructuring({a,b,c,d,e}){
		console.log(a,b,c,d,e);
	}

	vetor_destructuring([1,2,3,4,5]);

	object_destructuring({a:1,b:2,c:3,d:4,e:5});
}

/* 26. Crie um vetor de objetos com estruturas semelhantes 
(ex: person com id e name) e faça com que cada objeto invoque uma 
função externa (utilizando call, apply ou bind), sem atribuir 
a função diretamente ao objeto. */

function invoke_function(){

	let people = [
		{ id: 1, name: "Anderson" },
		{ id: 2, name: "Carmen" },
		{ id: 3, name: "Lucy" },
		{ id: 4, name: "Tiffany" },
		{ id: 5, name: "Jason" },
	]

	// call
	function show_data(){
		console.log(`ID: ${this.id}, name: ${this.name}`);
	}

	for(let p of people){
		show_data.call(p);
	}

	// apply
	function show_data(){
		console.log(`ID: ${this.id}, name: ${this.name}`);
	}

	/*
		Regra de ouro para memorizar:
			Call = Comma (vírgula)
			Apply = Array (vetor)
	*/

	// bind (vincular):

	for(let p of people){
		let bound_function = show_data.bind(p);
		bound_function();
	}
}

/* 27. Implemente um exemplo de closure para ler e escrever dados 
internos a ela (ex: controle de bandas cadastradas). */

function using_closure(){

	/*
		Uma closure (fechamento) é uma função em JavaScript que se lembra 
		e consegue acessar o seu escopo léxico externo mesmo depois que 
		a função externa já terminou de executar.
	*/
	let closure;

	{
		let bands = ["Oasis", "Bon Jovi", "Alice Chains", "The Cure"];
		closure = {
			get: function(){
				return bands;
			},
			set: function(band){
				bands.push(band);
			}
		};
	}

	console.log(closure.get());
	closure.set("Oingo Boingo");
	console.log(closure.get());
}

/* 28. Implemente um exemplo de closure para ler e escrever dados 
internos, porém retornando um objeto com métodos para manipular 
e acessar as variáveis e atributos internos através 
desse objeto retornado. */

// IDEM 27

/* 29. Demonstre o uso de IIFE (Immediately Invoked Function Expression - 
Funções Auto-executáveis) em suas duas formas: utilizando a 
notação tradicional e a notação de arrow function. */

function iife_execution(){

	(function(){
		console.log("execution_01!");
	})();

	(() => {
		console.log("execution_02!");
	})();

	(function(param){
		console.log(param);
	})("execution_03!");

	((param) => {
		console.log(param);
	})("execution_04!");
}

/* 30. Demonstre as diferenças práticas no uso de let e var em relação 
ao escopo de bloco e escopo de função. */

function let_var_scope(){

	{
		var data1 = "Hello, World!";
	}

	console.log(data1);

	{
		let data2 = "Hello, World!";
	}

	try{
		console.log(data2);
	}catch(error){
		console.warn(`${error.name}: ${error.message}`)
	}
}

/* 31. Crie um array heterogêneo (com números, objetos, vetores, 
funções, NaN, undefined, etc.) e demonstre a utilização de seus 
atributos e métodos, tais como: push, shift, unshift, concat, 
copyWithin, fill, slice e splice. */

function create_array_03(){

	let array = [
		123, 
		"Anderson",
		1541.11,
		true,
		Symbol("id"),
		NaN,
		undefined,
		null,
		[1,2,3],
		{ id:52165261, function:"programmer"},
		(() => {
			console.log("function!");
		})
	];

	console.log(array); // all

	array.shift(); // tira do inicio

	console.log(array); // sem 123

	array.unshift(123); // adiciona ao inicio

	console.log(array); // com 123

	array.push(new Date(2000,1,1));

	// concat, copyWithin, fill, slice e splice: */
	let array_1 = [0,1,2,3,4];
	let array_2	= [5,6,7,8,9];

	console.log(array_1.concat(array_2)); // nao modifica o array!

	console.log(array_1.copyWithin(1,4));
	console.log(array_1);

	array_1.fill("X", 1,4); 
	console.log(array_1);  // [ 0, 'X', 'X', 'X', 4 ]  

	array_1.fill("X");
	console.log(array_1); // [ 'X', 'X', 'X', 'X', 'X' ]  

	console.log(array_2.slice(1,4)); // [ 6, 7, 8 ] 

	console.log(array_2.splice(1,4)); // [ 6, 7, 8, 9 ]  
}

/* 32. Desenvolva exemplos de transformação de dados utilizando o 
método map(), incluindo o uso de verificações condicionais 
dentro do mapeamento. */

function map_execution(){

	let array = [0,1,2,3,4,5,6,7,8,9];
	
	let multi = array.map((i) => {
		console.log(`${i} x 5 = ${i * 5}`);
		return i * 5;
	});
	console.log(multi);

	let odd = array.map((i) => i % 2 === 0);
	console.log(odd);

	let even = array.map((i) => i % 2 !== 0);
	console.log(even);
}

/* 33. Demonstre a filtragem condicional de elementos em um 
array utilizando o método filter(). */

function filter_execution_conditional(){

	let array = [0,1,2,3,4,5,6,7,8,9];
	
	let odd = array.filter((i) => i % 2 === 0);
	console.log(odd);

	let even = array.filter((i) => i % 2 !== 0);
	console.log(even);

	let mult = array.filter((i) => i * 5);
	console.log(mult); // [  1, 2, 3, 4, 5, 6, 7, 8, 9 ]                                                                                            
}

/* 34. Demonstre o uso do método filter() combinando-o com 
operações aritméticas. */

function filter_execution_arithmetic(){

	let array = [0,1,2,3,4,5,6,7,8,9];
	
	let mult = array.filter((i) => i * 5);
	console.log(mult); // [  1, 2, 3, 4, 5, 6, 7, 8, 9 ]  
}

/* 35. Demonstre a agregação de dados em um array utilizando o 
método reduce(). */

function reduce_execution(){

	let array = [0,1,2,3,4,5,6,7,8,9];
	let result = array.reduce((x, y) => x + y);
	console.log(result); // 45
}

/* 36. Implemente uma função que receba um array de números 
e calcule o fatorial do último elemento (ou a multiplicação 
acumulada) utilizando exclusivamente o método reduce(). */

function reduce_factorial(){

	let array = [1,2,3,4,5];
	let result = array.reduce((x, y) => x * y);
	console.log(result); // 120
}


/*
Bônus
A - Aritmética por repetição (Looping):
*/

/* a) Crie uma função que calcule o fatorial por repetição 
(looping); */

function factorial_looping(n){
	let f = 1;
	for(let i = 1; i < n + 1; i++){
		f*=i;
	}
	return f;
}

/* b) Crie uma função que calcule a sequência de Fibonacci 
por repetição (looping); */

function fibonacci_looping(n){

	let a = 0;
	let b = 1;
	let p = 0;
	
	while(n >= 1){
		p = a + b;
		a = b;
		b = p;
		n--;
	}
	return a;
}

/* c) Crie uma função que calcule o Múltiplo Comum/MÁXIMO 
Divisor Comum (GCD/MDC) por repetição (looping); */

function gcd_looping(m,n){

	let r = 0;
	let min = m < n ? m : n;

	// Corrigido para i <= min para incluir o próprio valor limite na verificação
	for(let i = 1; i <= min; i++){
		if((m % i == 0) && (n % i == 0)){
			r = i;
		}
	}
	return r;
}

/* d) Crie uma função que calcule o somatório dos números 
de 0..N por repetição (looping). */

function sum_by_looping(n){

	let s = 0;
	for(let i = 1; i < n + 1; i++){
		s+=i;
	}
	return s;
}



/*
B - Aritmética por recursão:
*/

/* a) Crie uma função que calcule o fatorial por recursão; */

function factorial_recursion(n){

	if((n == 0) || (n == 1))
		return 1;

	return factorial_recursion(n - 1) * n;
}

/* b) Crie uma função que calcule a sequência de Fibonacci 
por recursão; */

function fibonacci_recursion(n){

	if(n === 0)
		return 0; 

	if(n === 1)
		return 1;

	return fibonacci_recursion(n - 1) + fibonacci_recursion(n - 2);
}

/* c) Crie uma função que calcule o MÁXIMO Divisor 
Comum (GCD/MDC) por recursão; */

function gcd_recursion(m,n){
	if(n == 0)
		return m;
	return gcd_recursion(n, m % n);
}

/* d) Crie uma função que calcule o somatório dos 
números de 0..N por recursão. */

function sum_by_recursion(n){
	if(n == 0)
		return 0;
	return sum_by_recursion(n - 1) + n;
}

var_and_let_without_use_strict();
var_and_let_with_use_strict();
operation_with_alphanumerics();
this_without_use_strict();
this_with_use_strict();
create_symbol();
create_array_01();
regex_basic();
create_map();
object_and_this();
create_set();
create_array_02();
is_equal();
bitwise_operators();
bitwise_shift_operators();
vetor_destructuring_01();
dictionary_destructuring();
object_destructuring();
vetor_destructuring_02();
object_destructuring();
vetor_destructuring_02();
object_with_this();
create_class();
using_date();
object_collection_vetor();
labeled_break();
set_function_to_object();
function_declarations();
function_destructuring();
invoke_function();
using_closure();
iife_execution();
let_var_scope();
create_array_03();
map_execution();
filter_execution_conditional();
filter_execution_arithmetic();
reduce_execution();
reduce_factorial();
console.log(factorial_looping(5));
console.log(fibonacci_looping(10));
console.log(gcd_looping(18,24)); // 6
console.log(sum_by_looping(5)); // 15
console.log(factorial_recursion(5));
console.log(fibonacci_recursion(9));
console.log(gcd_recursion(18,24));
console.log(sum_by_recursion(5));
console.log("finished!");