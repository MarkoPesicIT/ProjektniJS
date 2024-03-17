// When the DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Get the slider element and output element
    const slider = document.getElementById('myRange');
    const output = document.getElementById('brzina');

    // Initialize refresh rate and clock interval
    let refreshRate = slider.value;
    let clockInterval;

    // Display the default slider value
    output.innerHTML = slider.value;

    // Update the current slider value (refresh rate) when the slider is moved
    slider.oninput = function () {
        refreshRate = this.value;
        output.innerHTML = this.value;
        clearInterval(clockInterval); // Clear the previous interval
        clockInterval = setInterval(updateClock, refreshRate); // Set new interval with updated refresh rate
    };

    // Function to update the clock display
    function updateClock() {
        const currentDate = new Date(); // Get current date
        const baseTime = currentDate.getTime(); // Get current time in milliseconds

        // Calculate hours, minutes, seconds, and milliseconds in binary format
        const hours = currentDate.getHours().toString(2).padStart(8, '0');
        const minutes = currentDate.getMinutes().toString(2).padStart(8, '0');
        const seconds = currentDate.getSeconds().toString(2).padStart(8, '0');
        const milliseconds = currentDate.getMilliseconds().toString(2).padStart(12, '0');

        // Update the visual representation of time
        updateBits(hours, 'hour-bit-');
        updateBits(minutes, 'minute-bit-');
        updateBits(seconds, 'second-bit-');
        updateBits(milliseconds, 'millisecond-bit-');

        // Update time display in decimal format
        document.querySelector('.sat').textContent = currentDate.getHours().toString().padStart(2, '0');
        document.querySelector('.minut').textContent = currentDate.getMinutes().toString().padStart(2, '0');
        document.querySelector('.sekunda').textContent = currentDate.getSeconds().toString().padStart(2, '0');
        document.querySelector('.milisekunda').textContent = currentDate.getMilliseconds().toString().padStart(3, '0');
    }

    // Initial clock update
    clockInterval = setInterval(updateClock, refreshRate);

    // Function to update the visual representation of time
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
});
