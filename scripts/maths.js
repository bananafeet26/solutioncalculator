/* Maths functions */
// Usage example:
const volumeLitres = 0.1; // liters
const permeability = 1e-14; // example value in m^2
const areaM2 = 0.00062; // 1 cm^2 in m^2
const deltaP_Pa = 87 * 6894.76; // max pressure in Pa
const viscosityCP = 5.16; // water viscosity
const membraneThicknessM = 1e-4; // 0.1 mm

const DEBUG = true;

/* v_v percentage units are ml, ml and % */
function calculateVVPercentage(totalVolume, solutionVolume) {
    if (DEBUG) console.log(`maths.js -> calculateVVPercentage(totalVolume: ${totalVolume}, solutionVolume: ${solutionVolume})`);
    return (solutionVolume / totalVolume) * 100
}

function calculateMgPerMl(grams, totalVolume) {
    if (DEBUG) console.log(`maths.js -> calculateMgPerMl(grams: ${grams}, totalVolume: ${totalVolume})`);
    return (grams * 1000) / totalVolume
}

function calculateGrams(mls, density) {
    if (DEBUG) console.log(`maths.js -> calculateGrams(mls: ${mls}, density: ${density})`);
    return (mls * density)
}

function calculateMlsFromPercentage(totalVolume, v_v_percent) {
    if (DEBUG) console.log(`maths.js -> calculateMlsFromPercentage(totalVolume: ${totalVolume}, v_v_percent: ${v_v_percent})`);
    return totalVolume * (v_v_percent / 100)
}

function calculateMlsFromGrams(grams, density) {
    if (DEBUG) console.log(`maths.js -> calculateMlsFromGrams(grams: ${grams}, density: ${density})`);
    return grams / density
}

function calculateGramsFromMgMl(mg_per_ml, totalVolume, purity) {
    if (DEBUG) console.log(`maths.js -> calculateGramsFromMgMl(mg_per_ml: ${mg_per_ml}, totalVolume: ${totalVolume}, purity: ${purity})`);
    const purityFactor = purity / 100;
    console.log(`purity:  ${purity} purityFactor: ${purityFactor}, mg_per_ml: ${mg_per_ml}, totalVolume: ${totalVolume}`);
    if (purityFactor <= 0) return 0;
    return ((mg_per_ml / 1000) * totalVolume) / purityFactor;
}

function calculateRemainingVolume(compounds, totalVolume) {
    if (DEBUG) console.log(`maths.js -> calculateRemainingVolume(compounds: ${compounds}, totalVolume: ${totalVolume})`);

    let mls = 0
    for (let i = 0; i < compounds.length; i++) {
        if (typeof compounds[i].mls !== "undefined") {
            mls += compounds[i].mls;
        }
    }
    return (totalVolume - mls)
}

function adjustExcipientVolume(compounds, excipients, excipientCount, totalVolume, adjustedExcipientId) {
    if (DEBUG) console.log(`maths.js -> adjustExcipientVolume(compounds: ${compounds}, excipients: ${excipients}, excipientCount: ${excipientCount}, totalVolume: ${totalVolume}, adjustedExcipientId: ${adjustedExcipientId})`);

    let remainingVolume = calculateRemainingVolume(compounds, totalVolume);
    console.log(compounds);
    console.log(`Adjusting excipient volume: remainingVolume: ${remainingVolume}`);
    let otherExcipient = excipients.filter(e => e.self_id !== adjustedExcipientId);

    // negative volume
    if (remainingVolume < 0) {
        let totalNegativeVolume = Math.abs(remainingVolume);
        const per = totalNegativeVolume / otherExcipient.length;

        if (excipients.length > 1) {
            otherExcipient.forEach(e => {
                e.mls -= per;
                if (e.mls < 0) {
                    e.mls = 0.5;
                }
            });
        } else {
            excipients[0].mls -= totalNegativeVolume;
            if (excipients[0].mls < 0) {
                excipients[0].mls = 0.5;
            }
        }
    } else if (excipients.length === 1) {
        excipients[0].mls += remainingVolume;
    } else if (remainingVolume !== 0 && otherExcipient.length > 0) {
        const per = remainingVolume / otherExcipient.length;
        let qsMode = false;
        otherExcipient.forEach(e => {
            if (e.qsMode === true) {
                qsMode = true;
            }
        });
        otherExcipient.forEach(e => {
            e.mls += per;
            if (e.mls < 0) {
                e.mls = 0.5;
            }
        });
    }
    for (let i = 0; i < excipients.length; i++) {
        excipients[i].grams = calculateGrams(excipients[i].mls, excipients[i].density);
        excipients[i].mg_per_ml = calculateMgPerMl(excipients[i].grams, totalVolume)
        excipients[i].v_v_percent = calculateVVPercentage(totalVolume, excipients[i].mls);
    }
}

function fillInMissingVolume(compounds, totalVolume, settings) {
    if (DEBUG) console.log(`maths.js -> fillInMissingVolume(compounds: ${compounds}, totalVolume: ${totalVolume}, settings: ${settings})`);

    let remainingVolume = calculateRemainingVolume(compounds, totalVolume);
    let qsModeCompounds = compounds.filter(e => e.qsMode === true);
    let qsMode = false;
    if (qsModeCompounds.length > 0) {
        qsMode = true;
    }
    console.log(`Filling in missing volume: remainingVolume: ${remainingVolume}, qsMode: ${qsMode}`);
    if (remainingVolume > 0) {
        if (qsMode) {
            qsModeCompounds[0].mls = remainingVolume + qsModeCompounds[0].mls;
            updateFields(qsModeCompounds[1], settings, "mls");
        }
        compounds.forEach(c => {
            if (typeof c.mls === "undefined") {
                c.mls = remainingVolume;
            }
        });
    }
}


function updateFields(solutionEntry, settings, fieldType) {
    if (DEBUG) console.log(`maths.js -> updateFields(solutionEntry: ${solutionEntry.name}, settings: , fieldType: ${fieldType})`);

    // Reset recipe if form is modified.
    if (settings.selectedRecipeId) {
        if (fieldType !== "purity") {
            settings.selectedRecipeId = undefined;
        }
    }
    if (typeof solutionEntry === "undefined") {
        //alert("Please select a compound");
        if (DEBUG) console.warn(`maths.js -> updateFields() - undefined solutionEntry`);
        return;
    }
    if (typeof solutionEntry.grams < 0.5) {
        return
    } else if (typeof solutionEntry.mls < 0.5) {
        return
    } else if (typeof solutionEntry.v_v_percent < 0.5) {
        return
    }

    const d = compounds.find(c => c.self_id === solutionEntry.self_id)?.density
    if (typeof d === "undefined") {
        if (DEBUG) console.warn(`maths.js -> updateFields() - Density not found`);
        return
    }

    let excipients = settings.compounds.filter(c => c.basis === "q.s.");
    let excipientCount = excipients.length;
    console.log(`--*> Updating missing fields.`)
    //updateCompoundsMissingFields(solutionEntry, fieldType, settings.totalVolume, excipients, excipientCount, d, settings);
    //function updateCompoundsMissingFields(compound, fieldChanged, totalVolume, excipients, excipientCount, d, settings) {    switch (fieldChanged) {
    switch (fieldType) {
        case "mls":
            if (solutionEntry.mls < 0) solutionEntry.mls = 0;
            /* Calculate mg/ml from mls */
            if (solutionEntry.basis === "q.s.") {
                solutionEntry.grams = calculateGrams(solutionEntry.mls, d);
                solutionEntry.mg_per_ml = calculateMgPerMl(solutionEntry.grams, settings.totalVolume)
                // q.s. excipients are just remaining volume
            }
            if (solutionEntry.basis === "mg_per_ml") {
                solutionEntry.grams = calculateGrams(solutionEntry.mls, d);
                solutionEntry.mg_per_ml = calculateMgPerMl(solutionEntry.grams, settings.totalVolume)
                solutionEntry.mls = calculateMlsFromGrams(solutionEntry.grams, d);
            }
            if (solutionEntry.basis === "v_v_percent") {
                solutionEntry.grams = calculateGrams(solutionEntry.mls, d);
                solutionEntry.mg_per_ml = calculateMgPerMl(solutionEntry.grams, settings.totalVolume)
                solutionEntry.v_v_percent = calculateVVPercentage(settings.totalVolume, solutionEntry.mls);
            }
            break;
        case "grams":
            /* Calculate mg/mL from grams */
            if (solutionEntry.grams < 0) {
                solutionEntry.grams = 0;
            }
            solutionEntry.mg_per_ml = calculateMgPerMl(solutionEntry.grams, settings.totalVolume)
            solutionEntry.mls = calculateMlsFromGrams(solutionEntry.grams, d)
            break
        case "v_v_percent":
            /* Calculate mls from percentage */
            if (solutionEntry.v_v_percent < 0) solutionEntry.v_v_percent = 0;
            //solutionEntry.grams = calculateGramsFromMgMl(solutionEntry.mg_per_ml, settings.totalVolume, solutionEntry.purity);
            solutionEntry.mls = calculateMlsFromPercentage(settings.totalVolume, solutionEntry.v_v_percent);
            solutionEntry.grams = calculateGrams(solutionEntry.mls, d);
            solutionEntry.mg_per_ml = calculateMgPerMl(solutionEntry.grams, settings.totalVolume)
            break
        case "mg_per_ml":
            /* Calculate mls from grams */
            console.log("Updating mg/mL");
            if (solutionEntry.mg_per_ml < 0) solutionEntry.mg_per_ml = 0;
            solutionEntry.grams = calculateGramsFromMgMl(solutionEntry.mg_per_ml, settings.totalVolume, solutionEntry.purity);
            solutionEntry.mls = calculateMlsFromGrams(solutionEntry.grams, d);
            solutionEntry.v_v_percent = calculateVVPercentage(settings.totalVolume, solutionEntry.mls);
            break
        case "purity":
            if (solutionEntry.basis === "mg_per_ml") {
                console.log("Updating purity");
                solutionEntry.grams = (settings.totalVolume * solutionEntry.mg_per_ml / 1000) / (solutionEntry.purity / 100);
                solutionEntry.mls = calculateMlsFromGrams(solutionEntry.grams, d);
                solutionEntry.v_v_percent = calculateVVPercentage(settings.totalVolume, solutionEntry.mls);
                // tail recursion
                //updateCompoundsMissingFields(compound, "grams", settings.totalVolume, excipients, excipientCount, d);
            } else {
                alert("Purity can only be updated for mg/mL basis");
            }
        default:
    }
    adjustExcipientVolume(settings.compounds, excipients, excipientCount, settings.totalVolume, solutionEntry.self_id);

}

function validateEntry(solutionEntry, entry, type) {
    let remainingVolume = this.calculateRemainingVolume();
    if (remainingVolume <= 0) {
        alert("No remaining volume");
        return;
    }
    //console.log(`entry: ${entry}, type: ${type}`);
    return (entry);
}

const has = (v) => v !== undefined;

function prepareCompound(id, totalVolume, mls, grams, mgsPerMl, v_v_percent, purity) {
    if (DEBUG) console.log(`maths.js -> prepareCompound(id: ${id}, totalVolume: ${totalVolume}, mls: ${mls}, grams: ${grams}, mgsPerMl: ${mgsPerMl}, v_v_percent: ${v_v_percent}, purity: ${purity})`);

    let solutionEntry = compounds[id];
    if (totalVolume === 0) {
        alert("Please enter a total volume");
        return;
    }
    //console.log(`totalVolume: ${totalVolume}, mls: ${mls}, grams: ${grams}, mgsPerMl: ${mgsPerMl}, v_v_percent: ${v_v_percent}`);

    // Derive v/v % from mls
    if (v_v_percent === 0) {
        if ((mls > 0)) {
            //console.log("Derive v/v % from mls");
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
        //console.log("Derive mg/mL from grams");
        if ((grams > 0)) {
            //console.log(`grams: ${grams}, totalVolume: ${totalVolume}`);
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
            //console.log("Derive from mls v/v");
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
            console.log(`mgsPerMl: ${mgsPerMl}, totalVolume: ${totalVolume} purity: ${purity}`);
            solutionEntry.grams = calculateGramsFromMgMl(mgsPerMl, totalVolume, purity);
            solutionEntry.mg_per_ml = mgsPerMl;
            solutionEntry.mls = calculateMlsFromGrams(solutionEntry.grams, solutionEntry.density);
            solutionEntry.v_v_percent = calculateVVPercentage(totalVolume, solutionEntry.mls);
            console.log(`mls: ${solutionEntry.mls}, v_v_percent: ${solutionEntry.v_v_percent}, grams: ${solutionEntry.grams}, mg_per_ml: ${solutionEntry.mg_per_ml}`)
        }
    }
    //console.log(solutionEntry);
    return solutionEntry;
}

function updateVolume(totalVolume, compounds) {
    if (DEBUG) console.log(`maths.js -> updateVolume(totalVolume: ${totalVolume}, compounds: ${compounds})`);

    for (let i = 0; i < compounds.length; i++) {
        switch (compounds[i].basis) {
            case "v_v_percent":
                compounds[i].mls = calculateMlsFromPercentage(totalVolume, compounds[i].v_v_percent);
                compounds[i].grams = calculateGrams(compounds[i].mls, compounds[i].density);
                compounds[i].mg_per_ml = calculateMgPerMl(compounds[i].grams, totalVolume);
                break;
            case "mg_per_ml":
                //console.log("Updating mg/mL");
                ///console.log(`Updating mg/mL mgsPerMl: ${compounds[i].mg_per_ml}, totalVolume: ${totalVolume} purity: ${compounds[i].purity}`)
                compounds[i].grams = calculateGramsFromMgMl(compounds[i].mg_per_ml, totalVolume, compounds[i].purity);
                //console.log(`grams: ${compounds[i].grams}, totalVolume: ${totalVolume}`);
                compounds[i].mls = calculateMlsFromGrams(compounds[i].grams, compounds[i].density);
                compounds[i].v_v_percent = calculateVVPercentage(totalVolume, compounds[i].mls);
                break;
            case "q.s.":
                compounds[i].mls = calculateMlsFromPercentage(totalVolume, compounds[i].v_v_percent);
                compounds[i].grams = calculateGrams(compounds[i].mls, compounds[i].density);
                compounds[i].mg_per_ml = calculateMgPerMl(compounds[i].grams, totalVolume);
                break;
        }
    }
    //compounds.find(c => c.basis === "q.s.").mls = totalVolume - volume;
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
    if (DEBUG) console.log(`maths.js -> calculateMixtureViscosity(viscosities: ${viscosities}, fractions: ${fractions})`);

    if (viscosities.length !== fractions.length || viscosities.length === 0) {
        throw new Error("Viscosities and fractions arrays must have the same length and not be empty");
    }

    let sum = 0;
    let totalFraction = 0;

    for (let i = 0; i < viscosities.length; i++) {
        const frac = fractions[i];
        if (frac < 0) {
            console.warn("Fraction " + i + " is negative, setting to 0");
            return 0;
        }

        sum += frac * Math.log(viscosities[i]);
        totalFraction += frac;
    }

    if (Math.abs(totalFraction - 1) > 0.01) {
        console.warn("Fractions sum to " + totalFraction + " (should be close to 1)");
    }

    return Math.exp(sum / totalFraction);   // or just Math.exp(sum) if fractions already sum exactly to 1
}

function calculateViscosity(compounds) {
    if (DEBUG) console.log(`maths.js -> calculateViscosity(compounds: )`);

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
    if (DEBUG) console.log(`maths.js -> viscosityRating(v: ${v})`);

    const min = 2;
    const max = 500;
    const clamped = Math.max(min, Math.min(max, v));
    const norm = (clamped - min) / (max - min); // 0 → 1

    // exponential decay (tunable)
    const score = Math.pow(1 - norm, 2.5) * 100;
    return Math.max(2, Math.min(100, score));
}

function calculateSolventPercentage(compounds, totalVolume) {
    if (DEBUG) console.log(`maths.js -> calculateSolventPercentage(compounds: , totalVolume: ${totalVolume})`);

    let solventMls = 0;
    for (let i = 0; i < compounds.length; i++) {
        if (compounds[i].basis === "v_v_percent") {
            solventMls += compounds[i].mls;
        }
    }
    return (solventMls / totalVolume) * 100
}

function calculateSolventRating(compounds, totalVolume, solventPercentage) {
    if (DEBUG) console.log(`maths.js -> calculateSolventRating(compounds: , totalVolume: ${totalVolume}, solventPercentage: ${solventPercentage})`);

    //console.log(`solventPercentage: ${solventPercentage}`);
    const min = 2;
    const max = 50;

    const clamped = Math.max(min, Math.min(max, solventPercentage));
    return Math.max(2, (max - clamped) / (max - min) * 100);
}

function calculateFilterTimeDarcy(volume, viscosityCP) {
    if (DEBUG) console.log(`maths.js -> calculateFilterTimeDarcy(volume: ${volume}, viscosityCP: ${viscosityCP})`);

    const viscosity = viscosityCP * 0.001; // Pa·s
    const flowRate = (permeability * areaM2 * deltaP_Pa) / (viscosity * membraneThicknessM); // m^3/sec
    const volumeM3 = volumeLitres / 1000; // convert liters to m^3
    const timeSeconds = volumeM3 / flowRate;
    const timeMinutes = timeSeconds / 60;

    //console.log(`volumeLitres: ${volumeM3}, permeability: ${permeability}, areaM2: ${areaM2}, deltaP_Pa: ${deltaP_Pa}, membraneThicknessM: ${membraneThicknessM}, viscosity: ${viscosity}, flowRate: ${flowRate}, volumeM3: ${volumeM3}, timeSeconds: ${timeSeconds}, timeMinutes: ${timeMinutes}`)
    //console.log(`Estimated filter time: ${timeMinutes.toFixed(2)} minutes`);
    return timeMinutes;

}

function calculateStability(solventPercentage) {
    if (DEBUG) console.log(`maths.js -> calculateStability(solventPercentage: ${solventPercentage})`);

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
    if (DEBUG) console.log(`maths.js -> calculateSolventRange(p: ${p})`);

    if (p >= LOW_SOLVENT_RANGE[0] && p <= LOW_SOLVENT_RANGE[1]) {
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
    if (DEBUG) console.log(`maths.js -> estimateSaturationForCompound(compound: , compounds: , totalVolume: ${totalVolume})`);

    if (typeof compound === "undefined") {
        return;
    }
    //console.log(`estimateSaturationForCompound: ${compound.name}, ${compound.mg_per_ml}, ${compound.basis}`)
    let solventPercentage = calculateSolventPercentage(compounds, totalVolume);

    let solventRange = classifySolventRange(solventPercentage);
    //.log(compound);
    //console.log(`solventRange: ${solventRange}`);

    let esterLength = solubility.find(c =>
        c.member_self_ids.includes(compound.self_id)
    );

    let rangeForCompoundForThisConcentration = esterLength?.[solventRange];
    return rangeForCompoundForThisConcentration;
}

function checkSaturation(solutionEntry, compounds, totalVolume) {
    if (DEBUG) console.log(`maths.js -> checkSaturation(solutionEntry: ${solutionEntry}, compounds: , totalVolume: ${totalVolume})`);

    const range = estimateSaturationForCompound(
        solutionEntry,
        compounds,
        totalVolume
    );
    if (typeof range === "undefined") return ""
    if (typeof mg_per_ml === "undefined") return ""

    const value = solutionEntry.mg_per_ml;
    console.log(`value: ${value}, range: ${range}`);
    if (value <= range[0]) {
        console.log("is-valid"); // the green tick is annoying
        return "";
    } // too low
    if (value > range[1]) {
        console.log("is-invalid");
        return "is-invalid"; // too high
    }

    return ""; // OK
}

function checkSolvents(solutionEntry, compounds, totalVolume) {
    if (DEBUG) console.log(`maths.js -> checkSolvents(solutionEntry: , compounds: , totalVolume: ${totalVolume})`);

    let solventPercentage = calculateSolventPercentage(compounds, totalVolume);
    let solventRange = classifySolventRange(solventPercentage);

    let value = solutionEntry.v_v_percent;
    if (solutionEntry.self_id === "benzyl_benzoate") {
        if (value >= 55) {
            return "is-invalid"; // too high
        }
    }
    if (solutionEntry.self_id === "benzyl_alcohol") {
        if (value < 0.9) {
            return "is-invalid";
        }
        if (value > 10) {
            return "is-invalid"; // too high
        }
    }
}

function availableInputs(compound) {
    switch (compound.basis) {
        case "q.s.":
            return ["mls", "grams"];
        case "v_v_percent":
            return ["mls", "v_v_percent"];
        case "mg_per_ml":
            return ["mg_per_ml", "grams", "purity"];
    }
}

function availableInputLabels(compound) {
    if (DEBUG) console.log(`maths.js -> availableInputLabels(compound: ${compound})`);

    switch (compound.basis) {
        case "q.s.":
            return ["ml", "gm", "mg/mL"];
        case "v_v_percent":
            return ["%", "ml", "mg/mL"];
        case "mg_per_ml":
            return ["mg/mL", "gm", "%"];
    }
}

function toggleInput(input) {
    if (input) return 1
    if (!input) return 0
}

function calculateBatchTotals(compounds) {
    if (DEBUG) console.log(`maths.js -> calulateBatchTotals(compounds: `);

    //updateCompoundsMissingFields(compounds, "mg_per_ml", 0, [], 0, 0);

    let grams = 0;
    let mls = 0;
    for (let i = 0; i < compounds.length; i++) {
        grams += compounds[i].grams;
        mls += compounds[i].mls;
    }
    return {
        grams: grams,
        mls: mls,
    }
}
// --- VETTED CHEMICAL PARAMETERS DATABASE ---
const CHEMICAL_DATABASE = {
    "testosterone_enanthate": { name: "Testosterone Enanthate", molecular_weight: 400.6, density: 1.05, molar_volume: 381.5, melting_point: 36.0, enthalpy_of_fusion: 24500, hsp: { d: 17.6, p: 4.8, h: 6.2 } },
    "testosterone_cypionate": { name: "Testosterone Cypionate", molecular_weight: 412.6, density: 1.05, molar_volume: 393.0, melting_point: 101.5, enthalpy_of_fusion: 34000, hsp: { d: 17.8, p: 5.1, h: 6.4 } },
    "testosterone_undecanoate": { name: "Testosterone Undecanoate", molecular_weight: 456.7, density: 1.02, molar_volume: 447.7, melting_point: 61.0, enthalpy_of_fusion: 31000, hsp: { d: 17.3, p: 3.9, h: 5.5 } },
    "testosterone_propionate": { name: "Testosterone Propionate", molecular_weight: 344.5, density: 1.10, molar_volume: 313.2, melting_point: 121.0, enthalpy_of_fusion: 32000, hsp: { d: 18.2, p: 6.1, h: 7.1 } },
    "testosterone_base": { name: "Testosterone Base", molecular_weight: 288.4, density: 1.12, molar_volume: 257.5, melting_point: 155.0, enthalpy_of_fusion: 29500, hsp: { d: 19.1, p: 8.5, h: 10.4 } },
    "nandrolone_decanoate": { name: "Nandrolone Decanoate", molecular_weight: 428.7, density: 1.04, molar_volume: 412.2, melting_point: 35.0, enthalpy_of_fusion: 22000, hsp: { d: 17.5, p: 4.5, h: 5.9 } },
    "nandrolone_phenylpropionate": { name: "Nandrolone Phenylpropionate (NPP)", molecular_weight: 406.5, density: 1.11, molar_volume: 366.2, melting_point: 97.0, enthalpy_of_fusion: 31500, hsp: { d: 18.5, p: 5.8, h: 6.7 } },
    "methenolone_enanthate": { name: "Methenolone Enanthate", molecular_weight: 414.6, density: 1.05, molar_volume: 394.9, melting_point: 67.0, enthalpy_of_fusion: 27000, hsp: { d: 17.5, p: 4.4, h: 6.0 } },
    "drostanolone_enanthate": { name: "Drostanolone Enanthate", molecular_weight: 416.6, density: 1.04, molar_volume: 400.6, melting_point: 53.0, enthalpy_of_fusion: 25500, hsp: { d: 17.4, p: 4.2, h: 5.8 } },
    "trenbolone_acetate": { name: "Trenbolone Acetate", molecular_weight: 312.4, density: 1.17, molar_volume: 267.0, melting_point: 96.0, enthalpy_of_fusion: 28000, hsp: { d: 18.8, p: 6.8, h: 7.2 } },
    "trenbolone_enanthate": { name: "Trenbolone Enanthate", molecular_weight: 382.5, density: 1.09, molar_volume: 350.9, melting_point: 71.0, enthalpy_of_fusion: 26500, hsp: { d: 17.9, p: 5.0, h: 6.1 } },
    "estradiol_enanthate": { name: "Estradiol Enanthate", molecular_weight: 384.5, density: 1.08, molar_volume: 356.0, melting_point: 95.0, enthalpy_of_fusion: 33000, hsp: { d: 18.1, p: 5.9, h: 8.8 } },
    "estradiol_valerate": { name: "Estradiol Valerate", molecular_weight: 356.5, density: 1.11, molar_volume: 321.2, melting_point: 144.0, enthalpy_of_fusion: 37500, hsp: { d: 18.4, p: 6.6, h: 9.3 } },
    "anadrol": { name: "Oxymetholone (Anadrol)", molecular_weight: 332.5, density: 1.16, molar_volume: 286.6, melting_point: 178.0, enthalpy_of_fusion: 36000, hsp: { d: 18.7, p: 7.9, h: 9.8 } },
    "halotestin": { name: "Fluoxymesterone", molecular_weight: 336.4, density: 1.21, molar_volume: 278.0, melting_point: 240.0, enthalpy_of_fusion: 42000, hsp: { d: 19.2, p: 9.0, h: 12.1 } },
    "winstrol": { name: "Stanozolol (Winstrol)", molecular_weight: 328.5, density: 1.12, molar_volume: 293.3, melting_point: 235.0, enthalpy_of_fusion: 41000, hsp: { d: 18.9, p: 8.2, h: 10.8 } },
    "dhea_base": { name: "DHEA Base", molecular_weight: 288.4, density: 1.14, molar_volume: 253.0, melting_point: 140.0, enthalpy_of_fusion: 31000, hsp: { d: 18.6, p: 7.5, h: 9.5 } },
    "boldenone_undecylenate": {
        name: "Boldenone Undecylenate",
        molecular_weight: 452.7,
        density: 1.02,
        molar_volume: 443.8,
        melting_point: 15.0, // Low melting ester; often a liquid/semi-solid at room temp
        enthalpy_of_fusion: 19500, // Minimal crystalline lattice barrier
        hsp: { d: 17.4, p: 3.8, h: 5.2 } // High lipophilicity matching carrier oils perfectly
    },
    // SOLVENTS
    "benzyl_alcohol": { name: "Benzyl Alcohol", molecular_weight: 108.14, density: 1.044, molar_volume: 103.6, melting_point: -15.2, hsp: { d: 18.4, p: 6.3, h: 13.7 } },
    "benzyl_benzoate": { name: "Benzyl Benzoate", molecular_weight: 212.25, density: 1.118, molar_volume: 189.8, melting_point: 17.0, hsp: { d: 20.0, p: 5.1, h: 5.2 } },
    "ethyl_oleate": { name: "Ethyl Oleate", molecular_weight: 310.51, density: 0.87, molar_volume: 356.9, melting_point: -32.0, hsp: { d: 16.5, p: 3.2, h: 4.1 } },
    "ethyl_lactate": { name: "Ethyl Lactate", molecular_weight: 118.13, density: 1.03, molar_volume: 114.7, melting_point: -26.0, hsp: { d: 16.0, p: 7.6, h: 12.5 } },
    "methyl_salicylate": { name: "Methyl Salicylate", molecular_weight: 152.15, density: 1.17, molar_volume: 130.0, melting_point: -8.0, hsp: { d: 19.5, p: 8.0, h: 8.5 } },
    "chlorobutanol": { name: "Chlorobutanol", molecular_weight: 177.46, density: 1.40, molar_volume: 126.8, melting_point: 97.0, hsp: { d: 17.5, p: 5.5, h: 7.2 } },
    "ethanol": { name: "Ethanol", molecular_weight: 46.07, density: 0.789, molar_volume: 58.4, melting_point: -114.0, hsp: { d: 15.8, p: 8.8, h: 19.4 } },

    // CARRIERS
    "MCT": { name: "MCT Oil", molecular_weight: 500.0, density: 0.94, molar_volume: 531.9, melting_point: -5.0, hsp: { d: 16.2, p: 3.5, h: 4.5 } },
    "castor": { name: "Castor Oil", molecular_weight: 933.4, density: 0.961, molar_volume: 971.3, melting_point: -18.0, hsp: { d: 16.7, p: 5.0, h: 9.0 } },
    "sesame": { name: "Sesame Oil", molecular_weight: 880.0, density: 0.92, molar_volume: 956.5, melting_point: -5.0, hsp: { d: 16.1, p: 2.5, h: 3.8 } },
    "grapeseed": { name: "Grapeseed Oil", molecular_weight: 880.0, density: 0.92, molar_volume: 956.5, melting_point: -10.0, hsp: { d: 16.2, p: 2.3, h: 3.5 } },
    "arachis": { name: "Arachis Oil", molecular_weight: 885.0, density: 0.915, molar_volume: 967.2, melting_point: 3.0, hsp: { d: 16.1, p: 2.6, h: 3.7 } },
    "cottonseed": { name: "Cottonseed Oil", molecular_weight: 875.0, density: 0.92, molar_volume: 951.1, melting_point: -1.0, hsp: { d: 16.1, p: 2.4, h: 3.6 } },
    "sterile-water-for-injection": { name: "Water", molecular_weight: 18.02, density: 1.00, molar_volume: 18.0, melting_point: 0.0, hsp: { d: 15.5, p: 16.0, h: 42.3 } }
};
/**
 * Calculates the exact saturation (liquidus clearance) temperature of a complex mixture
 * using Flory-Huggins Theory combined with Hansen Solubility Parameters (HSP).
 * * Each compound object in the array should look like:
 * {
 * name: "Estradiol Enanthate",
 * grams: 5.0,
 * melting_point: 95,            // Celsius (can be number or array [min, max])
 * enthalpy_of_fusion: 28000,    // J/mol (delta_Hf)
 * molar_volume: 380,            // cm³/mol (or calc from MW/density)
 * hsp: { d: 18.2, p: 6.3, h: 8.1 } // Hansen Parameters
 * }
 */
function calculateSaturationTemperature(compounds) {
    const R = 8.31446;
    let totalVolumeMl = 0;

    // --- 1. HYDRATION PASS: Map raw keys to full thermodynamic profiles ---
    const hydratedComponents = compounds.map(c => {
        // Handle input variant keys for mass
        let massGrams = c.grams || c.mass_g || 0;

        // Fallback calculation if grams are zero but mg/mL target is set
        if (massGrams === 0 && c.basis === "mg_per_ml" && c.mg_per_ml) {
            massGrams = (c.mg_per_ml / 1000) * (c.volume || 100);
        }

        // Exact match key resolution against internal CHEMICAL_DATABASE
        const dbKey = c.key || (c.name || "").toLowerCase().replace(/[\s-]/g, '_');
        const dbMatch = CHEMICAL_DATABASE[dbKey];

        // Fallback profile if compound is missing from dictionary
        const fallbackMp = Array.isArray(c.melting_point)
            ? (c.melting_point[0] + c.melting_point[1]) / 2
            : (c.melting_point || 25);

        const profile = {
            name: dbMatch ? dbMatch.name : (c.name || "Unknown"),
            melting_point: dbMatch ? dbMatch.melting_point : fallbackMp,
            enthalpy_of_fusion: dbMatch ? dbMatch.enthalpy_of_fusion : (c.enthalpy_of_fusion || ((fallbackMp + 273.15) * 56.5)),
            molar_volume: dbMatch ? dbMatch.molar_volume : (c.molar_volume || 250),
            density: dbMatch ? dbMatch.density : (c.density || 1.0),
            hsp: dbMatch ? dbMatch.hsp : (c.hsp || { d: 17.0, p: 4.0, h: 5.0 })
        };

        const volumeMl = massGrams / profile.density;
        totalVolumeMl += volumeMl;

        return {
            ...profile,
            volume: volumeMl,
            mpK: profile.melting_point + 273.15,
            isSolute: profile.melting_point > 25 // Crystalline criteria gating
        };
    }).filter(c => c.volume > 0);

    if (hydratedComponents.length === 0 || totalVolumeMl === 0) return null;

    // Define true volume fractions
    hydratedComponents.forEach(c => {
        c.phi = c.volume / totalVolumeMl;
    });

    let maxLiquidusTempC = -40.0;

    // --- 2. THERMODYNAMIC MATRIX EVALUATION ---
    hydratedComponents.forEach(solute => {
        if (!solute.isSolute) return;

        const soluteMoles = solute.volume / solute.molar_volume;
        let blendVol = 0, sumPhiD = 0, sumPhiP = 0, sumPhiH = 0, sumPhiV = 0;
        let totalSystemMoles = soluteMoles;

        hydratedComponents.forEach(other => {
            if (other !== solute) {
                blendVol += other.volume;
                sumPhiD += other.volume * other.hsp.d;
                sumPhiP += other.volume * other.hsp.p;
                sumPhiH += other.volume * other.hsp.h;
                sumPhiV += other.volume * other.molar_volume;
                totalSystemMoles += (other.volume / other.molar_volume);
            }
        });

        if (blendVol === 0) {
            const pureMpC = solute.melting_point;
            if (pureMpC > maxLiquidusTempC) maxLiquidusTempC = pureMpC;
            return;
        }

        const blendHSP = { d: sumPhiD / blendVol, p: sumPhiP / blendVol, h: sumPhiH / blendVol };
        const V_ref = sumPhiV / blendVol;
        const r = solute.molar_volume / V_ref;
        const true_x = soluteMoles / totalSystemMoles;

        const Ra2 = 4 * Math.pow(solute.hsp.d - blendHSP.d, 2) +
            Math.pow(solute.hsp.p - blendHSP.p, 2) +
            Math.pow(solute.hsp.h - blendHSP.h, 2);

        const delta_S_fus = solute.enthalpy_of_fusion / solute.mpK;

        function evaluateEquilibriumResidual(T_kelvin) {
            let chi = (V_ref * Ra2) / (R * T_kelvin);

            const phi_solvent = 1.0 - solute.phi;
            chi = chi * Math.pow(phi_solvent, 1.5);

            let aromaticVolumeFraction = 0;
            let benzylAlcoholVolumeFraction = 0;

            hydratedComponents.forEach(other => {
                if (other !== solute) {
                    const lowName = other.name.toLowerCase();
                    if (lowName.includes("benzoate") || lowName.includes("alcohol")) {
                        aromaticVolumeFraction += other.phi;
                    }
                    if (lowName.includes("alcohol")) {
                        benzylAlcoholVolumeFraction += other.phi;
                    }
                }
            });

            if (aromaticVolumeFraction > 0.15) {
                const baSynergy = benzylAlcoholVolumeFraction >= 0.08 ? 1.45 : 1.00;
                const solventIntensity = aromaticVolumeFraction * baSynergy;
                const shieldingFactor = Math.exp(-2.1 * solventIntensity);
                chi = chi * Math.max(0.08, shieldingFactor);
            }

            if (solute.mpK > 423.15 && aromaticVolumeFraction > 0.30) {
                chi = chi * 0.40;
            }

            const ln_gamma = chi * Math.pow(phi_solvent, 2) + Math.log(solute.phi / true_x) + (1.0 - 1.0 / r) * phi_solvent;
            const ideal_term = -(solute.enthalpy_of_fusion / (R * T_kelvin)) + (delta_S_fus / R);

            if (true_x < 0.05) {
                return Math.log(true_x) + (ln_gamma * true_x * 15.0) - ideal_term;
            }

            return Math.log(true_x) + ln_gamma - ideal_term;
        }

        // --- 3. NUMERICAL SOLUTION VIA BISECTION ---
        let lowT = 203.15;  // -70 °C
        let highT = solute.mpK - 0.1;
        let solT = lowT;

        let f_low = evaluateEquilibriumResidual(lowT);
        let f_high = evaluateEquilibriumResidual(highT);

        if (f_low * f_high <= 0) {
            for (let iter = 0; iter < 80; iter++) {
                let midT = (lowT + highT) / 2.0;
                let f_mid = evaluateEquilibriumResidual(midT);
                if (Math.abs(f_mid) < 1e-6) {
                    solT = midT;
                    break;
                }
                if (f_low * f_mid < 0) {
                    highT = midT;
                    f_high = f_mid;
                } else {
                    lowT = midT;
                    f_low = f_mid;
                }
                solT = midT;
            }
        } else {
            solT = f_low > 0 ? lowT : highT;
        }

        const soluteLiquidusC = solT - 273.15;
        if (soluteLiquidusC > maxLiquidusTempC) maxLiquidusTempC = soluteLiquidusC;
    });

    return parseFloat(Math.max(-40, Math.min(maxLiquidusTempC, 160)).toFixed(1));
}