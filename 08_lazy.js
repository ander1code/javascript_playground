"use strict";

/**********************************************************************/
/* Lazy Loading                                                      */
/**********************************************************************/

function lazy_loading_demo() {

    function greeting() {
        console.log("Hello, World!");
    }


    // Reference
    const f = greeting;
    f();


    // Callback
    function execution(callback) {
        callback();
    }

    execution(greeting);


    // Lazy loading
    const lazyGreeting = () => greeting();

    console.log("Not executed yet!");

    lazyGreeting();


    // Executando posteriormente
    setTimeout(greeting, 2000);
}

async function main(){

    async function sum(num1, num2){

        /*
            lazy loading: module.js só é carregado quando sum() é chamada.
        */

        let calculator = await import("./module.js");
        return calculator.sum(num1,num2);
    }

    let num1 = 10;
    let num2 = 3;
    console.log(`${num1} + ${num2} = ${await sum(10, 3)}`);
}

main();