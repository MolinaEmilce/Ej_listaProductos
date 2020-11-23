let fs = require('fs');

module.exports = moduloProductos = {
    leerJson : function(){
        let listaDeProductos = fs.readFileSync('./productos.json','utf-8'); //lectura de json
        let productos = JSON.parse(listaDeProductos); //devuelve en objetos el json 
        return productos;
    },
    agregarJson : function(nombreProducto,precioProducto){
        let listaDeProductos = this.leerJson(); //traemos el objeto literal 
        let lastId = 1; //3
        
        //map : recorre lista de producctos,por cada uno de cada objeto itera y aplica lo que hay dentro del bloque de codigo
        listaDeProductos.map(function(productos){
            if(productos.id > lastId){
                //es como :   1 = 1, es decir que se cambia los valores
                lastId = productos.id;
            }
        });

        // el lastid ahora cambia su valor al ultimo id con numero
     //es como un else--- CREA EL OBJETO LITERAL
     // aca estamos trayendo los datos comunes y actuales del elemento del objeto literal
        let Producto = function(id,name,price){
            this.id = id,
            this.name =name,
            this.price = price
           
        }

          //TERMINA DE CREAR EL OBJETO     //3
        let nuevoProducto = new Producto(lastId + 1,nombreProducto,precioProducto);
        listaDeProductos.push(nuevoProducto);

        let productoActualizado = JSON.stringify(listaDeProductos);
        fs.writeFileSync('./productos.json',productoActualizado,'utf-8');
        return 'Se ha agregado correctamente';
    },
    filtrarJson : function(precioMin,precioMax){
        let listaDeProductos = this.leerJson();
        let listaFiltrada = listaDeProductos.filter(function(cadaProducto){
             return cadaProducto.price >= precioMin && cadaProducto.price <= precioMax; }); //trae todos los objetos que cumplen con la funcion
            return listaFiltrada;
    },
    cambiarPrecio : function(id, nuevoPrecio){
        let listaDeProductos = this.leerJson();
        //trae lo que se cumplio
        let productoAModificar = listaDeProductos.filter(function(cadaProducto){
            if(cadaProducto.id == id){
             cadaProducto.price = nuevoPrecio;
            };
            //es decir me va a retornar toda la lista agregando el producto ya modificado
        return listaDeProductos;
        });
        
        let productoModificado = JSON.stringify(productoAModificar);
        fs.writeFileSync('./productos.json',productoModificado,'utf-8');
        return productoAModificar;
       
    },
    eliminarJson : function(id){
        let listaDeProductos = this.leerJson();
        let idBorrado = 0;
        let quitarProducto = listaDeProductos.filter(function(cadaProducto){ //retorna  los productos que sean distintos al id del parametro, es decir nos va mostrar todos los que no cumplan con el id, otra forma de "eliminar"
             idBorrado = id;    
        return cadaProducto.id !== id;
        });
        let nuevaLista = JSON.stringify(quitarProducto);
        fs.writeFileSync('./productos.json',nuevaLista,'utf-8');
        return idBorrado;
    },
    buscarJson : function(busqueda){
        let listaDeProductos = this.leerJson();
        let productoBuscado =  listaDeProductos.filter(function(cadaElemento){
            return cadaElemento.name.toLowerCase().includes(busqueda.toLowerCase());
        });
        return productoBuscado;
    } 
}