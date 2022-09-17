import {useState, useEffect, useRef} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity,TextInput } from 'react-native';

export default function App() {
  const [dni, setDni] = useState('');
  const [nombre, setNombre] = useState('');
  const [asig, setAsig] = useState('');
  const [nota1, setNota1] = useState('');
  const [nota2, setNota2] = useState('');
  const [nota3, setNota3] = useState('');
  const [notas,setNotas] = useState([]);
  const [definitiva, setDefinitiva] = useState('');
  const [observ, setObserv] = useState('');
  // Referencias a elementos
  let refdni = useRef()

  const guardar = () => {
    //Agregar datos al array a través del método setNotas para el array notas
    setNotas(misnotas => [...misnotas,{dni:dni,nombre:nombre,asig:asig,nota1:nota1,nota2:nota2,nota3:nota3,definitiva:definitiva,observ:observ}] );
    setDni('');
    setNombre('');
    setAsig('');
    setNota1('');
    setNota2('');
    setNota3('');
    setDefinitiva('');
    setObserv('');
    refdni.current.focus();

  }
  const calcular=()=>{
    //se calculan valores
    let nota1c=misnotas[nota1]
    console.log(nota1c)
  }

  const limpiar = () => {
    //limpiar el array
    setNotas(misnotas => [misnotas,{}] );
    //console.log(notas);
    setDni('')
    setNombre('')
    setAsig('')
    setNota1('')
    setNota2('')
    setNota3('')
    setDefinitiva('')
    setObserv('')
  }
  
  let buscar = (nombuscar) =>{
    let dnic = notas.find(not => not.dni == dni);
    if (dnic != undefined){
      setNombre(dnic.nombre);
      setAsig(dnic.asig)
      setNota1(dnic.nota1);
      setNota2(dnic.nota2);
      setNota3(dnic.nota3);
      setDefinitiva(dnic.definitiva)
      setObserv(dnic.observ)
    }
    else{
      alert("Identificaicon no hallada");
    }
  }
  return (
    <View style={styles.container}>
      <Text>Calculando Notas</Text>
      <StatusBar style="auto" />
      <View style={{margin:5, height:'auto', width:300}}>
        <TextInput
          placeholder='Identificacion'      
          onChangeText={dni => setDni(dni)}
          value={dni}
          ref={refdni}
        />

        <TextInput
          placeholder='Nombre'      
          onChangeText={nombre => setNombre(nombre)}
          value={nombre}
        />
        <TextInput
          placeholder='Asignatura'      
          onChangeText={asig => setAsig(asig)}
          value={asig}
        />

        <TextInput
          placeholder='Nota 1'      
          onChangeText={nota1 => setNota1(nota1)}
          value={nota1}
        /> 
        <TextInput
          placeholder='Nota 2'      
          onChangeText={nota2 => setNota2(nota2)}
          value={nota2}
        />
        <TextInput
          placeholder='Nota 3'      
          onChangeText={nota3 => setNota3(nota3)}
          value={nota3}
        />
        <TextInput
          placeholder='Definitiva'      
          onChangeText={def => setDefinitiva(def)}
          value={definitiva}
        />
        <TextInput
          placeholder='Observacion'      
          onChangeText={obv => setObserv(obv)}
          value={observ}
        />
      </View>
      {/* botones */}
      <View style={{flexDirection: 'row'}}>
        {/* Calcular */}
        <TouchableOpacity
          onPress={calcular}
          style={botones.boton}
        >
            <Text style={{color:'white', padding:5}}>Calcular</Text>
        </TouchableOpacity>

        {/* Guardar */}
        <TouchableOpacity
          onPress={guardar}
          style={botones.boton}
        >
            <Text style={{color:'white', padding:5}}>Guardar</Text>
        </TouchableOpacity>

        {/* BUSCAR */}
        <br></br>
        <TouchableOpacity
          onPress={buscar}
          style={botones.boton}
        >
            <Text style={{color:'white', padding:5}}>Buscar</Text>
        </TouchableOpacity>
        
        {/* Limpiar */}
        <br></br>
        <TouchableOpacity
          onPress={limpiar}
          style={botones.boton}
        >
            <Text style={{color:'white', padding:5}}>Limpiar</Text>
        </TouchableOpacity>

        {/* Mostrar info 
        <Text>{'\n'}</Text>
        <View>
        {
            notas.map(not => {
              return (
                <View style={{flex:1, flexDirection:'row',flexWrap:'wrap'}}>
                  <Text style={{marginRight:10}}>{not.nombre}</Text>
                  <Text>{new Intl.NumberFormat('es-CO').format(not.nota)}</Text>
                </View>
              );
            })
          }
        </View>*/}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column', 
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
     
  },
});

const botones= StyleSheet.create({
  boton: {
    backgroundColor:'green', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:5, 
    width:80, 
    margin: 2
  }
})
