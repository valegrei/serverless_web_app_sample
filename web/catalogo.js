/**
* Web application
*/
const apiUrl = 'https://change_api_url.us-south.apigw.appdomain.cloud/catalogo';

const catalogo = {
// obtiene los articulos en la bd catalogo
    get() {
        return $.ajax({
        type: 'GET',
        url: `${apiUrl}/articulos`,
        dataType: 'json'
        });
    },
    // agrega un nuevo articulo
    add(nombre, descripcion, fotoUrl) {
        console.log('Enviando', nombre, descripcion, fotoUrl)
        return $.ajax({
        type: 'POST',
        url: `${apiUrl}/articulos`,
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
            nombre,
            descripcion,
            fotoUrl,
        }),
        dataType: 'json',
        });
    },
    // modifica un articulo
    edit(id,rev,nombre, descripcion, fotoUrl) {
        console.log('Enviando', id, rev, nombre, descripcion, fotoUrl)
        return $.ajax({
        type: 'PUT',
        url: `${apiUrl}/articulos`,
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
            id,
            rev,
            nombre,
            descripcion,
            fotoUrl,
        }),
        dataType: 'json',
        });
    },
    // elimina un articulo
    delete(id,rev) {
        console.log('Enviando', id, rev)
        return $.ajax({
        type: 'DELETE',
        url: `${apiUrl}/articulos`,
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
            id,
            rev
        }),
        dataType: 'json',
        });
    }
};

const encodeGetParams = p => 
  Object.entries(p).map(kv => kv.map(encodeURIComponent).join("=")).join("&");

let articulosTemplate;

function prepareTemplates() {
    articulosTemplate = Handlebars.compile($('#articulos-template').html());
}

// recibe los articulos y muestra en la UI
function loadArticulos() {
    console.log('Cargando Articulos...');
    $('#articulos').html('Cargando Artículos...');
    catalogo.get().done(function(result) {
    if (!result.articulos) {
        return;
    }

    const context = {
        articulos: result.articulos
    }
    $('#articulos').html(articulosTemplate(context));
    }).error(function(error) {
    $('#articulos').html('No hay artículos.');
        console.log(error);
    });
}

function configurarCatalogo() {
    $(document).ready(function() {
        prepareTemplates();
        loadArticulos();
    });
}

function configurarNuevo(){
    // intercepta el click en el submit form
    // redirige a catalogo
    $(document).on('submit', '#addArticulo', function(e) {
        e.preventDefault();

        catalogo.add(
            $('#nombre').val().trim(),
            $('#descripcion').val().trim(),
            $('#fotoUrl').val().trim()
        ).done(function(result) {
            // redirige a catalogo
            window.location.replace('administrar.html#')
        }).error(function(error) {
            console.log(error);
        });
    });
}

function editarArticulo(id,rev,nombre,descripcion,fotoUrl) {
    params = {id: id, rev: rev, nombre: nombre, descripcion: descripcion, fotoUrl: fotoUrl};
    //console.log(params);
    window.location.replace('editar.html?'+encodeGetParams(params));
}

function configurarEdicion(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    //console.log(urlParams);

    $('#id').val(urlParams.get('id'));
    $('#rev').val(urlParams.get('rev'));
    $('#nombre').val(urlParams.get('nombre'));
    $('#descripcion').val(urlParams.get('descripcion'));
    $('#fotoUrl').val(urlParams.get('fotoUrl'));

    // intercepta el click en el submit form
    // redirige a catalogo
    $(document).on('submit', '#editArticulo', function(e) {
        e.preventDefault();

        catalogo.edit(
            $('#id').val().trim(),
            $('#rev').val().trim(),
            $('#nombre').val().trim(),
            $('#descripcion').val().trim(),
            $('#fotoUrl').val().trim()
        ).done(function(result) {
            // redirige a catalogo
            window.location.replace('administrar.html#')
        }).error(function(error) {
            console.log(error);
        });
    });
}

function eliminarArticulo(id,rev){
    catalogo.delete(
        id,
        rev
    ).done(function(result) {
        // redirige a catalogo
        loadArticulos();
    }).error(function(error) {
        console.log(error);
    });
}