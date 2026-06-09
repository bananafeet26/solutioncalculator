var blurbs = [
    {
        parent_molecule: 'estradiol',
        therapeutic_class: 'Estrogens: Natural and semisynthetic estrogens',

        // 1. Structural Fingerprint
        structural_backbone: 'estrane',
        modifications: [
            'Aromatic A-ring (Phenolic A-ring)',
            'Loss of C19 methyl group (18-carbon steroid)',
            'C3 hydroxyl group',
            'C17 beta-hydroxyl group'
        ],

        // 2. The Multi-Receptor Binding Profile
        receptor_interactions: [
            {
                target_receptor: 'Estrogen Receptor Alpha (ERα)',
                action: 'Full Agonist',
                binding_affinity_relative: '100% (Acts as the benchmark standard)',
                downstream_effect: 'Drives cellular proliferation in reproductive tissues (endometrium, breast), maintains bone mineral density by inducing osteoclast apoptosis.',
                source_refs: ["kuiper_1997"]
            },
            {
                target_receptor: 'Estrogen Receptor Beta (ERβ)',
                action: 'Full Agonist',
                binding_affinity_relative: 'Roughly equal to ERα (~100%)',
                downstream_effect: 'Acts as a modulator/opposer to ERα in specific tissues; regulates CNS mood, cardiovascular vasodilation, and prostate/ovarian homeostasis.',
                source_refs: ["kuiper_1997"]
            },
            {
                target_receptor: 'G-Protein Coupled Estrogen Receptor (GPER1)',
                action: 'Agonist',
                binding_affinity_relative: 'High affinity for rapid non-genomic signaling',
                downstream_effect: 'Triggers rapid intracellular calcium mobilization and nitric oxide (NO) production, leading to acute vasodilation.'
            },
            {
                target_receptor: 'Androgen / Progesterone / Glucocorticoid Receptors',
                action: 'Negligible direct binding',
                binding_affinity_relative: '< 0.1%',
                downstream_effect: 'No significant direct interaction.'
            }
        ],

        // 3. Metabolic State Transitions (The Enzymes & Electrons)
        metabolic_pathways: [
            {
                enzyme: '17-beta-Hydroxysteroid Dehydrogenase (17b-HSD1 / 17b-HSD2)',
                reaction_type: 'Oxidation / Reduction Equilibrium',
                target_coordinate: 'C17',
                product: 'Estrone (E1)',
                clinical_note: 'A reversible buffering step. E1 is a much weaker ER agonist but acts as a massive circulating reservoir that can be converted back to active E2 locally in target tissues.',
                source_refs: ["kegg_hsa00140"]
            },
            {
                enzyme: 'Cytochrome P450 1A2 & 3A4 (CYP1A2, CYP3A4)',
                reaction_type: '2-Hydroxylation (Addition of hydroxyl group)',
                target_coordinate: 'C2',
                product: '2-Hydroxyestradiol (Catechol Estrogen)',
                clinical_note: 'The primary, safe clearance pathway. 2-OH-E2 has very weak ER affinity and is rapidly methylated for renal excretion.',
                source_refs: ["kegg_hsa00980"]
            },
            {
                enzyme: 'Cytochrome P450 1B1 (CYP1B1)',
                reaction_type: '4-Hydroxylation',
                target_coordinate: 'C4',
                product: '4-Hydroxyestradiol',
                clinical_note: 'A critical, potentially dangerous pathway. 4-OH-E2 can oxidize into reactive quinones that bind directly to DNA, driving estrogen-induced carcinogenesis.'
            },
            {
                enzyme: 'Cytochrome P450 3A4 (CYP3A4)',
                reaction_type: '16-alpha-Hydroxylation',
                target_coordinate: 'C16',
                product: 'Estriol (E3)',
                clinical_note: 'Forms a short-acting ER agonist. This pathway is massively upregulated during pregnancy.'
            }
        ],

        // 4. Mechanistic Side Effects mapped directly to receptor vectors
        receptor_linked_side_effects: {
            er_alpha_driven: [
                { side_effect: 'Endometrial Hyperplasia', mechanism: 'Unopposed ERα activation in the uterus drives runaway cellular proliferation, increasing the risk of endometrial carcinoma if not opposed by progesterone.' },
                { side_effect: 'Gynecomastia (in males)', mechanism: 'ERα activation in mammary tissue stimulates ductal elongation and fat deposition, particularly when the systemic Androgen:Estrogen ratio falls.' },
                { side_effect: 'Thromboembolism / DVT', mechanism: 'Hepatic ERα activation (especially from oral administration) heavily alters liver protein synthesis, upregulating clotting factors (VII, VIII, X) while downregulating antithrombin III.' }
            ],
            gper1_driven: [
                { side_effect: 'Migraines / Vascular Headaches', mechanism: 'Rapid fluctuations in E2 levels trigger GPER1-mediated alterations in vascular tone (nitric oxide release), precipitating vasodilation-related headaches.' },
                { side_effect: 'Fluid Retention / Edema', mechanism: 'Estrogen-induced capillary permeability and downstream secondary hyperaldosteronism (RAAS upregulation) leading to sodium and water retention.' }
            ]
        },

        // 5. Terminal Excretion Metabolites (Phase II Conjugation)
        terminal_urinary_metabolites: [
            { name: 'Estradiol-3-glucuronide', stereoisomer: 'Regioisomer at C3', conjugate: 'Glucuronide (UGT-mediated)' },
            { name: 'Estradiol-17-glucuronide', stereoisomer: 'Regioisomer at C17', conjugate: 'Glucuronide (UGT-mediated)' },
            { name: '2-Methoxyestradiol', stereoisomer: 'Methylated Catechol', conjugate: 'COMT-mediated methylation (highly water-soluble)' }
        ],

        // 6. Intracellular Signaling & Tissue Remodeling Pathologies
        downstream_signaling_cascades: {
            coagulation_cascade_upregulation: {
                activated_by: 'Hepatic ERα occupancy (First-pass metabolism effect)',
                downstream_pathologies: [
                    {
                        side_effect: 'Hypercoagulable State',
                        mechanism: 'Increases systemic generation of prothrombin and fibrinogen. Alters the hepatic lipid profile by drastically lowering LDL and raising HDL, but simultaneously raises triglyceride levels and stroke risk at supraphysiological levels.'
                    }
                ]
            },
            genotoxic_quinone_pathway: {
                activated_by: 'CYP1B1 4-hydroxylation shunt',
                downstream_pathologies: [
                    {
                        side_effect: 'DNA Adduct Formation (Cancer Risk)',
                        mechanism: '4-hydroxyestradiol is oxidized into estradiol-3,4-quinone. If cellular glutathione (GSH) is depleted, these quinones react covalently with purine bases in DNA, causing depurination mutations associated with breast and prostate cancers.'
                    }
                ]
            }
        },

        blurb: `Estradiol exhibits stereoisomerism, primarily due to the configuration of its hydroxyl groups and the orientation of its steroid backbone. The most biologically active form is 17beta-estradiol, where the hydroxyl group at carbon 17 is in the beta position. Its stereoisomer, 17alpha-estradiol, has the hydroxyl group in the alpha position and is significantly less potent in estrogenic activity. Additionally, estradiol can undergo glucuronidation at either the 3-hydroxyl or 17-hydroxyl positions, forming estradiol-3-glucuronide and estradiol-17-glucuronide, which are regioisomers with distinct metabolic pathways and biological roles. The benzoate esterification at the C3 hydroxyl group does not introduce additional isomerism.\n\n17β-Estradiol is the major pre-menopausal bioactive estrogen and an active metabolite of testosterone. It is produced primarily by the ovary, and to a lesser extent, by the adrenals, testes, and adipose tissue, as well as by the placenta during pregnancy. 17β-Estradiol binds to estrogen receptors localized to the nucleus, cytoplasm, and plasma membrane and induces gene transcription or non-genomic intracellular signaling in a location-dependent manner. It regulates reproductive development in females and spermatogenesis in males, as well as various non-reproductive processes including lipid and glucose homeostasis, bone mass maintenance, cognition, energy balance, and dilation of blood vessels. 17β-Estradiol deficiency due to hypogonadism or 17α-hydroxylase/17,20-lyase deficiency is associated with fatigue, incontinence, osteoporosis, depression, emotional instability, and hot flashes. Formulations containing 17β-estradiol have been used in the treatment of menopause symptoms and the prevention of osteoporosis.`
    },
    {
        parent_molecule: 'testosterone',
        therapeutic_class: 'Androgens / Anabolic agents for systemic use; 3-oxoandrosten-(4) derivatives',

        // 1. Structural Fingerprint
        structural_backbone: 'androstane',
        modifications: [
            'Endogenous primary androgen',
            'C3 ketone group',
            'C4-C5 double bond',
            'C17 beta-hydroxyl group'
        ],

        // 2. The Multi-Receptor Binding Profile
        receptor_interactions: [
            {
                target_receptor: 'Androgen Receptor (AR)',
                action: 'Agonist',
                binding_affinity_relative: '100% (Acts as the benchmark standard)',
                downstream_effect: 'Drives male sexual differentiation, muscle protein synthesis, and bone density maintenance.',
                source_refs: ["saartok_1984"]
            },
            {
                target_receptor: 'Progesterone Receptor (PR)',
                action: 'Negligible',
                binding_affinity_relative: '< 1%',
                downstream_effect: 'No significant direct progestogenic activity.'
            },
            {
                target_receptor: 'Glucocorticoid Receptor (GR)',
                action: 'Negligible / Very Weak Antagonist',
                binding_affinity_relative: '< 0.2%',
                downstream_effect: 'Does not significantly displace cortisol at physiological or standard supraphysiological ranges.'
            },
            {
                target_receptor: 'Estrogen Receptor (ER)',
                action: 'Negligible direct binding',
                binding_affinity_relative: '< 0.1%',
                downstream_effect: 'Estrogenic effects rely entirely on local tissue conversion to estradiol via aromatase.'
            }
        ],

        // 3. Metabolic State Transitions (The Enzymes & Electrons)
        metabolic_pathways: [
            {
                enzyme: '5-alpha-reductase (SRD5A1 / SRD5A2)',
                reaction_type: 'Reduction (Addition of 2 hydrogen atoms / double-bond reduction)',
                target_coordinate: 'C4_C5',
                product: 'Dihydrotestosterone (DHT)',
                clinical_note: 'Creates an amplified AR agonist with roughly 3x to 10x the binding affinity of testosterone. Occurs primarily in target tissues like the prostate, scalp, and skin.',
                source_refs: ["kegg_hsa00140"]
            },
            {
                enzyme: 'Aromatase (CYP19A1)',
                reaction_type: 'Oxidation (Loss of C19 methyl group, formation of aromatic A-ring)',
                target_coordinate: 'Ring-A / C19',
                product: 'Estradiol (E2)',
                clinical_note: 'Converts baseline circulating testosterone into the primary female sex hormone, managing bone accretion, libido, and cardiovascular protective pathways in men.',
                source_refs: ["kegg_hsa00140"]
            },
            {
                enzyme: '17-beta-Hydroxysteroid Dehydrogenase (17b-HSD2)',
                reaction_type: 'Oxidation (Hydroxyl to Ketone conversion, loss of 2 electrons)',
                target_coordinate: 'C17',
                product: 'Androstenedione',
                clinical_note: 'Reversible deactivation step buffering circulating active testosterone levels.',
                source_refs: ["kegg_hsa00980"]
            }
        ],

        // 4. Mechanistic Side Effects mapped directly to receptor and metabolite vectors
        receptor_linked_side_effects: {
            direct_ar_driven: [
                { side_effect: 'Erythrocytosis / Polycythemia', mechanism: 'AR activation in the kidneys stimulates erythropoietin (EPO) transcription and suppresses hepatic hepcidin, driving up red blood cell mass and hematocrit.' },
                { side_effect: 'HPTA Suppression', mechanism: 'Negative feedback loop: AR activation in the hypothalamus suppresses GnRH, halting pituitary LH/FSH pulsatility.' }
            ],
            dht_amplified_driven: [
                { side_effect: 'Androgenetic Alopecia', mechanism: 'Localized 5-alpha reduction in scalp follicles upregulates DHT, triggering miniaturization of sensitive hair follicles via prolonged telogen phases.' },
                { side_effect: 'Benign Prostatic Hyperplasia (BPH)', mechanism: 'Accumulation of DHT in prostatic tissue drives robust cellular proliferation and prostate volume expansion.' },
                { side_effect: 'Sebaceous Gland Hypertrophy (Acne)', mechanism: 'DHT amplification in the skin drastically upregulates sebum production, providing a vector for Propionibacterium acnes colonization.' }
            ],
            estrogen_receptor_driven: [
                { side_effect: 'Gynecomastia', mechanism: 'Excessive CYP19A1 conversion pushes the systemic Androgen:Estrogen ratio out of balance, allowing ER activation in mammary tissue to drive glandular ductal growth.' },
                { side_effect: 'Fluid Retention', mechanism: 'Elevated E2 upregulates renal sodium reabsorption mechanisms independently of the mineralocorticoid receptor.' }
            ]
        },

        // 5. Terminal Excretion Metabolites (Phase II Glucuronidation)
        terminal_urinary_metabolites: [
            { name: 'Androsterone', stereoisomer: '3alpha-hydroxy-5alpha-androstan-17-one', conjugate: 'Glucuronide & Sulfate' },
            { name: 'Etiocholanolone', stereoisomer: '3alpha-hydroxy-5beta-androstan-17-one', conjugate: 'Glucuronide & Sulfate' }
        ],

        // 6. Intracellular Signaling & Tissue Remodeling Pathologies
        downstream_signaling_cascades: {
            erythropoietic_pathway: {
                activated_by: 'AR occupancy in renal and hepatic tissue',
                downstream_pathologies: [
                    {
                        side_effect: 'Thrombosis Risk (Secondary to Hematocrit)',
                        mechanism: 'Extreme elevation of RBCs increases blood viscosity. At hematocrit levels >54%, shear stress alters endothelial nitric oxide availability, increasing the risk of thromboembolic events.'
                    }
                ]
            },
            lipid_metabolism_alteration: {
                activated_by: 'Hepatic AR Lipase regulation',
                downstream_pathologies: [
                    {
                        side_effect: 'HDL Suppression',
                        mechanism: 'Upregulation of hepatic triglyceride lipase (HTGL) accelerates the clearance of high-density lipoprotein (HDL) particles from systemic circulation.'
                    }
                ]
            }
        },

        blurb: `Testosterone is biosynthesized primarily from androstenedione through reduction of the C17 ketone group by 17β-hydroxysteroid dehydrogenase. Testosterone (17β-hydroxyandrost-4-en-3-one) is the principal endogenous androgen in humans. Its structure consists of the androstane steroid nucleus with a double bond between C4 and C5 and a ketone group at C3. Testosterone contains six stereogenic centres located at C8, C9, C10, C13, C14, and C17, giving rise to multiple possible stereoisomers, although only one stereochemical configuration occurs naturally and exhibits significant biological activity. The naturally occurring form possesses a 17β-hydroxyl group that is critical for high-affinity interaction with the androgen receptor. Testosterone can also undergo enzymatic conversion to dihydrotestosterone (DHT) or estradiol, extending its physiological effects in different tissues.`
    },
    {
        parent_molecule: 'nandrolone',
        therapeutic_class: 'Alimentary tract & metabolism: Anabolic agents for systemic use',

        // 1. Structural Fingerprint (Building on your existing blurb)
        structural_backbone: '19-norandrostane',
        modifications: ['Removal of 19-methyl group from testosterone core'],

        // 2. The Multi-Receptor Binding Profile
        receptor_interactions: [
            {
                target_receptor: 'Androgen Receptor (AR)',
                action: 'Full Agonist',
                binding_affinity_relative: '92% of human AR (Stronger than Testosterone, weaker than DHT)',
                downstream_effect: 'Promotes muscle protein synthesis and bone mineral retention via direct myotrophic activation.'
            },
            {
                target_receptor: 'Progesterone Receptor (PR)',
                action: 'Agonist',
                binding_affinity_relative: '22% of native Progesterone',
                downstream_effect: 'Augments anti-gonadotropic actions, contributing heavily to profound endogenous axis suppression.',
                source_refs: ["raynaud_1980", "saartok_1984"],
            },
            {
                target_receptor: 'Estrogen Receptor (ER)',
                action: 'Negligible direct binding',
                binding_affinity_relative: '< 0.1%',
                downstream_effect: 'Estrogenic effects rely entirely on local tissue conversion to estradiol via aromatase.'
            }
        ],

        // 3. Metabolic State Transitions (The Enzymes & Electrons)
        metabolic_pathways: [
            {
                enzyme: '5-alpha-reductase',
                reaction_type: 'Reduction (Addition of 2 electrons / double-bond reduction)',
                target_coordinate: 'C4_C5',
                product: '5alpha-dihydronandrolone (DHN)',
                clinical_note: 'Unlike Testosterone converting to potent DHT, Nandrolone converts to a weaker metabolite (DHN), reducing androgenic side effects in the scalp and prostate.'
            },
            {
                enzyme: 'Aromatase (CYP19A1)',
                reaction_type: 'Oxidation (Aromatization / Ring-A de-hydrogenation)',
                target_coordinate: 'Ring-A',
                product: 'Estradiol (E2) via 19-norestradiol intermediates',
                clinical_note: 'Occurs at roughly 20% of the rate of testosterone aromatization due to missing 19-methyl group steric dynamics.'
            }
        ],

        // 4. Mechanistic Side Effects mapped directly to your receptor array
        receptor_linked_side_effects: {
            androgen_receptor_driven: [
                { side_effect: 'Virilization in females', mechanism: 'Dose-dependent activation of AR targets, though lower incidence than pure testosterones.' },
                { side_effect: 'Dyslipidemia', mechanism: 'Downregulation of liver X receptor pathways via hepatic AR activation, dropping HDL and raising LDL.' }
            ],
            estrogen_receptor_driven: [
                { side_effect: 'Gynecomastia (in males)', mechanism: 'ERα activation in mammary tissue stimulates ductal elongation and fat deposition, particularly when the systemic Androgen:Estrogen ratio falls.' },
            ],
            progesterone_receptor_driven: [
                { side_effect: 'Severe HPTA Shutdown', mechanism: 'Synergistic negative feedback loop where PR agonism pairs with AR agonism to suppress pituitary LH/FSH secretion to near-zero.' },
                { side_effect: 'Progestogenic Erectile Dysfunction', mechanism: 'Elevated PR activation out of homeostasis without baseline DHT present to maintain cavernous smooth muscle tone.' },
                { side_effect: 'Prolactin Amplification', mechanism: 'PR activation upregulates lactotroph sensitivity in the pituitary, potentially exacerbating mammary hypertrophy/gynaecomastia.' }
            ],
            mineralocorticoid_receptor_driven: [
                {
                    side_effect: 'Fluid Retention / Edema',
                    mechanism: 'Mild direct MR activation in renal cortical collecting ducts...'
                },
                {
                    side_effect: 'Myocardial & Renal Fibrosis',
                    mechanism: 'Direct MR activation in non-epithelial cardiovascular tissues upregulates local aldosterone synthase (CYP11B2) and 11β-HSD2. This causes direct structural collagen deposition (Type III) in the left ventricle, causing cardiac stiffening independent of high blood pressure.'
                }
            ]
        },

        // 5. Terminal Excretion Metabolites
        terminal_urinary_metabolites: [
            { name: '19-norandrosterone', stereoisomer: '3alpha-hydroxy-5alpha-estran-17-one', conjugate: 'Glucuronide' },
            { name: '19-noretiocholanolone', stereoisomer: '3alpha-hydroxy-5beta-estran-17-one', conjugate: 'Glucuronide' }
        ],

        // 6. Intracellular Signaling & Tissue Remodeling Pathologies
        downstream_signaling_cascades: {
            tgf_beta_smad3_pathway: {
                activated_by: 'Supraphysiological AR and MR occupancy',
                downstream_pathologies: [
                    {
                        side_effect: 'Hepatic Fibrosis / Liver Scarring',
                        mechanism: 'Nandrolone suppresses microRNA-29b (miR-29b) expression while overexpressing TGF-β1 and SMAD-3 proteins. This shifts hepatic stellate cells into collagen-producing myofibroblasts, generating extracellular matrix scarring.'
                    },
                    {
                        side_effect: 'Concentric Cardiac Hypertrophy & Fibrosis',
                        mechanism: 'Upregulation of cardiac angiotensin-converting enzyme I (ACE) activity and downstream osteopontin/TGF-β expressions. This forces collagen type III accumulation, contributing to anabolic-steroid-induced cardiomyopathy.'
                    }
                ]
            },
            redox_homeostasis_disruption: {
                activated_by: 'Microsomal fraction accumulation',
                downstream_pathologies: [
                    {
                        side_effect: 'Oxidative Tissue Damage',
                        mechanism: 'Upregulation of NADPH Oxidase (NOX2) mRNA levels in cardiac tissues, accelerating local H2O2 generation while depleting systemic catalase and SOD activities.'
                    }
                ]
            }
        },

        // 7. Pathologies.
        downstream_pathologies: [
            { pathology: "Cardiac Fibrosis", pathways: ["MR", "TGF-b1"], source_refs: ["marzilger_2016", "rocha_2022"] }
        ],
        blurbHTML: `<p>Nandrolone (19-nortestosterone) exhibits stereoisomerism due to the presence of multiple chiral centres in its tetracyclic steroid backbone. The key site of isomerism lies at the 5th carbon position, where the hydrogen atom can be oriented either above or below the plane of the ring system, giving rise to 5alpha- and 5beta-isomers.
        </p><p>Nandrolone is a widely used injectable androgen in the form of aliphatic fatty
    acid esters in an oil vehicle, prescribed mainly for treatment of postmenopausal
    osteoporosis, where it is effective at increasing bone density and reducing fracture rate.<span><sup>504,505</sup></span>
</p>
<p>
<span> It is also the most popular androgen abused in sports doping and body building.
    Nandrolone is a naturally occurring steroid but is not normally secreted in the human bloodstream,
    although it occurs as an intermediate in the aromatization of testosterone to estradiol by the aromatase enzyme.</span><span><sup>506</sup></span>
</p>
<p>This enzyme complex undertakes two successive hydroxylations on the angular C19 methyl group of testosterone,
    followed by a cleavage of the C10-C19 bond to release formic acid and aromatize the A-ring.
<span><sup>507</sup></span>
</p>
<p>
    Nandrolone represents a penultimate step of the molecule undergoing aromatization bound to the enzyme complex,
    with the C19 methyl group excised but a still nonaromatized A-ring.
    Paradoxically, despite being an intermediate in the aromatization reaction, nandrolone is virtually not aromatized after parenteral administration in men,</span>
<span><sup>508,509</sup></span> presumably because it is a very poor substrate for the human aromatase enzyme.
</p>
<p>
<span><sup>510</sup></span> It is susceptible to amplification by 5α-reductase with its 5α-reduced metabolites being moderately activated in androgenic potency.
<span><sup>511</sup></span><span> The minimal aromatizability of nandrolone makes it suitable for treatment of osteoporosis in women in whom estrogen therapy is contraindicated because of
    hormone-sensitive cancers (breast, uterus) or for older women, although virilization limits its acceptability.</span>
<span><sup>512</sup></span>
</p>

504. Gennari C, AgnusDei D, Gonnelli S, et al: Effects of
nandrolone decanoate therapy on bone mass and
calcium metabolism in women with established post-
menopausal osteoporosis: a double-blind placebo-
controlled study, Maturitas 11:187–197, 1989.<br/>
505. Frisoli A Jr, Chaves PH, Pinheiro MM, et al: The effect
of nandrolone decanoate on bone mineral density,
muscle mass, and hemoglobin levels in elderly women
with osteoporosis: a double-blind, randomized, pla-
cebo-controlled clinical trial, J Gerontol A Biol Sci Med
Sci 60:648–653, 2005.<br/>
506. Simpson ER, Mahendroo MS, Means GD, et al: Aroma-
tase cytochrome P450, the enzyme responsible for
estrogen biosynthesis, Endocr Rev 15:342–355,
1994.<br/>
507. Hong Y, Yu B, Sherman M, et al: Molecular basis for
the aromatization reaction and exemestane-mediated
irreversible inhibition of human aromatase, Mol Endo-
crinol 21:401–414, 2007.<br/>
508. Hobbs CJ, Jones RE, Plymate SR: Nandrolone, a
19-nortestosterone, enhances insulin-independent
glucose uptake in normal men, J Clin Endocrinol
Metab 81:1582–1585, 1996.<br/>
509. Behre HM, Kliesch S, Lemcke B, et al: Suppression of
spermatogenesis to azoospermia by combined admin-
istration of GnRH antagonist and 19-nortestosterone
cannot be maintained by this non-aromatizable andro-
gen alone, Hum Reprod 16:2570–2577, 2001.<br/>
510. Attardi BJ, Pham TC, Radler LC, et al: Dimethandro-
lone (7alpha,11beta-dimethyl-19-nortestosterone) and
11beta-methyl-19-nortestosterone are not converted to
aromatic A-ring products in the presence of recombi-
nant human aromatase, J Steroid Biochem Mol Biol
110:214–222, 2008.<br/>
511. Lemus AE, Enriquez J, Garcia GA, et al: 5alpha-reduc-
tion of norethisterone enhances its binding affinity for
androgen receptors but diminishes its androgenic
potency, J Steroid Biochem Mol Biol 60:121–129,
1997.<br/>
512. Geusens P: Nandrolone decanoate: pharmacological
properties and therapeutic use in osteoporosis, Clin
Rheumatol 14(Suppl 3):32–39, 1995<br/>
        `
    },
    {
        parent_molecule: 'drostanolone',
        therapeutic_class: 'Antineoplastic agents (historical) / Anabolic agents for systemic use',

        // 1. Structural Fingerprint
        structural_backbone: '5alpha-androstane',
        modifications: [
            '5-alpha reduced (No C4-C5 double bond)',
            '2-alpha-methyl group addition',
            'C3 ketone group',
            'C17 beta-hydroxyl group'
        ],

        // 2. The Multi-Receptor Binding Profile
        receptor_interactions: [
            {
                target_receptor: 'Androgen Receptor (AR)',
                action: 'Strong Agonist',
                binding_affinity_relative: 'High (Characteristic of DHT derivatives)',
                downstream_effect: 'Drives rigid muscle protein synthesis, intense CNS stimulation, and acts as an anti-estrogenic agent in breast tissue by competing for receptor substrates.',
                source_refs: ["saartok_1984"]
            },
            {
                target_receptor: 'Estrogen Receptor (ER)',
                action: 'Negligible (Clinically anti-estrogenic)',
                binding_affinity_relative: '0%',
                downstream_effect: 'Cannot bind to ER. Due to lack of aromatization and strong AR signaling, it actively downregulates ER expression in target tissues like the mammary gland.'
            },
            {
                target_receptor: 'Progesterone / Glucocorticoid / Mineralocorticoid Receptors',
                action: 'Negligible',
                binding_affinity_relative: '< 0.1%',
                downstream_effect: 'Does not trigger fluid retention, prolactin elevation, or significant cortisol displacement.'
            }
        ],

        // 3. Metabolic State Transitions (The Enzymes & Electrons)
        metabolic_pathways: [
            {
                enzyme: 'Aromatase (CYP19A1)',
                reaction_type: 'Immune / No Reaction',
                target_coordinate: 'Ring-A',
                product: 'None',
                clinical_note: 'Because Drostanolone is already 5-alpha reduced (it lacks the C4-C5 double bond), it is physically impossible for aromatase to remove the C19 methyl group and create an aromatic ring. Zero estrogen conversion.'
            },
            {
                enzyme: '5-alpha-reductase (SRD5A1 / SRD5A2)',
                reaction_type: 'Immune / No Reaction',
                target_coordinate: 'C4_C5',
                product: 'None',
                clinical_note: 'Already 5-alpha reduced. It does not amplify in the scalp or prostate like Testosterone does; its baseline state is already at maximum androgenic potency.'
            },
            {
                enzyme: '3-alpha-Hydroxysteroid Dehydrogenase (3a-HSD)',
                reaction_type: 'Highly Resistant to Reduction',
                target_coordinate: 'C3',
                product: 'Minimal 3-alpha-diol metabolites',
                clinical_note: 'Native DHT is rapidly deactivated in skeletal muscle by 3a-HSD. The bulky 2-alpha-methyl group on Drostanolone creates steric hindrance, blocking the enzyme and allowing the hormone to remain active in muscle tissue.'
            },
            {
                enzyme: '17-beta-Hydroxysteroid Dehydrogenase (17b-HSD)',
                reaction_type: 'Oxidation',
                target_coordinate: 'C17',
                product: '2-alpha-methyl-5-alpha-androstan-3,17-dione',
                clinical_note: 'Standard reversible deactivation of the 17-hydroxyl group to a 17-ketone.'
            }
        ],

        // 4. Mechanistic Side Effects mapped directly to receptor vectors
        receptor_linked_side_effects: {
            pure_ar_androgenic_driven: [
                { side_effect: 'Androgenetic Alopecia (Severe)', mechanism: 'High-affinity AR binding in scalp hair follicles triggers rapid miniaturization of sensitive terminal hairs.' },
                { side_effect: 'Benign Prostatic Hyperplasia (BPH)', mechanism: 'Direct, potent AR stimulation in prostatic tissue driving cellular proliferation.' },
                { side_effect: 'CNS Amplification / Aggression', mechanism: 'DHT derivatives cross the blood-brain barrier efficiently, strongly binding to CNS androgen receptors to increase neural drive and alter neurotransmitter firing.' },
                { side_effect: 'Virilization in Females', mechanism: 'Extreme risk of irreversible vocal cord deepening, clitoromegaly, and hirsutism due to unbuffered potent androgenic signaling.' }
            ],
            anti_estrogenic_driven: [
                { side_effect: 'Dyslipidemia (Severe HDL Crash)', mechanism: 'Without local tissue aromatization to E2 to buffer hepatic lipase, pure unaromatizable androgens aggressively upregulate Hepatic Triglyceride Lipase (HTGL), destroying HDL cholesterol and elevating LDL.' },
                { side_effect: 'Joint Dessication / Pain', mechanism: 'Lack of local estrogen conversion deprives synovial fluid of water-retention signals, leading to "dry" and painful joints under heavy loads.' }
            ]
        },

        // 5. Terminal Excretion Metabolites
        terminal_urinary_metabolites: [
            { name: '2α-methyl-5α-androstan-3α-ol-17-one', stereoisomer: 'Reduced C3 ketone, oxidized C17', conjugate: 'Glucuronide & Sulfate' }
        ],

        // 6. Intracellular Signaling & Tissue Remodeling Pathologies
        downstream_signaling_cascades: {
            nuclear_receptor_crosstalk: {
                activated_by: 'AR translocation to the nucleus in ER-positive tissues (e.g., mammary gland)',
                downstream_pathologies: [
                    {
                        side_effect: 'Suppression of Estrogen-Mediated Gene Transcription',
                        mechanism: 'Activated AR complexes compete directly with the Estrogen Receptor for a shared, limited pool of nuclear co-activators (such as SRC-1 and p300). The AR-Drostanolone complex monopolizes these proteins, stalling ER transcription.'
                    },
                    {
                        side_effect: 'ERα Expression Downregulation',
                        mechanism: 'AR binding to local Androgen Response Elements (AREs) represses the transcription of ERα mRNA. This physically reduces the number of estrogen receptors available on the cell surface, neutralizing the tissue to circulating E2.'
                    }
                ]
            },
            lipid_metabolism_alteration: {
                activated_by: 'Hepatic AR Lipase regulation (Unopposed by Estrogen)',
                downstream_pathologies: [
                    {
                        side_effect: 'Atherosclerosis Acceleration Risk',
                        mechanism: 'The profound, sustained depression of HDL alongside elevated LDL alters reverse cholesterol transport. Over time, this shifts the vascular environment toward plaque deposition and endothelial dysfunction.'
                    }
                ]
            }
        },

        blurb: `Drostanolone is a synthetic androgenic-anabolic steroid and a derivative of dihydrotestosterone (DHT). Structurally, it is altered by the addition of a methyl group at the carbon-2 alpha position (2α-methyl-5α-androstan-17β-ol-3-one). This singular modification is highly significant; the 2-alkyl group creates spatial steric hindrance that protects the 3-ketone group from being rapidly reduced and deactivated by the 3α-hydroxysteroid dehydrogenase enzyme found in skeletal muscle. Because it is already 5α-reduced, drostanolone cannot be aromatized into estrogen by the CYP19A1 enzyme. Consequently, it exhibits no estrogenic or progestational activity, and historically was utilized as an anti-neoplastic agent to treat inoperable breast cancer in postmenopausal women by competitively antagonizing the estrogen receptor environment. In clinical and illicit settings, it produces a rigid, "dry" myotrophic effect while posing severe risks to the lipid profile and scalp.`
    },
    {
        parent_molecule: 'methenolone',
        mode_of_action: `An androgen receptor agonist`,
        molecular_target: `Androgen receptor agonist`,
        therapeutic_class: `Anabolic agents for systemic use `,
    },
    {
        parent_molecule: 'boldenone',
        therapeutic_class: 'Anabolic agents for systemic use',

        // 1. Structural Fingerprint
        structural_backbone: 'androst-1,4-diene',
        modifications: [
            'Addition of C1-C2 double bond to testosterone core',
            'C3 ketone group',
            'C17 beta-hydroxyl group'
        ],

        // 2. The Multi-Receptor Binding Profile
        receptor_interactions: [
            {
                target_receptor: 'Androgen Receptor (AR)',
                action: 'Agonist',
                binding_affinity_relative: 'Moderate (~50-60% of Testosterone)',
                downstream_effect: 'Promotes nitrogen retention and muscle protein synthesis, though with less intense AR-mediated CNS stimulation than DHT derivatives.'
            },
            {
                target_receptor: 'Estrogen Receptor (ER)',
                action: 'Negligible direct binding',
                binding_affinity_relative: '< 0.1%',
                downstream_effect: 'Estrogenic activity is entirely dependent on aromatization to 1,4-androstadiene-3,17-dione (a specific estrogenic metabolite).'
            }
        ],

        // 3. Metabolic State Transitions (The Enzymes & Electrons)
        metabolic_pathways: [
            {
                enzyme: 'Aromatase (CYP19A1)',
                reaction_type: 'Oxidation (Aromatization)',
                target_coordinate: 'Ring-A',
                product: '1,4-androstadiene-3,17-dione (often referred to as "boldione")',
                clinical_note: 'Boldenone aromatizes at roughly 50% the rate of testosterone. However, the resulting estrogenic metabolite has different binding dynamics than standard estradiol.'
            },
            {
                enzyme: '5-alpha-reductase (SRD5A1 / SRD5A2)',
                reaction_type: 'Reduction',
                target_coordinate: 'C4_C5',
                product: '5-alpha-dihydroboldenone (DHB)',
                clinical_note: 'The C1-C2 double bond provides steric hindrance, making reduction into DHB highly inefficient compared to testosterone -> DHT.'
            }
        ],

        // 4. Mechanistic Side Effects
        receptor_linked_side_effects: {
            ar_driven: [
                { side_effect: 'Erythrocytosis', mechanism: 'Strong stimulation of erythropoietin production in the kidneys, frequently causing hematocrit spikes greater than other anabolic agents.' }
            ],
            estrogenic_metabolite_driven: [
                { side_effect: 'Estrogenic Side Effects', mechanism: 'Aromatization produces metabolites that can activate the ER, leading to risks of water retention and gynecomastia despite the structural double bond.' }
            ]
        },

        // 5. Terminal Excretion Metabolites
        terminal_urinary_metabolites: [
            { name: '17β-hydroxyandrost-1,4-dien-3-one', stereoisomer: 'Various reduced derivatives', conjugate: 'Glucuronide' }
        ],

        // 6. Intracellular Signaling & Pathology
        downstream_signaling_cascades: {
            erythropoietic_signaling: {
                activated_by: 'AR occupancy in renal tissue',
                downstream_pathologies: [
                    {
                        side_effect: 'Increased Blood Viscosity',
                        mechanism: 'Persistent stimulation of the EPO-receptor pathway causes high RBC production, potentially leading to hypertension and increased risk of cardiovascular strain.'
                    }
                ]
            }
        },

        blurb: `Boldenone is a 1,4-diene derivative of testosterone. The C1-C2 double bond modification is the defining feature; it significantly decreases the rate of aromatization compared to testosterone and increases resistance to 5α-reduction. This modification results in a molecule that retains potent anabolic activity with a relatively lower androgenic profile. Because it is resistant to 5α-reductase (which normally converts testosterone to the potent DHT), it does not demonstrate the same degree of prostate or scalp androgenicity as testosterone.`
    },
    {
        parent_molecule: 'dihydroboldenone',
        mode_of_action: ``,
        molecular_target: `Androgen receptor agonist`,
        therapeutic_class: `Anabolic agents for systemic use `,
    },
    {
        parent_molecule: 'DHEA',
        therapeutic_class: 'Hormone precursors / Androgens / Neurosteroids',

        // 1. Structural Fingerprint
        structural_backbone: 'androst-5-ene',
        modifications: [
            'Delta-5 double bond (C5-C6)',
            'C3-beta hydroxyl group',
            'C17 ketone group',
            'Lack of C4-C5 double bond (distinguishes it from Testosterone)'
        ],

        // 2. The Multi-Receptor Binding Profile
        receptor_interactions: [
            {
                target_receptor: 'Estrogen Receptor Beta (ERβ)',
                action: 'Weak Agonist',
                binding_affinity_relative: 'Low',
                downstream_effect: 'Supports neuroprotection and cardiovascular health; ERβ preference is a key feature of DHEA neurosteroid activity.'
            },
            {
                target_receptor: 'Androgen Receptor (AR)',
                action: 'Weak Partial Agonist',
                binding_affinity_relative: 'Very Low',
                downstream_effect: 'Provides minor baseline AR occupancy, but most androgenic effects are achieved only after metabolic conversion.'
            },
            {
                target_receptor: 'GABA_A Receptor',
                action: 'Negative Allosteric Modulator',
                binding_affinity_relative: 'N/A (Non-genomic)',
                downstream_effect: 'Primarily mediated by DHEA-S (the sulfated form); modulates inhibitory neurotransmission, influencing memory and anxiety.'
            },
            {
                target_receptor: 'NMDA Receptor',
                action: 'Positive Allosteric Modulator',
                binding_affinity_relative: 'N/A (Non-genomic)',
                downstream_effect: 'Enhances glutamatergic signaling, promoting synaptic plasticity and memory formation.'
            }
        ],

        // 3. Metabolic State Transitions (The Enzymes & Electrons)
        metabolic_pathways: [
            {
                enzyme: '3-beta-HSD (HSD3B)',
                reaction_type: 'Oxidation (Hydroxyl to Ketone)',
                target_coordinate: 'C3',
                product: 'Androstenedione',
                clinical_note: 'The primary gateway reaction. DHEA is converted to Androstenedione, which can then follow the "testosterone pathway" or "estrogen pathway" depending on cellular needs.'
            },
            {
                enzyme: 'SULT2A1 (Sulfotransferase)',
                reaction_type: 'Sulfation',
                target_coordinate: 'C3',
                product: 'DHEA-S (DHEA-Sulfate)',
                clinical_note: 'The circulating reservoir form. DHEA-S is water-soluble, has a much longer half-life than free DHEA, and serves as the source for local tissue conversion back into active DHEA.',
                source_refs: ["kegg_hsa00140"]
            }
        ],

        // 4. Mechanistic Side Effects
        receptor_linked_side_effects: {
            androgenic_driven: [
                { side_effect: 'Mild Virilization', mechanism: 'Excessive conversion to Testosterone/DHT in target tissues (acne, hair growth) in predisposed individuals.' }
            ],
            estrogenic_driven: [
                { side_effect: 'Estrogen-mediated Gynaecomastia', mechanism: 'Systemic aromatization of conversion-products (Testosterone -> E2) can indirectly raise estrogen levels.' }
            ],
            neurosteroid_driven: [
                { side_effect: 'Anxiogenic potential', mechanism: 'DHEA-S modulation of the GABA-A receptor can reduce inhibitory tone, potentially causing irritability or anxiety in high-dose scenarios.' }
            ]
        },

        // 5. Terminal Excretion Metabolites
        terminal_urinary_metabolites: [
            { name: 'Androsterone', stereoisomer: '5α-androstan-3α-ol-17-one', conjugate: 'Glucuronide' },
            { name: 'Etiocholanolone', stereoisomer: '5β-androstan-3α-ol-17-one', conjugate: 'Glucuronide' }
        ],

        // 6. Intracellular Signaling
        downstream_signaling_cascades: {
            intracrinology_cascade: {
                activated_by: 'Local tissue demand for E2 or Androgens',
                downstream_pathologies: [
                    {
                        side_effect: 'Systemic Hormonal Flux',
                        mechanism: 'Because DHEA is a precursor, its impact is entirely dependent on the host tissue\'s enzymatic expression (e.g., skin, prostate, ovaries). This makes DHEA supplementation highly unpredictable for systemic hormonal ratios.'
                    }
                ]
            }
        },

        blurb: `DHEA (Dehydroepiandrosterone) is the most abundant circulating steroid hormone in the human body. Unlike downstream steroids that act as terminal agonists, DHEA functions as an "intracrine" precursor. It is synthesized by the adrenal cortex and, to a lesser extent, the gonads and brain. Its primary physiological role is to provide a pool of steroid precursors that peripheral tissues (like the skin or brain) can convert into active androgens or estrogens based on local need via the actions of 3β-HSD and 17β-HSD enzymes. In addition to its role as a precursor, free DHEA and its sulfated conjugate, DHEA-S, act as neurosteroids, non-genomically modulating excitatory (NMDA) and inhibitory (GABA) neurotransmission in the CNS, which impacts memory, mood, and stress responses.`
    },
    {
        parent_molecule: 'stanozolol',
        therapeutic_class: 'Anabolic-Androgenic Steroids (AAS): Synthetic DHT derivative',

        // 1. Structural Fingerprint
        structural_backbone: '5alpha-androstane',
        modifications: [
            'Pyrazole ring fused to the A-ring (replaces the 3-keto group, drastically increasing the anabolic-to-androgenic ratio)',
            '17-alpha-methyl group (confers oral bioavailability by sterically hindering hepatic first-pass metabolism)',
            'Absence of the Delta-4 double bond (cannot be aromatized into estrogen)'
        ],

        // 2. The Multi-Receptor Binding Profile
        receptor_interactions: [
            {
                target_receptor: 'Androgen Receptor (AR)',
                action: 'Agonist',
                binding_affinity_relative: '~22% of DHT',
                downstream_effect: 'Drives potent anabolic protein synthesis in skeletal muscle. Binds directly in osteoblasts to stimulate RUNX2 expression, driving osteogenic differentiation and bone mineral apposition.',
                source_refs: ['saartok_1984', 'nebot_2016', 'rachetti_2018']
            },
            {
                target_receptor: 'Sex Hormone-Binding Globulin (SHBG)',
                action: 'Binding / Hepatic Suppression',
                binding_affinity_relative: 'High affinity (potent suppressor of hepatic synthesis)',
                downstream_effect: 'Binds to and drastically suppresses SHBG production. The oral route reduces SHBG much more profoundly than the injected (intramuscular) route due to concentrated first-pass hepatic exposure, massively increasing the circulating free (unbound) fraction of co-administered hormones.',
                source_refs: ['sinnecker_1989', 'thompson_1989']
            },
            {
                target_receptor: 'Progesterone Receptor (PR)',
                action: 'Low-Affinity Agonist / Modulator',
                binding_affinity_relative: 'Low but clinically relevant',
                downstream_effect: 'Exhibits mild progesterone receptor agonism that modulates cellular signaling. Interacts with membrane receptors to drive localized inflammatory pathways and Prostaglandin E2 (PGE2) synthesis.',
                source_refs: ['ellis_1996']
            },
            {
                target_receptor: 'Estrogen Receptors (ERα / ERβ)',
                action: 'Negligible direct binding',
                binding_affinity_relative: '< 0.1% (Non-aromatizable)',
                downstream_effect: 'Cannot be converted to estrogen, completely avoiding estrogenic side effects like water retention or gynecomastia.',
                source_refs: ['raynaud_1980']
            }
        ],

        // 3. Metabolic State Transitions (The Enzymes & Electrons)
        metabolic_pathways: [
            {
                enzyme: 'Cytochrome P450 Enzymes (e.g., CYP3A4, CYP2C8)',
                reaction_type: 'Hydroxylation',
                target_coordinate: 'C3\', C4, and C16',
                product: '3\'-hydroxystanozolol, 4β-hydroxystanozolol, and 16β-hydroxystanozolol',
                clinical_note: 'The 17-alpha-methyl group severely hinders rapid hepatic breakdown. Instead, oxidation is forced onto the pyrazole ring and A/D rings, extending its biological half-life and generating the primary metabolites targeted in athletic doping screens.',
                source_refs: ['kegg_hsa00980']
            },
            {
                enzyme: 'Aromatase (CYP19A1)',
                reaction_type: 'None (Steric/Structural blocking)',
                target_coordinate: 'A-ring',
                product: 'N/A',
                clinical_note: 'The pyrazole ring and reduced 5-alpha structure make aromatization impossible. Stanozolol remains strictly androgenic and anabolic.'
            }
        ],

        // 4. Mechanistic Side Effects mapped directly to receptor vectors
        receptor_linked_side_effects: {
            ar_driven: [
                { side_effect: 'Dyslipidemia (Cardiovascular Risk)', mechanism: 'Potent activation of hepatic lipase via AR significantly degrades High-Density Lipoprotein (HDL) while elevating Low-Density Lipoprotein (LDL), vastly accelerating atherogenesis.', source_refs: ['thompson_1989'] },
                { side_effect: 'Virilization', mechanism: 'Despite a high anabolic-to-androgenic ratio, AR binding in susceptible tissues can still drive vocal cord thickening, clitoromegaly, and hirsutism in females.' }
            ],
            non_genomic_and_structural: [
                { side_effect: 'Joint Pain and Tendon Brittleness (Dry Joints)', mechanism: 'Acts as a powerful diuretic that flushes interstitial fluid out of the synovial spaces. While it stimulates collagen synthesis, it interferes with normal cross-linking and collagen maturation, making tendons stiffer and highly prone to rupture under heavy mechanical loads.', source_refs: ['marqueti_2006'] },
                { side_effect: 'Hepatotoxicity', mechanism: 'The 17-alpha-alkylation forces the liver to process the molecule repeatedly without easily cleaving it. This induces intrahepatic cholestasis, elevated transaminases (AST/ALT), and potential peliosis hepatis.' }
            ]
        },

        // 5. Terminal Excretion Metabolites (Phase II Conjugation)
        terminal_urinary_metabolites: [
            {
                name: '3\'-hydroxystanozolol',
                stereoisomer: 'Hydroxylated at the pyrazole ring (C3\')',
                conjugate: 'Glucuronide (UGT-mediated)',
                clinical_note: 'The most abundant urinary metabolite. Acts as the primary long-term diagnostic marker for WADA mass spectrometry screening.'
            },
            {
                name: '4β-hydroxystanozolol',
                stereoisomer: 'Beta-isomer at C4 (A-ring)',
                conjugate: 'Glucuronide (UGT-mediated)',
                clinical_note: 'A major, highly specific, long-lasting diagnostic metabolite used to confirm stanozolol administration.'
            },
            {
                name: '16β-hydroxystanozolol',
                stereoisomer: 'Beta-isomer at C16 (D-ring)',
                conjugate: 'Sulfate and Glucuronide forms',
                clinical_note: 'A secondary, shorter-lived clearance metabolite.'
            }
        ],

        // 6. Intracellular Signaling & Tissue Remodeling Pathologies
        downstream_signaling_cascades: {
            osteogenic_differentiation: {
                activated_by: 'AR occupancy in osteoblasts',
                downstream_pathologies: [
                    {
                        side_effect: 'Increased Bone Mineral Density',
                        mechanism: 'Upregulates RUNX2 and downregulates pro-inflammatory cytokines (like MMP-13 and IL-6), pushing mesenchymal cells toward osteoblast differentiation and driving the apposition of the bone mineral matrix.',
                        source_refs: ['nebot_2016', 'rachetti_2018']
                    }
                ]
            },
            collagen_interstitial_fluid_shift: {
                activated_by: 'Non-genomic membrane interactions and osmotic shifts',
                downstream_pathologies: [
                    {
                        side_effect: 'Tendon Rupture Risk',
                        mechanism: 'Stanozolol causes a rapid shift of water out of the interstitial fluid, dehydrating the joints. Concurrently, altered collagen synthesis upregulates localized structural changes that fail to maintain necessary viscoelastic properties, leading to mechanical failure under stress.',
                        source_refs: ['marqueti_2006', 'parr_2020']
                    }
                ]
            }
        },
        blurbHTML: `<img src="./docs/17a.png" class="img-fluid rounded" alt="17-alpha-methyltestosterone chemical structure"/><br/> 17α-Alkylated anabolic-androgenic steroids (AAS) are synthetic derivatives of testosterone, dihydrotestosterone (DHT), or related androstane steroids that contain an alkyl substituent at the C17α position. This structural modification reduces first-pass hepatic metabolism and confers oral bioavailability. Members of this class retain the characteristic steroid nucleus and multiple stereogenic centres required for androgen receptor binding, while additional structural modifications influence their anabolic, androgenic, and metabolic properties. Although 17α-alkylation enhances oral activity and systemic exposure, it is also associated with increased hepatic burden compared with non-alkylated anabolic steroids.`,
        blurb: `Stanozolol is a synthetic anabolic-androgenic steroid (AAS) structurally derived from dihydrotestosterone (DHT) through the addition of a pyrazole ring at the A-ring and a 17α-methyl group. This unique heteropentacyclic architecture completely prevents aromatization into estrogen while significantly enhancing its anabolic-to-androgenic ratio [saartok_1984]. Stanozolol is notable for its profound impact on circulating transport proteins; specifically, oral administration exerts a powerful first-pass effect on the liver that drastically reduces Sex Hormone-Binding Globulin (SHBG) production, far exceeding the reduction seen with injected (intramuscular) formulations [sinnecker_1989, thompson_1989]. This massively increases the bioavailability of unbound steroid hormones in the bloodstream.\n\nAt the cellular level, stanozolol acts as an agonist at the androgen receptor (AR) and exhibits some affinity for the progesterone receptor (PR) as a low-affinity agonist, which modulates specific inflammatory and prostaglandin signaling cascades [ellis_1996]. In skeletal tissue, it directly stimulates osteoblast proliferation and differentiation by upregulating RUNX2 gene expression, promoting bone mineral apposition [nebot_2016, rachetti_2018]. However, its effects on connective tissue are paradoxical; while it stimulates certain pathways of collagen synthesis, it drastically alters osmotic balance by driving water out of the interstitial fluid [parr_2020]. This "drying" effect in the synovial spaces, combined with interference in normal collagen cross-linking, makes tendons less viscoelastic and highly susceptible to mechanical rupture during heavy loads [marqueti_2006]. Historically used to treat hereditary angioedema and osteoporosis, stanozolol is widely known in athletic contexts for its capacity to increase lean mass and strength without water retention, though its severe hepatotoxicity and deleterious effects on the lipid profile severely limit its clinical application.`
    },
    {
        parent_molecule: 'halotestin',
        therapeutic_class: 'Anabolic-Androgenic Steroids (AAS): Halogenated 17α-alkylated derivative',


        // 1. Structural Fingerprint
        structural_backbone: 'androst-4-ene',
        modifications: [
            '17-alpha-methyl group (confers oral bioavailability by sterically hindering hepatic first-pass metabolism)',
            '9-alpha-fluoro group (electronegative draw massively increases AR binding affinity and slows hepatic reduction)',
            '11-beta-hydroxyl group (sterically prevents the aromatase enzyme from interacting with the A-ring)'
        ],

        // 2. The Multi-Receptor Binding Profile
        receptor_interactions: [
            {
                target_receptor: 'Androgen Receptor (AR)',
                action: 'Super-Agonist',
                binding_affinity_relative: 'Extremely High (Significantly greater than testosterone)',
                downstream_effect: 'Binds ferociously to androgen receptors, particularly in the central nervous system and specific skeletal muscle pathways. Drives massive neural recruitment and strength output rather than traditional localized muscle hypertrophy.'
            },
            {
                target_receptor: '11β-Hydroxysteroid Dehydrogenase (11β-HSD1 & 11β-HSD2)',
                action: 'Enzyme Inhibitor / Competitor',
                binding_affinity_relative: 'High affinity for enzyme active sites',
                downstream_effect: 'Inhibits the enzymes responsible for shuttling active cortisol to inactive cortisone. This effectively alters the body\'s glucocorticoid and mineralocorticoid balance, mimicking stress-state physiological responses.'
            },
            {
                target_receptor: 'Estrogen Receptors (ERα / ERβ)',
                action: 'None',
                binding_affinity_relative: '0%',
                downstream_effect: 'Due to the 11-beta-hydroxyl group, the molecule cannot fit into the active site of the aromatase enzyme. It generates absolutely zero estrogenic activity.'
            }
        ],

        // 3. Metabolic State Transitions (The Enzymes & Electrons)
        metabolic_pathways: [
            {
                enzyme: 'Cytochrome P450 Enzymes (Hepatic)',
                reaction_type: 'Oxidation / Hydroxylation',
                target_coordinate: 'Various',
                product: 'Multiple hydroxylated inactive metabolites',
                clinical_note: 'The combination of 17-alpha-methylation and 9-alpha-fluorination makes this molecule incredibly difficult for the liver to break down, resulting in extreme, dose-dependent hepatic strain.'
            },
            {
                enzyme: '5-alpha Reductase (5aR)',
                reaction_type: 'Reduction',
                target_coordinate: 'C4-C5 double bond',
                product: '5-alpha-dihydrofluoxymesterone',
                clinical_note: 'The 9-alpha-fluoro group slows down 5aR reduction compared to testosterone, meaning the parent hormone remains the primary active agent in target tissues like the prostate and scalp.'
            }
        ],

        // 4. Mechanistic Side Effects mapped directly to receptor vectors
        receptor_linked_side_effects: {
            ar_driven: [
                { side_effect: 'Severe Virilization & Androgenic Alopecia', mechanism: 'Due to its massive AR binding affinity, it exerts extreme androgenic effects on the skin, sebaceous glands, hair follicles, and vocal cords.' },
                { side_effect: 'Prostate Hypertrophy', mechanism: 'Direct, potent AR activation in prostate tissue promotes rapid cellular proliferation.' }
            ],
            glucocorticoid_and_structural_driven: [
                { side_effect: 'Hypertension and Renal Strain', mechanism: 'By inhibiting renal 11β-HSD2, cortisol is allowed to bind to mineralocorticoid receptors in the kidneys (which normally only accept aldosterone). This drives unregulated sodium retention and potassium excretion, spiking blood pressure.' },
                { side_effect: 'CNS Hyper-Activation (Aggression)', mechanism: 'The combination of extreme AR binding in the brain and altered cortisol levels drives profound neurological changes, often resulting in heightened irritability, competitive drive, and aggression.' },
                { side_effect: 'Extreme Hepatotoxicity', mechanism: 'The tri-modified structure (methyl, fluoro, hydroxyl) resists hepatic clearance to such a degree that it rapidly induces elevations in liver transaminases (AST/ALT) and carries a high risk of drug-induced cholestasis.' }
            ]
        },

        // 5. Terminal Excretion Metabolites (Phase II Conjugation)
        terminal_urinary_metabolites: [
            { name: '6-beta-hydroxyfluoxymesterone', stereoisomer: 'Hydroxylated at C6', conjugate: 'Unconjugated and Glucuronide forms' },
            { name: '9-alpha-fluoro-17-alpha-methyl-androstane-3-alpha,11-beta,17-beta-triol', stereoisomer: 'Fully reduced A-ring', conjugate: 'Glucuronide (UGT-mediated) and Sulfate' }
        ],

        // 6. Intracellular Signaling & Tissue Remodeling Pathologies
        downstream_signaling_cascades: {
            erythropoiesis_stimulation: {
                activated_by: 'Renal AR occupancy',
                downstream_pathologies: [
                    {
                        side_effect: 'Polycythemia (Thickened Blood)',
                        mechanism: 'Massively upregulates the production of Erythropoietin (EPO) in the kidneys. While this increases oxygen-carrying capacity, it heavily increases blood viscosity, raising the risk of thrombosis, stroke, and cardiovascular events.'
                    }
                ]
            },
            lipid_metabolism_disruption: {
                activated_by: 'Hepatic AR and metabolic strain',
                downstream_pathologies: [
                    {
                        side_effect: 'Severe Dyslipidemia',
                        mechanism: 'Drastically increases hepatic lipase activity, which heavily degrades HDL (good cholesterol) while simultaneously increasing LDL (bad cholesterol), creating a highly atherogenic environment.'
                    }
                ]
            }
        },
        blurb: `Fluoxymesterone (Halotestin) is an exceptionally potent, synthetic androgenic-anabolic steroid. While it shares the 17α-methyl group characteristic of oral AAS to survive first-pass hepatic metabolism, it is completely distinguished by the addition of a 9α-fluoro group and an 11β-hydroxyl group. These specific structural modifications sterically lock the molecule, completely preventing aromatization by CYP19A1 (aromatase), while massively amplifying its binding affinity to the androgen receptor (AR). Uniquely among standard AAS, fluoxymesterone heavily influences glucocorticoid pathways by acting as a competitive inhibitor of the 11β-Hydroxysteroid Dehydrogenase (11β-HSD) enzymes. This interference alters systemic cortisol metabolism, leading to distinct central nervous system (CNS) effects—notably intense neurological drive and aggression—and profound increases in erythropoiesis (red blood cell production). Because of this profile, it yields massive strength and performance increases without accompanying tissue hypertrophy (weight gain) or estrogenic water retention, though its extreme hepatotoxicity and cardiovascular strain strictly limit its use.`,
        blurbHTML: `<img src="./docs/17a.png" class="img-fluid rounded" alt="17-alpha-methyltestosterone chemical structure"> 17α-Alkylated anabolic-androgenic steroids (AAS) are synthetic derivatives of testosterone, dihydrotestosterone (DHT), or related androstane steroids that contain an alkyl substituent at the C17α position. This structural modification reduces first-pass hepatic metabolism and confers oral bioavailability. Members of this class retain the characteristic steroid nucleus and multiple stereogenic centres required for androgen receptor binding, while additional structural modifications influence their anabolic, androgenic, and metabolic properties. Although 17α-alkylation enhances oral activity and systemic exposure, it is also associated with increased hepatic burden compared with non-alkylated anabolic steroids.`,

    },
    {
        parent_molecule: '17a-steroid',
        blurb: ` `,
        blurbHTML: `<img src="./docs/17a.png" class="img-fluid rounded" alt="17-alpha-methyltestosterone chemical structure"> <br/>17α-Alkylated anabolic-androgenic steroids (AAS) are synthetic derivatives of testosterone, dihydrotestosterone (DHT), or related androstane steroids that contain an alkyl substituent at the C17α position. This structural modification reduces first-pass hepatic metabolism and confers oral bioavailability. Members of this class retain the characteristic steroid nucleus and multiple stereogenic centres required for androgen receptor binding, while additional structural modifications influence their anabolic, androgenic, and metabolic properties. Although 17α-alkylation enhances oral activity and systemic exposure, it is also associated with increased hepatic burden compared with non-alkylated anabolic steroids.`,
        mode_of_action: `17α-Alkylated anabolic-androgenic steroids exert their effects primarily through binding to and activation of intracellular androgen receptors (AR). Following receptor activation, the ligand-receptor complex undergoes dimerization, translocates to the nucleus, and interacts with androgen response elements (AREs) to regulate transcription of genes involved in protein synthesis, nitrogen retention, erythropoiesis, skeletal muscle growth, bone metabolism, and other androgen-dependent physiological processes. The magnitude of anabolic and androgenic activity varies among individual compounds according to their structural modifications and tissue-specific metabolism.`,
        molecular_target: `Androgen receptor (AR), agonist. Secondary pharmacological effects may arise from compound-specific metabolites or interactions with other steroid hormone pathways.`,
        therapeutic_class: `Androgens / Anabolic agents for systemic use; 17α-alkylated anabolic-androgenic steroids`
    },
    {
        parent_molecule: 'exemestane',
        therapeutic_class: 'Steroidal aromatase inactivators (Type I / suicide inhibitors); Antineoplastic agents, endocrine therapy',

        // 1. Structural Fingerprint
        structural_backbone: 'androstane (modified)',
        modifications: [
            '6-methylidene (exocyclic methylene) group at C6',
            'Additional double bond between C1-C2 (1,4-diene system)',
            '3-keto and 17-keto groups',
            'Synthetic derivative designed as a mechanism-based false substrate for aromatase'
        ],

        // 2. The Multi-Receptor / Enzyme Binding Profile
        receptor_interactions: [
            {
                target_receptor: 'Aromatase (CYP19A1)',
                action: 'Irreversible suicide inhibitor (Type I inactivator)',
                binding_affinity_relative: 'High affinity (structurally mimics androstenedione; processed to covalent intermediate)',
                downstream_effect: 'Permanent inactivation of the enzyme leading to profound and sustained suppression of estrogen biosynthesis (typically 85-95% reduction in circulating estrogens).',
                source_refs: ["drugbank_db00990", "fda_aromasin_label", "lombardi_2002"]
            },
            {
                target_receptor: 'Androgen Receptor (AR)',
                action: 'Weak agonist (parent + especially 17β-hydroxy metabolite)',
                binding_affinity_relative: 'Low to moderate androgenic activity',
                downstream_effect: 'Mild androgenic effects possible (e.g., acne, hair changes); metabolite contributes to overall pharmacology.',
                source_refs: ["wikipedia_exemestane", "drugbank_db00990"]
            },
            {
                target_receptor: 'Estrogen Receptor (ER)',
                action: 'No direct binding',
                binding_affinity_relative: 'Negligible',
                downstream_effect: 'Indirect anti-estrogenic action exclusively through depletion of estrogen ligands.'
            },
            {
                target_receptor: 'Other (PR, GR)',
                action: 'Negligible',
                binding_affinity_relative: 'Very low',
                downstream_effect: 'Minimal cross-reactivity.'
            }
        ],

        // 3. Metabolic State Transitions (The Enzymes & Electrons)
        metabolic_pathways: [
            {
                enzyme: 'Aromatase (CYP19A1)',
                reaction_type: 'Suicide inactivation (mechanism-based)',
                target_coordinate: 'Enzyme active site (binds as androstenedione analogue)',
                product: 'Irreversibly inactivated aromatase',
                clinical_note: 'Forms reactive intermediate that covalently modifies the enzyme; long-lasting effect.',
                source_refs: ["fda_aromasin_label", "lombardi_2002"]
            },
            {
                enzyme: 'Aldo-keto reductases (AKR1C family) + multiple CYPs (CYP1A1/2, CYP4A11, etc.)',
                reaction_type: 'Reduction (17-keto → 17β-hydroxy)',
                target_coordinate: 'C17',
                product: '17β-Dihydroexemestane (17β-DHE; active metabolite)',
                clinical_note: 'Contributes to aromatase inhibition and mild androgenic activity.',
                source_refs: ["peterson_2017", "kamdem_2011"]
            },
            {
                enzyme: 'CYP3A4 (primary) + others',
                reaction_type: 'Oxidation',
                target_coordinate: 'C6 methylene group',
                product: '6-Hydroxymethyl and further inactive metabolites',
                clinical_note: 'Extensive first-pass metabolism; low absolute bioavailability.',
                source_refs: ["fda_aromasin_label", "kamdem_2011"]
            }
        ],

        // 4. Mechanistic Side Effects mapped directly to enzyme inhibition and metabolite vectors
        receptor_linked_side_effects: {
            aromatase_inhibition_estrogen_depletion_driven: [
                { side_effect: 'Hot flashes / Vasomotor symptoms', mechanism: 'Profound estrogen suppression disrupts hypothalamic thermoregulation.' },
                { side_effect: 'Bone mineral density loss / Osteoporosis', mechanism: 'Estrogen deficiency accelerates osteoclast activity and bone resorption.' },
                { side_effect: 'Arthralgia / Myalgia (joint/muscle pain)', mechanism: 'Estrogen withdrawal effects on musculoskeletal tissues.' },
                { side_effect: 'Dyslipidemia', mechanism: 'Altered lipid metabolism due to low estrogen.' }
            ],
            androgenic_metabolite_driven: [
                { side_effect: 'Acne, mild virilization (rare)', mechanism: 'Weak AR activation by parent and 17β-DHE.' }
            ]
        },

        // 5. Terminal Excretion Metabolites (Phase II)
        terminal_urinary_metabolites: [
            { name: '17β-Dihydroexemestane glucuronide', conjugate: 'Primarily via UGT2B17' },
            { name: 'Cysteine conjugates', conjugate: 'Via glutathione pathway (GSTA1 and downstream processing)' },
            { name: 'Oxidized derivatives', conjugate: 'Glucuronide / Sulfate' }
        ],

        // 6. Intracellular Signaling & Tissue Effects
        downstream_signaling_cascades: {
            estrogen_deprivation_in_er_positive_cancer: {
                activated_by: 'Near-complete peripheral aromatase inactivation',
                downstream_pathologies: [
                    {
                        side_effect: 'Increased risk of fractures and cardiovascular events (long-term)',
                        mechanism: 'Chronic hypoestrogenism impacts bone homeostasis, vascular function, and lipids.'
                    }
                ]
            }
        },

        blurb: `Exemestane is a synthetic derivative of the natural aromatase substrate androstenedione. It features the androstane steroid nucleus modified with a 1,4-diene-3,17-dione system and a characteristic 6-methylidene group. This structure enables high-affinity binding to aromatase (CYP19A1), where it is processed into a reactive intermediate that covalently inactivates the enzyme (suicide inhibition). Exemestane contains multiple stereogenic centers in the natural steroid configuration. It undergoes extensive metabolism, primarily reduction at C17 to the active 17β-dihydroexemestane metabolite (which retains inhibitory and mild androgenic properties) and oxidation via CYP3A4. Metabolites are further conjugated and excreted. The net result is sustained suppression of estrogen production from androgen precursors in peripheral tissues.`
    }

]
const steroidDataSources = [
    // --- DATABASE & SYSTEMS BIOLOGY SOURCES (Verified) ---
    {
        source_id: "kegg_hsa00140",
        title: "Steroid Hormone Biosynthesis Pathway Map (hsa00140)",
        author: "Kyoto Encyclopedia of Genes and Genomes (KEGG)",
        type: "Database / Rest API",
        url: "https://rest.kegg.jp/get/pathway:hsa00140",
        description: "Primary biochemical sequence mapping cholesterol down to baseline androgens (Testosterone) and estrogens (Estradiol)."
    },
    {
        source_id: "kegg_hsa00980",
        title: "Metabolism of Xenobiotics by Cytochrome P450 Map (hsa00980)",
        author: "Kyoto Encyclopedia of Genes and Genomes (KEGG)",
        type: "Database / Rest API",
        url: "https://rest.kegg.jp/get/pathway:hsa00980",
        description: "Maps downstream Phase I oxidation pathways (CYP-mediated hydroxylations) responsible for terminal steroid clearing."
    },
    {
        source_id: "human_gem_metabolic_atlas",
        title: "Human-GEM Genome-Scale Metabolic Model",
        author: "Metabolic Atlas Consortium",
        type: "Open-Source SBML Network",
        url: "https://github.com/SysBioChalmers/Human-GEM",
        description: "Contains raw enzyme kinetic and cofactor stoichiometric XML data mapping internal transport and cellular compartmental reactions."
    },

    // --- CROSS-RECEPTOR BINDING DATA (Verified) ---
    {
        source_id: "raynaud_1980",
        title: "Steroid hormone receptors and pharmacology",
        author: "Raynaud, J.P., Bouton, M.M., et al.",
        type: "Peer-Reviewed Study",
        journal: "Journal of Steroid Biochemistry",
        url: "./refs/raynaud1980.pdf",
        doi: "10.1016/0022-4731(80)90264-2",
        description: "The foundational benchmark assay evaluating relative binding affinities (RBA) of synthetic derivatives across all five primary steroid hormone receptors."
    },
    {
        source_id: "saartok_1984",
        title: "Relative binding affinity of anabolic-androgenic steroids: comparison of the binding to the androgen receptors in skeletal muscle and in prostate, as well as to sex hormone-binding globulin",
        author: "Saartok, T., Dahlberg, E., & Gustafsson, J.A.",
        type: "Peer-Reviewed Study",
        journal: "Endocrinology",
        url: "./refs/saartok1984.pdf",
        doi: '10.1210/endo-114-6-2100',
        description: "The gold-standard academic mapping of how synthetic AAS (like Nandrolone and Stanozolol) bind to androgen receptors compared to native testosterone."
    },

    // --- FIBROTIC PATHWAY MECHANISMS (Verified) ---
    {
        source_id: "do_carmo_2012",
        title: "Nandrolone Inhibits MMP-2 in the Left Ventricle of Rats",
        author: "do Carmo, E.C., et al.",
        type: "In Vivo Study",
        journal: "International Journal of Sports Medicine",
        doi: "10.1055/s-0031-1291252",
        description: "Documents how nandrolone alters cardiac matrix remodeling and induces fibrosis by disrupting the balance of matrix metalloproteinases."
    },

    // --- COMPLEMENTARY PHYSICAL/SOLUBILITY LITERATURE (Verified) ---
    {
        source_id: "stovall_2018",
        title: "Abraham model correlations describing the solubilising ability of peanut oil",
        author: "Stovall, D. M., & Acree, W. E.",
        type: "Analytical Chemistry Literature",
        journal: "Physics and Chemistry of Liquids",
        doi: "10.1080/00319104.2018.1471618",
        description: "Validates the system constants and partition coefficients (log P vectors) of solute migration in lipid-based carriers (Arachis/Peanut Oil)."
    },
    // --- STANOZOLOL SPECIFIC PHARMACODYNAMICS & KINETICS ---
    {
        source_id: 'sinclair_1989',
        title: 'Alteration of Sex Hormone-Binding Globulin by Oral and Injectable Stanozolol',
        author: 'Sinclair, M., et al.',
        type: 'Peer-Reviewed Study',
        journal: 'Journal of Clinical Endocrinology & Metabolism',
        description: 'Benchmark study demonstrating that oral stanozolol reduces SHBG significantly more than equipotent intramuscular doses due to hepatic first-pass metabolism.'
    },
    {
        source_id: 'cowan_1998',
        title: 'Pharmacokinetics and Pharmacodynamics of Stanozolol',
        author: 'Cowan, D. A., et al.',
        type: 'Peer-Reviewed Study',
        journal: 'British Journal of Clinical Pharmacology',
        description: 'Explores the bioavailability and transport protein binding of stanozolol, confirming its low affinity for SHBG but profound suppressive effect on SHBG synthesis.'
    },
    {
        source_id: 'nebot_2016',
        title: 'Stanozolol Decreases Bone Turnover Markers, Increases Mineralization, and Alters Femoral Geometry in Male Rats',
        author: 'Nebot, E., et al.',
        type: 'In Vivo Study',
        doi: '10.1007/s00223-016-0108-8',
        url: 'https://pubmed.ncbi.nlm.nih.gov/26801156/',
        journal: 'Calcified Tissue International',
        description: 'Validates the structural changes and increased mineral apposition in bone matrices induced by stanozolol.'
    },
    {
        source_id: 'rachetti_2018',
        title: 'Stanozolol promotes osteogenic gene expression and apposition of bone mineral in vitro',
        author: 'Rachetti, A., et al.',
        type: 'In Vitro Study',
        url:'https://pubmed.ncbi.nlm.nih.gov/30427473/',
        journal: 'Journal of Bone and Mineral Metabolism',
        description: 'Directly confirms that stanozolol modulates genes related to osteogenic differentiation, specifically upregulating the RUNX2 transcription factor.'
    },
    {
        source_id: 'ellis_1996',
        title: 'The differential effects of stanozolol on human skin and synovial fibroblasts in vitro: DNA synthesis and receptor binding',
        author: 'Ellis, A. J., et al.',
        type: 'In Vitro Study',
        journal: 'Endocrinology',
        doi: '10.1007/BF01986391',
        url: 'https://pubmed.ncbi.nlm.nih.gov/8079819/',
        description: 'Demonstrates that stanozolol exhibits competitive binding at the progesterone receptor, modulating local cellular signaling in fibroblasts.'
    },
    {
        source_id: 'marqueti_2006',
        title: 'Biomechanical responses of different rat tendons to stanozolol and exercise',
        author: 'Marqueti, R. C., et al.',
        type: 'In Vivo Study',
        journal: 'International Journal of Sports Medicine',
        description: 'Hallmark study demonstrating that stanozolol administration makes tendons less viscoelastic and stiffer, significantly increasing the likelihood of rupture under mechanical load.'
    },
    {
        source_id: 'parr_2020',
        title: 'Anabolic steroids and tendons: A review of their mechanical, structural, and biologic effects',
        author: 'Parr, A. M., et al.',
        type: 'Literature Review',
        url: 'https://pubmed.ncbi.nlm.nih.gov/30047601/',
        journal: 'Journal of Orthopaedic Research',
        description: 'Details how stanozolol acts as an osmotic diuretic in connective tissues, driving water out of the synovial spaces and disrupting the normal sliding mechanism of collagen fibrils.'
    },
    {
        source_id: "drugbank_db00990",
        title: "Exemestane: Uses, Interactions, Mechanism of Action",
        author: "DrugBank",
        type: "Database",
        url: "https://go.drugbank.com/drugs/DB00990",
        description: "Comprehensive pharmacology, structure, metabolism, and pathways for exemestane."
    },
    {
        source_id: "fda_aromasin_label",
        title: "AROMASIN (exemestane) FDA Prescribing Information",
        author: "Pfizer / FDA",
        type: "Regulatory Label",
        url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2018/020753s020lbl.pdf",
        description: "Official mechanism, chemistry, clinical pharmacology, and safety data."
    },
    {
        source_id: "lombardi_2002",
        title: "Exemestane, a new steroidal aromatase inhibitor of clinical relevance",
        author: "P. Lombardi",
        type: "Review Paper",
        url: "https://www.sciencedirect.com/science/article/pii/S0925443902000960",
        description: "Detailed mechanism of action as suicide inhibitor."
    },
    {
        source_id: "peterson_2017",
        title: "In vitro metabolism of exemestane by hepatic cytochrome P450s",
        author: "A. Peterson et al.",
        type: "Research Paper",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5464343/",
        description: "CYP-mediated metabolism and formation of 17β-DHE."
    },
    {
        source_id: "kamdem_2011",
        title: "In vitro cytochrome P450-mediated metabolism of exemestane",
        author: "L.K. Kamdem et al.",
        type: "Research Paper",
        url: "https://pubmed.ncbi.nlm.nih.gov/20876785/",
        description: "Specific CYP contributions to primary metabolism."
    },
    {
        source_id: "pubchem_exemestane",
        title: "Exemestane - PubChem",
        author: "PubChem",
        type: "Database",
        url: "https://pubchem.ncbi.nlm.nih.gov/compound/Exemestane",
        description: "Chemical structure, IUPAC name, stereochemistry."
    }
];