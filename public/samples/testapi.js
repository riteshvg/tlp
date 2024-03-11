        document.addEventListener('DOMContentLoaded', function() {
            // Fetch data from both /films and /locations endpoints simultaneously
            Promise.all([
                fetch('https://ghibliapi.herokuapp.com/films'),
                fetch('https://ghibliapi.herokuapp.com/locations')
            ])
            .then(responses => Promise.all(responses.map(response => response.json())))
            .then(data => {
                const filmsData = data[0];
                const locationsData = data[1];

                // Merge films and locations data
                const mergedData = mergeData(filmsData, locationsData, 'id');

                // Display merged data
                displayMergedData(mergedData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

            // Merge data from two endpoints based on a common identifier
            function mergeData(data1, data2, identifier) {
                const mergedData = [];

                data1.forEach(item1 => {
                    const matchingItem = data2.find(item2 => item1[identifier] === item2[identifier]);
                    if (matchingItem) {
                        mergedData.push({ ...item1, ...matchingItem });
                    }
                });

                return mergedData;
            }

            // Display merged data
            function displayMergedData(mergedData) {
                const container = document.getElementById('data-container');
                container.innerHTML = '';

                mergedData.forEach(item => {
                    const card = document.createElement('div');
                    card.classList.add('card', 'mb-3');
                    card.innerHTML = `
                        <div class="card-body">
                            <h5 class="card-title">${item.title}</h5>
                            <p class="card-text">Location: ${item.name}</p>
                            <p class="card-text">Description: ${item.description}</p>
                        </div>
                    `;
                    container.appendChild(card);
                });
            }
        });