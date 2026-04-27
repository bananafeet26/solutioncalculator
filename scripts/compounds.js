var compounds = [
    {
        id: crypto.randomUUID(),
        class: "excipient",
        name: "benzyl benzoate",
        pubchemid: null,
        self_id: "benzyl_benzoate",
        molecular_weight: 212.24, // g/mol
        density: 1.118, // g/mL @ 20c
        viscosityArray: [8.292], // cP
        viscosityTempArray: [25],
        mls: 0,
        grams: 0,
        v_v_percent: 0,
        mg_per_ml: 0,
        basis: "v_v_percent"
    },
    {
        id: crypto.randomUUID(),
        class: "excipient",
        name: "benzyl alcohol",
        pubchemid: null,
        self_id: "benzyl_alcohol",
        molecular_weight: 108.14, // g/mol
        density: 1.044, // g/mL (g/cm3) @ 20c
        viscosityArray: [5.474], // cP
        viscosityTempArray: [25],
        mls: 0,
        grams: 0,
        v_v_percent: 0,
        mg_per_ml: 0,
        basis: "v_v_percent"
    },
    {
        id: crypto.randomUUID(),
        class: "excipient",
        name: "ethyl oleate",
        pubchemid: 5363269,
        self_id: "ethyl_oleate",
        molecular_weight: 310.5, // g/mol
        density: 0.87, // 0.868-0.873g/cm^3
        viscosityArray: [5.15], // cP
        viscosityTempArray: [25],
        evaporation_point: 250.15,
        boiling_point: 217,
        mls: 0,
        grams: 0,
        v_v_percent: 0,
        mg_per_ml: 0,
        basis: "q.s."
    },
    {
        id: crypto.randomUUID(),
        class: "excipient",
        name: "castor oil",
        pubchemid: null,
        self_id: "castor",
        molecular_weight: null,
        density: 0.96, // 0.957 -0.9656 g/mL
        viscosityArray: [580, 283, 36],
        viscosityTempArray: [27, 37, 79.4],
        mls: 0,
        grams: 0,
        v_v_percent: 0,
        mg_per_ml: 0,
        basis: "q.s."
    },
    {
        id: crypto.randomUUID(),
        class: "excipient",
        name: "MCT",
        pubchemid: null,
        self_id: "MCT",
        molecular_weight: null,
        density: 0.942,
        viscosityArray: [23, 12],
        viscosityTempArray: [25, 37],
        mls: 0,
        grams: 0,
        v_v_percent: 0,
        mg_per_ml: 0,
        basis: "q.s."
    },
    {
        id: crypto.randomUUID(),
        class: "excipient",
        name: "Cottonseed oil",
        pubchemid: null,
        self_id: "cottonseed",
        molecular_weight: null,
        density: 0.92, //0.918–0.926
        viscosityArray: [70],
        viscosityTempArray: [20],
        mls: 0,
        grams: 0,
        v_v_percent: 0,
        mg_per_ml: 0,
        basis: "q.s."
    },
    {
        id: crypto.randomUUID(),
        class: "ingredient",
        name: "Testosterone decanoate",
        self_id: "testosterone_decanoate",
        molecular_weight: 442.7, //g/mol
        density: 1.04,
        mls: 0,
        grams: 0,
        v_v_percent: 0,
        mg_per_ml: 0,
        basis: "mg_per_ml"
    },
]