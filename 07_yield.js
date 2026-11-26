
/**********************************************************************/
/* Yield Operator                                                    */
/**********************************************************************/

function yield_demo() {

    function* step_by_step() {

        yield "Hello, World!";
        yield 10 + 3;
        yield greeting();
    }


    function greeting() {
        return "Hello from greeting!";
    }


    const steps = step_by_step();

    console.log(steps.next());
    // { value: "Hello, World!", done: false }

    console.log(steps.next().value);
    // 13

    console.log(steps.next().value);
    // Hello from greeting!


    function greeting_with_name(name) {
        return `Hello, ${name}!`;
    }


    function* step_by_step_params(name) {
        yield greeting_with_name(name);
    }


    const steps2 = step_by_step_params("Anderson");

    console.log(steps2.next());
    // { value: "Hello, Anderson!", done: false }
}


//

function greeting(name){
    return `Hello, ${name}!`;
}

function* generator(){
    yield "Anderson";
    yield {id: 123, name: "Anderson"};
    yield greeting("Anderson");
    yield 20;
    yield ["Programmer", "DBA"];
    yield () => {
        console.log("Hello, World!")
    };
    yield true;
}

let gen = generator();
for(let i = 0; i < 7; i++){
    let g = gen.next();
    if(typeof g.value === "function"){
        g.value();
    }else{
        console.log(g.value);
    }
}

//

function* counter_generator(){
    for(let i = 0; i < 10; i++){
        yield i;
    }
}

for(let c of counter_generator()){
    console.log(c);
}

function * counter_generator_even(){
    for(let i = 0; i < 10; i+=2){
        yield i;
    }
}

for(let c of counter_generator_even()){
    console.log(c);
}

// 

function* numbers_array(){
    yield* [1,2,3,4,5];
}

for(let n of numbers_array()){
    console.log(n);
}

// function and function*

{
    function generator(){
        return 13;
    }

    let num = generator();
    console.log(num);
}

{
    function* generator(){
        yield 13;
    }

    let num = generator();
    console.log(num); // generator {<suspended>}

    console.log(num.next().value);
}

// generator to array:

function* generator_numbers(){
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
}

const list = [...generator_numbers()];
console.log(list);
