importScripts("/pyodide/pyodide.js")

let dialog = [];
console.log = function () {
    dialog.push(Array.from(arguments));
}

let pyodide = undefined;
async function init() {
    pyodide = await loadPyodide();
}
let loaded = init();

self.onmessage = async function (event) {
    await loaded
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
        result = "Error: Traceback (most recent call last):\n";
        for (let line of diagnosis) {
            if (found || line.includes('File "<exec>"')) {
                found = true;
                result += line.replace('File "<exec>", l', "L") + "\n";
            }
        }
        result += "\nProgram finished with exit code 1";
    }
    postMessage(result);
}
