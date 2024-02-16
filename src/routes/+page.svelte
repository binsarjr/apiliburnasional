<script>
	const year = new Date().getFullYear();
</script>

<h2 class="text-center my-4">API Hari Libur Nasional</h2>
<h4>Cara Mengakses API</h4>
<ul>
	<li><a href="/api">/api</a> untuk mendapatkan daftar hari libur tahun sekarang.</li>
	<li>
		<a href="/api?bulan=2&tahun={year}">/api?bulan=2&amp;tahun={year}</a> gunakan parameter bulan
		dan tahun untuk mendapatkan daftar hari libur di bulan 2 tahun {year}.
	</li>
	<li>
		<a href="/api?tahun={year - 1}">/api?tahun={year - 1}</a> gunakan parameter tahun tuntuk mendapatkan
		daftat hari libur di tahun yang di inginkan.
	</li>
	<li>
		<a href="/api?bulan=8">/api?bulan=8</a> gunakan parameter bulan untuk mendapatkan daftar hari libur
		di bulan 2 tahun sekarang.
	</li>

	<li>
		<a href="/api/{year - 1}">/api/{year - 1}</a> gunakan parameter tahun tuntuk mendapatkan daftat hari
		libur di tahun yang di inginkan.
	</li>
	<li>
		<a href="/api/{year}/2">/api/{year}/2</a> gunakan parameter bulan dan tahun untuk mendapatkan
		daftar hari libur di bulan 2 tahun {year}.
	</li>
	<li><a href="/api/next">/api/next</a> untuk mendapatkan hari libur berikutnya.</li>
</ul>
<div class="border-start border-info border-3 px-2">
	<p>Apabila data tidak ditemukan respon akan berupa array kosong</p>
</div>
<h4>Bagaimana cara kerja API ini?</h4>
<p>
	API ini mengambil data dari <a href="https://tanggalan.com/" target="_blank">tanggalan.com</a> dan
	data per tahun ditarik setiap satu bulan sekali menggunakan GitHub Actions.
</p>
<p>
	Apabila mencoba mengakses data yang belum ditarik, server akan melakukan scraping ke web target
</p>
