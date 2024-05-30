//VARIABLES
const tablaMatricula = document.querySelector('#tabla')
const formulario = document.querySelector('#buscarMatricula')
const listaErrores = document.querySelector('#listaErrores')
const regExp = /^([A-Z]{0,1}|([A-Z]-){0,1})\d{4}-[A-Z]{1,3}$/
let arrayFinal = []

const arrayCoches = [
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
const arrayMultas = [
    {
        matricula: '7171-SOY',
        multas: ['Multa por exceso de velocidad', 'Multa por sexy']
    },
    {
        matricula: '6712-UNA',
        multas: ['Multa por gritar a Stephani']
    },
    {
        matricula: '0008-MIE',
        multas: ['Multa por robar', 'Multa por incendio', 'Multa por venta de drogas', 'Multa por matar a Ash']
    },
    {
        matricula: '3672-RDA',
        multas: []
    }
]

//EVENTOS

formulario.addEventListener("submit", (ev) => {
    ev.preventDefault()
    listaErrores.innerHTML='';
    getInfoMultado()
})




//FUNCIONES

const validarMatricula = async () =>{
    const matricula = document.querySelector("#ingresoMatricula").value        
    if(regExp.test(matricula)) return matricula
        else throw listaErrores.innerHTML = 'Formato de matrícula incorecto.'
}

// Funcion validarCoche
const validarCoche = async(matricula) => {
    let cocheValidado = arrayCoches.find((elemento) => elemento.matricula === matricula);
    let arrayFinal = {...cocheValidado}
    if(cocheValidado) return arrayFinal
    else throw listaErrores.innerHTML = 'Este coche no esta registrado.'
}

// Función validarMultas
const validarMultas = async(arrayFinal) => {
    const multaValidada = arrayMultas.find((elemento) => elemento.matricula === arrayFinal.matricula);
    if(multaValidada) {
        arrayFinal.multas = multaValidada.multas.length;
        return arrayFinal
    }
    else throw listaErrores.innerHTML = `El coche con matricula ${arrayFinal.matricula} no tiene multas`
};
// Función pintarMultas
const pintarMultas = (arrayFinal => {
    const trBody = document.createElement('tr');
    const tdMatricula = document.createElement('td');
    const tdModelo = document.createElement('td');
    const tdPropietario = document.createElement('td');
    const tdMultas = document.createElement('td');
    tdMatricula.textContent = arrayFinal.matricula;
    tdModelo.textContent = arrayFinal.modelo;
    tdPropietario.textContent = arrayFinal.propietario;
    tdMultas.textContent = arrayFinal.multas;
    trBody.append(tdMatricula, tdModelo, tdPropietario, tdMultas);
    tablaMatricula.append(trBody);
});
// Función madre
const getInfoMultado=async()=>{
    try{
      const matricula = await validarMatricula();
      const arrayFinal = await validarCoche(matricula);
      const arrayFinal2 = await validarMultas(arrayFinal);
      pintarMultas(arrayFinal2);
    }catch(error){
    error
    }
};