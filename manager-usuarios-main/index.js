const fs = require('fs');
class ManagerUsuarios {
  usuarios = [];

  async crearUnUsuario(nombre, apellido, edad, curso) {
    this.usuarios.push({ nombre, apellido, edad, curso });
    const usuariosEnString = JSON.stringify(this.usuarios, null, 2);
    await fs.promises.writeFile('usuarios.json', usuariosEnString);
  }
  async consultarLosUsuarios() {
    let usuariosEnArchivo = await fs.promises.readFile('usuarios.json', 'utf-8');
    usuariosEnArchivo = JSON.parse(usuariosEnArchivo);
    return usuariosEnArchivo;
  }

  async consultarUnUsuariosPorId(id) {
    //busco el usuario por su id
    //return del usuario
  }

  async modificarUnUsuarioPorId(id, nombre, apellido, edad, curso) {
    //busco el usuario por su id
    //modifico nombre, apellido, edad, curso PERO NO su id!!
    //persito en archivo
  }
  async borrarUnUsuarioPorId(id) {
    //busco el usuario por su id
    //borro ese usuario del array
    //persito en el archivo
  }
}

async function cosasAsincronas() {
  const usuariosManager = new ManagerUsuarios();
  await usuariosManager.crearUnUsuario('guille', 'fergnani', '40', 'backend');
  await usuariosManager.crearUnUsuario('pepa', 'pig', '10', 'como salat en un charco de lodo');
  console.log(await usuariosManager.consultarLosUsuarios());
}
cosasAsincronas();
/* 
async function cosasAsincronas() {
  if (fs.existsSync('test.txt')) {
    const contenidoInicial = await fs.promises.readFile('test.txt', 'utf-8');
    const contenidoInicialParseado = JSON.parse(contenidoInicial);

    contenidoInicialParseado.push({ nombre: 'facu' });
    contenidoInicialParseado.push({ nombre: 'gime' });
    contenidoInicialParseado.push({ nombre: 'pepa' });

    const contenidoDeNuevoEnString = JSON.stringify(contenidoInicialParseado, null, 2);
    await fs.promises.writeFile('test.txt', contenidoDeNuevoEnString);
  } else {
    console.log('como no existe lo creo');
    await fs.promises.writeFile('test.txt', '');
  }
} 

cosasAsincronas();*/

/* if (fs.existsSync("test.txt")) {
  console.log("increible!!! test.txt existe!!");
  const contenidoInicial = fs.readFileSync("test.txt", "utf-8");
  console.log(contenidoInicial);

  fs.appendFileSync("test.txt", "\n\nle agregamos algo al archivo");
} else {
  console.log("como no existe lo creo");
  fs.writeFileSync("test.txt", "");
} */
