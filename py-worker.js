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
    } catch (err) {
        reject("Error occured");
    }
}
let loaded = new Promise(init);

self.onmessage = async function (event) {
    // await loaded
    loaded.then(msg => {
        let result = "";
        dialog = [];
        try {
            pyodide.runPython(event.data);
            pyodide.runPython(`
print('''\nProgram finished with exit code 0''')`)
            for (let ele of dialog) {
                result += ele + "\n";
            }
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
            result += "\nProgram finished with exit code 1";
        }
        postMessage(result);
    }).catch(err => {
        postMessage("We currently does not support your browser, please update to latest version")
    })
}
