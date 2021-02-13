$(function(){
    function outputText(){
        $.ajax({
            url:'/comments',
            contentType: 'application/json',
            method: 'GET',

            statusCode:{ 
                200:(response)=>{
                    var output = $('#commentsRegistered');

                    output.html('<span id="startAppend"></p>'); // aqui começa o append dos comentarios cadastrados para serem ouvidos
                    


                    response.forEach(function(comments){
                        output.append(`<div class="card" id="postedVoices">
                                            <div class="container card-body" id="voiceCardContent">                                  
                                                <span id="`+ comments.id +`"><i> `+ comments.texto +`</i></span>
                                                    
                                                        <button class="btn btn-success btn-sm" id="Listener">
                                                            Clique aqui para escutar!
                                                        </button>
                                                                                                    
                                            </div>
                                      </div>`)
                    });
                },
                400:()=>{
                    alert('Problema ao consultar comentários registrados.');
                }
            }
        });
    };

    outputText();

    $('#Register').on('click', (event) => {
        event.preventDefault();

        var makeInput = $('#insertComment');
        if(makeInput.val().trim()){
            $.ajax({
                url: '/comments',  
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ text: makeInput.val() }),
                

                statusCode: {
                    200:() => {
                        makeInput.val('');
                        outputText();
                    },
                    401:(response) => {
                        alert('ERROR 401: Não foi possível inserir as informações');
                    }
                }
            });
        }
        else alert('Não são permitidos comentários vazios!');
    });

    $(document).on("click", "#Listener", (event)=>{
        var id = event.target.parentElement.children[0].id;
        var texto = event.target.parentElement.children[0].innerHTML;
        $.ajax({
            url: '/voice',
            contentType: 'application/json',
            method: 'POST',
            data: JSON.stringify({id:id, texto:texto}),

            statusCode:{
                200:(response)=>{
                    $('#voices').attr('src', response);
                    console.log(response);
                    $('audio').get(0).load();
                    $('audio').get(0).play();
                },
                400:()=>{
                    alert('400: Servidor não conectado.');
                }
            }
        });
    })
});