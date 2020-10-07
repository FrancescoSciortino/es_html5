class RestController{


    constructor(){        
    }



    get(url,onSuccess,onError){
        $.get({
            url: url,
            success: onSuccess
          });


    }

    post(url,data,onSuccess,onError){
        $.post({
            url: url,
            data:JSON.stringify(data),
            success: onSuccess
          });


    }

    update(url,id,dato,onSuccess,onError){
        var that = this;
        var dati;
        $.get({
            url: url,
            success: function(data,status,xhr){
                that.dati = data;
                data[id] = dato;
                $.ajax({
                    url: url,
                    type: "PUT",
                    data: JSON.stringify(data),
                    success: onSuccess
                });
            }
        });
    }


}