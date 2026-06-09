function jsmolApp() {
    return {
        selectedId: 'benzyl_benzoate',
        customSmiles: '',
        compounds: compounds || [],
        viewer: null,
        drawer: null,
        contentHtml: '',

        init() {
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
            this.$watch('selectedId', () => this.loadSelected());

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

            this.viewer.clear();

            try {
                // Try local MOL/SDF file first
                const response = await fetch(`./mol3d/${compound.cas_no}.mol3d`);

                if (!response.ok)
                    throw new Error('3D file not found');

                const molData = await response.text();

                this.viewer.addModel(molData, "mol");
                this.viewer.setStyle({}, {
                    stick: {},
                    sphere: {
                        scale: 0.25
                    }
                });

                this.viewer.zoomTo();
                this.viewer.render();

                console.log("Loaded local MOL file");

            } catch (err) {
                console.warn("Falling back to SMILES");

                if (!compound.smiles) return;

                await this.loadSmiles(compound.smiles);
            }
            // Always try to draw 2D
            if (typeof compound.smiles !== "undefined") {
                this.draw2D(compound.smiles);
                console.log(compound);
                console.log(`smiles: ${compound.smiles}`);
            }

            await this.loadContent(compound.self_id);

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

        get compoundsWithSmiles() {
            return this.compounds.filter(c => c?.smiles);
        },
        getSource(source) {
            return steroidDataSources.find(s => s.source_id === source);
        },
        get getParent() {
            const parentCompound = this.selectedCompound?.parent_molecule;

            return parentCompound
                ? blurbs.find(b => b.parent_molecule === parentCompound)
                : null;
        },

    };
}