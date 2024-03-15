const bit_sati = document.querySelectorAll('.hour-bit');
const bit_minuti = document.querySelectorAll('.minute-bit');
const bit_sekunde = document.querySelectorAll('.second-bit');
const bit_milisekunde = document.querySelectorAll('.millisecond-bit');
var osvezavanje;
const slider = document.getElementById("myRange");

function binarniSat() {
    const sada = new Date();
    const sati = sada.getHours();
    const minuti = sada.getMinutes();
    const sekunde = sada.getSeconds();
    const milisekunde = sada.getMilliseconds();

    updateBits(bit_sati, sati);
    updateBits(bit_minuti, minuti);
    updateBits(bit_sekunde, sekunde);
    updateBits(bit_milisekunde, milisekunde);

    setTimeout(binarniSat, osvezavanje);
}

function updateBits(bits, value) {
    bits.forEach((bit, index) => {
        const bitValue = Math.pow(2, bits.length - 1 - index);
        bit.classList.toggle('active', value & bitValue);
    });
}

function vreme() {
      const now = new Date();
      const sat = now.getHours().toString().padStart(2, '0');
      const minut = now.getMinutes().toString().padStart(2, '0');
      const sekunda = now.getSeconds().toString().padStart(2, '0');
      const milisekunda = now.getMilliseconds().toString().padStart(3, '0');
  
      document.querySelector('.sat').textContent = sat;
      document.querySelector('.minut').textContent = minut;
      document.querySelector('.sekunda').textContent = sekunda;
      document.querySelector('.milisekunda').textContent = milisekunda;
}

document.addEventListener('DOMContentLoaded', function () {
    vreme();
    osvezavanje = slider.value; 
    setInterval(vreme, osvezavanje); 
    binarniSat();
});

slider.addEventListener('input', function () {
    osvezavanje = this.value;
});
