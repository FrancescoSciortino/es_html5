class ArticleController{

    constructor(array_Articoli_){
        this.array_Articoli = array_Articoli_;
        
        var array_Articoli;
        var postcontainer;
        var modal;
        var addPostBtn;
        var array_n;
    }

    
    

    /* like */
    like(nome_pulsante_like){
        var tasto = $(nome_pulsante_like);
        if(tasto.hasClass('btn-secondary')){
            $(nome_pulsante_like).removeClass('btn-secondary');
            $(nome_pulsante_like).addClass('btn-primary');
        }else if(tasto.hasClass('btn-primary')){
            $(nome_pulsante_like).removeClass('btn-primary');
            $(nome_pulsante_like).addClass('btn-secondary');
        }
    }
/* input commenti  CAMBIARE NOME */
    input_comment(user_id,text_id,int){
        var user = $(user_id).val();
        var comment = $(text_id).val();
        if(user == ""){
            user = "Anonimo";
        }
        if(comment == ""){
        }else{
            var testo_sopra = "<b>"+ user + "</b> scrive:";
            var nuovoDiv = $('<div class="containers commento rounded"><p class="comm_up_text text-break">' + testo_sopra +'</p><p class="comm_low_text text-break">' + comment + ' </p></div>');
            nuovoDiv.appendTo("#commenti" + int);
            $(text_id).val("");
        }
    }
    /* modale */
    clean_modal(){
        $("#user_in_modal").val("");
        $("#categoria_in_modal").val("");
        $("#title_in_modal").val("");
        $("#text_in_modal").val("");
    }
    Create_article_with_modal(id_modal_text,id_modal_user,id_modal_tags,id_modal_title,id_modal_check_Featured,id_modal_check_Public){
        var testo = $(id_modal_text).val();
        if(testo==""){

        }else{
            var user = $(id_modal_user).val();
            var title = $(id_modal_title).val();
            var tags = $(id_modal_tags).val();
            if(user == ""){
                user = "<strong>Anonimo</strong>";
            }
            if(title == ""){
                title = "Senza Titolo";
            }
            if(tags == ""){
                tags = "ALL";
            }
            var tag_ = this.tags_to_array(tags);

            var articolo = new Articolo(tag_,title,testo,user);
            /** */
            if($(id_modal_check_Featured).prop("checked") == true){
                articolo.featured = true;
            }
            if($(id_modal_check_Public).prop("checked")  == false){
                articolo.public = false;
            }

            this.add_Article_to_Array(articolo);
            this.aggiorna_articoli();
            this.clean_modal();
            $("#Modal_add_article").modal("hide");
        }
    }
    /* funzioni sugli articoli*/
    genera_html_Articolo(articolo){/* il'articolo va aggiunto PRIMA di generarne altri, consiglio di usare SOLO dentro appendi_Articolo() */
        
        var numero_art = $(".box_titolo_e_articolo").length;   /* aggiustare con funzione che cerca primo num libero */
        var nome_pulsante = "like_button" + numero_art;
        console.log(nome_pulsante);
        var id_comment_text_in = "#text_in" + numero_art;
        var id_comment_user_in = "#user_in" + numero_art;
        var featured = "";
        var draft = "";
        if(articolo.featured == true){
            featured = "featured ";
        }
        if(articolo.public == false){
            draft = "draft ";
        }
        var tagstring;
        if(Array.isArray(articolo.tag)){
            tagstring = this.article_tags_to_string(articolo);
        }else{
            tagstring = articolo.tag;
        }
        var testo_completo = $('<div id="_box'+ numero_art +'" class= "col-12 col-lg-4"><div class="big_box rounded '+ featured + draft + '"><div class="box_titolo_e_articolo"><header><h2><b>' + tagstring + '</b></h2></header><header><h1><em>'+ articolo.titolo +'</em></h1></header><p class="testo_articolo">' + articolo.testo + '</p></div><div class="row" style="width: 100%; margin-left: auto; margin-right: auto;"><footer class="col-9"><p class="text-truncate"><b>Articolo scritto da:</b>'+ articolo.autore +'</p></footer> <div class="like_div col-3"><button id="' + nome_pulsante +'" type="button" class="btn btn-secondary like_button float-right" onclick="controllore.like('+ nome_pulsante +')" data-toggle="button">Like</button></div><div id="commenti' + numero_art +'"></div><div  class="input-group mb-3"><input id="'+ id_comment_user_in + '" type="text" class="form-control" placeholder="Il tuo NickName"><div class="input-group-append"><button class="btn btn-outline-secondary bottoni_input" type="button" id="button-comment'+ numero_art +'" onclick="input_comment('+ '"' + id_comment_user_in + '"' +','+ '"' +id_comment_text_in + '"' + ',' + numero_art +')">Invia</button></div></div><div  class="input-group"><textarea id="' + id_comment_text_in + '" class="form-control" aria-label="With textarea" placeholder="Commenta..."></textarea></div></div></div>');
        
        return testo_completo;
    }

    add_Article_to_Array(article){
        array_Articoli[array_Articoli.length] = new Articolo(article.tags,article.titolo,article.testo,article.autore);
    }

    appendi_Articolo(articolo){
        this.genera_html_Articolo(articolo).prependTo($("#row_container"));
    }
    DeleteArticle_from_page(int){
        $("#_box" + int).detach();
    }
    article_tags_to_string(articolo){
        
        var tag_string = "";
        for(var i = 0;i<articolo.tag.length;i++){
            var s = articolo.tag[i].charAt(0).toUpperCase() + articolo.tag[i].slice(1);
            tag_string += s + " ";
        }
        return tag_string;
    }
    tags_to_array(tags){
        var array_t = [];
        var array = tags.split(" ");
        if(Array.isArray(array)){
            array_t = array;
        }else{
            array_t.push(array);
        }
        return array_t;
    }

    aggiorna_articoli(){
        var articolo_temp;
        for(var i = 0; i<array_Articoli.length;i++){
            articolo_temp = array_Articoli[i];
            this.DeleteArticle_from_page(i);
            array_Articoli[i] = articolo_temp;
        }
        for(var i = 0; i<array_Articoli.length;i++){
            this.appendi_Articolo(array_Articoli[i]);
        }
    }

    /* "https://api.npoint.io/24620ef625c768a4f3c4" */
    get_array_from(url){
        var that = this;
        var options = {url: url, success: function(data, a, b){
            console.log(that);
            console.log("data",data);
            for(var i = 0;i<data.length;i++){
                array_Articoli.push(that.transform_array(data[i]));
            }
            console.log(array_Articoli);
            that.aggiorna_articoli();
        }};
        $.getJSON(options);
    }


    transform_array(backArticle){
        var testo = backArticle.body;
        var titolo = backArticle.title;
        var tags = backArticle.tag;
        var pubblico = backArticle.public;
        var preferito = backArticle.featured;
    
        var articolo = new Articolo(tags,titolo,testo,"<strong>Anonimo</strong>");
        articolo.public = pubblico;
        articolo.featured = preferito;
        return articolo;
    }


}