//IR DEL HOME AL TABLERO: 

$('.level').on('click', function () {
    var valorNombre = $('input').val()
    if (valorNombre == '') {
        $('#cartel').removeClass('hidden')
    console.log(1)
    } else {
        $('#table').removeClass('hidden')
        $(this).parent().addClass('hidden')
        $('#value').append(valorNombre)
        $('#tries').append('18')
        $('#levelRequired').append('Fácil')
    }
})

//MOSTRAR LAS IMAGENES + RANDOM
const imagenes = [
    'img/alce.jpg',
    'img/alce.jpg',
    'img/epelante.jpg',
    'img/epelante.jpg',
    'img/nena.jpg',
    'img/nena.jpg',
    'img/peces.jpg',
    'img/peces.jpg',
    'img/unichancho.jpg',
    'img/unichancho.jpg',
    'img/zapas.jpg',
    'img/zapas.jpg'
]

const desordenado = mix(imagenes)
 
//asignar un valor a data-img
for (var i = 1; i <= desordenado.length ; i++) {
    $('#img-'+ i).attr('data-img', desordenado[i-1])
}
//random
function mix(x) {
    for (let i = x.length - 1; i > 0; i--) {
        const y = Math.floor(Math.random() * (i + 1));
        [x[i], x[y]] = [x[y], x[i]];
    }
    return x;
}

$('img').on('click', function (m) {
    const imgId = m.target.id
    const id = $('#' + imgId).attr('data-id')
    $('#' + imgId).attr('src', desordenado[id - 1])
    setTimeout (function() {
    console.log(123)        
    }, 3000);
})



//COMPARACIÓN DE IMAGENES:
// IF 
// PRIMER CLICK = { URL & ID}

var clicks = 0; 
// xq para comparar algo 
// (tenemos que comparar 1 carta con una 2da carta, hay que hacer 2 clicks y despues volver al momento cero)
var primerClick
var segundoClick
var tries = 0;
var same = 0;

$('img').on('click', function () {
    clicks = clicks + 1 
    // (hay que sumar 1 a los clicks, sumarle un valor a esa variable)
    if (clicks == 1) {
        var id = $(this).attr('id');
        var img = $(this).attr('data-img');
        primerClick = {
            id: id,
            img: img
            // id: $(this).attr('id'),
            // img: $(this).attr('data-img')
        } 
        $('#' + primerClick.id).addClass("pointer")
        // console.log("primer click" + primerClick.id, primerClick.img)
        
    } else if (clicks == 2) {
        var id2 = $(this).attr('id');
        var img2 = $(this).attr('data-img');
        tries = tries + 1;
        $('#effort').html(tries)
            segundoClick = {
                // id: $(this).attr('id'),
                // img: $(this).attr('data-img')
                id: id2,
                img: img2
            }
        $('#'+segundoClick.id).addClass("pointer")

        // console.log("segundo click" + segundoClick.id, segundoClick.img)
        if (primerClick.img == segundoClick.img && (primerClick.id != segundoClick.id)) {
            same = same + 1
            $('#' + primerClick.id).addClass('idem')
            $('#' + segundoClick.id).addClass('idem')

            $('.idem').unbind();
            console.log('iguales')
        } else {
            //SE PONE # PORQUE LLAMO AL ID DEL OBJETO DE LA VARIABLE
            setTimeout (function() {
                var that = this
                $('#'+ primerClick.id).attr('src',"img/tapada.jpg")
                $('#'+ segundoClick.id).attr('src', 'img/tapada.jpg')
                $(that).children().attr('src', "img/tapada.jpg")
            }, 2000)
            $('#'+primerClick.id).removeClass("pointer")
            $('#'+segundoClick.id).removeClass("pointer")
            console.log('distintas')
        }
        // comparacion: porque hay que volver a darlas vuelta para volver a empezar
        clicks = 0

        //CONTADOR TIENE QUE TENER SEIS PARES IGUALES PARA QUE GANES: .READY() PARA QUE SE EJECUTE LA FUNCION DESPUES DE QUE EL DOM DSE HAYA EJECUTADO, O SEA LOS DOS CLICKS?

        if (same === 6) {
            $('.final').removeClass('hidden');
            $('#table').addClass('hidden');
        }

    } 
})

//INTENTOS:
//variable intento fuera de todo = 0; llamo a esa variable if clicks es 2 veces, entonces sumo un intento
//