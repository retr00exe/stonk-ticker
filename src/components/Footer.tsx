import React from 'react';
import { Link } from 'react-router-dom';

const Footer = (): JSX.Element => {
	return (
		<div className="w-full bg-dark text-white">
			<div className="xl:px-40 pb-12 lg:px-20 md:px-10 sm:px-5 px-10">
				<div className="w-full pt-12 flex flex-col sm:flex-row space-y-2 justify-start">
					<div className="w-full sm:w-2/5 pr-6 flex flex-col space-y-4">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							xmlnsXlink="http://www.w3.org/1999/xlink"
							width="160"
							height="57"
							viewBox="0 0 160 57"
						>
							<defs>
								<pattern
									id="pattern"
									preserveAspectRatio="none"
									width="100%"
									height="100%"
									viewBox="0 0 197 70"
								>
									<image
										width="197"
										height="70"
										xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMUAAABGCAYAAAB8HFCGAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAxaADAAQAAAABAAAARgAAAACHM5B0AAAPKElEQVR4Ae1c7XXcthK1ffLfTAVGKhBfBUIq8HYgugLvq8B0BWEqCF1B6AoCV2CmgsAVPKYCv3tlQB5BAy73S2vamHPuzsydD4BDYndlRXn6+fPnJ0XKBMoEvk7g2VezWGUCZQKcQDkU5TkoE0gmUA5FMpDilgmUQ1GegTKBZALlUCQDKW6ZQDkU5Rk45QRqNOsAD2yAVcpPq9x12fS3NAGDzfAANMAVQHkPDLfWCl+elt9TrPCuXX7LFbYQD8J1sp1/4deAT/jVuOWTYjW36pvYKA8CcSN28wm2B+Lh6IIPtU4pnxTrvG+X2DXf/T+KhXkYeAB4SOKBIGeAVUs5FKu+fY++eYsVW6AHPDAAz4Eov8Jw0VmrLodirXfuuH23mfIcn6bz0+HPhOQP1+RXL+VQrP4WHnQBnzNVTzN8Srcg3ghy9T9ci2sp/+2THEaxF0/AI/Mt8DPwDmgBD3wXUj4pvovbuPdFHPtJsfeCayoov9Fe090qe32UCRzye4oKO6vF7pyw12Jy/7wOig+gfQqR85nQcDxF09LjqAlYUe2ErZq7DoVBVQNYoAbkP7/BvScf4PUB9wLBaaFtsKVycFpJZGzmWCXmwLUKH6kGhgW4/ysgJ58QcEALeGCpGCRuAQvM9ed8POCAAZiAKB2MOjpCb2GPwtfMBiSRSg+CoLB3d2vNv7hM2Aq+gU2k0oMgonA9rpuKB9GkpOIzh9DEaiQ4A2wCuPau53VATg9MwFfhf+ahoALXA4eIR1ENpH3tTDOj5Mt6xnPCvjI32hvwPle0g+8yPWNv6mNmZJL+LrMfm+Rx3RRtppZ8zLWZnKV07EPdZorIy7xtJo+0zMvZLlM/KPW8F10mfxc9IaEG7vbx7OvxuLMMrBG4uWP2M14g3QEGkOLg8N1Sk1YjBZeLs58TedFsYfwJcC+HyGsUdTOFFWIOOGRGn1Dnge9dhpkLtDOxGLqORqLTvvFe8J4dIvw0cUAdi7VDwUUPfZhiXy7URkdojWOYD5ehoYgBl3v4WiV/A+6Nwu9LccgmU9SBv8rEdtHjroTvJO5xHX9nrsVm+EjPxfl8SqF/6L2Iffi88p7eyk/RCLqBnluA73LcxASMQAVsgJdAKnyQm4R08N8B2kPegm+AVJqUCP4HaKfEOoWTFH/zyr1PQVvoLcDBpNKAaBOyhq/tX6bxYWD/KBWMONcxkj+AHsR1y8u10lHsXJz3Ts6VeddATvi8OsAHsLYBtOeVfQzg775Hhe9UY+YLGL93Wfm9K7Fz3/+0GpNZgzRjTwQq2FxbE633RksMXA/NfrJ/tNlLEwcy5kTda4mBG6CNUhNrLWLaHlyoTxXzY21Ot2lR8MnHGq5pBULKAyVzpB37ULcPqr4Q5GUe7TqTSzrNlb7L1G2Tuj6TN4FPc2X/IVO3YX/5SVHhlMR3M5j3ZAPP3WPuO4zNnViZ7eEs/bTYIld7B+c7hgNSsSkRfH6qNJkYaTcTS0M2JYLPNTinOXFzwTPGJvResvaSnH22OSL5E/BCKbLgnMKTyj1LQ5Kfm3eLvC7JlS77aJ8WNfhB/kxBQhN+FXBaQHBe2NLM9WxlkrBvYJvgV9DbYKcqx+fW69IGiv+vwpmEq+BrN5hpS9ZI2v0Q7pC5Srsnz+fQi5oatvaGyUO4617IPqLlF3PJoXAPqh4S/iF1y1QZnvm/Z2Jt4LfQ2kW/A+9DTqo4KE2cRibcmPh00wOQ68/cgS9FHkzAPWC+EHZPvk/yq8SPro/GoVoeitwi06HNd9S1iGvvzvy0qIEtoEmrkYHTDhFD57qGuBW+ixXRJzCA1u7ztZ7+xGZ49pFSS+eUtjwUx/Q1BxTzQe0ydQ689oDPfUpkWi2mzeLMh4m8liL5CQyZkFV47bDwTccnuVXin8w9xaEw2M02syOf4SPdwdDeRbQDwZqWL2cQ7j/9qsRl+P20yPETcJkWNuFTP4ZdNE6gDXrwucuK/NenbJISsOBqgPolkBOXCwR+guYG3+zIY/iUnxIG/eL+N7C1AwF65z8wMKfI7gkMSPlDSeM9kGKlI+xe2IeYFkUGoL4BcuIYWHIoGuRZoAKugKXyCol+QXKLnAbIPZgI3Uob9CHKhSLehNynUNqXH9nblCz+QROYUPUeSN9AbdKN9ycVflqPKTnjs4cL8euZvDTEN11Hcsmh4MO664FlryjxYXKROIHmVywO9lDZZzhcqwda4Jg1UV5ETGCAnR4KvkHxIR5Dng1aKtbtI+y5z/3modsCd+ssORS7NsSHiBflADamvY9skbzr0PFCO6ABziE8yNy3AwZgAoqcdgIu086C5+xrgPc5lT4ljvR3Pq9LDsUHbMKJjXjYBMXdvh7+UqG0XVh+g7wO4AD3lbdJgQu+hyaKnH8CHkvwzecqWcrC532lTiU+wCk/5/OdvxcJHjZB4bMz3VozL0sOhUN9O9PjmBD7au8OHIbG54a3aw9cp8jlJ9BjC78l27DBj1qGB+kstD3y2oW5atozlb1PVvfdk3k1Or3OdLPgeTBS4XfFTUou8M91DQuWLiliAk7Y0eSbH58FGwmhB2E/mrnkUHDD55Au0/R38COwzcRzdZn0W7qeC54gts8PdidYbrUteF/59SYV3uv0mwHfFIc0UfhO2NKspHOILQ+FyzTgDT96oaT3Br72IHEQbcjtobUBvgDfApp80EhwXO8U4mea1DOxEvo6geGreWdp90fLuyuAMUlH2FewjfD3NuWhGGeq25nYIaEuU0ReXmybyduCr5TYqHCkGsAAx4pHA+1rHfu2fDmx2BP329VOm2mNIo1Pe5mUyPiDwqefEkzR8mTpCCd3LzqZuK8tD8WE4veZBq/Bc6EqE490DWMLDIADNGlB8t0+FX4qdAnZw9fe/TnENJelPV8UYb4DLDAnBsENwN4esEAqQ0oE/yV0n4lJupJOsEeFI2UzfKQ3MLbROYHu0cMC7NsBHvgI0I8yRSPRNvFzrkMg9zDLmkE6GTuXE+9FlamLdA1jC7CPB24l/T8EWrB/fQllX/mQjsAEmIAK+gpI5WlCGPisfZ7wdF8BPY1ELPzcnv6DGPtJcXCuJZHYn+CzJtbZEK+h0329BdeGeFQWRm4/zOENHwAPRGFvA3BG/wU6QMoWzm+SEPY72L3wLWwDUL8AcqLtPeZOMNJrjTFNcw9NCFjo3PX/jZgHDMA1LKBJD/JGCwTuPfRmJh5DBsY/0cnoD+BHgPsxARU070Uqv4B48Oeo/JO93J/qZf6Cb5a2/PM+gT6T7UWOzI+2y9SRjzlR15ncQ2itP9chf6j0KGQPCXNos5m6bbKGXK+fqdNCPuk1aUkJxxy5prQ3SW7qNjO1sg/tLi0+wr9dN12AfgWMRzSWpS2cuIaVgcTmkGKepvetbZL+x7jafgwaTgc29ajTeg4H9tPKuswacV2rFe3gatGT/ZeIrIlrRz1XXyEY85boYa7ZHrGe6+YW5Ka6PZppqR7kFohrjFoSOCdyYq6m+0y9z9Rb8IwdIwOKDfBEAfncNSE0KxWiaU9yh/bjYhPQAxZIe2t+i7x9ZIPk2GfpXreiJtZGPWQWJx9z9tFtpt9S2iPxdr/pzxTpdywDYgtYQPsOBvpO+H2S392IAfBAFAujjU6iybuE01wDstcC4DqAa2rSgNwAFpj7Hv0v4iPggs71Q/ieNPDY/+U9Vnc4Iwd0gAdSqUBsA+b2yrpPgAecAMy9hPvmXl4oVZyHA4aACVpKBacFXktS2O9hs7cTnDQbOH9IItivoHuFX0IZJG2ABrgC5oTzGwEXQPtWdh2KmBe1jYbQE+y7hoL/Fk2DTRGpcP+8jmPFZhocMqMavSqlnwdHnFIMmhFRPAxiqViReMi1ivKTmtoMd+5v30Nx0h2XZmUC3+IEnn2Lmyp7KhO45ATKobjk9Mva3+QEyqHQbwu/y1vAAGuRuGfq71Ee7frKodAfnxr0X0Cjh79JNu6Z+nuUR7u+NRwKgzvcAhYoUiZw9gms5VC8wSTs2adRFigTwAQucSgqrNsDHvgMjEALaMKPzC4EGmgHUOfEIRDzY47GxVjUrJkCBuhNDMzoBjEH1ECUBoYDJAd3b2H9AIzArhmlzS0I1k4BHfQuaZDgAK7F2pxsEHAA8wja5ObEIMieI7DPtfQh30Oz3gKPIpc4FB2u7AaogN8BHwD1QCYwY2A9tAOoc3KNQJ0ENU6mcB/8rawHOoDrbYBdYpDA3qyPYmCkXIztq9mXe3kbCt9A22DPqS2CHugA1vPaaiAnzPsDqACuNQCaGJB/AtTMI2iTm+vPvsQIsIay61oscm6AD0APeGALPIr89Cir3F/EwOV/QlADHpgTj2APcEAOaIFTC/dBGYCWBsQBf9G4kIxY14q1ubePgXOC18wNyJhD+xqogJzUIRB1Ls+EwBZ6CPYIzUNhAdqakLci0MP+B7CAAzSpA9lCu2BTc62zy7Ozr/BwAQ/qOdABBiiiT4APRnw4Rj1lJzvtzNg/QfaMdrWjTY04QfG3r/MvWr9pvuR00Uscii22/zfwEuA7Rg9oQwD9w0qHK/8YwIfBAWuV1V3LJQ4Fb3INvAI+ATfAABT5OoHXMDmbn4EN4IC1yuqu5RKHIt7cHoYB+KnB771F7k+AbxQT4IAWWLN4bH4113KJQ9FgQBaogB64AviDd044TMoGsEAD5ITvrkYErbBzZuzP/USx0VigY51Bbr0gf2mKFYlxDUFlTdbFfNqnlo1oGO1RcJoZ98OYtLVccrGfCQms2QT7/OrAv3La5y+i0lztL6H4V1NpnvS9KJpmcjuRF03mNzM1XEf2j3Xk6pk6ExOFjn3sTN2TBbE+9ByhiSgbGLl6g5jMjTUTjGqmzoXEXF/Ja/3JzfXvQ3/myfoNfNlb2gaxKdRJ5eAwJnNPbl/i7yl46uuACXoMgMoKazaABxwwJxZBwgEUd/s6/xL7U4/AFPR81ZfrsEjyAOsa4A3wK+CAY2SD4hpwoUnUwc0qgwjB2glwgAdywrwKcLmEhLfwTeA8tAv2nLIIEg6guNvX+ReDsA0pHjoiUOdTlzgU57uay3dusYVTHYrLX80PuoNyKA6/8Xx3/R/wAXAApQFeAE+BIiudwCV+o73SUanbfgV2A2yB5yHjbdBFrXQC5ZNipTeubPt8E3h2vtalc5nAOidQDsU671vZ9Rkn8H8vyuIxq6tLAwAAAABJRU5ErkJggg=="
									/>
								</pattern>
							</defs>
							<rect id="ETI-Logo" width="160" height="57" fill="url(#pattern)" />
						</svg>
						<p className="opacity-60">Real-time stock ticker, baby!</p>
					</div>
					<div className="w-full sm:w-1/5 flex flex-col space-y-4">
						<Link to="/" className="opacity-60">
							About Us
						</Link>
						<Link to="/" className="opacity-60">
							Responsibilities
						</Link>
						<Link to="/" className="opacity-60">
							Out Services
						</Link>
						<Link to="/" className="opacity-60">
							Contact
						</Link>
					</div>
					<div className="w-full sm:w-1/5 flex flex-col space-y-4">
						<Link to="/" className="opacity-60">
							Disclaimer
						</Link>
						<Link to="/" className="opacity-60">
							Testimonials
						</Link>
						<Link to="/" className="opacity-60">
							Privacy Policy
						</Link>
						<Link to="/" className="opacity-60">
							Terms of Service
						</Link>
					</div>
					<div className="w-full sm:w-1/5 pt-6 flex items-end mb-1">
						<div className="flex flex-row space-x-4">
							<i className="fab fa-facebook-f"></i>
							<i className="fab fa-twitter"></i>
							<i className="fab fa-instagram"></i>
							<i className="fab fa-google"></i>
						</div>
					</div>
				</div>
				<div className="opacity-60 pt-2">
					<p>© 2020 Executive Trade International.</p>
				</div>
			</div>
		</div>
	);
};

export default Footer;
