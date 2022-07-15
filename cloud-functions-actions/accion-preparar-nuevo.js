function main(params) {
    if (!params.nombre || !params.descripcion || !params.fotoUrl){
        return Promise.reject({ error: 'Faltan nombre, descripcion o url de foto'});    
    }
	return {
	    doc:{
	        fecha : new Date(),
	        nombre: params.nombre,
	        descripcion: params.descripcion,
	        fotoUrl: params.fotoUrl
	    }
	};
}
