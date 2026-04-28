/* Maths functions */
// Usage example:
const volumeLitres = 0.1; // liters
const permeability = 1e-14; // example value in m^2
const areaM2 = 0.00062; // 1 cm^2 in m^2
const deltaP_Pa = 87 * 6894.76; // max pressure in Pa
const viscosityCP = 5.16; // water viscosity
const membraneThicknessM = 1e-4; // 0.1 mm

/* v_v percentage units are ml, ml and % */
function calculateVVPercentage(totalVolume, solutionVolume) {
    return (solutionVolume / totalVolume) * 100
}

function calculateMgPerMl(grams, totalVolume) {
    return (grams * 1000) / totalVolume
}

function calculateGrams(mls, density) {
    return (mls * density)
}

function calculateMlsFromPercentage(totalVolume, v_v_percent) {
    return totalVolume * (v_v_percent / 100)
}

function calculateMlsFromGrams(grams, density) {
    return grams / density
}

function calculateGramsFromMgMl(mg_per_ml, totalVolume) {
    return (mg_per_ml / 1000) * totalVolume
}

function calculateRemainingVolume(compounds, totalVolume) {
    let mls = 0
    for (let i = 0; i < compounds.length; i++) {
        if (typeof compounds[i].mls !== "undefined") {
            mls += compounds[i].mls;
        }
    }
    return (totalVolume - mls)
}

function adjustExcipientVolume(compounds, excipients, excipientCount, totalVolume, adjustedExcipientId) {
    let remainingVolume = calculateRemainingVolume(compounds, totalVolume);

    let remainingVolumeAbs = Math.abs(remainingVolume)
    let otherExcipient = excipients.filter(e => e.self_id !== adjustedExcipientId);
    console.log("Adjusting excipient volumes: remainingVolume: " + remainingVolume + ", remainingVolumeAbs: " + remainingVolumeAbs + ", excipients:");
    if (remainingVolume !== 0 && otherExcipient.length > 0) {
        const per = remainingVolume / otherExcipient.length;

        otherExcipient.forEach(e => {
            e.mls += per;
            if (e.mls < 0) {
                e.mls = 0;
            }
        });
    }
    console.log(`Adjusted excipient volumes: remainingVolume: ${remainingVolume}, remainingVolumeAbs: ${remainingVolumeAbs}, excipients: ${excipients}`)
}

function updateCompoundsMissingFields(compound, fieldChanged, totalVolume, excipients, excipientCount, d) {

    switch (fieldChanged) {
        case "mls":
            if (compound.mls < 0) compound.mls = 0;
            /* Calculate mg/ml from mls */
            if (compound.basis === "q.s.") {
                compound.grams = calculateGrams(compound.mls, d);
                // q.s. excipients are just remaining volume
            }
            if (compound.basis === "mg_per_ml") {
                compound.mg_per_ml = calculateMgPerMl(compound.grams, totalVolume)
                compound.mls = calculateMlsFromGrams(compound.grams, d);
                compound.grams = calculateGrams(compound.mls, d);
            }
            if (compound.basis === "v_v_percent") {
                compound.mg_per_ml = calculateMgPerMl(compound.grams, totalVolume)
                compound.v_v_percent = calculateVVPercentage(totalVolume, compound.mls);
            }
            break;
        case "grams":
            /* Calculate mg/mL from grams */
            if (compound.grams < 0) compound.grams = 0;
            compound.mg_per_ml = calculateMgPerMl(compound.grams, totalVolume)
            compound.mls = calculateMlsFromGrams(compound.grams, d)
            break
        case "v_v_percent":
            /* Calculate mls from percentage */
            if (compound.v_v_percent < 0) compound.v_v_percent = 0;
            compound.mls = calculateMlsFromPercentage(totalVolume, compound.v_v_percent)
            break
        case "mg_per_ml":
            /* Calculate mls from grams */
            if (compound.mg_per_ml < 0) compound.mg_per_ml = 0;
            compound.grams = calculateGramsFromMgMl(compound.mg_per_ml, totalVolume);
            break
        default:
    }
    adjustExcipientVolume(compounds, excipients, excipientCount, totalVolume, compound.self_id);

}

function updateFields(solutionEntry, settings, fieldType) {
    const d = compounds.find(c => c.self_id === solutionEntry.self_id)?.density
    if (typeof d === "undefined") {
        return
    }


    let excipients = settings.compounds.filter(c => c.basis === "q.s.");
    let excipientCount = excipients.length;
    updateCompoundsMissingFields(solutionEntry, fieldType, settings.totalVolume, excipients, excipientCount, d);
}

function validateEntry(solutionEntry, entry, type) {
    let remainingVolume = this.calculateRemainingVolume();
    if (remainingVolume <= 0) {
        alert("No remaining volume");
        return;
    }
    console.log(`entry: ${entry}, type: ${type}`);
    return (entry);
}

const has = (v) => v !== undefined;

function prepareCompound(id, totalVolume, mls, grams, mgsPerMl, v_v_percent) {
    let solutionEntry = compounds[id];
    if (totalVolume === 0) {
        alert("Please enter a total volume");
        return;
    }
    console.log(`totalVolume: ${totalVolume}, mls: ${mls}, grams: ${grams}, mgsPerMl: ${mgsPerMl}, v_v_percent: ${v_v_percent}`);

    // Derive v/v % from mls
    if (v_v_percent === 0) {
        if ((mls > 0)) {
            console.log("Derive v/v % from mls");
            solutionEntry.v_v_percent = calculateVVPercentage(totalVolume, mls);
            solutionEntry.mls = mls;
            solutionEntry.grams = calculateGrams(mls, solutionEntry.density);
            solutionEntry.mg_per_ml = calculateMgPerMl(solutionEntry.grams, totalVolume);
        } else {
            //alert("Please enter mls");
        }
    }
    // Derive mg/mL from grams
    if (mgsPerMl === 0) {
        console.log("Derive mg/mL from grams");
        if ((grams > 0)) {
            console.log(`grams: ${grams}, totalVolume: ${totalVolume}`);
            solutionEntry.mg_per_ml = calculateMgPerMl(grams, totalVolume);
            solutionEntry.grams = grams;
            solutionEntry.mls = calculateMlsFromGrams(grams, solutionEntry.density);
            solutionEntry.v_v_percent = calculateVVPercentage(totalVolume, solutionEntry.mls);
        } else {
            //alert("Please enter grams");
        }
    }
    // Derive from mls v/v
    if (mls === 0) {
        if ((v_v_percent > 0)) {
            console.log("Derive from mls v/v");
            solutionEntry.mls = calculateMlsFromPercentage(totalVolume, v_v_percent);
            solutionEntry.v_v_percent = v_v_percent;
            solutionEntry.grams = calculateGrams(solutionEntry.mls, solutionEntry.density);
            solutionEntry.mg_per_ml = calculateMgPerMl(solutionEntry.grams, totalVolume);
        } else {
            //alert("Please enter a volume percentage");
        }
    }
    // Derive from mg/mL
    if (grams === 0) {
        if ((mgsPerMl > 0)) {
            console.log("Derive from mg/mL");
            solutionEntry.grams = calculateGramsFromMgMl(mgsPerMl, totalVolume);
            solutionEntry.mg_per_ml = mgsPerMl;
            solutionEntry.mls = calculateMlsFromGrams(solutionEntry.grams, solutionEntry.density);
            solutionEntry.v_v_percent = calculateVVPercentage(totalVolume, solutionEntry.mls);
            console.log(`mls: ${solutionEntry.mls}, v_v_percent: ${solutionEntry.v_v_percent}, grams: ${solutionEntry.grams}, mg_per_ml: ${solutionEntry.mg_per_ml}`)
        }
    }
    console.log(solutionEntry);
    return solutionEntry;
}

function updateVolume(totalVolume, compounds) {
    let volume = 0;
    for (let i = 0; i < compounds.length; i++) {
        switch (compounds[i].basis) {
            case "v_v_percent":
                compounds[i].mls = calculateMlsFromPercentage(totalVolume, compounds[i].v_v_percent);
                compounds[i].grams = calculateGrams(compounds[i].mls, compounds[i].density);
                compounds[i].mg_per_ml = calculateMgPerMl(compounds[i].grams, totalVolume);
                volume += compounds[i].mls;
                break;
            case "mg_per_ml":
                compounds[i].grams = calculateGramsFromMgMl(compounds[i].mg_per_ml, totalVolume);
                compounds[i].mls = calculateMlsFromGrams(compounds[i].grams, compounds[i].density);
                compounds[i].v_v_percent = calculateVVPercentage(totalVolume, compounds[i].mls);
                volume += compounds[i].mls;
                break;
            case "q.s.":
                break;
        }
    }
    compounds.find(c => c.basis === "q.s.").mls = totalVolume - volume;
    //this.settings.totalVolume = totalVolume;
}

function calculateFormulaProperties(compounds) {
    /*
    carrier oil viscosisty
    average viscosicty (how can i caluclate this including ester and components)
    total weight
    melting point (of each compound)
    lowest flash point (so you dont burn off sterilants like Benzy alcohol)
    PSI to filter through .45um and .22um depending on filter diameter
     */
}

/**
 * Calculates the approximate viscosity of a mixture using the Arrhenius mixing rule.
 *
 * @param {Array<number>} viscosities - Array of viscosities of each component (in cP or mPa·s)
 * @param {Array<number>} fractions   - Array of volume fractions (or weight/mole fractions) for each component.
 *                                      Must sum to 1 (or very close).
 * @returns {number} Approximate mixture viscosity (same units as input)
 */
// thanks Grok
function calculateMixtureViscosity(viscosities, fractions) {
    if (viscosities.length !== fractions.length || viscosities.length === 0) {
        throw new Error("Viscosities and fractions arrays must have the same length and not be empty");
    }

    let sum = 0;
    let totalFraction = 0;

    for (let i = 0; i < viscosities.length; i++) {
        const frac = fractions[i];
        if (frac < 0) throw new Error("Fractions cannot be negative");

        sum += frac * Math.log(viscosities[i]);
        totalFraction += frac;
    }

    if (Math.abs(totalFraction - 1) > 0.01) {
        console.warn("Fractions sum to " + totalFraction + " (should be close to 1)");
    }

    return Math.exp(sum / totalFraction);   // or just Math.exp(sum) if fractions already sum exactly to 1
}

function calculateViscosity(compounds) {
    let viscosity = [];
    let volumes = [];
    for (let i = 0; i < compounds.length; i++) {
        if (compounds[i].class === "excipient") {
            viscosity.push(compounds[i].viscosityArray[0]);
            volumes.push(compounds[i].mls);
        }
    }

    // Example usage for a typical TE formulation (adjust with your real data)
    const totalVolume = volumes.reduce((a, b) => a + b, 0);
    const fractions = volumes.map(v => v / totalVolume);
    return calculateMixtureViscosity(viscosity, fractions);
}

function viscosityRating(v) {
    const min = 10;
    const max = 500;

    const clamped = Math.max(min, Math.min(max, v));

    const norm = (clamped - min) / (max - min); // 0 → 1

    // exponential decay (tunable)
    const score = Math.pow(1 - norm, 2.5) * 100;

    return Math.max(0, Math.min(100, score));
}

function calculateSolventPercentage(compounds, totalVolume) {
    let solventMls = 0;
    for (let i = 0; i < compounds.length; i++) {
        if (compounds[i].basis === "v_v_percent") {
            solventMls += compounds[i].mls;
        }
    }
    return (solventMls / totalVolume) * 100
}

function calculateSolventRating(compounds, totalVolume, solventPercentage) {

    console.log(`solventPercentage: ${solventPercentage}`);
    const min = 2;
    const max = 50;

    const clamped = Math.max(min, Math.min(max, solventPercentage));

    return ((max - clamped) / (max - min)) * 100;
}

function calculateFilterTimeDarcy(volume, viscosityCP) {
    const viscosity = viscosityCP * 0.001; // Pa·s
    const flowRate = (permeability * areaM2 * deltaP_Pa) / (viscosity * membraneThicknessM); // m^3/sec
    const volumeM3 = volumeLitres / 1000; // convert liters to m^3
    const timeSeconds = volumeM3 / flowRate;
    const timeMinutes = timeSeconds / 60;

    console.log(`volumeLitres: ${volumeM3}, permeability: ${permeability}, areaM2: ${areaM2}, deltaP_Pa: ${deltaP_Pa}, membraneThicknessM: ${membraneThicknessM}, viscosity: ${viscosity}, flowRate: ${flowRate}, volumeM3: ${volumeM3}, timeSeconds: ${timeSeconds}, timeMinutes: ${timeMinutes}`)
    console.log(`Estimated filter time: ${timeMinutes.toFixed(2)} minutes`);
    return timeMinutes;

}

function calculateStability(solventPercentage) {
    const min = 2;   // best
    const max = 50;  // worst

    const v = Math.max(min, Math.min(max, solventPercentage));

    const score = 100 * (max - v) / (max - min);

    return Math.max(0, Math.min(100, score));
}

function caclulateTotalsGrams(compounds) {
    let grams = 0;
    for (let i = 0; i < compounds.length; i++) {
        if (compounds[i].grams !== undefined) {
            grams += compounds[i].grams;
        }
    }
    return grams;
}

function classifySolventRange(p) {
    console.log(`LOW_SOLVENT_RANGE: ${LOW_SOLVENT_RANGE[0]} - ${LOW_SOLVENT_RANGE[1]}, p: ${p}`)
    console.log(`MEDIUM_SOLVENT_RANGE: ${MEDIUM_SOLVENT_RANGE[0]} - ${MEDIUM_SOLVENT_RANGE[1]}, p: ${p}`)
    console.log(`HIGH_SOLVENT_RANGE: ${HIGH_SOLVENT_RANGE[0]} - ${HIGH_SOLVENT_RANGE[1]}, p: ${p}`)

    if (p >= LOW_SOLVENT_RANGE[0] && p <= LOW_SOLVENT_RANGE[1]) {
        console.log(`LOW_SOLVENT_RANGE: ${LOW_SOLVENT_RANGE[0]} - ${LOW_SOLVENT_RANGE[1]}, p: ${p}`)
        return "low_solvent_range";
    } else if (p >= MEDIUM_SOLVENT_RANGE[0] && p <= MEDIUM_SOLVENT_RANGE[1]) {
        return "medium_solvent_range";
    } else if (p >= HIGH_SOLVENT_RANGE[0] && p <= HIGH_SOLVENT_RANGE[1]) {
        return "high_solvent_range";
    }

    //alert("Solvent range not classified");
    return "medium_solvent_range";
}
function estimateSaturationForCompound(compound, compounds, totalVolume) {
    if (typeof compound === "undefined") {
        return;
    }
    console.log(`estimateSaturationForCompound: ${compound.name}, ${compound.mg_per_ml}, ${compound.basis}`)
    let solventPercentage = calculateSolventPercentage(compounds, totalVolume);

    let solventRange = classifySolventRange(solventPercentage);
    console.log(compound);
    console.log(`solventRange: ${solventRange}`);

    let esterLength = solubility.find(c =>
        c.member_self_ids.includes(compound.self_id)
    );
    console.log(`Ester is: ${esterLength.name}`);

    let rangeForCompoundForThisConcentration = esterLength?.[solventRange];
    console.log(`rangeForCompoundForThisConcentration: ${rangeForCompoundForThisConcentration}`);
    return rangeForCompoundForThisConcentration;
}
function checkSaturation(solutionEntry, compounds, totalVolume) {
    const range = estimateSaturationForCompound(
        solutionEntry,
        compounds,
        totalVolume
    );

    const value = solutionEntry.mg_per_ml;
    console.log(`value: ${value}, range: ${range}`);
    if (value <= range[0]) {
        console.log("is-valid");
        return "is-valid";
    } // too low
    if (value > range[1]) {
        console.log("is-invalid");
        return "is-invalid"; // too high
    }

    return "is-valid"; // OK
}
function checkSolvents(solutionEntry, compounds, totalVolume) {
    let value = solutionEntry.v_v_percent;
    if (solutionEntry.self_id === "benzyl_benzoate"){
        if (value >= 50) {
            console.log("is-invalid");
            return "is-invalid"; // too high
        }
    }
    if (solutionEntry.self_id === "benzyl_alcohol"){
        if (value < 1.5) {
            console.log("is-invalid");
            return "is-invalid";
        } if (value > 5) {
            console.log("is-invalid");
            return "is-invalid"; // too high
        }
    }
}