
"use strict";

/**********************************************************************/
/* Object                                                              */
/**********************************************************************/

function object_demo() {

    /*
    ------------------------------------------------------------
    Reference
    ------------------------------------------------------------
    */

    function create_object_demo() {

        const client1 = {
            id: 1,
            name: "Anderson"
        };

        const client2 = client1;

        client2.name = "Anderson C.";

        console.log(client1);
        // { id: 1, name: "Anderson C." }
    }


    /*
    ------------------------------------------------------------
    Object properties / Symbol / Delete
    ------------------------------------------------------------
    */

    function object_properties_demo() {

        function show_data() {
            console.log(`ID: ${this[sid]}, Name: ${this.name}, birthday: ${this.birthday}`);
        }

        let sid = Symbol("id");

        let person = {
            [sid]: 123,
            name: "Anderson",
            birthday: new Date(2000, 4, 1, 10, 30).toLocaleDateString("pt-BR"),
            competencies: ["Programmer", "DBA"],
            address: {
                street: "Street home",
                number: 100,
            },
        };

        console.log(person["id"], person.name);

        person.status = true;

        console.log(person);

        delete person.status;

        console.log(person);

        console.log(person.competencies[0]);
        console.log(person.address.street);


        // formas de usar o show_data:

        // 1 - Adiciona a função nada ao objeto.

        {
            person.show_person = show_data;
            person.show_person();
            delete person.show_person;
        }


        // 2 - Não adiciona a função nada ao objeto. Apenas executa a função usando "person" como "this".

        {
            show_data.call(person);
        }


        // 3. Colocar a função no prototype

        {
            Object.setPrototypeOf(person, {
                show_data
            });

            Object.getPrototypeOf(person).show_data.call(person);
        }


        console.log(Object.keys(person)); // nao aparece o Symbol.
        console.log(Object.values(person)); // nao aparece o Symbol.


        // keyPair/Values

        /*
        for(let[k,v] of Object.entries(person)){
            console.log(`${k}: ${v}`); // nao aparece o Symbol.
        }
        */

        Object.entries(person).forEach(([k, v]) => {
            console.log(`${k}: ${v}`); // nao aparece o Symbol.
        });


        for (let column in person) {
            console.log(person[column]);
        }


        // verificando campos:

        console.log(Object.hasOwn(person, "name"));
    }


    /*
    ------------------------------------------------------------
    Spread / shallow copy
    ------------------------------------------------------------
    */

    function spread_object_demo() {

        const person = {
            id: 123,
            name: "Anderson"
        };

        const data = {
            status: true
        };

        const new_person = {
            ...person,
            ...data
        };

        console.log(new_person);


        // SPREAD: muito mais próximo de composição do que de herança.

        let natural_person = {
            ...person,
            cpf: "51625323123",
        };

        console.log(natural_person);
    }


    /*
    ------------------------------------------------------------
    Deep copy
    ------------------------------------------------------------
    */

    function deep_copy_demo() {

        const client1 = {
            id: 1,
            name: "Anderson"
        };

        const client2 = structuredClone(client1);

        client2.id = 123;
        client2.name = "Anderson C.";

        console.log(client1);
        console.log(client2);


        // REFERENCIA:

        let person = {
            id: 123,
            name: "Anderson"
        };

        let person2 = person;

        person2.name = "Anderson C.";

        console.log(person); // nome de person foi alterado.


        // StructuredClone: copia profunda:

        let person3 = structuredClone(person);

        person3.name = "hdasgdhas dashdgas";

        console.log(person); // nome de person NÃO foi alterado.
    }


    /*
    ------------------------------------------------------------
    Destructuring
    ------------------------------------------------------------
    */

    function destructuring_object() {

        const person = {
            id: 123,
            name: "Anderson"
        };

        const {
            id,
            name,
            status = true
        } = person;

        console.log(id, name, status);


        // destructuring:

        let person2 = {
            id: 123,
            name: "Anderson"
        };

        {
            let { id, name } = person2;

            console.log(`ID: ${id}, Name: ${name}`);
        }

        {
            let id, name;

            ({ id, name } = person2);

            console.log(`ID: ${id}, Name: ${name}`);
        }
    }


    /*
    ------------------------------------------------------------
    Shorthand
    ------------------------------------------------------------
    */

    function shorthand_demo() {

        const id = 123;
        const name = "Anderson";

        const person = {
            id,
            name
        };

        console.log(person);


        // Shorthand

        {
            let id = 123;
            let name = "Anderson";

            let person = {
                id: id,
                name: name
            };

            console.log(person);
        }

        {
            let id = 123;
            let name = "Anderson";

            let person = {
                id,
                name
            };

            console.log(person);
        }
    }


    /*
    ------------------------------------------------------------
    Object.assign
    ------------------------------------------------------------
    */

    function object_assign_demo() {

        const data1 = {
            id: 123
        };

        const data2 = {
            name: "Anderson"
        };

        const data3 = {
            salary: 1541.43,
            birthday: new Date(2000, 4, 1),
            status: true
        };


        const person1 = Object.assign(
            {},
            data1,
            data2,
            data3
        );

        const person2 = {
            ...data1,
            ...data2,
            ...data3
        };

        console.log(person1);
        console.log(person2);


        // Object.assign:

        let sid = Symbol("id");

        let person = {
            [sid]: 123,
        };

        let data = {
            name: "Anderson",
            birthday: new Date(2000, 4, 1, 10, 30).toLocaleDateString("pt-BR"),
            competencies: ["Programmer", "DBA"],
            address: {
                street: "Street home",
                number: 100,
            },
        };

        console.log(person);

        Object.assign(person, data);

        console.log(person);
    }


    /*
    ------------------------------------------------------------
    Object.freeze
    ------------------------------------------------------------
    */

    function object_freeze_demo() {

        const person = Object.freeze({
            id: 123,
            name: "Anderson",
            salary: 1541.43,
            birthday: new Date(2000, 4, 1),
            status: true
        });

        person.name = "Anderson C.";

        console.log(person.name);
        // Anderson


        // Object.freeze:

        let person2 = {
            id: 123,
            name: "Anderson",
        };

        console.log(person2);

        person2.name = "Anderson C.";

        console.log(person2);

        Object.freeze(person2);

        try {

            person2.name = "jdajdas hdjashj ds";

            console.log(person2);

        } catch (error) {

            console.log(`Error: ${error.message}`);
        }
    }


    /*
    ------------------------------------------------------------
    const com objetos
    ------------------------------------------------------------
    */

    function const_in_object() {

        const person = {
            id: 123,
            name: "Anderson"
        };

        person.name = "Anderson C.";

        console.log(person.name);
        // Anderson C.


        try {

            person = {};

        } catch (error) {

            console.log(error.message);
            // Assignment to constant variable.
        }


        // const, nao congela objeto:

        {
            const person = {
                id: 123,
                name: "Anderson",
            };

            console.log(person);

            person.name = "Anderson C.";

            console.log(person);
        }
    }


    /*
    ------------------------------------------------------------
    Property descriptors
    ------------------------------------------------------------
    */

    function property_descriptors_demo() {

        const person = {
            id: 123,
            name: "Anderson"
        };

        console.log(
            Object.getOwnPropertyDescriptor(
                person,
                "name"
            )
        );

        /*
        {
            value: "Anderson",
            writable: true,
            enumerable: true,
            configurable: true
        }
        */
    }


    /*
    ------------------------------------------------------------
    Getters / Setters
    ------------------------------------------------------------
    */

    function get_set_demo() {

        const person = {

            _id: 0,
            _name: "",

            get id() {
                return this._id;
            },

            set id(value) {
                this._id = value;
            },

            get name() {
                return this._name;
            },

            set name(value) {
                this._name = value;
            }
        };


        person.id = 123;
        person.name = "Anderson";

        console.log(
            `ID: ${person.id}, Name: ${person.name}`
        );
    }


    /*
    ------------------------------------------------------------
    Reflect
    ------------------------------------------------------------
    */

    function reflect_object_demo() {

        const person = {
            id: 123,
            name: "Anderson"
        };

        Reflect.set(
            person,
            "name",
            "Anderson C."
        );

        console.log(person);

        console.log(
            `Name: ${Reflect.get(person, "name")}`
        );
    }


    /*
    ------------------------------------------------------------
    Proxy
    ------------------------------------------------------------
    */

    function proxy_object_demo() {

        const person = {
            id: 0,
            name: ""
        };


        const proxy = new Proxy(person, {

            get(obj, property) {

                console.log(
                    `${String(property)} was getter.`
                );

                return obj[property];
            },


            set(obj, property, value) {

                console.log(
                    `${String(property)} was setter. New Value: ${value}`
                );

                obj[property] = value;

                return true;
            }
        });


        proxy.name = "Anderson";
        proxy.id = 123;

        console.log(person);
        console.log(proxy);
    }


    /*
    ------------------------------------------------------------
    JSON
    ------------------------------------------------------------
    */

    function json_object_demo() {

        const data = [
            { id: "1", name: "Anderson" },
            { id: "2", name: "Carmen" },
            { id: "3", name: "Anne" },
            { id: "4", name: "Lucy" },
            { id: "5", name: "Jason" }
        ];


        const people_str = JSON.stringify(data);

        console.log(
            people_str,
            typeof people_str
        );


        const people_json = JSON.parse(people_str);

        console.log(
            people_json,
            typeof people_json
        );


        // JSON

        let person = {
            id: 123,
            name: "Anderson",
            birthday: new Date(2000, 4, 1, 10, 30).toLocaleDateString("pt-BR"),
            competencies: ["Programmer", "DBA"],
            address: {
                street: "Street home",
                number: 100,
            },
        };

        let result = JSON.stringify(person);

        console.log(`type: ${typeof result} / data: ${result}`);

        let json = JSON.parse(result);

        console.log(`type: ${typeof json} / data: ${json} / Object.entries(json): ${Object.entries(json)}`);
    }


    /*
    ------------------------------------------------------------
    Prototype
    ------------------------------------------------------------
    */

    function get_prototype_of_demo() {

        const person = {
            id: 123,
            name: "Anderson"
        };


        const person_created = Object.create(person);

        console.log(
            person_created.id,
            person_created.name
        );


        console.log(
            Object.getPrototypeOf(person_created) === person
        );

        /*
            person_created
                 ↓
              person
                 ↓
          Object.prototype
                 ↓
               null
        */
    }


    /*
    ------------------------------------------------------------
    setPrototypeOf
    ------------------------------------------------------------
    */

    function set_prototype_of() {

        const data = {
            id: 321,
            name: "Anderson C."
        };

        const person = {};


        Object.setPrototypeOf(person, null);

        console.log(
            person.id,
            person.name
        );
        // undefined undefined


        Object.setPrototypeOf(person, data);

        console.log(
            person.id,
            person.name
        );
        // 321 Anderson C.
    }


    /*
    ------------------------------------------------------------
    Object.create
    ------------------------------------------------------------
    */

    function object_create_demo() {

        const person = {
            id: 123,
            name: "Anderson"
        };


        const person_created = Object.create(person);

        console.log(person_created.id);
        console.log(person_created.name);

        console.log(
            Object.getPrototypeOf(person_created) === person
        );


        // Object.create() é uma das formas mais diretas de entender herança por prototype em JavaScript.

        function show_data() {
            console.log(`ID: ${this.id}, Name: ${this.name}, cpf: ${this.cpf}`);
        }

        let person2 = {
            id: 123,
            name: "Anderson",
        };

        let natural_person = Object.create(person2);

        natural_person.cpf = "09272192854";

        // calling:

        show_data.call(natural_person);
    }


    /*
    ------------------------------------------------------------
    Execute
    ------------------------------------------------------------
    */

    create_object_demo();
    object_properties_demo();
    spread_object_demo();
    deep_copy_demo();
    destructuring_object();
    shorthand_demo();
    object_assign_demo();
    object_freeze_demo();
    const_in_object();
    property_descriptors_demo();
    get_set_demo();
    reflect_object_demo();
    proxy_object_demo();
    json_object_demo();
    get_prototype_of_demo();
    set_prototype_of();
    object_create_demo();
}
