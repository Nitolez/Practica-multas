//VARIABLES
const tablaMatricula = document.querySelector('#tabla')
const formulario = document.querySelector('#buscarMatricula')
const listaErrores = document.querySelector('#listaErrores')
const regExp = /^([A-Z]{0,1}|([A-Z]-){0,1})\d{4}-[A-Z]{1,3}$/


const arrayConductores = [
    {
        matricula: '7171-SOY',
        modelo: 'Dibujo animado',
        propietario: 'Manuelita la Tortuga',
        multas: ['Multa por exceso de velocidad', 'Multa por sexy']
    },
    {
        matricula: '6712-UNA',
        modelo: 'Profesor',
        propietario: 'Hector el Profe',
        multas: ['Multa por gritar a Stephani']
    },
    {
        matricula: '0008-MIE',
        modelo: 'Pokemon',
        propietario: 'Pikachu',
        multas: ['Multa por robar', 'Multa por incendio', 'Multa por venta de drogas', 'Multa por matar a Ash']
    },
    {
        matricula: '3672-RDA',
        modelo: 'Una tia chulisima',
        propietario: 'Dora la Exploradora',
        multas: []
    }
]

//EVENTOS

formulario.addEventListener("submit", (ev) => {
    ev.preventDefault()
    validarMatricula()
})




//FUNCIONES

const validarMatricula = () => {

    const matriculaEscrita = document.querySelector("#ingresoMatricula").value
    let errores = '';
    let cocheEncontrado = arrayConductores.find(coche => coche.matricula === matriculaEscrita)

    if (matriculaEscrita === '') {
        errores = '<li>Escribe la matrícula</li>'
    } else if (regExp.test(matriculaEscrita) === false) {
        errores = '<li>Formato de matrícula no admitido</li>'
    } else if (!cocheEncontrado) {
        errores = '<li>No existe la matrícula</li>'
    } else if (!Array.isArray(cocheEncontrado.multas) || cocheEncontrado.multas.length === 0) {
        errores = '<li>No hay multas para este coche</li>'
    }

    if (errores !== '') {
        listaErrores.innerHTML = errores
    } else {
        listaErrores.innerHTML = '';
        agregarATabla(cocheEncontrado.matricula, cocheEncontrado.modelo, cocheEncontrado.propietario, cocheEncontrado.multas.join(', '))
    }
}

const agregarATabla = (matricula, modelo, propietario, multas) => {
    const fila = document.createElement('tr')

    const celdaMatricula = document.createElement("td")
    celdaMatricula.textContent = matricula
    fila.append(celdaMatricula)

    const celdaModelo = document.createElement("td")
    celdaModelo.textContent = modelo
    fila.append(celdaModelo)

    const celdaPropietario = document.createElement("td")
    celdaPropietario.textContent = propietario
    fila.append(celdaPropietario)

    const celdaMultas = document.createElement("td")
    celdaMultas.textContent = multas
    fila.append(celdaMultas)

    tablaMatricula.append(fila)
}