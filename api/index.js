const fsPromises = require('fs').promises;
const fs = require('fs')
const {
    join
} = require('path');
const {
    tanggalan
} = require('../services/tanggalan')

const datapath = join(__dirname, '../data')

module.exports = async (req, res) => {
    let result = [];
    let year = parseInt(req.query.year || (new Date()).getFullYear());
    let month = req.query.month ? parseInt(req.query.month) : undefined;

    const filepath = join(datapath, `${year}.json`)

    /**
     * Membaca file berdasarkan filepath, memfilter jika month dan year diisi, atau
     * hanya year diisi, kemudian mengirimkan hasilnya.
     * @param {string} filepath lokasi file yang akan dibaca.
     * @param {string} month bulan dalam angka dalam rentang 1-12. (opsional)
     * @param {string} year tahun dalam rentang 4 digit. (opsional)
     * @return {object} hasil.
     */
    if (fs.existsSync(filepath)) {
        let text = await fsPromises.readFile(filepath, 'utf8');
        let parseResult = JSON.parse(text);

        if (month && year) {
            result = parseResult.filter(item => {
                if ((new Date(item.tanggal)).getMonth() + 1 == month) {
                    return item;
                }
            });
        } else if (year) {
            result = parseResult;
        }
        return res.status(200).send(result);
    }

    /**
     * Mengambil daftar hari libur pada tahun yang telah ditentukan.
     * @param {number} year - Tahun yang diinginkan.
     * @param {number} month - Bulan yang diinginkan (opsional).
     * @return {array} daftarHariLibur - Daftar hari libur pada tahun dan bulan yang
     * ditentukan.
     */
    try {
        const daftarHariLibur = await tanggalan(year)
        daftarHariLibur.map(item => {
            if (!(month && year)) {
                result.push(item)
                return
            }
            if ((new Date(item.tanggal)).getMonth() + 1 == month) {
                result.push(item)
            }

        })
    } catch (error) {

    }






    return res.status(200).send(result);

}