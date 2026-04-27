/* Maths functions */

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

function updateFields(solutionEntry, settings, fieldType) {
    const d = compounds.find(c => c.self_id === solutionEntry.self_id)?.density
    if (typeof d === "undefined") {
        return
    }

    switch (fieldType) {
        case "mls":
            /* Calculate mg/ml from mls */
            if (solutionEntry.basis === "q.s.") {
                solutionEntry.v_v_percent = calculateVVPercentage(settings.totalVolume, solutionEntry.mls);
                solutionEntry.grams = calculateGrams(solutionEntry.mls, d);

            }
            if (solutionEntry.basis === "mg_per_ml") {
                solutionEntry.mg_per_ml = calculateMgPerMl(solutionEntry.grams, settings.totalVolume)
                solutionEntry.mls = calculateMlsFromGrams(solutionEntry.grams, d);
                solutionEntry.grams = calculateGrams(solutionEntry.mls, d);
            }
            if (solutionEntry.basis === "v_v_percent") {
                solutionEntry.mg_per_ml = calculateMgPerMl(solutionEntry.grams, settings.totalVolume)
                solutionEntry.v_v_percent = calculateVVPercentage(settings.totalVolume, solutionEntry.mls);
            }
            break;
        case "grams":
            /* Calculate mg/mL from grams */
            solutionEntry.mg_per_ml = calculateMgPerMl(solutionEntry.grams, settings.totalVolume)
            solutionEntry.mls = calculateMlsFromGrams(solutionEntry.grams, d)
            break
        case "v_v_percent":
            /* Calculate mls from percentage */
            solutionEntry.mls = calculateMlsFromPercentage(settings.totalVolume, solutionEntry.v_v_percent)
            mlsSetFlag = true;
            break
        case "mg_per_ml":
            /* Calculate mls from grams */
            solutionEntry.grams = calculateGramsFromMgMl(solutionEntry.mg_per_ml, settings.totalVolume);
            mlsSetFlag = true;
            break
        default:
    }

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
    for (let i =0 ; i < compounds.length; i++) {
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
    total weight melting point (of each compound)
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
   let viscosity =[];
   let volumes =[];
    for (let i =0 ; i < compounds.length; i++) {
        if (compounds[i].class === "excipient") {
            viscosity.push( compounds[i].viscosityArray[0]);
            volumes.push(compounds[i].mls);
         }
    }
    console.log(volumes);
    console.log(viscosity);

    // Example usage for a typical TE formulation (adjust with your real data)
    const totalVolume = volumes.reduce((a, b) => a + b, 0);
    const fractions = volumes.map(v => v / totalVolume);
    return calculateMixtureViscosity(viscosity, fractions);
}
