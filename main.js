src="Articolo.js";
function like(int){
    var tasto = $("#like_button" + int);
    if(tasto.hasClass('btn-secondary')){
        $('#like_button' + int).removeClass('btn-secondary');
        $('#like_button' + int).addClass('btn-primary');
    }else if(tasto.hasClass('btn-primary')){
        $('#like_button' + int).removeClass('btn-primary');
        $('#like_button' + int).addClass('btn-secondary');
    }
}/* funzione di test messa nell'index*/
function crea_primi_articoli(){
    array_Articoli[0] = new Articolo("Il mondo della moda","La moda è un arte? Non secondo Karl M. Axel",'"Non è niente di elegante" secondo il miliardario, naturalista e filantropo <b>Karl M. Axel</b> L\'alta moda non andrebbe valutata al pari delle arti classiche come Pittura Teatro o Calcetto a 5 Questo perche secondo il sig. Axel sarebbe "un insulto alla bellezza e purezza del corpo ed altre cavolate che un testo di esercitazione tanto chissene" ma non molti la vedono come lui(infatti è pazzo) quindi riportare questa notizia ha la sola utilità di rallegrarvi, almeno voi siete sani di mente',"<strong>Anonimo</strong>");
    array_Articoli[1] = new Articolo('Benessere e salute','Limone endovena, nuova cura per il cancro?','Diversi studi condotti all\'università di "Notruecity" nel paese dei balocchi hanno dimostrato che il succo di vari tipi di frutta ha effetti simili a quelli della chemioterapia, questi sarebbero dovuti al modo particolare in cui, in ambienti molto acidi, le molecole di fruttosio si leghino alle piastrine formando il piastrosio, un elemento simile a quello contenuto dai farmaci citotossici o antiblastici usati nella chemioterapia. <h4>Quì una lista dei frutti più efficaci contro il cancro:</h4><ol><li>Limone</li><li>Ananas</li><li>Arancia</li><li>Di nuovo Ananas(dipende da come gli gira)</li><li>Carota</li></ol>','Francesco S.');
    array_Articoli[2] = new Articolo('Lavoro e tecnologia','Non so che scrivere, articolo a caso','Signori, dopo tante stronzate il momento è purtroppo arrivato Ho finito le idee su cosa scrivere in questi finti articoli questi dovevano addirittura essere 5 ma sfortunatamente ho finito la creatività quindi addio e grazie del pesce. cit <h4>Quì una lista degli articoli più belli:</h4> <ul> <li>Limone cura il cancro</li> <li>Pubblicità</li><li>Karl M.Ax</li></ul>','Francesco Sciortino');
    
}/* _comment, 2 input*/
var array_Articoli = [];
function input(int){
    var user = $("#user_in" + int).val();
    var comment = $("#text_in" + int).val();
    if(user == ""){
        user = "Anonimo";
    }
    if(comment == ""){
    }else{
        var testo_sopra = "<b>"+ user + "</b> scrive:";
        var nuovoDiv = $('<div class="containers commento rounded"><p class="comm_up_text text-break">' + testo_sopra +'</p><p class="comm_low_text text-break">' + comment + ' </p></div>');
        nuovoDiv.appendTo("#commenti" + int);
        $("#text_in" + int).val("");
    }
}
function appendi_articolo(articolo){
    var numero_art = $(".box_titolo_e_articolo").length;
    testo_completo = $('<div id="_box'+ numero_art +'" class= "col-12 col-lg-4"><div class="big_box rounded"><div class="box_titolo_e_articolo"><header><h2><b>' + articolo.categoria + '</b></h2></header><header><h1><em>'+ articolo.titolo +'</em></h1></header><p class="testo_articolo">' + articolo.testo + '</p></div><div class="row" style="width: 100%; margin-left: auto; margin-right: auto;"><footer class="col-9"><p class="text-truncate"><b>Articolo scritto da:</b>'+ articolo.autore +'</p></footer> <div class="like_div col-3"><button id="like_button' + numero_art +'" type="button" class="btn btn-secondary like_button float-right" onclick="like('+ numero_art +')" data-toggle="button">Like</button></div><div id="commenti' + numero_art +'"></div><div  class="input-group mb-3"><input id="user_in'+ numero_art + '" type="text" class="form-control" placeholder="Il tuo NickName"><div class="input-group-append"><button class="btn btn-outline-secondary bottoni_input" type="button" id="button-comment3" onclick="input('+ numero_art +')">Invia</button></div></div><div  class="input-group"><textarea id="text_in' + numero_art + '" class="form-control" aria-label="With textarea" placeholder="Commenta..."></textarea></div></div></div>')
    testo_completo.prependTo($("#row_container"));
}
function clean_modal(){
    $("#user_in_modal").val("");
    $("#categoria_in_modal").val("");
    $("#title_in_modal").val("");
    $("#text_in_modal").val("");
}
function Create_article_with_modal(){
    var testo = $("#text_in_modal").val();
    if(testo==""){

    }else{
        var user = $("#user_in_modal").val();
        var title = $("#title_in_modal").val();
        var categoria = $("#categoria_in_modal").val();
        if(user == ""){
            user = "<strong>Anonimo</strong>";
        }
        if(title == ""){
            title = "Senza Titolo";
        }
        if(categoria == ""){
            categoria = "ALL";
        }
        var articolo = new Articolo(categoria,title,testo,user);
        add_Article_to_Array(articolo);
        aggiorna_articoli();
        clean_modal();
        $("#Modal_add_article").modal("hide");
    }
}
function add_Article_to_Array(article){
    array_Articoli[array_Articoli.length] = new Articolo(article.categoria,article.titolo,article.testo,article.autore);
}
function aggiorna_articoli(){
    var articolo_temp;
    for(var i = 0; i<array_Articoli.length;i++){
        articolo_temp = array_Articoli[i];
        DeleteArticle_from_page(i);
        array_Articoli[i] = articolo_temp;
    }
    for(var i = 0; i<array_Articoli.length;i++){
        appendi_articolo(array_Articoli[i]);
    }
}
function DeleteArticle_from_page(int){
    $("#_box" + int).detach();
}