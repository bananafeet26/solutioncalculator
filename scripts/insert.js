function productData() {
    return {
        compound: {
            name: "Testosterone Enanthate",
            formula: "C26H40O3",
            molecular_weight: "400.59",
            mg_per_ml: 250,
            parent_molecule: "stanozolol",
            self_id: "winstrol",
            excipients: ["benzyl_alcohol", "benzyl_benzoate"]
            // add other fields
        },
        drawer: null,
        compoundData: null,
        pharmacokineticsHTML: '',
        pkLoading: true,
        cards: [],

        init() {
            this.drawer = new SmilesDrawer.Drawer({
                width: 380,
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
                }
            });
            this.loadFromURL();
            this.loadPharmacokinetics();
            this.loadCards();

        },
        async loadPharmacokinetics() {
            try {
                const response = await fetch(`./docs/pk_${this.compound.self_id}.html`);

                if (!response.ok) throw new Error();

                this.pharmacokineticsHTML = await response.text();
            } catch (err) {
                this.pharmacokineticsHTML = `
                                <p class="text-muted">Pharmacokinetic data coming soon for this compound.</p>
                            `;
            } finally {
                this.pkLoading = false;
            }
        },
        async loadCards() {
            try {
                const response = await fetch(`./docs/${this.compound.parent_molecule}_cards.html`);
                let htmlText = await response.text();

                // Split by section comments
                const sections = htmlText.split(/<!--\s*Section\s+\d+/i);

                this.cards = [];
                let count = 3;
                for (let section of sections) {
                    if (section.trim() === '') continue;

                    // Extract content INSIDE <li> ... </li>  (without the li tags themselves)
                    const liMatch = section.match(/<xi[^>]*>([\s\S]*?)<\/xi>/i);

                    if (liMatch && liMatch[1]) {
                        // Use only the inner content
                        let content = liMatch[1].trim();
                        this.cards.push(content);
                    }
                    else if (section.trim().length > 10) {
                        let content = section.trim();
                        this.cards.push(content);
                    }
                    count++;
                }
                // Inside loadCards(), after parsing:
                this.cards = this.cards.sort((a, b) => {
                    // Rough height estimation based on content length
                    return b.length - a.length;   // taller first
                });

                // Refresh Masonry layout after cards are loaded
                this.$nextTick(() => {
                    window.dispatchEvent(new Event('reload:masonry'));
                });

            } catch (error) {
                console.error("Failed to load cards:", error);
                this.cards = ['<div class="p-8 text-red-500">Failed to load cards.html</div>'];
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
        get getParent() {
            const parentCompound = this.compoundData.parent_molecule;
            console.log(`Parent compound for ${this.compoundData.name}: ${parentCompound}`);
            return parentCompound
                ? blurbs.find(b => b.parent_molecule === parentCompound)
                : null;
        },
        getSource(source) {
            return steroidDataSources.find(s => s.source_id === source);
        },
        loadFromURL() {
            const params = new URLSearchParams(window.location.search);
            console.log(params);
            this.compound.excipients = [];
            if (params.has('self_id')) this.compound.self_id = params.get('self_id');
            this.compoundData = compounds.find(c => c.self_id === this.compound.self_id);
            this.compound = this.compoundData;if (params.has('mg')) this.compound.mg_per_ml = parseFloat(params.get('mg')) || 250;
            this.compound.excipients = [];
            if (params.has('excipient1')) this.compound.excipients.push(params.get('excipient1'));
            if (params.has('excipient2')) this.compound.excipients.push(params.get('excipient2'));
            if (params.has('excipient3')) this.compound.excipients.push(params.get('excipient3'));
            if (params.has('excipient4')) this.compound.excipients.push(params.get('excipient4'));

            this.draw2D(this.compoundData.smiles);
            // add more  params
        },
        formattedExcipients() {
            if (!this.compound.excipients || this.compound.excipients.length === 0) {
                return "None listed";
            }
            return this.compound.excipients.join(', ');
        }
        ,
    }
}