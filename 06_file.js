/**********************************************************************/
/* File                                                               */
/**********************************************************************/

function file_js() {

    const fs = require("fs");

    const str1 = "Hello, ";


    fs.writeFile(
        "./text.txt",
        str1,
        { encoding: "utf-8" },
        (error) => {

            if (error) {
                console.log(error);
                return;
            }


            const str2 = "World!";


            fs.appendFile(
                "./text.txt",
                str2,
                { encoding: "utf-8" },
                (error) => {

                    if (error) {
                        console.log(error);
                        return;
                    }


                    fs.readFile(
                        "./text.txt",
                        { encoding: "utf-8" },
                        (error, data) => {

                            if (error) {
                                console.log(error);
                                return;
                            }

                            console.log(data);
                        }
                    );
                }
            );
        }
    );
}


// file_js();
