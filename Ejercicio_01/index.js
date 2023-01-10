// Importar nuestras dependencias
import mongoose from 'mongoose'

// Definimos una constante 
const estudiantes = [
    { nombre: 'Pedro', apellido: 'Mei', edad: 21, dni: '55555555', curso: 'Backend', nota: 10 },
    { nombre: 'Pedro', apellido: 'Mei', edad: 21, dni: '55555555', curso: 'Backend', nota: 10 },
    { nombre: 'Pedro', apellido: 'Mei', edad: 21, dni: '55555555', curso: 'Backend', nota: 10 },
    { nombre: 'Pedro', apellido: 'Mei', edad: 21, dni: '55555555', curso: 'Backend', nota: 10 },
    { nombre: 'Pedro', apellido: 'Mei', edad: 21, dni: '55555555', curso: 'Backend', nota: 10 },
    // Descomentar la linea de abajo para probar errores
    // { nombre: 'Pedro', dni: '55555555', curso: 'Backend', nota: 10 },
]

// Definir el esquema de los datos y del modelo para interactuar con la base de datos (leer, escribir, etc)
const estudianteSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    edad: { type: Number, required: true},
    dni: {type: String, required: true, unique: true},
    curso: {type: String, required: true },
    nota: { type: Number, required: true },
})

const EstudiantesDAO = mongoose.model('estudiantes', estudianteSchema) // Asi de simple creamos el modelo

/* ------------------------------------------------------------------ */
/*               Conexión a la base de datos : colegio                */
/* ------------------------------------------------------------------ */

await mongoose.connect('mongodb://127.0.0.1:27017/colegio', {
    serverSelectionTimeoutMS: 5000,
})
console.log('Base de datos conectada')

// Escritura a la base de datos
const inserciones = []

for (const estudiante of estudiantes){
    inserciones.push(EstudiantesDAO.create(estudiante))
}

const result = await Promise.allSettled(inserciones)
const rejected = result.filter(r => r.status == 'rejected')
if (rejected.length > 0){
    console.log('Cantidad de fallos: ' + rejected.length)
} else {
    console.log("Todo OK!")
}

await mongoose.disconnect()