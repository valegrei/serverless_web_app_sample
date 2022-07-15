function main(params) {
    if (!params.id || !params.rev) {
        return Promise.reject({ error: 'Especifique id y rev'});      
    }       
    return {
        docid: params.id,
        docrev: params.rev
    };
}