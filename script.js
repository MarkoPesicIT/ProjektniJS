document.addEventListener('DOMContentLoaded', function () {
    const slider = document.getElementById('myRange');
    const output = document.getElementById('brzina');
    let refreshRate = slider.value;

    output.innerHTML = slider.value; // Display the default slider value

    // Update the current slider value (refresh rate) when the slider is moved
    slider.oninput = function () {
        refreshRate = this.value;
        output.innerHTML = this.value;
        clearInterval(clockInterval); // Clear the previous interval
        clockInterval = setInterval(updateClock, refreshRate); // Set new interval with updated refresh rate
    };

    function updateClock() {
        const now = new Date();
        const baseTime = now.getTime(); // Get current time in milliseconds

        const hours = Math.floor(baseTime / (3600 * 1000)).toString(2).padStart(8, '0');
        const minutes = Math.floor((baseTime % (3600 * 1000)) / (60 * 1000)).toString(2).padStart(8, '0');
        const seconds = Math.floor((baseTime % (60 * 1000)) / 1000).toString(2).padStart(8, '0');
        const milliseconds = (baseTime % 1000).toString(2).padStart(12, '0');

        updateBits(hours, 'hour-bit-');
        updateBits(minutes, 'minute-bit-');
        updateBits(seconds, 'second-bit-');
        updateBits(milliseconds, 'millisecond-bit-');

        updateAddition(hours, 'sabiranjeSati');
        updateAddition(minutes, 'sabiranjeMinuti');
        updateAddition(seconds, 'sabiranjeSekunde');
        updateAddition(milliseconds, 'sabiranjeMilisekunde');

        document.querySelector('.sat').textContent = Math.floor(baseTime / (3600 * 1000)).toString().padStart(2, '0');
        document.querySelector('.minut').textContent = Math.floor((baseTime % (3600 * 1000)) / (60 * 1000)).toString().padStart(2, '0');
        document.querySelector('.sekunda').textContent = Math.floor((baseTime % (60 * 1000)) / 1000).toString().padStart(2, '0');
        document.querySelector('.milisekunda').textContent = (baseTime % 1000).toString().padStart(3, '0');
    }

    let clockInterval = setInterval(updateClock, refreshRate); // Initial clock update

    function updateBits(time, prefix) {
        for (let i = 0; i < time.length; i++) {
            const bitId = prefix + (Math.pow(2, 7 - i)).toString();
            const bitElement = document.getElementById(bitId);
            if (bitElement) {
                if (time[i] === '1') {
                    bitElement.classList.add('active');
                } else {
                    bitElement.classList.remove('active');
                }
            }
        }
    }

    function updateAddition(time, sabiranjeClass) {
        const cifra1 = time.slice(0, 4);
        const cifra2 = time.slice(4, 8);
        const cifra3 = time.slice(8, 12);
        const sabiranjeSpan = document.querySelector('.' + sabiranjeClass);
        sabiranjeSpan.querySelector('.cifra#cifra1').textContent = parseInt(cifra1, 2).toString();
        sabiranjeSpan.querySelector('.cifra#cifra2').textContent = parseInt(cifra2, 2).toString();
        if (cifra3) {
            sabiranjeSpan.querySelector('.cifra#cifra3').textContent = parseInt(cifra3, 2).toString();
        }
    }
    
});
