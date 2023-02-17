const {
    liburnasional
} = require("./liburnasional")
const {
    tanggalan
} = require("./tanggalan")

const fs = require('fs');
const path = require('path');

const datapath = path.join(__dirname, '../data')
if (!fs.existsSync(datapath)) fs.mkdirSync(datapath, {
    recursive: true
})


const main = async (tahun) => {
    tahun = tahun || new Date().getFullYear()
    const daftarHariLibur = await Promise.any([tanggalan(tahun)])
    const outputfile = path.join(datapath, tahun + '.json')
    fs.writeFileSync(outputfile, JSON.stringify(daftarHariLibur, null, 2))
}


main()