/**********************************************************************/
/* Serialization                                                     */
/**********************************************************************/

function string_serialization_demo() {

    const serialized = Buffer.from(
        "Hello, World!"
    );

    console.log(serialized);

    const deserialized =
        serialized.toString();

    console.log(deserialized);
}


function object_serialization_demo() {

    class Person {

        #id;
        #name;


        constructor(id, name) {

            this.#id = id;
            this.#name = name;
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


        toString() {

            return `ID: ${this.id}, Name: ${this.name}`;
        }


        toJSON() {

            return {
                id: this.id,
                name: this.name
            };
        }
    }


    /*
    ------------------------------------------------------------
    Serialize
    ------------------------------------------------------------
    */

    const person = new Person(
        123,
        "Anderson"
    );


    const serialized = Buffer.from(
        JSON.stringify(person)
    );


    console.log(serialized);


    /*
    ------------------------------------------------------------
    Deserialize
    ------------------------------------------------------------
    */

    const deserialized =
        serialized.toString();


    const data =
        JSON.parse(deserialized);


    const new_person = new Person(
        data.id,
        data.name
    );


    console.log(new_person);
    console.log(
        new_person.id,
        new_person.name
    );
}

