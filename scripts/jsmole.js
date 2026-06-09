function jsmolApp() {
    return {
        selectedId: 'benzyl_benzoate',
        customSmiles: '',
        compounds: compounds || [],
        viewer: null,
        drawer: null,
        contentHtml: '',
        spin: true,

        init() {
            // Ensure the div with id="viewer" exists in your HTML
            this.viewer = $3Dmol.createViewer("viewer", {
                backgroundColor: "white"
            });


            this.drawer = new SmilesDrawer.Drawer({
                width: 240,
                height: 240,
                padding: 2,
                bondLength: 38,
                bondThickness: 2.2,
                shortBondLength: 0.75,
                themes: {
                    light: {
                        C: '#111111',
                        O: '#e74c3c',
                        // add other atoms if needed
                    }
                }});

            this.viewer.spin(this.spin);
            this.viewer.zoomTo();
            this.viewer.render();

            this.$nextTick(() => {
                // ensure default exists
                if (!this.selectedId && this.compounds.length) {
                    this.selectedId = this.compounds[9].self_id;
                }

                // FORCE DOM update before loading molecule
                this.$nextTick(() => {
                    this.loadSelected();
                });
            });
            //zthis.$watch('selectedId', () => this.loadSelected());

        },

        get selectedCompound() {
            return this.compounds.find(
                c => String(c.self_id) === String(this.selectedId)
            );
        },

        async loadSelected() {
            console.log(`Loading compound: ${this.selectedCompound.name}`)
            const compound = this.selectedCompound;

            if (!compound || !this.viewer) return;
            <!-- 1 Load content -->
            console.log(`<!-- 1 Load content -->`);
            await this.loadContent(compound.self_id);
            <!-- 2 Draw 2D mole -->
            if (typeof compound.smiles !== "undefined") {
                console.log(`<!-- 2 Draw 2D mole -->\n --> ${compound.smiles}`);
                this.draw2D(compound.smiles);
            }

            <!-- 3 Draw 3D molecule -->
            try {
                // Try local MOL/SDF file first
                const response = await fetch(`./mol3d/${compound.cas_no}.mol3d`);

                if (!response.ok)
                    throw new Error('3D file not found');


                const molData = await response.text();

                console.log(`<!-- 3 Draw 3D molecule -->\n --> ${compound.smiles}`);
                this.viewer.clear();
                this.viewer.addModel(molData, "sdf");
                this.viewer.setStyle({}, {
                    stick: {},
                    sphere: {
                        scale: 0.25
                    }
                });
                this.viewer.spin(this.spin);
                this.viewer.zoomTo();
                this.viewer.render();
            } catch (err) {
                console.warn("Falling back to SMILES");

                if (!compound.smiles) return;
                await this.loadSmiles(compound.smiles);
            }



        },
        async loadContent(id) {
            try {
                const res = await fetch(`docs/${id}.html`);
                if (res.ok) {
                    this.contentHtml = await res.text();
                } else {
                    this.contentHtml = ``;
                }
            } catch (e) {
                this.contentHtml = ``;
            }
        },
        draw2D(smiles) {
            SmilesDrawer.parse(
                smiles,
                tree => {
                    this.drawer.draw(
                        tree,
                        '2dmole',
                        'light',
                        false
                    );
                },
                error => {
                    console.error('SMILES parse error:', error);
                }
            );
        },
        async loadSmiles(smiles) {
            if (!smiles || !this.viewer) return;

            try {
                const response = await fetch(
                    `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/smiles/${encodeURIComponent(smiles)}/SDF?record_type=3d`
                );

                const sdf = await response.text();

                this.viewer.clear();
                this.viewer.addModel(sdf, "sdf");

                this.viewer.setStyle({}, {
                    stick: {},
                    sphere: {
                        scale: 0.25
                    }
                });

                this.viewer.zoomTo();
                this.viewer.render();
            } catch (err) {
                console.error("Unable to generate 3D structure", err);
            }
        },

        loadCustomSmiles() {
            if (this.customSmiles) {
                this.loadSmiles(this.customSmiles);
            }
        },

        resetView() {
            if (!this.viewer) return;

            this.viewer.zoomTo();
            this.viewer.render();
        },
        toggleSpin() {
            console.log("toggle spin");
            if (this.spin === true) {
                this.spin = true;
                console.log("Spin On")
            } else {
                this.spin = false;
                console.log("Spin Off")
            }
            this.viewer.spin(this.spin);

        },

        get compoundsWithSmiles() {
            return this.compounds.filter(c => c?.smiles);
        },
        getSource(source) {
            return steroidDataSources.find(s => s.source_id === source);
        },
        get getParent() {
            const parentCompound = this.selectedCompound?.parent_molecule;
            console.log(`Parent compound for ${this.selectedCompound.name}: ${parentCompound}`);
            return parentCompound
                ? blurbs.find(b => b.parent_molecule === parentCompound)
                : null;
        },

    };
}