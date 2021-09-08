const fs = require('fs')
const { exec } = require('child_process');

const CID_FILE = './CIDs10.txt'
const OUTPUT_DIR = "./9001-10000"
const BASE_NUMBER = 9000;

// let sortedCIDsArr;

// try {
//     const data = fs.readFileSync(CID_FILE, 'utf8')
//     const arr = data.split("\n");
//     sortedCIDsArr = arr.sort((a, b) => {
//         const aSplit = a.split(" ").filter(str => str !== "")
//         const bSplit = b.split(" ").filter(str => str !== "")
//         return Number(aSplit[2] && aSplit[2].split(".")[0]) - Number(bSplit[2] && bSplit[2].split(".")[0]);
//     })
// } catch (err) {
//     console.error(err)
// }

let metadataArr;

try {
    const data = fs.readFileSync('./_metadata.json', 'utf8')

    metadataArr = JSON.parse(data);
} catch (err) {
    console.error(err)
}

for (let i = 0; i < 1000; i++) {
    // exec(`ipfs pin add ${sortedCIDsArr[i].split(" ")[0]}`, (err, stdout, stderr) => { })

    const attributes = metadataArr[BASE_NUMBER + i].attributes.map(attr => {
        return {"trait_type": attr.layer, "value": attr.name}
    })

    const obj = {
        name: `Dizzy Dolphins #${BASE_NUMBER + i + 1}`,
        description: "A dizzy dolphin jumping out of the water.",
        image: `https://storage.googleapis.com/dizzydolphinsnftdata/${BASE_NUMBER + i + 1}.png`,
        attributes
    }

    fs.writeFileSync(`${OUTPUT_DIR}/${BASE_NUMBER + i + 1}`, JSON.stringify(obj))
}

