function Articolo(categoria,titolo,testo,autore){
        this.testo = testo;
        this.categoria = categoria;
        this.titolo = titolo;
        this.autore = autore;
        this.featured = false;
        this.piace = false;
        this.tag = [];
        this.public = true;
}