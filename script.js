// koristimo ovo da bi se javascript pokrenuo nakon sto se ucitao ceo html
document.addEventListener('DOMContentLoaded', function()
{
	// Klizač za kontrolu brzine osvežavanja
	const slider = document.getElementById('myRange');

	// Element koji prikazuje trenutnu brzinu
	const izlaz = document.getElementById('brzina');

	// Postavljanje početnih vrednosti
	let osvezavanje = slider.value;

	// Trenutna brzina osvežavanja
	let brzina;

	// Postavljanje početne vrednosti brzine
	izlaz.innerHTML = slider.value;

	// Funkcija koja se pokreće pri promeni vrednosti klizača
	slider.oninput = function()
	{
		// Ažuriranje trenutne brzine
		osvezavanje = this.value;

		// Ažuriranje prikaza trenutne brzine
		izlaz.innerHTML = this.value;

		// Prekidanje prethodnog intervala
		clearInterval(brzina);

		// Postavljanje novog intervala sa novom brzinom
		brzina = setInterval(updateClock, osvezavanje);
	};
	// Funkcija za osvežavanje sata
	function updateClock()
	{
		// Trenutni datum i vreme
		const trenutnoVreme = new Date();

		// Pretvaranje trenutnog vremena u binarni format
		const sati = trenutnoVreme.getHours().toString(2).padStart(8, '0');
		const minuti = trenutnoVreme.getMinutes().toString(2).padStart(8, '0');
		const sekunde = trenutnoVreme.getSeconds().toString(2).padStart(8, '0');
		const milisekunde = trenutnoVreme.getMilliseconds().toString(2).padStart(12, '0');

		// Ažuriranje prikaza binarnog vremena
		bit(sati, 'sati-bit-');
		bit(minuti, 'minuti-bit-');
		bit(sekunde, 'sekunde-bit-');
		bit(milisekunde, 'millisekunde-bit-');

		// Ažuriranje klasičnog prikaza sata
		document.querySelector('.sat').textContent = trenutnoVreme.getHours().toString().padStart(2, '0');
		document.querySelector('.minut').textContent = trenutnoVreme.getMinutes().toString().padStart(2, '0');
		document.querySelector('.sekunda').textContent = trenutnoVreme.getSeconds().toString().padStart(2, '0');
		document.querySelector('.milisekunda').textContent = trenutnoVreme.getMilliseconds().toString().padStart(3, '0');
	}

	// Pokretanje sata
	brzina = setInterval(updateClock, osvezavanje);

	function bit(vreme, id)
	{
		// Određivanje dužine vremena
		const length = vreme.length;
		// Određivanje početnog indeksa bita
		const startIndex = (length === 12) ? 11 : 7;
		let sum = 0; // Inicijalizacija sume

		// Petlja za prolazak kroz sve bitove vremena
		for (let i = 0; i < length; i++)
		{
			// Određivanje identifikatora bita
			const bitId = id + (Math.pow(2, startIndex - i)).toString();
			// Pronalaženje elementa sa datim identifikatorom
			const bit = document.getElementById(bitId);
			// Provera postojanja bita
			if (bit)
			{
				// Provera vrednosti bita
				if (vreme[i] === '1')
				{
					// Dodavanje CSS klase za aktivni bit
					bit.classList.add('active');
					// Ažuriranje sume
					sum += Math.pow(2, startIndex - i);
				}
				else
				{
					// Uklanjanje CSS klase za neaktivni bit
					bit.classList.remove('active');
				}
			}
		}

		// Pronalaženje roditeljskog span elementa
		const parentSpan = document.getElementById(id.split('-')[0]);
		// Provera postojanja roditeljskog span elementa
		if (parentSpan)
		{
			// Pronalaženje svih span elemenata unutar roditeljskog spana
			const spanElements = parentSpan.getElementsByTagName('span');
			// Petlja za prolazak kroz sve span elemente
			for (let i = 0; i < spanElements.length; i++)
			{
				// Određivanje vrednosti bita
				const bitNumber = Math.pow(2, i);
				// Pronalaženje i ažuriranje tekstualnog sadržaja span elementa
				const spanElement = spanElements[i];
				if (spanElement)
				{
					if ((sum & bitNumber) === bitNumber)
					{
						spanElement.textContent = bitNumber.toString();
					}
					else
					{
						spanElement.textContent = '0';
					}
				}
			}
		}

		// Definisanje i obrada bitova za milisekunde
		const milliseconds = [
		{
			value: 1,
			id: "sabiranje-milisekunde-bit-1"
		},
		{
			value: 2,
			id: "sabiranje-milisekunde-bit-2"
		},
		{
			value: 4,
			id: "sabiranje-milisekunde-bit-4"
		},
		{
			value: 8,
			id: "sabiranje-milisekunde-bit-8"
		},
		{
			value: 16,
			id: "sabiranje-milisekunde-bit-16"
		},
		{
			value: 32,
			id: "sabiranje-milisekunde-bit-32"
		},
		{
			value: 64,
			id: "sabiranje-milisekunde-bit-64"
		},
		{
			value: 128,
			id: "sabiranje-milisekunde-bit-128"
		},
		{
			value: 256,
			id: "sabiranje-milisekunde-bit-256"
		},
		{
			value: 512,
			id: "sabiranje-milisekunde-bit-512"
		}];

		// Petlja za obradu bitova milisekundi
		milliseconds.forEach(ms =>
		{
			// Pronalaženje i ažuriranje ciljnog elementa u zavisnosti od stanja bita
			const bitElement = document.getElementById("millisekunde-bit-" + ms.value);
			const targetElement = document.getElementById(ms.id);
			if (bitElement.classList.contains("active"))
			{
				targetElement.textContent = ms.value.toString();
			}
			else
			{
				targetElement.textContent = "0";
			}
		});
	}
});
