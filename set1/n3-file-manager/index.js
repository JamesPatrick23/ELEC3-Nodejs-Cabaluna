// Name: Jamaes Patrick Cabaluna
// Section: IV-BSIT-C
// Activity: N3 - File Manager

const fs = require("fs");
const path = require("path");

const filesDirectory = path.join(__dirname, "files");

if (!fs.existsSync(filesDirectory)) {
    fs.mkdirSync(filesDirectory, { recursive: true });
}

const command = process.argv[2];
const filename = process.argv[3];
const content = process.argv.slice(4).join(" ");

function getFilePath(name) {
    if (!name || path.basename(name) !== name || !name.endsWith(".txt")) {
        throw new Error("Please provide a valid .txt filename.");
    }

    return path.join(filesDirectory, name);
}

try {
    switch (command) {
        case "create": {
            const filePath = getFilePath(filename);

            if (!content) {
                throw new Error("Please provide file content.");
            }

            fs.writeFileSync(filePath, content);
            console.log(`File created: ${filename}`);
            break;
        }

        case "read": {
            const filePath = getFilePath(filename);
            const data = fs.readFileSync(filePath, "utf8");

            console.log(`Contents of ${filename}:`);
            console.log(data);
            break;
        }

        case "update": {
            const filePath = getFilePath(filename);

            if (!content) {
                throw new Error("Please provide new content.");
            }

            if (!fs.existsSync(filePath)) {
                throw new Error("File does not exist.");
            }

            fs.writeFileSync(filePath, content);
            console.log(`File updated: ${filename}`);
            break;
        }

        case "delete": {
            const filePath = getFilePath(filename);

            if (!fs.existsSync(filePath)) {
                throw new Error("File does not exist.");
            }

            fs.unlinkSync(filePath);
            console.log(`File deleted: ${filename}`);
            break;
        }

        case "list": {
            const files = fs.readdirSync(filesDirectory);

            if (files.length === 0) {
                console.log(`No files found in ${filesDirectory}.`);
                break;
            }

            files.forEach(file => {
                const filePath = path.join(filesDirectory, file);
                const stats = fs.statSync(filePath);

                if (stats.isFile()) {
                    console.log("\n-------------------------");
                    console.log(`Full Path: ${filePath}`);
                    console.log(`Filename: ${path.basename(filePath)}`);
                    console.log(`Extension: ${path.extname(filePath)}`);
                    console.log(`Contents: ${fs.readFileSync(filePath, "utf8")}`);
                }
            });

            break;
        }

        default:
            console.log("Unknown command.");
            console.log("Available commands: create, read, update, delete, list");
            console.log("Example: node index.js create sample.txt Hello World");
    }

} catch (error) {
    if (error.code === "ENOENT") {
        console.log("Error: File does not exist.");
    } else {
        console.log(`Error: ${error.message}`);
    }
}