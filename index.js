require('dotenv').config()

const {leerInput, inquirerMenu, pausa, listarLugares} = require('./helpers/inquire')
const Busqueda = require('./models/busqueda')


const main = async() =>{
    let opt;
    const busqueda = new Busqueda();
    

do {
    opt = await inquirerMenu();

    switch (opt) {
        case 1:
        //Mostrar mensaje
        
        //Buscar lugar de bus
        const search = await leerInput("Ciudad: ")
        const lugares= await busqueda.ciudad(search)
        
        
        //Selecionar lugar de bus
        
        const lugarSelected= await listarLugares(lugares)
        const nombreLugar= lugares.find(l => l.id === lugarSelected)
        

        console.log('\n Informacion del lugar: ')
        console.log(`Nombre: `, nombreLugar.name)
        console.log(`Latitud: `, nombreLugar.lat)
        console.log(`Longitud: `, nombreLugar.lng)

        //Clima
        const clima = await busqueda.climaLugar(nombreLugar.lat, nombreLugar.lng);
        //Mostrar resultados de

            break;
    
    }


    await pausa()

} while (opt !== 0);

}

main()