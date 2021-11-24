import React from 'react';
import Header from '@components/about/Header';

const About = (): JSX.Element => {
	return (
		<section className="w-full max-w-6xl mx-auto">
			<div className="container">
				<h1 className="text-3xl font-semibold mb-12">Feature</h1>
				<p className="">
					Menampilkan daftar harga aset saham secara realtime menggunakan WebSocket. Apabila market
					sedang tutup aplikasi akan redirect ke REST API untuk menampilkan data harga penutupan
					market. Endpoint API mengarah ke API{' '}
					<span className="text-blue">
						<a href="https://finance.yahoo.com/" rel="noreferrer" target="_blank">
							Yahoo Finance{' '}
						</a>
					</span>
					(WebSocket dan REST).
				</p>
				<p className="mt-10 mb-4">Jam operasional :</p>
				<p className="font-semibold">Indonesia Stock Exchange (IDX)</p>
				<p className="">09:00:00 s/d 11:30:00 (Sesi pertama)</p>
				<p className="">13:30:00 s/d 15:00:00 (Sesi kedua)</p>
				<p className="font-semibold mt-4">
					National Association of Securities Dealers Automated Quotations (Nasdaq)
				</p>
				<p className="">04:00am - 09:30am (Opening Session)</p>
				<p className="">09:30am - 04:00pm (Core Trading Session)</p>
				<p className="">04:00pm - 08:00pm (Extended Hours)</p>
				<p className="font-semibold mt-4">Cryptocurrency</p>
				<p className="">00:00am - 00:00pm (Open 24/7 all day long)</p>
			</div>
		</section>
	);
};

export default About;
