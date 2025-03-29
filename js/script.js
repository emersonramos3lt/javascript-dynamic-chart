let chartData = {
    labels: [],
    datasets: [{
        label: '# of Values', // Text
        data: [],
        backgroundColor: [
            'rgba(255, 85, 85, 0.4)',
            'rgba(54, 162, 235, 0.4)',
            'rgba(255, 184, 108, 0.4)',
            'rgba(80, 250, 123, 0.4)',
            'rgba(255, 121, 198, 0.4)',
            'rgba(255, 159, 64, 0.4)'
        ],
        borderColor: [
            'rgba(255, 85, 85, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 184, 108, 1)',
            'rgba(80, 250, 123, 1)',
            'rgba(255, 121, 198, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }]
};

function createChart(type, height = 400) {
    const canvasContainer = document.getElementById('canvas-container');
    canvasContainer.innerHTML = `<canvas id="myChart"></canvas>`;
    canvasContainer.style.height = `${height}px`;

    const ctx = document.getElementById('myChart').getContext('2d');
    return new Chart(ctx, {
        type: type,
        data: chartData, // Pega os dados definidos acima, como: (borderWidth, backgroundColor e label)
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            onclick: (event, activeElements) => {
                if(activeElements.length > 0) {
                    const { datasetIndex, index } = activeElements[0];
                    removeData(datasetIndex, index);
                }
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            hover: {
                mode: 'index',
                intersect: false
            }
        }
    });
}

let myChart = createChart('bar'); // Cria o gráfico inicial com a altura padrão, definida na função acima. height = 400

function addData() {
    const labelInput = document.getElementById('labelInput');
    const dataInput = document.getElementById('dataInput');

    if (labelInput.value && dataInput.value) {
        chartData.labels.push(labelInput.value);
        chartData.datasets.forEach((dataset) => {
            dataset.data.push(dataInput.value);
        });
        myChart.update();
        labelInput.value = '';
        dataInput.value = '';
    }
}

function updateChartType() {
    const selectedType = document.getElementById('chartType').value;
    myChart.destroy(); // Destroi o gráfico antigo.
    myChart = createChart(selectedType);
}

function removeData(datasetIndex, index) {
    if (chartData.labels.length > index) {
        chartData.labels.splice(index, 1);
        chartData.datasets[datasetIndex].data.splice(index, 1);
        myChart.update();
    }
}
