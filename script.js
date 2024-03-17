
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

	// Funkcija za ažuriranje binarnog prikaza vremena
	function bit(vreme, id)
	{
		const length = vreme.length;
		const startIndex = (length === 12) ? 11 : 7;
		for (let i = 0; i < length; i++)
		{
			const bitId = id + (Math.pow(2, startIndex - i)).toString();
			const bit = document.getElementById(bitId);
			if (bit)
			{
				if (vreme[i] === '1')
				{
					bit.classList.add('active');
				}
				else
				{
					bit.classList.remove('active');
				}
			}
		}
	}
});
