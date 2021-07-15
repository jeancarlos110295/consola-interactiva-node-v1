require('colors')
console.clear()

//const { mostrarMenu , pausa } = require('./helpers/mensajes.js')
const { inquerirMenu , pausa , leerInput , listadoTareasBorrar , confirmar , listadoCheckList} = require('./helpers/inquirer.js')
const { guardarDB , leerDB } = require('./helpers/guardarArchivo.js')

//const Tarea = require('./models/tarea.js')
const Tareas = require('./models/tareas.js')

const main = async() => {
    let opt = ''

    const instTareas = new Tareas()

    const tareasDB = leerDB()

    if( tareasDB ){
        instTareas.cargarTareasFromArray(tareasDB)
    }
    
    do {        
        opt = await inquerirMenu()
        //console.log(opt)

        switch(opt){
            case '1':
                const desc = await leerInput('Descripción: ')
                instTareas.store( desc )
            break;

            case '2':
                instTareas.listadoTareas( opt )
            break;

            case '3':
                instTareas.listadoTareas( opt )
            break;

            case '4':
                instTareas.listadoTareas( opt )
            break;

            case '5':
                const ids = await listadoCheckList( instTareas.listadoArr )

                instTareas.toggleCompletadas( ids )
            break;

            case '6':
                const id = await listadoTareasBorrar( instTareas.listadoArr )

                if(id !== '0'){
                    const confirmarOk = await confirmar('¿Está seguro?')
    
                    if(confirmarOk){
                        instTareas.borrarTarea( id )
    
                        console.log( 'Tarea borrada' )
                    }
                }
            break;
        }

        guardarDB( instTareas.listadoArr )

        await pausa()

    } while( opt !== '0')
}

main()