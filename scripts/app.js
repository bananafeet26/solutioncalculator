function compoundApp() {
    return {
        settings: {
            totalVolume: 100, // ml
            compounds: [],
            remainingVolume: 100,
            targetConcentrations: [250],
            totalGrams: 0,
            addRowSelectedCompoundId: 0,
        },
        solutionData: {
            viscosity: 0
        },
        solutionMeasurements: [],
        init() {
            const ctx = document.getElementById('myChart').getContext('2d');
            this.chart = new Chart(ctx, chartSettings);

            // Initiate basic recipe
            this.settings.compounds[0] = prepareCompound(1, this.settings.totalVolume, 0,0,0, 2); //BA
            this.settings.compounds[1] = prepareCompound(0, this.settings.totalVolume, 0,0,0, 20); //BB
            this.settings.compounds[2] = prepareCompound(3, this.settings.totalVolume, 0,0,0, 52);
            this.settings.compounds[3] = prepareCompound(6, this.settings.totalVolume, 0,0,250, 0);


            for (let compound of this.settings.compounds) {
                if (compound.class === "ingredient") {
                    compound.grams = compound.density * compound.mls;
                }
            }
        },
        view: "table",
        theme: localStorage.getItem('theme') || 'light',
        chart: null,  // Store the Chart.js instance here
        getChartTheme() {
            return this.theme === 'dark'
                ? {
                    grid: '#333',
                    text: '#e6e6e6',
                    bg: '#1e1e1e',
                    // 🎨 chart fill (dark mode = subtle glow)
                    fill: 'rgba(255,255,255,0.32)'
                }
                : {
                    grid: '#ddd',
                    text: '#333',
                    bg: '#ffffff',

                    // 🎨 chart fill (light mode = soft pastel)
                    fill: 'rgba(78,59,68,0.25)'
                };
        },
        calculateRemainingVolume() {
            console.log(this.settings.compounds);
            let mls = 0
            for (let i =0 ; i < this.settings.compounds.length; i++) {
                if (typeof this.settings.compounds[i].mls !== "undefined") {
                mls += this.settings.compounds[i].mls;
            }
            }
            return (this.settings.totalVolume - mls)
        },
        get availableCompounds() {
            return compounds.filter(c =>
                !this.settings.compounds.some(sc => sc.self_id === c.self_id)
            );
        },
        addCompoundRow() {
            console.log(this.settings.addRowSelectedCompoundId);
            let solutionId = compounds.findIndex(c => c.self_id === this.settings.addRowSelectedCompoundId)

            console.log(`solutionId: ${solutionId}`);
            let solutionEntry = prepareCompound(solutionId, this.calculateRemainingVolume(), this.settings.totalVolume, 25,250,10);
            this.settings.compounds.push(solutionEntry);
            this.updateChart()
        },
        removeCompound(uuid) {
            console.log(`removeCompound: ${uuid}`);
            let index = this.settings.compounds.findIndex(
                c => c.self_id === uuid
            );
            console.log(`index: ${index}`);

            if (index !== -1) {
                this.settings.compounds.splice(index, 1);
            }
        },
        fillInMissingValues() {
            let totalGrams = 0;
            for (let i =0 ; i < this.settings.compounds.length; i++) {
                switch (this.settings.compounds[i].basis) {
                    case "v_v_percent":
                        updateFields(this.settings.compounds[i].v_v_percent, this.settings, "v_v_percent")
                        break;
                    case "mg_per_ml":
                        updateFields(this.settings.compounds[i].mg_per_ml, this.settings, "mg_per_ml")
                        break;
                    case "q.s.":
                        updateFields(this.settings.compounds[i].v_v_percent, this.settings, "q.s.")
                        break;
                    default:
                }
                    totalGrams += this.settings.compounds[i].grams;
            }
            this.settings.totalGrams = totalGrams;
        },anaylseBatch() {
            let solutionCalculatedMeasurements = {
                id: crypto.randomUUID(),
                viscosity: 0,
                filterTime: 0,
                title: "",
                compounds: [],
            }
            solutionCalculatedMeasurements.viscosity = calculateViscosity(this.settings.compounds);
            solutionCalculatedMeasurements.filterTime = calculateFilterTimeDarcy(this.settings.totalVolume, solutionCalculatedMeasurements.viscosity);
            for (let i =0 ; i < this.settings.compounds.length; i++) {
                if (this.settings.compounds[i].class === "excipient") {
                    solutionCalculatedMeasurements.title += `${this.settings.compounds[i].name} ${this.settings.compounds[i].mls.toFixed(2)}ml, `;
                }
            }
            solutionCalculatedMeasurements.compounds = this.settings.compounds;
            this.solutionMeasurements.push(solutionCalculatedMeasurements);
            console.log(solutionCalculatedMeasurements);
            this.updateChart();
        }, deleteBatch(uuid) {
            console.log(`deleteBatch: ${uuid}`);
            let index = this.solutionMeasurements.findIndex(
                c => c.id === uuid
            );
            this.solutionMeasurements.splice(index, 1);
            console.log(`index: ${index}`);
            this.updateChart();
        },
        updateChart() {
            this.fillInMissingValues();
            let remainingVolume = this.calculateRemainingVolume()
            this.settings.remainingVolume = remainingVolume;
            this.chart.data.datasets = [];
            this.chart.data.labels = [];
            let dataset = {
                label: [],
                data: [],  // Initial data
                backgroundColor: [],
                hidden: false,
                fill: true
            };
            for (let i =0 ; i < this.settings.compounds.length; i++) {
                dataset.label = this.settings.compounds[i].name
                dataset.data.push(this.settings.compounds[i].mls);
                this.chart.data.labels.push(this.settings.compounds[i].name);
                dataset.backgroundColor.push(colours[i]);
            }
            if (remainingVolume > 0) {
                dataset.label = "Remaining volume"
                this.chart.data.labels.push("Remaining volume");
                dataset.backgroundColor.push("red");
                dataset.data.push(remainingVolume);
            }
            this.chart.data.datasets[0] = dataset;
            console.log(this.chart.data);
            console.log(this.settings.compounds);
            this.chart.update();
        },
    }
}