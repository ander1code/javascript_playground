"use strict";

/*
1 - Crie um programa em JavaScript que declare um objeto representando uma 
pessoa (person) contendo as propriedades id, name, birthday, gender e status. 

Em seguida, realize as seguintes operações:

	Exibição Básica: Imprima o objeto completo no console.
	Iteração com for...in: Utilize um laço for...in para percorrer todas as chaves 
	e valores do objeto, exibindo cada propriedade e seu respectivo valor no console.

	Tratamento de Erros e Iteração com for...of: Tente utilizar um laço for...of 
	diretamente sobre o objeto person para exibir seus dados. Como objetos comuns 
	não são iteráveis por padrão em JavaScript, envolva esse trecho em um 
	bloco try...catch para capturar o erro gerado 
	(TypeError: person is not iterable) e exiba uma mensagem 
	amigável no console.
*/

function exercise_01(){
	let person = {
		id: 123,
		name: "Anderson",
		birthday: new Date(2000,1,1),
		gender: 'M',
		status: true,
	};

	console.log(person);

	for(let i in person){
		console.log(`${i}: ${person[i]}`);
	}

	try{
		for(let data of person){
			console.log(data);
		}
	}catch(error){
		console.log("TypeError: person is not iterable");
	}
}

/*

2 - Crie um programa em JavaScript que demonstre conceitos sobre objetos, 
métodos, uso de this, Symbols e enumeração de propriedades. 
O programa deve ser dividido em duas funções principais 
(exercise_02_1 e exercise_02_2) com os seguintes requisitos:

	Parte 1 (exercise_02_1) — Uso de Symbols e Visibilidade de Propriedades:

		Crie um objeto vazio chamado person.

		Declare um Symbol com a descrição "id" e utilize-o como chave no 
		objeto person para armazenar o valor numérico 123.

		Adicione uma propriedade comum name contendo a string "Anderson".

		Adicione um método chamado show_data ao objeto que imprima no 
		console os valores armazenados utilizando a palavra-chave this 
		para referenciar tanto a chave do tipo Symbol quanto a 
		propriedade string.

		Chame o método show_data().

		Utilize um laço for...in para iterar sobre as propriedades do 
		objeto e exibi-las no console (observe que chaves baseadas em 
		Symbol são ignoradas por essa enumeração).

		Imprima o objeto completo no final para evidenciar a presença 
		de todas as propriedades (strings, métodos e symbols).

	Parte 2 (exercise_02_2) — Métodos e Contexto:

		Crie um objeto literal contendo uma propriedade message com o 
		valor "Hello, World!".
		
		Adicione dinamicamente um método chamado show_message a esse 
		objeto que utilize o this para retornar o conteúdo da 
		propriedade message.
		
		Execute a função e exiba o resultado retornado 
		no console.
*/

function exercise_02_1(){

	let person = {};

	let sid = Symbol("id")
	person[sid] = 123;

	person.name = "Anderson";

	person.show_data = function(){
		// Utilizando this para referenciar symbol e string:
		console.log(`ID: ${this[sid]}, Name: ${this.name}`); // ID: 123, Name: Anderson  
	};

	person.show_data();

	// printing...

	for(let i in person){
		console.log(`${i}: ${person[i]}`); // somente: name: Anderson   
	}

	console.log(person);

	/*
		{                                                                                                        
		  name: 'Anderson',                                                                                      
		  show_data: [Function (anonymous)],                                                                     
		  Symbol(id): 123                                                                                        
		}
	*/
}

exercise_02_1();

function exercise_02_2(){

	const obj = {
		message: "Hello, World!",
	};

	obj.show_message = function(){
		 return this.message;
	};
	
	console.log(obj.show_message());
}

exercise_02_2();

/*
3 - Crie um programa em JavaScript utilizando Classes (class), 
métodos estáticos (static), protótipos (Object.prototype) e 
conceitos de mutabilidade de objetos. 

	O código deve seguir os seguintes requisitos:

		Definição da Classe Person:

			Declare uma classe chamada Person que contenha uma propriedade 
			estática count inicializada com 0 para rastrear o número 
			total de instâncias criadas.

			Crie um construtor que receba um parâmetro id, exiba a mensagem 
			"object created!" no console e incremente a contagem 
			estática Person.count.

			Adicione um método de instância chamado show_data que exiba no 
			console os valores de id, name e status da pessoa.

		Funções Auxiliares Externas:

		Crie duas funções normais fora da classe: 
		get_name (que retorna this.name) e 
		set_name (que define this.name = name).

		Uso de Prototyping e Modificação Dinâmica (Object.prototype):

			Instancie um objeto da classe Person passando 
			um ID (por exemplo, 123).

			Adicione dinamicamente as funções criadas anteriormente ao 
			protótipo global (Object.prototype.get_name e 
			Object.prototype.set_name).

			Adicione também uma propriedade padrão status com o valor 
			true via Object.prototype.status.

			Utilize os métodos e atributos recém-adicionados para definir 
			o nome da pessoa como "Anderson", recuperá-lo e exibi-lo 
			junto com os demais dados usando show_data().

		Validações e Instanciação em Lote:

			Verifique o tipo da instância utilizando typeof e o 
			operador instanceof.

			Utilize um laço de repetição (for) para instanciar outros objetos 
			da classe Person.

			Instancie um último objeto sem passar parâmetros para o construtor 
			e exiba ao final a quantidade total de objetos criados através 
			da propriedade estática Person.count.
*/

function exercise_03(){
	/*
		Usando const (Mais recomendado na maioria dos casos)
		
		Quando você usa const, você impede que a variável seja reatribuída 
		(ou seja, você não pode apontar essa variável para um objeto 
		inteiramente novo ou outro valor).

		Atenção: const não torna o objeto imutável! Você ainda pode 
		alterar, adicionar ou remover propriedades de dentro dele.

		Classes: Já ativam o "use strict" automaticamente no corpo delas.
	*/

	class Person{

		static count = 0;

		constructor(id){
			this.id = id;

			console.log("object created!");

			Person.count++; // incrementa!
		}

		// function show_data(){ // ERROR se usar function aqui!!!
		show_data(){
			console.log(`ID: ${this.id}, NAME: ${this.name}, STATUS: ${this.status}`);
		}
	}

	function get_name(){
		return this.name;
	}

	function set_name(name){
		this.name = name;
	}

	const p = new Person(123);
	
	// atribuindo métodos a classe
	Object.prototype.get_name = get_name;
	Object.prototype.set_name = set_name;

	// usando os métodos atribuídos
	p.set_name("Anderson");
	console.log(p.get_name());

	// atribuindo atributos a classe
	Object.prototype.status = true;

	console.log(p);

	p.show_data();

	// verificando...
	console.log(typeof p);
	console.log(p instanceof Person);

	// criando mais objetos
	for(let i = 0; i < 9; i++){
		let p = new Person(777);
	}

	// quantidade total de objetos criados (static)
	console.log(`Count: ${Person.count}.`);

	// É criado um objeto sem parametros!
	const p2 = new Person();
	console.log(`Count: ${Person.count}.`);
}

exercise_03();


/*

4 - Crie um programa em JavaScript para demonstrar o conceito de 
Herança Baseada em Protótipos (prototype), sombreamento de propriedades 
(property shadowing) e compartilhamento de métodos. 

	O programa deve seguir os seguintes requisitos:

		Função Construtora:

			Declare uma função construtora chamada f que receba um parâmetro 
			band e o atribua à instância usando this.band.

		Métodos no Protótipo:

			Crie uma função auxiliar externa get_band que retorne this.band.

			Adicione esse método ao protótipo da função construtora 
			(f.prototype.get_band = get_band), permitindo que todas as 
			instâncias o compartilhem.

		Instanciação de Objetos:

			Crie quatro instâncias da função construtora f passando 
			diferentes nomes de bandas (por exemplo: "Oingo Boingo", "Oasis", 
			"Alice Chains" e "Bon Jovi").

		Propriedades Compartilhadas e Sombreamento (Shadowing):

			Adicione uma propriedade ao protótipo (f.prototype.country = "USA"), 
			que será herdada por todas as instâncias.

			Modifique diretamente a propriedade country de apenas 
			uma das instâncias (por exemplo, atribuindo "England!" à segunda banda), 
			demonstrando que a instância própria tem prioridade sobre o 
			valor do protótipo (property shadowing).

		Exibição dos Dados:

			Imprima no console o nome da banda (obtido pelo método do protótipo) 
			e o país correspondente de cada uma das instâncias, evidenciando 
			quais herdaram o valor padrão e qual utilizou o valor 
			sobrescrito.
*/

function exercise_04(){

	// Toda função possui uma propriedade especial prototype;

	/*
		prototype: É o mecanismo fundamental que a linguagem usa 
		para implementar herança e compartilhamento de propriedades 
		e métodos entre objetos.

		Diferente de linguagens baseadas em classes tradicionais 
		(como Java ou C++), o JavaScript é baseado em protótipos 
		(prototype-based programming).

		O Prototype é como um painel de avisos da turma.

		Tudo o que você coloca nele é compartilhado por todo mundo. 
		Se você muda o painel, todo mundo atualiza junto.

		Mas se um brinquedo específico colar um adesivo nele mesmo, 
		ele ganha prioridade e usa o seu próprio adesivo!
	*/

	// Função inicializadora (construtora)
	let f = function(band){
		this.band = band;
	}

	// nao crio entao, uma função de atribuição de dados.

	/*
	let set_band = function(band){
		this.band = band;
	}
	*/

	let get_band = function(){
		return this.band;
	}

	// f.prototype.set_band = set_band;
	f.prototype.get_band = get_band;

	console.log(f.prototype);

	let bd1 = new f("Oingo Boingo");
	let bd2 = new f("Oasis");
	let bd3 = new f("Alice Chains");
	let bd4 = new f("Bon Jovi");

	f.prototype.country = "USA";

	bd2.country = "England!"; // mudando Oasis

	console.log(`${bd1.get_band()} - ${bd1.country}`);   // USA
	console.log(`${bd2.get_band()} - ${bd2.country}`);   // England!
	console.log(`${bd3.get_band()} - ${bd3.country}`);   // USA
	console.log(`${bd4.get_band()} - ${bd4.country}`);   // USA
}

exercise_04();

/*
5 - Crie um programa em JavaScript que demonstre o comportamento do contexto 
(this) e as interações entre métodos de instância e métodos estáticos em classes. 

	O programa deve seguir os seguintes requisitos:

		Definição da Classe MyClass:

			Construtor:

				Ao ser instanciado, deve chamar o método de instância 
				this.instance_method("constructor").

				Deve acessar e chamar o método estático usando 
				this.constructor.static_method("constructor") e diretamente 
				pelo nome da classe (MyClass.static_method("constructor")).

			Método de Instância (instance_method):

				Recebe um parâmetro origin e exibe no console a mensagem 
				formatada ${origin}: instance_method!.

				A partir dele, chama um método estático tanto usando 
				this.constructor.static_method quanto MyClass.static_method.

			Métodos Estáticos (static_method e static_callback):

				static_method recebe um parâmetro origin, exibe sua execução no 
				console e documenta (via comentários) o motivo pelo qual chamar 
				métodos de instância a partir de contextos estáticos geraria 
				um erro.

				static_callback demonstra a forma correta de chamar outro método 
				estático a partir de um método estático 
				(utilizando this.static_method ou MyClass.static_method), além 
				de registrar o fluxo com o argumento de origem.

			Testes e Execução Externa:

				Instancie a classe (const obj = new MyClass()) para disparar 
				automaticamente o fluxo do construtor.

			Realize chamadas externas adicionais para comprovar o comportamento:

			Chame o método de instância a partir do objeto (obj.instance_method("external_call")).

			Chame os métodos estáticos diretamente pela classe 
			(MyClass.static_method("external_call") e 
			MyClass.static_callback("external_call")).

*/

function exercise_05(){

	class MyClass{
		constructor(){
			
			// Chama o método de instância passando a origem "constructor"
			this.instance_method("constructor");

			// Usa this.constructor para acessar o método estático a partir da instância
			this.constructor.static_method("constructor"); 
			
			// É exatamente a mesma coisa que chamar direto pelo nome da classe:
			MyClass.static_method("constructor");
		}

		instance_method(origin){
			// Exibe o método de instância e quem o chamou (origin)
			console.log(`${origin}: instance_method!`);
			
			// CORREÇÃO: Passando "instance_method" como origem correta (antes estava "constructor")
			this.constructor.static_method("instance_method");
			
			// O equivalente chamando direto pela classe:
			MyClass.static_method("instance_method"); // CORREÇÃO: Ajustado de "constructor" para "instance_method"
		}

		static static_method(origin){

			// Exibe o método estático e quem o chamou
			console.log(`${origin}: static_method!`);

			/* 
				NOTA: Dentro de um método estático, o 'this' aponta para a CLASSE, 
				e não para uma instância. Por isso, chamar 'this.instance_method' 
				daria erro, pois instâncias não existem diretamente aqui.
			*/
			// this.instance_method("static_method"); // Error!

			/* 
				NOTA: Chamar 'this.static_callback' aqui geraria um loop infinito 
				se a callback chamasse de volta a static_method sem controle.
			*/
			// this.static_callback("static_method"); // looping infinito!
		}

		static static_callback(origin){

			// Exibe o método de callback estático e quem o chamou
			console.log(`${origin}: static_callback!`);
			
			/*
				NOTA: Dentro de um método estático, 'this.constructor' tentaria buscar 
				o construtor da função construtora da classe (Function), onde não 
				encontrará o static_method.
			*/
			//this.constructor.static_method("static_callback"); // Error!

			/*
				NOTA: Novamente, métodos estáticos não conhecem 'this.instance_method'.
			*/
			//this.instance_method("static_callback"); // Error!

			// Forma correta de chamar outro método estático a partir de um método estático
			this.static_method("static_callback");

			// Outra forma válida: chamando diretamente pelo nome da classe
			MyClass.static_method("static_callback");
		}
	}

	// Criar a instância dispara o constructor automaticamente
	const obj = new MyClass();
	
	console.log("\n--- Outras chamadas externas ---\n");

	// Chamando o método de instância externamente e passando o argumento de origem
	obj.instance_method("external_call");

	// Chamando o método estático diretamente pela classe
	MyClass.static_method("external_call");

	// Chamando o callback estático diretamente pela classe
	MyClass.static_callback("external_call");
}

exercise_05();

/*
6 - Crie um programa em JavaScript que demonstre o conceito de Herança de 
Classes (extends) e Sobrescrita de Métodos (Method Overriding) usando a 
palavra-chave super. O programa deve seguir os seguintes requisitos:

	Classe Base (Person):

		Crie uma classe chamada Person com um construtor que receba os 
		parâmetros id e name, armazenando-os como propriedades 
		da instância.

		Adicione um método de instância chamado get_data() que retorne 
		uma string formatada contendo o ID e o nome 
		(por exemplo: "ID: 123, ID: Anderson").

	Classe Derivada (NaturalPerson):

		Crie uma classe chamada NaturalPerson que herde de Person 
		utilizando a palavra-chave extends.

		Implemente um construtor que receba id, name e cpf, utilizando 
		super(id, name) para reutilizar a inicialização da classe base, 
		e armazene o cpf na instância.

		Sobrescreva o método get_data() na classe derivada para que ele 
		chame o método original da classe base (super.get_data()) 
		e concatene a informação do CPF ao 
		resultado retornado.

	Instanciação e Teste:

		Crie uma instância da classe NaturalPerson passando valores válidos 
		para ID, nome e CPF.

		Chame o método get_data() a partir dessa instância e exiba o 
		resultado final no console.
*/

function exercise_06(){

	class Person{
		constructor(id, name){
			this.id = id;
			this.name = name;
		}

		get_data(){
			return `ID: ${this.id}, ID: ${this.name}`;
		}
	}

	class NaturalPerson extends Person{
		constructor(id, name, cpf){
			super(id, name);
			this.cpf = cpf
		}

		get_data(){
			return `${super.get_data()}, CPF: ${this.cpf}`; // calling "super" method
		}
	}

	const p = new NaturalPerson(123, "Anderson", "12345678909");
	console.log(p.get_data());
}

exercise_06();

/*
7 - Crie um programa em JavaScript dividido em duas funções 
(exercise_07_1 e exercise_07_2) para demonstrar o uso de herança baseada 
em objetos literais, a manipulação da cadeia de protótipos e o 
uso de Object.getPrototypeOf(). O programa deve seguir os 
seguintes requisitos:

	Parte 1 (exercise_07_1) — Herança Básica com Prototipagem Direta:

		Crie um objeto literal chamado person contendo as propriedades 
		id e name.

		Crie um segundo objeto literal chamado natural_person contendo uma 
		propriedade cpf e um método get_data() que retorne uma string 
		formatada exibindo id, name e cpf (utilizando a palavra-chave this).

		Utilize a propriedade legada __proto__ (natural_person.__proto__ = person) 
		para estabelecer a herança, permitindo que natural_person herde 
		as propriedades de person.

		Exiba os objetos no console e chame o método natural_person.get_data().

	Parte 2 (exercise_07_2) — Forma Moderna e Contexto de Execução com 
	Protótipos:

		Crie um objeto literal person contendo id, name e um método 
		get_data() que retorne as informações básicas formatadas.

		Crie um objeto literal natural_person que defina a herança de forma 
		inline utilizando a propriedade __proto__: person, além de possuir 
		uma propriedade cpf.

		Sobrescreva o método get_data() em natural_person utilizando 
		Object.getPrototypeOf(this).get_data.call(this) para acessar e 
		reutilizar o método do objeto pai (person) preservando o contexto 
		correto (this), e concatene a informação do CPF.

		Demonstre o uso de referências a propriedades do pai no escopo de 
		inicialização (como natural_person__name: person.name), comente 
		sobre as limitações do uso de this na declaração literal de 
		propriedades, e exiba os resultados finais no console.
*/

function exercise_07_1(){

	let person = {
		id: 123,
		name: "Anderson",
	};

	let natural_person = {
		cpf: "43256789032",
		get_data: function(){
			return `ID: ${this.id}, Name: ${this.name}, CPF: ${this.cpf}`;
		}
	};

	// usando prototype:

	// __proto__: Atenção: Sintaxe Obsoleta!
	natural_person.__proto__ = person;

	console.log(natural_person);
	console.log(person);

	console.log(natural_person.get_data());

	/// natural_person.show_data();
}

exercise_07_1();

function exercise_07_2(){

	let person = {
		id: 123,
		name: "Anderson",
		get_data: function(){
			return `ID: ${this.id}, Name: ${this.name}`;
		},
	};

	// forma moderna de se usar o prototype:

	let natural_person = {
		cpf: "43256789032",
		__proto__: person,
		get_data: function(){

			/*
				O método Object.getPrototypeOf(this) serve para retornar o protótipo 
				(ou seja, a internal [[Prototype]], acessível via __proto__) 
				do objeto ao qual a palavra-chave this se refere 
				no contexto atual.

				Na prática, ele é muito utilizado em JavaScript orientado a 
				objetos para Acessar métodos da classe pai (superclasse), 
				especialmente dentro de construtores, métodos estáticos 
				ou quando você está construindo sistemas que precisam 
				inspecionar ou manipular a cadeia de protótipos 
				(prototype chain).
			*/

			// return `${Object.getPrototypeOf(this).get_data()}, CPF: ${this.cpf}`;

			// recomendado usar essa linha: 
			return `${Object.getPrototypeOf(this).get_data.call(this)}, CPF: ${this.cpf}`;
		},

		// natural_person__name: Object.getPrototypeOf(this).name, // Não funciona!

		natural_person__name: person.name
	};

	// usando prototype:

	// __proto__: Atenção: Sintaxe Obsoleta!
	// natural_person.__proto__ = person;

	console.log(natural_person);
	console.log(person);

	console.log(natural_person.get_data());

	console.log(natural_person.natural_person__name);
}

exercise_07_2();

/*
8 - Crie um programa em JavaScript que demonstre conceitos avançados de herança de 
classes, sobrescrita de métodos (method overriding) e reutilização de 
lógica com super. 

	O programa deve seguir os seguintes requisitos:

		Classe Base (Parent):

			Crie uma classe chamada Parent com um construtor que receba os 
			parâmetros x e y, armazenando-os como propriedades da instância 
			e definindo uma propriedade title com o valor "parent class!".

			Adicione um método de instância chamado sum() que retorne a soma 
			de this.x e this.y.

		Classe Derivada (Child):

			Crie uma classe chamada Child que herde de Parent utilizando a 
			palavra-chave extends.

			Implemente um construtor que receba três parâmetros (x, y, z), 
			utilize super(x, y) para inicializar a classe base, armazene o 
			parâmetro z na instância e sobrescreva a propriedade title 
			com o valor "child class!".

			Sobrescreva o método sum() na classe derivada para exibir no 
			console uma mensagem formatada detalhando os valores somados, 
			utilizando super.sum() para reaproveitar a lógica de adição da 
			classe pai (Parent) somada a this.z.

		Instanciação e Testes:

			Crie uma instância da classe Parent (passando valores numéricos, 
			por exemplo, 1 e 2) e imprima o resultado do seu método 
			sum() no console.

			Crie uma instância da classe Child (passando valores como 1, 2 e 4)
			e chame o seu método sum() para validar a execução da 
			lógica estendida.
*/

function exercise_08(){

	class Parent{
		constructor(x,y){
			this.x = x;
			this.y = y;
			this.title = "parent class!";
		}

		sum(){
			return this.x + this.y;
		}
	}

	class Child extends Parent{
		constructor(x, y, z){
			super(x, y);
			this.z = z;
			this.title = "child class!";
		}

		sum(){
			console.log(`${this.x} + ${this.y} + ${this.z} = ${super.sum() + this.z}`);
		}
	}

	const p = new Parent(1,2);
	console.log(p.sum());
	const c = new Child(1,2,4);
	c.sum();
}

exercise_08();


/*
9 - Crie um programa em JavaScript que demonstre o uso da estrutura de dados Map, abordando 
a inserção de múltiplos tipos de dados, o uso de propriedades e métodos principais, a 
iteração de elementos e uma forma alternativa de inicialização.

	O programa deve seguir os seguintes requisitos:

		Primeira Função (exercise_09_1):

			Crie uma função chamada exercise_09_1 que instancie um novo Map 
			utilizando new Map().

			Utilize o método .set() para adicionar diferentes tipos de dados 
			associados a chaves em formato de string, incluindo: um número 
			inteiro (123), um número de ponto flutuante (1234.56), um booleano (true), 
			uma data atual (new Date()), uma função tradicional, uma arrow function, 
			null, NaN e undefined.

			Exiba no console o tamanho total do Map utilizando a propriedade .size e 
			recupere especificamente o valor da chave "date" utilizando 
			o método .get().

			Utilize um laço for...of para percorrer e exibir no console todas as 
			chaves e valores armazenados no Map.

			Adicione um novo elemento ao Map utilizando uma chave do tipo Symbol e 
			tente iterar novamente sobre o Map utilizando um bloco try...catch, 
			exibindo uma mensagem de tratamento no catch (por exemplo, informando que 
			o for gera um erro ao lidar com symbol, conforme o comportamento 
			demonstrado).

		Segunda Função (exercise_09_2):

			Crie uma segunda função chamada exercise_09_2 para demonstrar a inicialização 
			alternativa de um Map.

			Passe um array bidimensional contendo todos os pares de chave e valor descritos 
			anteriormente diretamente dentro do construtor new Map([...]).

			Utilize um laço for...of para percorrer e imprimir no console cada chave e 
			valor do mapa inicializado desta forma.
*/

function exercise_09_1(){
	/*
		Map: É uma estrutura de dados instroduzida no JS;
		
		Estrutura cujo seus objetos possuem par de chave e valor (Key/Value);
		
		Chaves em String ou Symbol;

		Principal utilizados:

			<MAP_OBJECT>.size;
			
			<MAP_OBJECT>.set();
			
			<MAP_OBJECT>.get();
	*/

	const map = new Map();
	map.set("number", 123);
	map.set("float", 1234.56);
	map.set("boolean", true);
	map.set("date", new Date());
	map.set("notation", function(){return true;});
	map.set("arrow", () => true);
	map.set("null", null);
	map.set("NaN", NaN);
	map.set("undefined", undefined);

	console.log(`Size: ${map.size}`);

	console.log(`Date: ${map.get("date")}`);

	// printing all items...
	for(let[k,v] of map){
		console.log(`${k}: ${v}`);
	}

	map.set("symbol", Symbol("symbol"));

	try{
		// printing all items...
		for(let[k,v] of map){
			console.log(`${k}: ${v}`);
		}
	}catch(error){
		console.log("Com symbol, o for da erro!");
	}
}

exercise_09_1();

function exercise_09_2(){
	
	// Outra forma de declarar Map:

	const map = new Map([
		["number", 123],
		["float", 1234.56],
		["boolean", true],
		["date", new Date()],
		["notation", function(){return true;}],
		["arrow", () => true],
		["null", null],
		["NaN", NaN],
		["undefined", undefined],
	]);

	// printing all items...
	for(let[k,v] of map){
		console.log(`${k}: ${v}`);
	}
}

exercise_09_2();


/*
10 - Crie um programa em JavaScript que demonstre o conceito de coleta de lixo 
(garbage collection) e a remoção de referências a objetos na memória. 

	O programa deve seguir os seguintes requisitos:

		Função Principal (exercise_10):

			Crie uma função chamada exercise_10.

			No escopo da função, declare uma variável chamada person utilizando 
			let e atribua a ela um objeto contendo a propriedade name com 
			o valor "Anderson".

			Exiba o objeto person no console.

			Remova a referência ao objeto atribuindo null à variável person 
			(indicando que o objeto anterior está elegível para o garbage 
			collector automático do JavaScript).

			Tratamento de Erro e Acesso a Propriedade:

			Utilize um bloco try...catch para tentar acessar tanto a representação 
			da variável quanto a sua propriedade name (ou seja, person e person.name) 
			após ter atribuído null.

			No bloco catch, capture o erro gerado ao tentar acessar a propriedade de um 
			valor nulo e exiba a mensagem do erro no console 
			(exibindo o texto formatado com error.message).
*/

function exercise_10(){
	// Pode ser garbage collected;

	// garbage collect em JS é automático

	let person = {
		name: "Anderson",
	};

	console.log(person);

	person = null;

	try{
		console.log(`person = ${person}`);
		console.log(`person.name ${person.name}`);
	}catch(error){
		console.log(`Error: ${error.message}`);
	}
}

exercise_10();

/*
11 - Crie um programa em JavaScript que demonstre o uso da estrutura de 
dados WeakMap, destacando suas principais características (como chaves 
obrigatórias do tipo objeto, ausência de iterabilidade e métodos de 
consulta) e formas de inicialização. O programa deve seguir os 
seguintes requisitos:

	Função Principal (exercise_11):

		Crie uma função chamada exercise_11.

		Crie múltiplos objetos vazios (por exemplo, de obj0 até obj8) 
		utilizando let ou const para servirem como chaves da estrutura.

		Primeira Forma de Declaração e Inserção:

			Instancie um novo WeakMap chamado map1 utilizando 
			new WeakMap().

			Utilize o método .set() para associar cada um dos objetos criados 
			a diferentes tipos de valores (número inteiro, número float, booleano, 
			objeto Date, função tradicional, arrow function, null, NaN e undefined).

			Recupere e exiba no console um dos valores armazenados utilizando 
			o método .get() (por exemplo, associado ao obj3).

		Segunda Forma de Declaração (Inicialização Direta):

			Crie um segundo WeakMap chamado map2 passando um array bidimensional 
			diretamente no construtor com os pares de objeto-chave e seus 
			respectivos valores.

			Recupere e execute diretamente uma função armazenada associada a uma 
			das chaves (por exemplo, chamando o retorno do .get() para 
			o obj4).

		Características do WeakMap:

			Lembre-se e reforce nos comentários ou na documentação que o WeakMap 
			exige que suas chaves sejam obrigatoriamente objetos e que ele não 
			pode ser iterado (não possui propriedades como .size ou métodos 
			de loop como for...of).
*/

function exercise_11(){

	/*
		WeakMap:

		Identico ao Map() object;

		Key deverá ser um objeto;

		Não pode ser iterado e nem limpo;

	*/
	
	let obj0 = {};
	let obj1 = {};
	let obj2 = {};
	let obj3 = {};
	let obj4 = {};
	let obj5 = {};
	let obj6 = {};
	let obj7 = {};
	let obj8 = {};

	// forma de declarar WeakMap:

	const map1 = new WeakMap();
	map1.set(obj0, 123);
	map1.set(obj1, 1234.56);
	map1.set(obj2, true);
	map1.set(obj3, new Date());
	map1.set(obj4, function(){return true;});
	map1.set(obj5, () => true);
	map1.set(obj6, null);
	map1.set(obj7, NaN);
	map1.set(obj8, undefined);

	console.log(map1.get(obj3));

	// Outra forma de declarar WeakMap:
	
	const map2 = new WeakMap([
		[obj0, 123],
		[obj1, 1234.56],
		[obj2, true],
		[obj3, new Date()],
		[obj4, function(){return true;}],
		[obj5, () => true],
		[obj6, null],
		[obj7, NaN],
		[obj8, undefined],
	]);

	console.log(map2.get(obj4)());
}

exercise_11();

/*
12 - Crie um programa em JavaScript que demonstre o uso das estruturas de 
dados Set e WeakSet, abordando formas de declaração, adição de valores de 
múltiplos tipos, iteração e as restrições inerentes aos objetos WeakSet. 
O programa deve seguir os seguintes requisitos:

	Primeira Função (exercise_12_1 - Uso do Set):

		Crie uma função chamada exercise_12_1.

		Demonstre a criação de um Set chamado set1 utilizando new Set() e o 
		método .add() para inserir vários tipos de dados (número inteiro, 
		número float, booleano, objeto Date, função tradicional, arrow function, 
		null, NaN e undefined).

		Exiba o conjunto no console e utilize um laço for...of combinado com 
		.entries() para iterar e imprimir cada valor junto com o seu respectivo 
		tipo de dado (obtido via typeof).

		Demonstre uma forma alternativa de inicialização criando um set2 
		passando um array diretamente no construtor new Set([...]) com 
		os mesmos valores, iterando e imprimindo os resultados da 
		mesma forma.

	Segunda Função (exercise_12_2 - Uso do WeakSet):

		Crie uma segunda função chamada exercise_12_2 para demonstrar o uso do
		WeakSet.

		Lembre-se da restrição fundamental de que o WeakSet aceita apenas 
		objetos ou funções como valores, lançando um erro caso tipos 
		primitivos sejam adicionados.

		Instancie um WeakSet chamado set1 utilizando o método .add() apenas para 
		valores válidos (como um novo Array, uma instância de Date, uma função 
		tradicional e uma arrow function), evitando tipos primitivos como números, 
		booleanos, null, NaN ou undefined.

		Demonstre a inicialização direta de um segundo WeakSet chamado set2 
		passando um array com valores válidos (objetos e funções) diretamente 
		em seu construtor.

	Exiba os WeakSets no console e certifique-se de remover qualquer loop de iteração 
	(como for...of ou métodos como .entries()), pois o WeakSet não é iterável e não possui 
	propriedades como .size.
*/

function exercise_12_1(){

	/*
		Set
	*/
	
	// forma de declarar Set:

	const set1 = new Set();
	set1.add(123);
	set1.add(1234.56);
	set1.add(true);
	set1.add(new Date());
	set1.add(function(){return true;});
	set1.add(() => true);
	set1.add(null);
	set1.add(NaN);
	set1.add(undefined);

	console.log(set1);

	for(let[k,v] of set1.entries()){
		console.log(`- ${v} = ${typeof v}`);
	}

	// Outra forma de declarar Set:
	
	const set2 = new Set([
		123,
		1234.56,
		true,
		new Date(),
		function(){return true;},
		() => true,
		null,
		NaN,
		undefined,
	]);

	for(let[k,v] of set2.entries()){
		console.log(`- ${v} = ${typeof v}`);
	}

	console.log(set2);
}

exercise_12_1();


function exercise_12_2(){

	/*
		WeakSet sem quebrar o código, deve passar apenas 
		objetos ou funções, e remover os loops 
		de iteração.
	*/
	
	// forma de declarar WeakSet:

	const set1 = new WeakSet();
	/*
	set1.add(123);
	set1.add(1234.56);
	set1.add(true);
	*/
	set1.add(new Array())
	set1.add(new Date());
	set1.add(function(){return true;});
	set1.add(() => true);
	/*
	set1.add(null);
	set1.add(NaN);
	set1.add(undefined);
	*/

	console.log(set1);

	// Outra forma de declarar Set:
	
	const set2 = new WeakSet([
		/*
		123,
		1234.56,
		true,
		*/
		new Date(),
		function(){return true;},
		() => true,
		new Array(),
		/*
		null,
		NaN,
		undefined,
		*/
	]);

	console.log(set2);
}

exercise_12_2();

/*
13 - Crie um programa em JavaScript que demonstre o comportamento 
de operações matemáticas especiais (como divisão por zero) e o tratamento 
robusto de exceções utilizando blocos try...catch...finally, abordando
propriedades de erro como message, stack e name. O programa deve
seguir os seguintes requisitos:

	Função Principal (exercise_13):

		Crie uma função chamada exercise_13.

		Primeiro Bloco (Divisão por Zero):

			Utilize um bloco de escopo isolado para declarar duas variáveis
			numéricas (por exemplo, num1 = 10 e num2 = 0).

			Realize a divisão de num1 por num2 e exiba o resultado no 
			console (que resultará em Infinity).

		Segundo Bloco (Tratamento de Erros e Exceções):

			Utilize um segundo bloco de escopo contendo uma estrutura 
			try...catch...finally.

			Dentro do try, tente exibir no console uma variável que não 
			foi declarada (por exemplo, name).

			No bloco catch(error), capture a exceção e exiba no console 
			três propriedades principais do objeto de erro:

				error.message (exibindo a descrição amigável do erro, como 
				"name is not defined");

				error.stack (exibindo o rastreamento da pilha de execução);

				error.name (exibindo o tipo do erro, como "ReferenceError").

			No bloco finally, garanta que uma mensagem de encerramento (por exemplo, 
			"finished!") seja sempre exibida no console, independentemente do 
			sucesso ou falha do bloco try.
*/

function exercise_13(){

	{
		let num1 = 10;
		let num2 = 0;
		let r = num1 / num2;
		console.log(r); // Infinity
	}

	{
		try{
			// let name = "Anderson";
			console.log(name);
		}catch(error){
			console.log(error.message); // name is not defined  
			console.log(error.stack);
			/*
				ReferenceError: name is not defined                                               
			    at exercise_13 (C:\Users\Anderson\Desktop\exercicios_js\main.js:748:16)       
			    at Object.<anonymous> (C:\Users\Anderson\Desktop\exercicios_js\main.js:763:1) 
			    at Module._compile (node:internal/modules/cjs/loader:1934:14)                 
			    at Object..js (node:internal/modules/cjs/loader:2074:10)                      
			    at Module.load (node:internal/modules/cjs/loader:1656:32)                     
			    at Module._load (node:internal/modules/cjs/loader:1448:12)                    
			    at wrapModuleLoad (node:internal/modules/cjs/loader:261:19)                   
			    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:154:5)                                                                             
			    at node:internal/main/run_main_module:33:47   
			*/
			console.log(error.name);  // ReferenceError  
		}finally{
			console.log("finished!");
		}
	}
}

exercise_13();

/* 
14 - Crie um programa em JavaScript que demonstre o uso de Expressões 
Regulares (RegExp) aplicadas à manipulação de strings, abrangendo padrões 
de busca, correspondência, substituição e extração iterativa com o método exec. 

	O programa deve seguir os seguintes requisitos:

		Função Principal (exercise_14):
		
			Crie uma função chamada exercise_14.
			Defina uma string de exemplo chamada text contendo 
			diversos valores monetários com diferentes espaçamentos e sinais 
			
			(por exemplo: "Lorem ipsum R$ 1000 dolor sit amet, consectetur 
			R$500 adipiscing elit, sed do R$ 100 eiusmod R$2000 tempor 
			incididunt R$ 750 ut labore et dolore R$-1432 magna aliqua.").
			
			Primeiro Bloco (Correspondências com .match):
			
				Utilize padrões de RegExp para encontrar ocorrências de valores 
				monetários na string:Um padrão que exija espaço obrigatório após 
				a sigla (por exemplo, /R$ (\d+)/g) e teste o uso de new 
				RegExp(pattern) combinado com text.match(pattern).
				
				Um padrão que torne o espaço opcional utilizando o caractere \s? 
				(por exemplo, /R$\s?(\d+)/g) para capturar valores com ou sem espaço 
				(como "R$ 1000" e "R$500").
				
			Segundo Bloco (Busca de Posição com .search):
			
				Utilize o método .search() com uma expressão regular específica 
				(por exemplo, /R$\s?100/g) para localizar o índice da primeira 
				ocorrência correspondente dentro da string.
				
			Terceiro Bloco (Substituição com .replace):
			
				Utilize o método .replace() com uma RegExp global para substituir 
				todas as ocorrências da sigla "R$" por "US$" na string, exibindo 
				o resultado formatado no console.
				
				Quarto Bloco (Extração Iterativa com .exec):Utilize um laço while 
				combinado com o método .exec() e o grupo de captura da 
				RegExp (/R$\s?(\d+)/g) para iterar sobre todas as correspondências 
				da string e extrair/imprimir individualmente apenas os valores 
				numéricos capturados (o grupo m[1]).
*/

function exercise_14(){

	let text = "Lorem ipsum R$ 1000 dolor sit amet, consectetur R$500 adipiscing elit, sed do R$ 100 \
	eiusmod R$2000 tempor incididunt R$ 750 ut labore et dolore R$-1432 magna aliqua. \
	";

	let pattern;

	{
		{
			pattern = /R\$ (\d+)/g;
			const regexp = new RegExp(pattern);
			console.log(text.match(pattern));
		}

		{
			pattern = /R\$\s?(\d+)/g;
			const regexp = new RegExp(pattern);
			console.log(text.match(pattern));
		}
	}

	{
		pattern = /R\$ (\d+)/g;
		console.log(text.match(pattern));
	}

	{
		pattern = /R\$\s?100/g;
		console.log(text.search(pattern)); // Lorem ipsum R$ 1000
	}

	{
		pattern = /R\$/g;
		console.log(text.replace(pattern, "US$")); // 

		/*
			Lorem ipsum US$ 1000 dolor sit amet, consectetur US$500 adipiscing 
			elit, sed do US$ 100     eiusmod US$2000 tempor incididunt US$ 750 
			ut labore et dolore US$-1432 magna aliqua.        
		*/
	}

	{
		// exec
		pattern = /R\$\s?(\d+)/g;
		let m;
		while((m = pattern.exec(text)) !== null){
			console.log(m[1]);
		}
	}
}

exercise_14();

/*
15 - O programa deve seguir os seguintes requisitos:

	Função Principal (exercise_15):

		Estrutura HTML de Referência:

			Dois elementos de parágrafo (<p>) identificados por IDs distintos 
			(por exemplo, id="paragraph1" e id="paragraph2").

			Manipulação do DOM e Seleção de Elementos:

				Utilize o método document.getElementById() para selecionar 
				ambos os parágrafos criados na estrutura HTML, armazenando-os 
				em variáveis (como p1 e p2).

			Diferenciação entre textContent e innerHTML:

				Atribua um texto simples utilizando textContent ao primeiro 
				elemento (p1), demonstrando que ele define apenas o texto puro e 
				ignora quaisquer tags HTML, além de ser mais seguro e 
				rápido.

				Atribua uma string contendo marcações de formatação HTML (como tags 
				de negrito, sublinhado e itálico, ex: "<b><u><i>Hello, World!</i></u></b>") 
				utilizando innerHTML ao segundo elemento (p2), demonstrando a 
				capacidade de injetar e renderizar estruturas HTML 
				dinamicamente.

			Considerações de Segurança (XSS):

				Adicione comentários detalhados explicando os riscos associados ao 
				uso de innerHTML (como vulnerabilidades a ataques de Cross-Site Scripting 
				ao inserir dados de usuários sem higienização, como a injeção 
				maliciosa de scripts) em comparação com a segurança proporcionada 
				por textContent.
*/

function exercise_15(){

	/*
		O DOM (Document Object Model, ou Modelo de Objeto do Documento): permite ao JavaScript ler 
		e manipular HTML.

		Browser pega todo o código HTML e constrói uma estrutura de árvore 
		na memória do computador. 

		Essa árvore de objetos que chamamos de DOM (Document Object Model).

		O DOM (Document Object Model, ou Modelo de Objeto do Documento) é uma 
		interface de programação para documentos HTML e XML.

		Para que serve o DOM no Navegador?
		O DOM funciona como uma ponte entre o HTML estático e as linguagens de 
		programação (principalmente o JavaScript).

		Sem o DOM, o JavaScript não teria como "enxergar" ou alterar o que 
		está acontecendo na tela. Com ele, o navegador permite manipular a 
		página em tempo real sem precisar recarregá-la.

		As principais utilidades do DOM no navegador são:

		1. Alterar Conteúdo e Texto
		2. Manipular Estilos (CSS)
		3. Reagir a Eventos do Usuário
		4. Adicionar ou Remover Elementos
	*/

	/*
	<!DOCTYPE html>
	<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>JS Advanced!</title>
	</head>
	<body>
		<p id="paragraph1"></p>
		<p id="paragraph2"></p>
		<!--
			textContent
			O que faz: Retorna ou define apenas o texto puro de um elemento e de todos os seus filhos, 
			ignorando completamente qualquer tag HTML.
			Segurança: É mais seguro contra ataques do tipo XSS (Cross-Site Scripting).
			É um pouco mais rápido porque não precisa analisar ou processar código HTML.

			innerHTML
			O que faz: Retorna ou define todo o conteúdo interno do elemento, incluindo as tags HTML 
			e a estrutura de marcação.
			Flexibilidade: Permite que você insira novos elementos HTML dinamicamente 
			(ex: el.innerHTML = "<strong>Novo texto</strong>").
			Riscos: Se você usar innerHTML para inserir dados que vêm diretamente do usuário 
			(como um campo de input) sem higienização, você abre brecha para falhas graves de segurança (XSS), 
			já que o navegador vai executar qualquer código HTML/JavaScript injetado.
		-->
		<script>

			let p1 = document.getElementById("paragraph1");
			let p2 = document.getElementById("paragraph2");

			p1.textContent = "Hello, World!";
			p2.innerHTML = "<b><u><i>Hello, World!</i></u></b>";

		</script>

	</body>
	</html>
	*/
}

exercise_15();

/*
16 - Crie um programa em JavaScript que demonstre a manipulação 
avançada do DOM e de elementos de formulário no navegador, 
abrangendo seleção de elementos com querySelector e querySelectorAll,
manipulação de estilos, alteração de propriedades de botões, manipulação 
de classes CSS (com add, remove, contains, toggle e className) e 
iteração sobre coleções de nós (NodeList). 

	O programa deve seguir os seguintes requisitos:

		Função Principal (exercise_16):

			Crie uma função chamada exercise_16.

			Estrutura HTML e CSS de Referência:

				Documente (através de comentários ou de um exemplo estruturado 
				dentro do código) um documento HTML completo que inclua:

					Uma seção  contendo formatações CSS para centralizar uma tabela, 
					estilizar campos de entrada (input de texto, data, select e number 
					com largura fixa de 600px e tamanho de fonte de 20px), criar uma 
					classe .button (com largura, altura e cursor pointer) e alinhar 
					elementos de rádio/botões.

					Um formulário contendo um cabeçalho "Register", campos numéricos e 
					de texto para "ID" e "Name", além de botões de reset e submit 
					organizados dentro de uma tabela.

			Um bloco contendo toda a lógica de manipulação e automação do DOM.

		Seleção de Elementos e Consultas:

			Utilize document.querySelector() para selecionar o formulário 
			dentro do container e capturar o botão de submit individualmente 
			através do seu ID (#btnSubmit).

			Utilize document.querySelectorAll() para selecionar todas as linhas 
			da tabela (tr) e armazená-las em uma NodeList, exibindo-as no 
			console.

		Manipulação de Propriedades, Estilos e Classes:

			Modifique o texto (value) do botão de submit para "SEND!", aplique 
			estilos de linha diretamente alterando a propriedade .style 
			(como cor de fundo verde e texto branco).

		Demonstre a manipulação da lista de classes do botão de submit utilizando
		os métodos:

			.classList.add("button") para adicionar a classe e verifique sua 
			presença com .classList.contains("button");

			.classList.remove("button") para removê-la;

			A atribuição direta de string utilizando .className = "button";

			O uso de .classList.toggle("button") para alternar o estado 
			da classe.

		Seleção Múltipla e Iteração com Laços:

			Selecione simultaneamente os botões de tipo submit e reset 
			utilizando um seletor composto em 
			document.querySelectorAll("input[type=submit], input[type=reset]").

		Utilize um laço for...of para percorrer a coleção de botões encontrada:

			Verifique se o botão é do tipo "submit" para alterar 
			seu valor para "SEND!!!".

			Verifique se o botão é do tipo "reset" para adicionar a 
			classe ".button", alterar seu valor para "RESET" e aplicar estilos 
			de linha personalizados (fundo cinza e texto branco).

		Eventos Básicos:

			Atribua uma função ao evento onclick do botão de submit para 
			exibir um alerta ("Submit!") ao ser acionado.
*/

function exercise_16(){
	/*
		<!DOCTYPE html>
		<html>
		<head>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<title>JS Advanced!</title>
			<style>
				table {
		            margin-top: 0%;
		            position: relative;
		            margin-left: 30%;
		        }

		        input[type=text], input[type=date], select, input[type=number]{
		        	width:600px;
		        	font-size: 20px;
		        }

		        .button{
		        	width:100px;
		        	height:30px;
		        	cursor:pointer;
		        }

		        .div_radio{
		        	text-align:right;
		        }
			</style>
		</head>
		<body>
			<div id="container">
				<form>
					<table>
						<tbody>
							<tr>
								<td><h2>Register</h2></td>
							</tr>
							<tr>
								<td><hr/></td>
							</tr>
							<tr>
								<td>ID:</td>
							</tr>
							<tr>
								<td><input type="number" id="id" name="id"></td>
							</tr>
							<tr>
								<td>Name</td>
							</tr>
							<tr>
								<td><input type="text" id="name" name="name"></td>
							</tr>
							<tr>
								<td><hr/></td>
							</tr>
							<tr>
								<td>
									<div style="text-align:right;">
										<input type="reset" id="btnReset" name="btnReset">
										<input type="submit" id="btnSubmit" name="btnSubmit">
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</form>
			</div>

			<script>
				
				let form = document.querySelector("#container > form");

				let trs = document.querySelectorAll("#container > form > table > tbody > tr");

				console.log(form);	// <form>...</form>		

				console.log(trs); // NodeList(8) [tr, tr, tr, tr, tr, tr, tr, tr]

				let submit = document.querySelector("#btnSubmit"); 
				console.log(submit); // <input type="submit" id="btnSubmit" name="btnSubmit">

				submit.onclick = function(){
					alert("Submit!");
				}

				submit.value = "SEND!";

				submit.style = "background-color:green;color:white;";


				submit.classList.add("button"); // <input type="submit" id="btnSubmit" name="btnSubmit" value="SEND!" class="button" style="background-color: green; color: white;">

				console.log(submit, submit.classList.contains("button"));

				submit.classList.remove("button");

				console.log(submit, submit.classList.contains("button"));

				submit.className = "button";

				console.log(submit, submit.classList.contains("button"));

				submit.classList.remove("button");

				submit.classList.toggle("button");

				console.log(submit, submit.classList.contains("button"));

				let buttons = document.querySelectorAll("input[type=submit], input[type=reset]");

				console.log(buttons);

				for(let b of buttons){
					if(b.type === "submit"){
						b.value = "SEND!!!";
					}

					if(b.type === "reset"){
						b.classList.add("button");
						b.value = "RESET";
						b.style = "background-color:gray; color:white;";
					}
				}

			</script>
		</body>
		</html>
	*/
}

exercise_16()

/*
17 - Crie um programa em JavaScript que demonstre diferentes formas
de estilizar elementos do DOM diretamente via script, abordando a
atribuição direta da string de estilo e a alteração de propriedades
CSS individuais via camelCase. O programa deve seguir os
seguintes requisitos:

	Função Principal (exercise_17):

		Crie uma função chamada exercise_17.

	Estrutura HTML de Referência:

		Documente um documento HTML completo que inclua:

		Uma estrutura básica HTML5 contendo um elemento container com 
		dois divs filhos identificados por IDs distintos 
		(id="square1" e id="square2").

		Um bloco contendo a lógica de estilização dinâmica dos elementos.

	Seleção e Estilização por Atribuição Direta (String):

		Utilize document.querySelector() para selecionar o primeiro 
		quadrado (#square1).

		Aplique múltiplos estilos de uma só vez atribuindo uma string completa 
		de regras CSS à propriedade .style (incluindo largura, cor de fundo laranja, 
		altura, borda sólida preta de 3px e arredondamento de bordas de 
		7px).

	Seleção e Estilização por Propriedades Individuais (CamelCase):

		Utilize document.querySelector() para selecionar o segundo 
		quadrado (#square2).

		Aplique os estilos de forma individual utilizando as propriedades específicas 
		em notação camelCase do objeto .style (como width, backgroundColor, height, 
		border e borderRadius, configurando largura de 300px, fundo verde, altura de 
		300px, borda preta de 5px e raio de borda de 3px).
*/

function exercise_17(){
	// 17. Styling DOM Element with JavaScript

	/*
		<!DOCTYPE html>
		<html>
		<head>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<title>JS Advanced!</title>
		</head>
		<body>
			<div id="container">
				<div id="square1">
				</div>

				<div id="square2">
				</div>
			</div>

			<script>
				let square1 = document.querySelector("#square1");
				square1.style = "width: 500px; background-color:orange; height: 500px; border: 3px solid black; border-radius: 7px;";

				let square2 = document.querySelector("#square2");
				square2.style.width = "300px"; 
				square2.style.backgroundColor = "green"; 
				square2.style.height = "300px"; 
				square2.style.border = "5px solid black"; 
				square2.style.borderRadius ="3px";
			</script>
		</body>
		</html>
	*/
}

exercise_17()


/*
18 - Crie um programa em JavaScript que demonstre a criação dinâmica
de nós (elementos HTML) utilizando o DOM, abrangendo a seleção de
múltiplos elementos, criação de tags com document.createElement(),
inserção na árvore com appendChild(), manipulação de atributos
com setAttribute() e removeAttribute(), e a aplicação de estilos
via CSS.

O programa deve seguir os seguintes requisitos:

	Função Principal (exercise_18):

		Crie uma função chamada exercise_18.

		Estrutura HTML e CSS de Referência:

			Utilize um documento HTML completo que inclua:

				Uma seção de estilos contendo uma classe .hello com formatações de 
				tamanho de fonte (25px), negrito, cor de fundo vermelha, 
				cor do texto branca e largura fixa (150px).

				Uma estrutura HTML contendo um elemento container principal 
				com duas divs filhas identificadas por IDs ou seletores 
				(id="row1" e id="row2").

				Um bloco de script contendo toda a lógica de criação dinâmica de nós.

		Seleção e Criação de Nós:

			Utilize document.querySelectorAll() para selecionar as linhas 
			filhas do container (#container > div) e armazená-las em uma 
			coleção (rows).

			Utilize document.createElement() para criar um novo elemento 
			de parágrafo (<p>), defina seu texto interno como "Hello, World!" 
			usando .textContent, e insira-o dentro da primeira linha 
			(rows[0]) utilizando o método .appendChild().

		Criação e Aninhamento de Elementos Dinâmicos:

			Crie uma nova div dinamicamente, defina o seu ID como "inner" 
			e crie também um elemento script contendo um comando de alerta 
			(ex: alert("Hello, World!");).

			Anexe o elemento script dentro da div "inner" utilizando .appendChild() 
			e, em seguida, insira essa estrutura completa dentro da segunda linha 
			(rows[1]).

		Manipulação de Atributos:

			Utilize o método .setAttribute() no parágrafo criado anteriormente 
			(p1) para definir os atributos de ID ("hello") e classe ("hello").

			Utilize o método .removeAttribute() para remover o atributo de ID 
			("id") do parágrafo, exibindo o elemento atualizado no console a 
			cada etapa.
*/

function exercise_18(){
	// 18. Create Dynamic Nodes with DOM

	/*
		<!DOCTYPE html>
		<html>
		<head>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<title>JS Advanced!</title>
			<style>
				.hello{
					font-size:25px;
					font-weight:bold;
					background-color:red;
					color:white;
					width:150px;
				}
			</style>
		</head>
		<body>
			<div id="container">
				<div id="row1">
				</div>
				<div id="row2">
				</div>
			</div>

			<script>
				// querying all...

				let rows = document.querySelectorAll("#container > div");
				console.log(rows);

				// creating tags...

				let p1 = document.createElement("p");
				p1.textContent = "Hello, World!";
				rows[0].appendChild(p1);

				// appendChild...

				let div = document.createElement("div");
				div.id = "inner";
				let script = document.createElement("script");
				script.textContent = "alert(\"Hello, World!\");";
				div.appendChild(script);
				rows[1].appendChild(div);
				console.log(rows[1]);

				// setting attributes...

				p1.setAttribute("id", "hello");
				p1.setAttribute("class", "hello");
				console.log(p1);

				// removing attributes...

				p1.removeAttribute("id");
				console.log(p1);
			</script>
		</body>
		</html>
	*/
}

exercise_18()

/*
19 - Crie um programa em JavaScript que demonstre o conceito e a
manipulação de Data Attributes (data-*) e da propriedade .dataset
no DOM, abordando a criação dinâmica de atributos personalizados,
a leitura de seus valores e a iteração sobre os dados armazenados.

O programa deve seguir os seguintes requisitos:

	Função Principal (exercise_19):

		Crie uma função chamada exercise_19.

		Estrutura HTML de Referência:

	Utilize um documento HTML completo que inclua:

		Uma estrutura básica HTML5 contendo um elemento container 
		com duas divs filhas identificadas por IDs distintos (id="div0" 
		e id="div1").

		Explicações teóricas detalhadas sobre o 
		que são Data Attributes, a regra de ouro de utilizar obrigatoriamente
		o prefixo data- para garantir a compatibilidade com o objeto .dataset, 
		e exemplos práticos de uso (como botões de exclusão ou configurações 
		de carrossel).

		Um bloco de script contendo toda a lógica de manipulação e leitura dos atributos 
		de dados.

	Seleção e Atribuição Dinâmica de Dataset:

		Utilize document.querySelectorAll() para selecionar as divs filhas 
		do container (#container > div) e armazená-las em uma 
		coleção.

		Utilize um laço de repetição para percorrer as divs e adicionar 
		dinamicamente atributos de dados personalizados utilizando 
		.setAttribute():

			Um atributo data-number contendo o índice atual do elemento;

			Um atributo data-name contendo uma string identificadora 
			(ex: "name-0", "name-1").

	Leitura e Iteração de Dados:

		Utilize um laço para percorrer os elementos e exibir no console 
		os valores dos datasets recuperados através da notação de ponto 
		(div.dataset.number e div.dataset.name).

		Demonstre como extrair e iterar sobre todos os valores de um 
		elemento específico utilizando Object.values() para imprimir 
		os valores salvos.

		Demonstre como iterar sobre todas as chaves e valores de um elemento 
		específico combinando Object.entries() com um laço for...of 
		(exibindo no formato chave: valor).
*/

function exercise_19(){

	/*
		<!DOCTYPE html>
		<html>
		<head>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<title>JS Advanced!</title>
		</head>
		<body>
			<div id="container">
				<div id="div0">
				</div>
				<div id="div1">
				</div>
			</div>

			<!--
				Em resumo, Data Attributes são atributos 
				personalizados que você cria nas tags HTML 
				para guardar informações "invisíveis" 
				que o seu JavaScript precisa usar.

				A regra de ouro é: sempre usar o prefixo data-.
				Se você tentar criar um atributo sem o prefixo data- 
				(por exemplo, <div usuario="123">), 
				o atributo não vai para o objeto .dataset do JavaScript e o HTML pode ser 
				considerado inválido pelos navegadores.
				
				Os Data Attributes (data-*) devem ser usados quando 
				você precisa armazenar dados personalizados diretamente no 
				elemento HTML para que o JavaScript (ou o CSS) possa consumi-los, 
				sem que esses dados interfiram na semântica da página ou 
				precisem ficar escondidos em variáveis globais do script.
				
				Exemplo 01: 
				Um botão de "Excluir" que precisa saber qual é o id do registro no banco: 
				<button data-id="42">Excluir</button>
				
				Exemplo 02: 
				Um carrossel de imagens que precisa definir o tempo de transição: 
				<div class="carousel" data-interval="3000">
			-->

			<script>
				let divs = document.querySelectorAll("#container > div");

				let index = 0;

				// creating dataset

				for(let div of divs){
					div.setAttribute(`data-number`, `${index}`);
					div.setAttribute(`data-name`, `name-${index}`);
					index++;
				}

				// printing dataset:

				for(let div of divs){
					console.log(`data-number: ${div.dataset.number}, data-name: ${div.dataset.name}`);
				}	

				// printing unique element's datasets:
				
				for(let value of Object.values(divs[0].dataset)){
					console.log(value);
				}

				for(let [k,v] of Object.entries(divs[0].dataset)){
					console.log(`${k}: ${v}`);
				}

			</script>
		</body>
		</html>
	*/
}

exercise_19()


/*
20 - Crie um programa em JavaScript que demonstre a manipulação 
de eventos no DOM (Event Listeners), abrangendo diferentes formas 
de escuta (propriedade onclick vs. addEventListener), manipulação 
de classes dinâmicas com eventos de mouse (mouseenter e mouseleave), 
controle de estado de botões e o uso de temporizadores (setTimeout e 
setInterval) para disparo programático de eventos. 

	O programa deve seguir os seguintes requisitos:

		Função Principal (exercise_20):

			Crie uma função chamada exercise_20.

		Estrutura HTML e CSS de Referência:

			Documente (através de comentários ou de um exemplo estruturado 
			dentro do código) um documento HTML completo que inclua:

				Uma seção  contendo formatações para botões padrão (cor, borda, 
				largura e altura com cursor pointer), classes de estilo para 
				múltiplos botões (.button1, .button2, .button3, .button4) e 
				classes de estado para um elemento de quadrado (.inactive e 
				.active).

				Uma estrutura HTML contendo um container com múltiplos botões de 
				tipos específicos (id="btn_hello", id="btn_goodbye", id="btn_date", 
				id="btn_enable") e um elemento de div (id="square").

				Um bloco  contendo toda a lógica de eventos e interatividade.

		Manipulação de Eventos Básicos e Modernos:

			Primeira Forma (onclick): Selecione o botão #btn_hello, defina seu 
			texto como "Hello!", adicione a classe .button1 e atribua uma função 
			diretamente à propriedade .onclick para exibir um alerta com 
			a mensagem "Hello, World!".

			Segunda Forma (addEventListener): Selecione o botão #btn_goodbye, 
			defina seu texto como "Goodbye!", adicione a classe .button2 e 
			utilize o método .addEventListener("click", ...), que é a forma 
			moderna e recomendada por permitir múltiplos ouvintes sem sobrescrever 
			os anteriores, para disparar um alerta com a mensagem 
			"Goodbye!".

		Manipulação de Eventos de Mouse (Square):

			Adicione inicialmente a classe .inactive ao elemento #square.

			Registre um ouvinte para o evento mouseenter no quadrado 
			para remover a classe .inactive e adicionar a classe .active, expandindo o 
			seu tamanho e alterando sua cor.

			Registre um ouvinte para o evento mouseleave para reverter o 
			estado, removendo .active e readicionando .inactive.

		Controle de Estado e Temporizadores (setTimeout e setInterval):

			Configure o botão #btn_date com a classe .button3 e o texto "Show Date!".

			Utilize uma variável de controle de estado (status = false) e implemente um 
			ouvinte de clique no botão #btn_enable (com a classe .button4 e texto inicial
			"Enable") que alterne o status (ativando/desativando), mude o seu próprio 
			texto de acordo com o estado ("Enable" ou "Disable") e atualize o 
			texto do #btn_date.

			Utilize setTimeout para disparar o clique programático no botão #btn_date 
			após 1 segundo, e setInterval para continuar disparando atualizações periódicas a 
			cada 1 segundo.
*/

function exercise_20(){

	/*
		<!DOCTYPE html>
		<html>
		<head>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<title>JS Advanced!</title>
			<style>
				button{
					color:white;
					border: 2px solid white;
					border-radius: 5px;
					width:130px;
					height:40px;
					cursor:pointer;
				}
				
				.button1{
					background-color:green;
				}

				.button2{
					background-color:red;
				}

				.button3{
					background-color:blue;
					width:300px;
					height:80px;
				}

				.button4{
					background-color:gray;
					width:80px;
					height:80px;
				}

				.inactive{
					width:200px;
					height:200px;
					border:1px solid black;
					background-color:red;
					cursor:text;
				}

				.active{
					width:500px;
					height:500px;
					border:3px solid black;
					background-color:green;
					cursor:text;
				}

			</style>
		</head>
		<body>
			<div id="container">
				<button type="button" id="btn_hello"></button><br><br>
				<button type="button" id="btn_goodbye"></button><br><br>	
				<button type="button" id="btn_date"></button><button type="button" id="btn_enable" class="button4"></button><br><br>

				<div id="square"></div><br>
			</div>
			<script>
				// creating event: forma 01

				let button1 = document.querySelector("#btn_hello");
				button1.textContent = "Hello!"
				button1.classList.add("button1");
				
				button1.onclick = function(){
					alert("Hello, World!");
				};

				// creating event: forma 02

				let button2 = document.querySelector("#btn_goodbye");
				button2.textContent = "Goodbye!"
				button2.classList.add("button2");

				
				// Utilizando o addEventListener()

				//	Forma recomendada e moderna de escutar eventos em JavaScript! 

				//	Permite adicionar múltiplos ouvintes ao mesmo elemento 
				//	sem sobrescrever os anteriores.
				
				button2.addEventListener("click", () =>{
					alert("Goodbye!");
				});


				// active/inactive square:

				document.querySelector("#square").classList.add("inactive");

			 	let square = document.querySelector("#square");
			 	square.addEventListener("mouseenter", () => {
			 		square.classList.remove("inactive");
			 		square.classList.add("active");
			 	});

			 	square.addEventListener("mouseleave", () => {
			 		square.classList.remove("active");
			 		square.classList.add("inactive");
			 	});

			 	// btn_date:

			 	let button3 = document.querySelector("#btn_date");
			 	button3.classList.add("button3");
			 	button3.textContent = "Show Date!";

			 	let status = false;

			 	button3.addEventListener("click", () => {
			 		if(status){
			 			button3.innerHTML = `<br>${new Date().toLocaleString()}</b>`;
			 		}else{

			 		}
			 	});

			 	setTimeout(() =>{
		 			button3.click();
		 		}, 1000);

			 	setInterval(() =>{
		 			button3.click();
		 		}, 1000);

		 		document.querySelector("#btn_enable").textContent = "Enable";

		 		document.querySelector("#btn_enable").addEventListener("click", function(){
		 			status = !status;
		 			this.textContent = status == true ? "Disable" : "Enable";
		 			button3.textContent = (status == false) ? "Show Date!" : new Date().toLocaleString(); 
		 		});
			 	
			</script>
		</body>
		</html>
	*/
}

exercise_20()

/*
21 - Crie um programa em JavaScript que demonstre o comportamento 
de propagação de eventos no DOM (como bubbling e o uso de 
event.stopPropagation()) e o gerenciamento de eventos de foco 
(focusin, focusout e focus), além de escopos com carregamento 
dinâmico de funções via mouseenter. O programa deve seguir 
os seguintes requisitos:

	Função Principal (exercise_21):

		Crie uma função chamada exercise_21.

		Estrutura HTML e CSS de Referência:

			Documente (através de comentários ou de um exemplo estruturado 
			dentro do código) um documento HTML completo que inclua:

			Uma seção  contendo formatações para botões estilizados 
			(largura, altura, cor do texto e cursor pointer) e classes de
			cores distintas para elementos (.parent, .child1, .child2).

			Uma estrutura HTML dividida em dois containers principais 
			(id="container1" para demonstração de bubbling/captura e 
			id="container2" para foco), cada um contendo elementos 
			aninhados (#parent, #child1, #child2) e botões de disparo 
			de ações correspondentes.

			Um bloco  contendo toda a lógica de manipulação e propagação 
			de eventos.

		Primeira Rotina (capture_and_bubbling):

			Crie uma função interna chamada capture_and_bubbling() que selecione 
			os elementos de parent e children do primeiro container.

			Adicione ouvintes de clique utilizando addEventListener() para 
			registrar mensagens no console quando forem acionados.

			Demonstre o controle de fluxo de eventos utilizando o método 
			event.stopPropagation() em um dos filhos (child2) para interromper 
			a propagação (bubbling) para o elemento pai.

			Configure botões de disparo programático (.click()) vinculados aos 
			elementos para testar a execução das rotinas.

		Segunda Rotina (focusin_and_focusout):

			Crie uma função interna chamada focusin_and_focusout() que 
			selecione os elementos do segundo container.

			Adicione ouvintes para os eventos focusin e focusout no elemento pai,
			e eventos focus nos elementos filhos, registrando mensagens descritivas 
			no console quando os elementos ganham ou perdem o foco.

			Configure botões de disparo programático para simular as interações.

		Gerenciamento Dinâmico de Ouvintes por Mouseenter:

			Utilize ouvintes de mouseenter nos containers principais para 
			carregar dinamicamente a rotina correspondente (capture_and_bubbling ou 
			focusin_and_focusout) e remover os ouvintes da outra rotina 
			utilizando removeEventListener().
*/

function exercise_21(){

	/*
		<!DOCTYPE html>
		<html>
		<head>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<title>JS Advanced!</title>
			<style>

				button{
					width:140px;
					height:40px;
					color:white;
					font-wight:bold;
					font-size:20px;
					cursor:pointer;
				}

				.parent{
					background-color:red;
				}

				.child1{
					background-color:green;
				}

				.child2{
					background-color:blue;
				}

			</style>
		</head>
		<body>
			<div id="container1">
				<h1>capture_and_bubbling_(default)</h1>
				<div id="parent">
					<div id="child1"></div>
					<div id="child2"></div>
				</div>

				<button id="btn_child1" class="child1">child1</button>
				<button id="btn_child2" class="child2">child2</button>
				<br><br>
				<button id="btn_parent" class="parent">parent</button>
			</div>

			<hr>

			<div id="container2">
				<h1>focusin_and_focusout</h1>
				<div id="parent">
					<div id="child1"></div>
					<div id="child2"></div>
				</div>

				<button id="btn_child1" class="child1">child1</button>
				<button id="btn_child2" class="child2">child2</button>
				<br><br>
				<button id="btn_parent" class="parent">parent</button>
			</div>

			<script>
				function capture_and_bubbling(){
					let p  = document.querySelector("#parent");
					let c1 = document.querySelector("#child1");
					let c2 = document.querySelector("#child2");
					
					p.addEventListener("click", function(){
						console.log("parent!");
					});

					c1.addEventListener("click", function(){
						console.log("child 01!");
					});

					c2.addEventListener("click", function(event){
						console.log("child 02!");
						event.stopPropagation();
					});

					document.querySelector("#btn_parent").addEventListener("click", () => {
						p.click();
					});

					document.querySelector("#btn_child1").addEventListener("click", () => {
						c1.click();
					});

					document.querySelector("#btn_child2").addEventListener("click", () => {
						c2.click();
					});
				}

				function focusin_and_focusout(){
					let p  = document.querySelector("#parent");
					let c1 = document.querySelector("#child1");
					let c2 = document.querySelector("#child2");
					
					p.addEventListener("focusin", function(){
						console.log("parent ganhou foco!");
					});

					p.addEventListener("focusout", function(){
						console.log("parent perdeu foco!");
					});

					c1.addEventListener("focus", function(){
						console.log("child 01 focus!");
					});

					c2.addEventListener("focus", function(event){
						console.log("child 02 focus!");
					});

					document.querySelector("#btn_parent").addEventListener("click", () => {
						p.click();
					});

					document.querySelector("#btn_child1").addEventListener("click", () => {
						c1.click();
					});

					document.querySelector("#btn_child2").addEventListener("click", () => {
						c2.click();
					});
				}

				let container1 = document.querySelector("#container1");
				let container2 = document.querySelector("#container2");

				container1.addEventListener("mouseenter", () => {
					container2.removeEventListener("mouseenter", focusin_and_focusout);
					capture_and_bubbling();
				});

				container2.addEventListener("mouseenter", () => {
					container1.removeEventListener("mouseenter", capture_and_bubbling);
					focusin_and_focusout();
				});
			</script>
		</body>
		</html>
	*/
}

exercise_21()

/* Referente ao estudo sobre jQuery */
function exercise_22(){
	// jquery!
}

exercise_22();

/*
23 - Crie um programa em JavaScript que demonstre o uso de módulos
em Node.js, abordando a diferença conceitual e prática entre os
sistemas CommonJS (utilizando module.exports e require) e ECMAScript
Modules (ESM, utilizando export e import), além de destacar regras de
escopo e boas práticas de extensão (.js vs .mjs).

O programa deve seguir os seguintes requisitos:

	Contextualização e Regras de Módulos:

		Estabeleça as principais restrições e regras ao utilizar módulos em JavaScript:

			A regra fundamental de que declarações import não podem ser colocadas 
			dentro de funções, devendo obrigatoriamente ficar no escopo global 
			(topo do arquivo).

			A recomendação de padronizar a extensão dos arquivos do projeto 
			(utilizando .js para o sistema tradicional CommonJS com require, e .mjs 
			para o padrão moderno ESM com import).

			Exemplo 1: Módulo CommonJS:

				Estruture um arquivo de módulo tradicional (por exemplo, module-cjs.js) 
				que exporte uma função de saudação utilizando 
				module.exports = { greeting }.

				Implemente a importação e execução dessa função utilizando require() 
				dentro de uma função exercise_23_1().

			Exemplo 2: Módulo ECMAScript (ESM) e Importação Global:

				Estruture um arquivo ESM (por exemplo, module-esm.mjs) que 
				declare e exporte funções (como sum e greeting) utilizando export.

		Implemente no escopo global do arquivo principal a importação dessas funções utilizando 
		import { sum, greeting } from "./module-esm.mjs";.

	Crie uma função chamada exercise_23_2() que utilize as funções importadas 
	(executando a soma de dois números e chamando a saudação com um nome, como "Anderson") 
	e chame-a em seguida.
*/

/*
	O erro principal no seu código atual é que declarações import não podem ser 
	colocadas dentro de funções. No JavaScript, o comando import precisa 
	obrigatoriamente ficar no escopo global (topo do arquivo).

	Dica de ouro: Escolha um dos dois padrões para usar no seu projeto inteiro 
	e mantenha todos os arquivos com a mesma extensão 
	(.js com .js, ou .mjs com .mjs). Misturar os dois sem a devida 
	configuração causa o erro que você enfrentou.

	Use .js para o sistema tradicional (CommonJS com require) e .mjs 
	para o padrão moderno do JavaScript (ES Modules com import).

	const e import: só funcionará, um ou outro!
*/

/*
	# module-cjs.js

	function greeting(name){
		console.log(`Hello, ${name}!`);
	}

	module.exports = { greeting };

*/

/*
const { greeting } = require("./module-cjs.js");
function exercise_23_1(){
	greeting("Anderson");
}
exercise_23_1();
*/


/*
	# module-esm.mjs

	function sum(x,y){
		console.log(`${x} + ${y} = ${x + y}`);
	}

	export function greeting(name){
		console.log(`Hello, ${name}!`);
	}

	export { sum };

*/

import { sum, greeting } from "./module-esm.mjs";

function exercise_23_2(){
	sum(10,3);
	greeting("Anderson");
}

exercise_23_2();

/*
24 - Crie um programa em JavaScript que demonstre as restrições,
políticas de segurança (CORS) e boas práticas ao carregar módulos ECMAScript (ESM)
diretamente no navegador, abordando a necessidade de um servidor local, o uso
do atributo type="module", e cuidados com extensões e cache.

	O programa deve seguir os seguintes requisitos:

		Função Principal (exercise_24):

			Crie uma função chamada exercise_24.

			Estrutura HTML e Comportamentos de Carregamento de Módulos no Navegador:

				Estruture um documento HTML completo que inclua:

					Uma primeira tag <script type="module"> demonstrando uma tentativa 
					inválida de utilizar CommonJS (require) no navegador, gerando erro.

					Explicações teóricas detalhadas explicando as políticas de 
					segurança do CORS que bloqueiam importações via protocolo 
					file:// (ao abrir o arquivo HTML direto do computador), 
					exigindo obrigatoriamente a execução através de um servidor local 
					(protocolo http:// ou https://, como o Live Server).

			Uma segunda tag <script type="module"> demonstrando a forma correta de c
			arregar módulos no navegador utilizando exclusivamente o padrão ESM 
			(import { sum } from "./module-esm.mjs";).

			Uma terceira tag <script type="module" src="./execute.js"> demonstrando a 
			prática recomendada de chamar um arquivo externo dedicado a orquestrar 
			os módulos.

		Cuidados Essenciais no Carregamento de Arquivos:

			Ao trabalhar com módulos no navegador, atente-se rigorosamente ao uso de 
			servidor local, extensões obrigatórias, atributo type="module", 
			gerenciamento de cache e isolamento de escopo.
*/

function exercise_24(){

	/*
		<!DOCTYPE html>
		<html>
		<head>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<title>JS Advanced!</title>
		</head>
		<body>
			<script type="module">

				// carregando...

				//ERRO!
				//const { greeting } = require("./module-cjs.js");
				//greeting("Anderson");

			</script>

			<!-- 
				Quando você tenta carregar módulos JavaScript (type="module" com 
				import) abrindo o arquivo HTML diretamente do seu computador 
				(usando o protocolo file://), o navegador bloqueia a importação 
				por conta das políticas de segurança do CORS, exigindo que o projeto 
				seja executado através de um servidor local 
				(com o protocolo http:// ou https://).

				Então por isso, que o navegador bloqueia os seus import quando 
				você abre o arquivo HTML direto do computador (file://), mas 
				tudo funciona perfeitamente quando você usa um servidor local (http://), 
				pois ele contorna essa restrição de segurança do CORS!
			-->

			<script type="module">

				// carregando...

				// No navegador, você deve usar apenas import e export

				import { sum } from "./module-esm.mjs";

				sum(10,3);
			</script>

			<!-- 
				Cuidados ao carregamento de arquivos:

					Use servidor local: Nunca abra arquivos com file://; use sempre o Live Server (http://).

					Extensão obrigatória: Sempre informe a extensão no import (ex: ./modulo.js).

					Atributo type="module": É obrigatório na tag <script> do HTML.

					Cuidado com o cache: Limpe o cache do navegador (Ctrl + F5) se as alterações não aparecerem.

					Escopo isolado: Variáveis de módulos não vão para o escopo global (window) automaticamente.
			-->


			<!-- chamando um arquivo que chamara o(s) modulo(s). -->
			<script type="module" src="./execute.js"></script>
		</body>
		</html>
	*/
}

exercise_24();

/*
25 - Crie um programa em JavaScript que demonstre requisições HTTP 
assíncronas no navegador, abordando a API tradicional XMLHttpRequest, 
a moderna API Fetch baseada em Promises e a abordagem elegante com 
Async/Await, além de tratamento de erros, métodos GET/POST e 
prevenção de cache. 

	programa deve seguir os seguintes requisitos:

		Função Principal (exercise_25):

			Crie uma função chamada exercise_25.

			Estrutura HTML e Contextualização de Ambiente:

			Inclua um documento HTML completo estruturado no código que contenha:

				Uma nota teórica explicando que a API XMLHttpRequest é específica 
				de navegadores (DOM) e não existe nativamente no ambiente global 
				do Node.js.

				Uma estrutura contendo um container (div_people) para exibição de 
				dados.

				Um bloco  contendo três implementações distintas de requisições 
				assíncronas.

		Primeira Rotina (xmlhttprequest_exec - XMLHttpRequest Tradicional):

			Crie uma função interna chamada xmlhttprequest_exec() contendo 
			funções get() e set().

			Na função set(), utilize XMLHttpRequest para realizar uma requisição POST 
			para people.json, configurando o cabeçalho Content-type para 
			application/json;charset=utf-8;, enviando um objeto JSON convertido via 
			JSON.stringify(), e tratando o evento onreadystatechange para verificar 
			readyState === 4 e status === 200.

			Na função get(), realize uma requisição GET adicionando um parâmetro dinâmico 
			para evitar cache (ex: people.json?_=${new Date().getTime()}), configurando 
			timeout de 5 segundos e exibindo o resultado responseText na div 
			correspondente.

		Segunda Rotina (fetch_exec - Fetch API com Promises):

			Crie uma função interna chamada fetch_exec() contendo funções get() 
			e set().

			Utilize a função fetch() para requisições GET e POST, encadeando métodos 
			.then() para tratar a resposta (response.ok), converter os dados para JSON 
			e lidar com exceções através de .catch(), capturando diferentes tipos 
			de erros (TimeoutError, AbortError, TypeError).

		Terceira Rotina (async_await_exec - Fetch com Async/Await):

			Crie uma função interna chamada async_await_exec() contendo funções 
			assíncronas get() e set().

			Utilize a sintaxe moderna async/await combinada com blocos try...catch para 
			simplificar a leitura e o tratamento de erros em requisições GET e POST 
			utilizando o fetch.

	Execução:
		Forneça as chamadas para as três abordagens (xmlhttprequest_exec(), fetch_exec(), 
		async_await_exec());
*/

function exercise_25(){

	/*
	<!DOCTYPE html>
	<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>JS Advanced!</title>
	</head>
	<body>
		<!-- 
			O XMLHttpRequest é uma API específica dos navegadores (DOM). Como o Node.js roda 
			fora do navegador (no servidor), o objeto XMLHttpRequest não existe nativamente 
			no ambiente global dele.
			
			ver as possibilidade de se rodar no node;
			
			os exemplos, serao feitos via browser;
		-->

		<div id="container">
			<div id="div_people"></div>
		</div>

		<script>

			function xmlhttprequest_exec(){

					function get(){

					const xmlhttp = new XMLHttpRequest();

					let div = document.querySelector("#div_people");

					xmlhttp.onreadystatechange = function(){
						if(this.readyState === 4){
							if(this.status === 200){
								div.textContent = this.responseText;
							}else{
								console.log("loading error.");
							}
						}
					}

					xmlhttp.timeout = 5000;
					xmlhttp.ontimeout = () => console.log("timeout!");
					xmlhttp.onerror = () => console.log("operation error!");

					//	três argumentos principais:

					//		"GET" (Método HTTP): Define que o objetivo da requisição 
					//		é buscar dados do servidor, sem modificá-los. É o método 
					//		padrão para leitura de recursos.

					//		A URL (people.json?_=${new Date().getTime()}): O endereço 
					//		do recurso que você deseja buscar, mas com um detalhe 
					//		crucial no final.

					//		true (Modo Assíncrono): É o terceiro argumento (muitas 
					//		vezes omitido porque true já é o padrão). Ele instrui 
					//		o navegador a executar a requisição em segundo plano, 
					//		permitindo que o restante do código continue rodando 
					//		sem travar a interface da página enquanto a resposta 
					//		não chega.
					
					let link = `people.json?_=${new Date().getTime()}`;
					console.log(link);

					xmlhttp.open("GET", link, true);
					xmlhttp.send();
				}
				

				function set(){

					const xmlhttp = new XMLHttpRequest();

					// tratamento de eventos:

					xmlhttp.onreadystatechange = function(){
						if(this.readyState === 4){
							if(this.status === 200){
								console.log("Successfully created.");
								get(); // getting
							}else{
								console.log("creating error.");
							}
						}
					}

					xmlhttp.timeout = 5000;
					xmlhttp.ontimeout = () => console.log("timeout!");
					xmlhttp.onerror = () => console.log("operation error!");

					// data to inclusion:

					const data = {
						id: 777,
						name: "Person 01",
					};

					xmlhttp.open("POST", "people.json", true);
					xmlhttp.setRequestHeader("Content-type","application/json;charset=utf-8;");
					xmlhttp.send(JSON.stringify(data));
				}

				set();
			}
			
			function fetch_exec(){

				function get(){

					fetch("people.json")
					.then((response) => {
						if(!response.ok)
							throw new Error(`Getting error: ${response.status}.`);
						return response.json();
					})
					.then((data) => {
						for(let d of data){
							console.log(d);
						}
					})
					.catch((error) => {
						console.log(error);
					});
				}

				function set(){

					let data = {
						id: 999,
						name: "Person 01"
					};

					fetch("people.json", {
						method: "POST",
						headers: {"Content-type": "application/json;charset=utf-8"},
						body: JSON.stringify(data),
					})
					.then((response) => {

						if(!response.ok){
							throw new Error(`Posting error: ${response.status}.`);
						}

						return response.json();
					})
					.then((data) => {

						console.log("Successfully created.");
						
						get();

					})
					.catch((error) => {
						
						console.log(error)
						
						console.log(error.name); // getting name error.

						// tratando erros:

						//	switch (erro.name) {
					    //  	case 'TimeoutError':
					    //			break;
					    
					    //  	case 'AbortError':
					    //			break;

					    //  	case 'TypeError':
					    //   		break;

					    //  	default:
					    //    		console.error('Erro inesperado:', erro.message);
					    //    		break;
					});
				}

				set();
			}

			function async_await_exec(){

				async function get(){

					try{
						const response = await fetch("people.json");

						if(!response.ok){
							throw new Error(`Getting data error: ${response.status}.`);
						}

						const data = await response.json();

						for(let d of data){
							console.log(d);
						}

					}catch(error){
						console.log(error);

						//if (error.name === 'TimeoutError') {
			            //    console.log('Timeout: A requisição demorou muito para responder.');
			            //} else if (error.name === 'TypeError') {
			            //    console.log('Erro de rede: Falha de conexão ou arquivo não encontrado.');
			            //} else {
			            //    console.log('Erro geral:', error.message);
			            //}
					}
				}

				async function set(){

					try{

						const person = {
							id:999,
							name: "Person 01"
						}

						const response = await fetch("people.json", {
							headers: {"Content-type": "application/json;charset=UTF-8"},
							async: true,
							method: "POST",
							body: JSON.stringify(person)
						});

						if(!response.ok){
							throw new Error(`Posting data error: ${response.status}.`);
						}

						console.log("Successfully created.");

						get();

					}catch(error){
						console.log(`${error.name}: ${error.message}`);
					}
				}
				set();
			}

			// xmlhttprequest_exec();
			// fetch_exec();
			//async_await_exec();
		</script>
	</body>
	</html>
	*/
}

exercise_25();
