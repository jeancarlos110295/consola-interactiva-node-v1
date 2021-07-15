/**
 * _listado :
 *  {
 *      'a41ddcbc-d5e5-4753-90eb-e549bc99ebe2' : {id : 12 , desc : 'abc', completadoEn : '90999'}
 *  }
 */

const Tarea = require('./tarea.js')

class Tareas{
    _listado = {}

    constructor(){
        this._listado = {}
    }

    borrarTarea(id = ''){
        if(this._listado[id]){
            delete this._listado[id]
        }
    }

    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        });

        return listado;
    }

    cargarTareasFromArray( tareas = [] ){
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    store( desc = ''){
        const tarea = new Tarea(desc)

        this._listado[tarea.id] = tarea
    }

    viewListaTareas( opciones = {}){
        let contador = 0
        this.listadoArr.forEach( (tarea , i) => {
            const {completadoEn , desc} = tarea
            let status = (completadoEn == null) ? `Pendiente`.red : `Completada`.green

            switch(opciones.view){
                case 'all':
                    let indice = `${ (i + 1) }. `.green
                    console.log(` ${indice} ${desc} :: ${status} `)
                break;

                case 'completadas':
                    if(completadoEn != null){
                        contador++
                        let indice = `${ (contador) }. `.green
                        console.log(` ${ indice } ${desc} :: ${ completadoEn.green } `)
                    }
                break;

                case 'pendientes':
                    if(completadoEn == null){
                        contador++
                        let indice = `${ (contador) }. `.green
                        console.log(` ${ indice } ${desc} :: ${status} `)
                    }
                break;
            }
        })
    }

    listadoTareas( filtroLista = 2 ){
        switch(filtroLista){
            case "2":
                this.viewListaTareas({ view : 'all' })
            break;

            case "3":
                this.viewListaTareas({ view : 'completadas' })
            break;
            
            case "4":
                this.viewListaTareas({ view : 'pendientes' })
            break;
        }
    }

    toggleCompletadas( ids = []){
        ids.forEach( id => {
            const tarea = this._listado[id]

            if( !tarea.completadoEn ){
                tarea.completadoEn = new Date().toISOString()
            }
        })

        this.listadoArr.forEach( tarea => {
            if( !ids.includes(tarea.id) ){
                this._listado[tarea.id].completadoEn = null
            }
        })

    }
}

module.exports = Tareas