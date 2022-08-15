const helpers = {};

helpers.randomName = () => {
    const possible = 'abcdefghijklmnopqrstuvwxyz';
    let randomName = '';
    for (let i = 0 ; i < 10 ; i++){
        randomName += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return randomName;
}

helpers.randomNameArchivo = () => {
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomNameArchivo = '';
    for (let i = 0 ; i < 16 ; i++){
        randomNameArchivo += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return randomNameArchivo;
}

helpers.randomUrl = () => {
    const possible = 'abcdefghijklmnopqrstuvwxyz';
    let randomUrl = '';
    for (let i = 0 ; i < 16 ; i++){
        randomUrl += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return randomUrl;
}

module.exports = helpers;