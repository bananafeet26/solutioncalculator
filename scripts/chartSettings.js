var chartSettings = {
    type: 'pie',
    data: {
        labels: [],
        datasets: []
    },
    options: {
        maintainAspectRatio: false,
        layout: {
            padding: 30,
        },
        scales: {
            y: {
                display: false,
                beginAtZero: true,
                ticks: {
                    display: false,
                },
                grid: {
                    display: false,
                },
            },
            x: {
                display: false,
                ticks: {
                    display: false,
                },
                grid: {
                    display: false,
                },
            },
        },
        plugins: {
            legend: {
                position: 'left', // 👈 moves legend to the left
                labels: {
                    boxWidth: 20,
                    padding: 15
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return context.label + ': ' + context.raw + ' mL';
                    }
                }
            }
        }
    },
};

var colours = ["#8cb369", "#f4e285", "#f4a259", "#5b8e7d", "#bc4b51"]
