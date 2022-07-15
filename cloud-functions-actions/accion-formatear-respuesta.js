function main(params) {
    return {
      articulos: params.rows.map((row) => { return {
          id: row.doc._id,
          rev: row.doc._rev,
          nombre: row.doc.nombre,          
          descripcion: row.doc.descripcion,          
          fotoUrl: row.doc.fotoUrl,          
          fecha: row.doc.fecha
      }})
    };
  }