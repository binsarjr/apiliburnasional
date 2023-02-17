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
    let tahun = parseInt(req.query.tahun || (new Date()).getFullYear());
    let bulan = req.query.bulan ? parseInt(req.query.bulan) : undefined;

    const filepath = join(datapath, `${tahun}.json`)

    /**
     * Membaca file berdasarkan filepath, memfilter jika bulan dan tahun diisi, atau
     * hanya tahun diisi, kemudian mengirimkan hasilnya.
     * @param {string} filepath lokasi file yang akan dibaca.
     * @param {string} bulan bulan dalam angka dalam rentang 1-12. (opsional)
     * @param {string} tahun tahun dalam rentang 4 digit. (opsional)
     * @return {object} hasil.
     */
    if (fs.existsSync(filepath)) {
        let text = await fsPromises.readFile(filepath, 'utf8');
        let parseResult = JSON.parse(text);

        if (bulan && tahun) {
            result = parseResult.filter(item => {
                if ((new Date(item.tanggal)).getMonth() + 1 == bulan) {
                    return item;
                }
            });
        } else if (tahun) {
            result = parseResult;
        }
        return res.status(200).send(result);
    }

    /**
     * Mengambil daftar hari libur pada tahun yang telah ditentukan.
     * @param {number} tahun - Tahun yang diinginkan.
     * @param {number} bulan - Bulan yang diinginkan (opsional).
     * @return {array} daftarHariLibur - Daftar hari libur pada tahun dan bulan yang
     * ditentukan.
     */
    try {
        const daftarHariLibur = await tanggalan(tahun)
        daftarHariLibur.map(item => {
            if (!(bulan && tahun)) {
                result.push(item)
                return
            }
            if ((new Date(item.tanggal)).getMonth() + 1 == bulan) {
                result.push(item)
            }

        })
    } catch (error) {

    }






    return res.status(200).send(result);

}