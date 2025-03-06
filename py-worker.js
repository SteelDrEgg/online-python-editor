let dialog = [];
console.log = function () {
    dialog.push(Array.from(arguments));
}

let pyodide = undefined;

async function init(resolve, reject) {
    try {
        if (pyodide === undefined) {
            importScripts("vendor/pyodide/pyodide.js")
            pyodide = await loadPyodide();
        }
        resolve("initialized");
        pyodide.setStdout({ batched: (msg) => std2main(msg) })
    } catch (err) {
        reject("Error occured");
    }
}

let loaded = new Promise(init);

async function std2main(msg){
    // Ensure we preserve all newlines in the output
    // Pyodide might replace \n with spaces in some cases
    postMessage({
        output: msg,
        status: "ongoing"
    });
}

self.onmessage = async function (event) {
    // await loaded
    loaded.then(msg => {
        if (event.data.type === "interruptBuffer") {
            pyodide.setInterruptBuffer(event.data.payload);
            console.log("here")
            return;
        }
        let result = "";
        dialog = [];
        try {
            pyodide.runPython(event.data.payload);
            for (let ele of dialog) {
                result += ele + "\n";
            }
            // Add a status object to the result
            postMessage({
                output: result,
                status: "success"
            });
        } catch (err) {
            diagnosis = String(err).split("\n");
            let found = false;
            for (let ele of dialog) {
                result += ele + "\n";
            }
            result += "\nError: Traceback (most recent call last):\n";
            for (let line of diagnosis) {
                if (found || line.includes('File "<exec>"')) {
                    found = true;
                    result += line.replace('File "<exec>", l', "L") + "\n";
                }
            }
            // Send error status with the result
            postMessage({
                output: result,
                status: "fail",
            });
        }
    }).catch(err => {
        postMessage({
            output: "We currently does not support your browser, please update to latest version",
            status: "error",
            errorInfo: {
                message: String(err)
            }
        });
    })
}
