/**********************************************************************/
/* Object Oriented Programming                                       */
/**********************************************************************/

function object_oriented_demo() {

    /*
    ------------------------------------------------------------
    Constructor function / Prototype
    ------------------------------------------------------------
    */

    {
        function Person(id, name) {

            this.id = id;
            this.name = name;
        }


        Person.prototype.toString = function () {

            return `ID: ${this.id}, Name: ${this.name}`;
        };


        const person = new Person(
            123,
            "Anderson"
        );

        console.log(person.toString());
    }


    /*
    ------------------------------------------------------------
    Object Literal
    ------------------------------------------------------------
    */

    {
        let person = {
            id: 123,
            name: "Anderson",
            get_data: function(){
                return `ID: ${this.id}, Name: ${this.name}`;
            }
        };

        console.log(person.get_data());
    }


    /*
    ------------------------------------------------------------
    Classes
    ------------------------------------------------------------
    */

    {

        class Person {

            #id;
            #name;

            static #cont = 0;


            constructor(id, name) {

                this.#id = id;
                this.#name = name;

                Person.increment();

                this.#log_message(
                    "object created."
                );
            }


            static increment() {

                Person.#cont++;
            }


            get id() {

                return this.#id;
            }


            set id(id) {

                this.#id = id;
            }


            get name() {

                return this.#name;
            }


            set name(name) {

                this.#name = name;
            }


            static get cont() {

                return Person.#cont;
            }


            toString() {

                throw new Error(
                    "Person is an abstract class."
                );
            }


            static #log_static_message(message) {

                console.log(
                    `--- Person: ${message}`
                );
            }


            #log_message(message) {

                console.log(
                    `--- Person: ${message}`
                );
            }
        }


        class Address {

            #city;
            #uf;


            constructor(city, uf) {

                this.#city = city;
                this.#uf = uf;
            }


            get city() {

                return this.#city;
            }


            set city(city) {

                this.#city = city;
            }


            get uf() {

                return this.#uf;
            }


            set uf(uf) {

                this.#uf = uf;
            }


            toString() {

                return `City: ${this.city}, UF: ${this.uf}`;
            }
        }


        class NaturalPerson extends Person {

            #cpf;
            #address;


            constructor(
                id,
                name,
                cpf,
                city,
                uf
            ) {

                super(id, name);

                this.#cpf = cpf;
                this.#address = new Address(
                    city,
                    uf
                );
            }


            get cpf() {

                return this.#cpf;
            }


            set cpf(cpf) {

                if (
                    cpf.length === 11 &&
                    /^\d+$/.test(cpf)
                ) {
                    this.#cpf = cpf;
                }
            }


            get address() {

                return this.#address;
            }


            toString() {

                return `
                    ID: ${this.id},
                    Name: ${this.name},
                    CPF: ${this.cpf},
                    ${this.address}
                `;
            }
        }


        const natural_person = new NaturalPerson(
            123,
            "Anderson",
            "65216351632",
            "Rio de Janeiro",
            "RJ"
        );


        console.log(
            natural_person.toString()
        );

        console.log(
            natural_person instanceof NaturalPerson
        );

        console.log(Person.cont);
        console.log(NaturalPerson.cont);
    }


    /*
    ------------------------------------------------------------
    Classes: Encapsulation, Composition and Polymorphism
    ------------------------------------------------------------
    */

    {
        class Person{

            static #counter = 0;
            #id;
            #name;

            constructor(id, name){
                this.#id = id;
                this.#name = name;
                Person.#counter++;
            }

            // getter and setter
            /*
            set_name(name){
                this.#name = name;
            }

            get_name(){
                return this.#name;
            }
            */

            // properties

            set id(id){
                this.#id = id;
            }

            get id(){
                return this.#id;
            }

            set name(name){
                this.#name = name;
            }

            get name(){
                return this.#name;
            }

            static get counter(){
                return Person.#counter;
            }

            /*
            show_data(){
                return `ID: ${this.#id}, Name: ${this.#name}`;
            }
            */

            show_data(){
                throw new Error("Abstract class!");
            }
        }


        class Client{

            #status;

            constructor(status){
                this.#status = status;
            }

            set status(status){
                this.#status = status;
            }

            get status(){
                return this.#status;
            }
        }


        class NaturalPerson extends Person{

            #cpf;
            #client;

            constructor(id, name, cpf){
                super(id, name);
                this.#cpf = cpf;

                // composition:
                this.#client = new Client(true);
            }

            set cpf(cpf){
                this.#cpf = cpf;
            }

            get cpf(){
                return this.#cpf;
            }

            // polimorphism:
            show_data(){
                return `ID: ${this.id}, Name: ${this.name}, CPF: ${this.cpf}, Cliente: [status: ${this.#client.status}]`;
            }
        }


        let natural_person = new NaturalPerson(123, "Anderson", "01782637621");
        console.log(natural_person);

        for(let i = 0; i < 9; i++){
            new NaturalPerson(0, "", "");
        }

        console.log(Person.counter);
        console.log(natural_person.show_data());

        // typeof and instanceof
        console.log(`typeof natural_person: ${typeof natural_person}`);
        console.log(`natural_person instanceof NaturalPerson: ${natural_person instanceof NaturalPerson}`);
        console.log(`natural_person instanceof Person: ${natural_person instanceof Person}`);
    }


    /*
    ------------------------------------------------------------
    Singleton
    ------------------------------------------------------------
    */

    {
        class MySingleton{

            static #instance = null;

            constructor(){
                if(MySingleton.#instance){
                    return MySingleton.#instance;
                }
                MySingleton.#instance = this;
            }

            static get instance(){
                if(!MySingleton.#instance){
                    MySingleton.#instance = new MySingleton();
                }
                return MySingleton.#instance;
            }
        }
    }
}
