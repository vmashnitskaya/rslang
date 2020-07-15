const chartConfig = () => {
    return {
        type: 'bar',
        data: {
            labels: [
                'Red',
                'Blue',
                'Yellow',
                'Green',
                'Purple',
                'Orange',
                'Yellow',
                'Green',
                'Purple',
                'Orange',
            ],
            datasets: [
                {
                    label: 'Learned words',
                    data: [12, 19, 3, 5, 2, 3, 25, 44, 130, 0],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        },
        options: {
            tooltips: {
                callbacks: {
                    label() {
                        return 'hi';
                    },
                },
            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                            stepSize: 1,
                        },
                    },
                ],
            },
        },
    };
};

export default chartConfig;

// function createConfig() {

// }
