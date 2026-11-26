
"use strict";

/**********************************************************************/
/* Async: Promise, async/await                                       */
/**********************************************************************/

function async_await_and_promise() {

    /*
    ------------------------------------------------------------
    Synchronous execution
    ------------------------------------------------------------
    */

    function sync_function_execution() {

        function sync_function(number) {
            let i = 0;

            console.log(`Starting execution ${number}...`);

            const interval = setInterval(() => {

                if (i < 10) {
                    console.log(`Exec[${number}] = ${i}`);
                    i++;
                } else {
                    console.log(`Exec[${number}] finished!`);
                    clearInterval(interval);
                }

            }, 300);
        }

        sync_function("01");
        sync_function("02");
        sync_function("03");
    }


    /*
    ------------------------------------------------------------
    Event loop
    ------------------------------------------------------------
    */

    function sync_demo() {

        console.log("A");

        const interval = setInterval(() => {
            console.log("B");
            clearInterval(interval);
        }, 1000);

        console.log("C");

        // A
        // C
        // B
    }


    /*
    ------------------------------------------------------------
    Callback
    ------------------------------------------------------------
    */

    function callback_demo() {

        function greet(name) {
            return `Hello, ${name}!`;
        }

        function execute(callback) {
            return callback(greet);
        }

        execute((callback) => {
            console.log(callback("Anderson"));
        });
    }


    /*
    ------------------------------------------------------------
    Promise
    ------------------------------------------------------------
    */

    function promise_demo() {

        const promise = new Promise((resolve, reject) => {

            setTimeout(() => {
                resolve("Successfully!");
            }, 1000);

        });

        promise
            .then((data) => console.log(data))
            .catch((error) => console.log(error));
    }


    /*
    ------------------------------------------------------------
    async / await
    ------------------------------------------------------------
    */

    function async_await_demo() {

        async function greeting(name) {

            return new Promise((resolve) => {

                console.log("Please wait...");

                setTimeout(() => {
                    resolve(`Hello, ${name}!`);
                }, 1000);

            });
        }


        async function main() {

            try {
                const result = await greeting("Anderson");
                console.log(result);

            } catch (error) {
                console.log(error);
            }
        }

        main();
    }


    /*
    ------------------------------------------------------------
    Promise chaining
    ------------------------------------------------------------
    */

    function promise_chaining_demo() {

        function do_this(name, milliseconds) {

            return new Promise((resolve) => {

                let counter = 0;

                console.log(`${name} starting...`);

                const interval = setInterval(() => {

                    console.log(`${name}: ${counter}`);

                    if (counter === 9) {

                        clearInterval(interval);

                        console.log(`${name} finished!`);

                        resolve();
                        return;
                    }

                    counter++;

                }, milliseconds);
            });
        }


        async function main() {

            try {

                await do_this("task_01", 500);
                await do_this("task_02", 200);
                await do_this("task_03", 300);

            } catch (error) {
                console.log(error);
            }
        }

        main();
    }


    /*
    ------------------------------------------------------------
    Microtasks
    ------------------------------------------------------------
    */

    function microtask_simple_demo() {

        console.log("A");
        console.log("B");

        Promise.resolve("Successfully!")
            .then((data) => console.log(`Success: ${data}`))
            .catch((error) => console.log(`Error: ${error}`));

        console.log("D");

        // A
        // B
        // D
        // Success: Successfully!
    }


    function microtask_simple_demo_2() {

        console.log("A");

        setTimeout(() => {
            console.log("B");
        }, 0);

        Promise.resolve().then(() => {
            console.log("C");
        });

        console.log("D");

        // A
        // D
        // C
        // B
    }


    /*
    ------------------------------------------------------------
    Fetch + Promise
    ------------------------------------------------------------
    */

    function promise_with_fetch() {

        async function main() {

            try {

                const response = await fetch(
                    "http://127.0.0.1/test/people.json"
                );

                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }

                const data = await response.json();

                console.log(data);

            } catch (error) {
                console.log(error);
            }
        }

        main();
    }


    /*
    ------------------------------------------------------------
    Promise criada manualmente para controlar execução
    ------------------------------------------------------------
    */

    function do_this_promise_review() {

        function do_this(name, milliseconds, resolve) {

            let counter = 0;

            const interval = setInterval(() => {

                console.log(`${name}: ${counter}`);

                if (counter === 9) {

                    clearInterval(interval);
                    console.log(`${name} finished!`);

                    resolve();
                    return;
                }

                counter++;

            }, milliseconds);
        }


        function execute_promise(name, milliseconds) {

            return new Promise((resolve) => {
                do_this(name, milliseconds, resolve);
            });
        }


        async function main() {

            await execute_promise("task_01", 500);
            await execute_promise("task_02", 200);
            await execute_promise("task_03", 300);
        }

        main();
    }


    /*
    ------------------------------------------------------------
    Async execution with setInterval / setTimeout
    ------------------------------------------------------------
    */

    async function do_this_async() {

        let opc = 2;

        if (opc == 1) {

            async function do_this(name, milliseconds) {

                return new Promise((resolve) => {

                    let i = 0;

                    const interval = setInterval(() => {

                        console.log(`${name}: ${i}`);
                        i++;

                        if (i == 10) {
                            clearInterval(interval);
                            resolve();
                        }

                    }, milliseconds);

                });
            }

            await do_this("Task01", 500);
            await do_this("Task02", 100);
            await do_this("Task03", 300);

        }
        else {

            async function do_this(name, milliseconds) {

                for (let i = 0; i < 10; i++) {

                    console.log(`${name}: ${i}`);

                    await new Promise((resolve) => {

                        setTimeout(() => {
                            resolve();
                        }, milliseconds);

                    });
                }
            }

            await do_this("Task01", 500);
            await do_this("Task02", 100);
            await do_this("Task03", 300);
        }
    }


    /*
    ------------------------------------------------------------
    Fetch API with Promise chaining
    ------------------------------------------------------------
    */

    function fetch_api_function() {

        return fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: JSON.stringify({
                "userId": 1,
                "id": 1,
                "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
            }),
            headers: {"Content-type": "application/json"},
        }).then((response) => {

            if (!response.ok) {
                throw new Error("fetch error!");
            } else {
                return response.json();
            }

        }).then((response) => {

            return response;

        }).catch((error) => {

            console.log(error);

        });
    }


    /*
    ------------------------------------------------------------
    Fetch API with async / await
    ------------------------------------------------------------
    */

    async function async_fetch_api() {

        let response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: JSON.stringify({
                "userId": 1,
                "id": 1,
                "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
            }),
            headers: {"Content-type": "application/json"},
        });

        if (!response.ok) {
            throw new Error("fetch error!");
        }

        let data = await response.json();

        return data;
    }


    /*
    ------------------------------------------------------------
    Promise resolve / reject
    ------------------------------------------------------------
    */

    async function promise_resolve_reject() {

        async function do_this() {

            return new Promise((resolve, reject) => {

                const i = 2;

                if ((i % 2) === 0) {
                    resolve("Successfully resolved.");
                } else {
                    reject("Promise error.");
                }

            });
        }

        try {
            console.log(await do_this());
        } catch (error) {
            console.log(error);
        }
    }


    /*
    ------------------------------------------------------------
    Exemplos para executar
    ------------------------------------------------------------
    */

    // sync_function_execution();
    // sync_demo();
    // callback_demo();
    // promise_demo();
    // async_await_demo();
    // promise_chaining_demo();
    // microtask_simple_demo();
    // microtask_simple_demo_2();
    // promise_with_fetch();
    // do_this_promise_review();
    // do_this_async();

    // fetch_api_function().then((response) => console.log(response));

    // async function main() {
    //     const promise = await fetch_api_function();
    //     console.log(promise);
    // }
    // main();

    // async function main() {
    //     const promise = await async_fetch_api();
    //     console.log(promise);
    // }
    // main();

    // promise_resolve_reject();
}
