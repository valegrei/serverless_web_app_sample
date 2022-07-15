function main(params) {
    if (!params.id || !params.rev ||!params.nombre || !params.descripcion || !params.fotoUrl){
        return Promise.reject({ error: 'Faltan id, rev, nombre, descripcion o url de foto'});    
    }
	return {
	    doc:{
	        _id: params.id,
	        _rev: params.rev,
	        fecha : new Date(),
	        nombre: params.nombre,
	        descripcion: params.descripcion,
	        fotoUrl: params.fotoUrl
	    }
	};
}
