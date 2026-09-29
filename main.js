const zip = document.querySelector('#zip');
const results = document.querySelector('#results');

document.querySelector('button').addEventListener('click', getUV);

function getUV() {
    const zipVal = zip.value.trim();

    if (!/^\d{5}$/.test(zipVal)) {
        results.textContent = 'Please enter a valid ZIP code.';
        return;
    }

    results.textContent = 'Loading...';

    
    fetch(`https://api.zippopotam.us/us/${zipVal}`)
        .then(res => res.json())
        .then(data => {

            const city = data.places[0]['place name'];
            const state = data.places[0]['state abbreviation'];

            
            fetch(`https://data.epa.gov/dmapservice/getEnvirofactsUVDAILY/ZIP/${zipVal}/JSON`)
                .then(res => res.json())
                .then(uvData => {
                    console.log(uvData);

                    if (!uvData.length) {
                        results.textContent = 'No UV forecast available.';
                        return;
                    }

                    const uvIndex = Number(uvData[0].UV_INDEX);
                    const date = uvData[0].DATE;

                    let risk = '';
                    let advice = '';

                    if (uvIndex < 3) {
                        risk = 'Low';
                        advice = 'Use everyday sun protection. If any...';
                    } else if (uvIndex < 6) {
                        risk = 'Moderate';
                        advice = 'Wear sunscreen and seek shade. It is toasty';
                    } else if (uvIndex < 8) {
                        risk = 'High';
                        advice = 'Limit midday sun exposure. You might get cooked';
                    } else if (uvIndex < 11) {
                        risk = 'Very High';
                        advice = 'Take extra sun protection precautions. You will definitly get cooked';
                    } else {
                        risk = 'Extreme';
                        advice = 'Avoid unnecessary midday sun exposure. Burnt status!';
                    }

                    results.innerHTML = `
                        <div class="result-card">
                            <h2>${city}, ${state}</h2>
                            <p class="date">${date}</p>

                            <h3>UV Index</h3>
                            <p class="uv-number">${uvIndex}</p>

                            <p class="risk">${risk} Risk</p>

                            <div class="advice">
                                <h3>Sun Protection Advice</h3>
                                <p>${advice}</p>
                            </div>
                        </div>
                    `;
                })
                .catch(error => {
                    results.textContent = 'No UV data';
                    console.log(error);
                });

        })
        .catch(error => {
            results.textContent = 'Could not find that ZIP code.';
            console.log(error);
        });
}