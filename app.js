const { lstat } = require('fs');
let process = require('process');
const { buscarJson } = require('./tareas');
let comando = process.argv[2];

let moduloTareas = require('./tareas'); //ya es un modulo y no el .js

switch(comando){    
    case 'listar' :
        let productos = moduloTareas.leerJson();
    if(productos.length === 0){
        console.log('Error, no hay datos...');
    }else{
        for(let i = 0; i<productos.length;i++){
            console.log('-----------------------------------------------------------');
            console.log('nombre: '+ productos[i].name + ' | precio : '+ productos[i].price );
        }
    };break;
    case 'agregar' : 
        let nombre = process.argv[3];
        let precio = process.argv[4];
   let producto = moduloTareas.agregarJson(nombre,precio);
    console.log(producto);break;
    case 'filtrar':
        let desdePrecio = process.argv[3];
        let hastaPrecio = process.argv[4];
        let preciosFiltrados = moduloTareas.filtrarJson(desdePrecio,hastaPrecio);
        for(let p in preciosFiltrados){
            console.log('Nombre:  '+ preciosFiltrados[p].name +' precio: ' + preciosFiltrados[p].price );
        };break;
    case 'modificar':
        let idIngresado = process.argv[3];
        let nuevoPrecio = Number(process.argv[4]);
        let modificado = moduloTareas.cambiarPrecio(idIngresado,nuevoPrecio);
      
       for(let cadaElemento in modificado){
            if(modificado[cadaElemento].id == idIngresado){
               console.log('MODIFICADO : nombre : ' + modificado[cadaElemento].name + ', precio modificado :'+modificado[cadaElemento].price);
            }
        };break;
    case 'buscar' : 
        let nombresBusc = process.argv[3];
        let palabraDevuelta = moduloTareas.buscarJson(nombresBusc);
         palabraDevuelta.forEach(element => {
            console.log('id: '+ element.id + ' - nombre: '+element.name+ ' - precio: '+element.price);
        });break;
    case 'eliminar' :
        let idEliminar = process.argv[3];
        let eliminado = moduloTareas.eliminarJson(idEliminar);

        console.log('Se elimino el id n° '+ eliminado)
        
}