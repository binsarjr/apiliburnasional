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


/**
 * Fungsi utama untuk menulis daftar hari libur ke file.
 * @param tahun Tahun yang ingin ditulis daftar hari liburnya. Jika tidak
 * diberikan, maka akan menggunakan tahun saat ini.
 * @returns Tidak ada.
 */
const main = async (tahun) => {
    tahun = tahun || new Date().getFullYear()
    const daftarHariLibur = await Promise.any([tanggalan(tahun)])
    const outputfile = path.join(datapath, tahun + '.json')
    fs.writeFileSync(outputfile, JSON.stringify(daftarHariLibur, null, 2))
}


main()