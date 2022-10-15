import {useState, useEffect, useRef} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity,TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { color, fontStyle, textAlign } from '@mui/system';

export default function App() {

  //
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { dni:'', nombre:'', asig:'', nota1:'',nota2:'',nota3:'' }
  })
  //
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

  const onSubmit = () => {
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
      console.log(notas)
  }

  const calcular = (def) => {
    //se calculan valores
    let notap = nota1 * 0.3 + nota2 * 0.35 + nota3 * 0.35;
    def = notap;
    setDefinitiva(def);

    if (def >= 3) {
      setObserv("Aprobo");
    } else if (def == 2 && 2.94) {
      setObserv("Habilitado");
    } else {
      setObserv("Desaprobo");
    }
  };

  const limpiar = () => {
    //limpiar el array
    setNotas((misnotas) => [misnotas,{}] );
    //console.log(notas);
    setDni("");
    setNombre("");
    setAsig('');
    setNota1("");
    setNota2("");
    setNota3("");
    setDefinitiva("");
    setObserv("");

  }
  
  const buscar = () =>{
    let dnic = notas.find((not)=> not.dni == dni);
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
    <View style={[styles.container]}>
      <StatusBar style="auto" />
      <View style={{ margin: 5, height: "auto", width: 300 , backgroundColor:'#2F7568', borderRadius: 10, padding:10}}>
      <Text style={styles.Text}>Calculando Notas</Text>
        
        {/* control del DNI */}
        <Controller control={control}
          rules={{
            required: true, pattern: /^[0-9]+$/g, maxLength:10, minLength: 5
          }}

          render={({ field: { onChange, onBlur } }) => (
            <TextInput
              style={[styles.inpust, {
                borderColor: errors.dni?.type == "required" || errors.dni?.type == "pattern" || errors.dni?.type
                  == "maxLength" || errors.dni?.type == "minLength" ? 'red' : '#11A88C'
              }]}
              placeholder="Identificacion"
              onChangeText={(dni) => setDni(dni)}
              onChange={onChange}
              onBlur={onBlur}
              value={dni}
              keyboardType="numeric"
              ref={refdni}
            />

          )}
          name="dni"
        />
        {errors.dni?.type == "required" && <Text style={{ color: 'red' }}> El DNI/Identificacion es obligatoria</Text>}
        {errors.dni?.type == "maxLength" && <Text style={{ color: 'red' }}> El DNI no puede exceder 10 caracteres</Text>}
        {errors.dni?.type == "minLength" && <Text style={{ color: 'red' }}> El DNI minimo 5 caracteres</Text>}
        {errors.dni?.type == "pattern" && <Text style={{ color: 'red' }}> El DNI solo con Numeros</Text>}

        {/* control del nombre */}
        <Controller control={control}
          rules={{
            required: true, pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g, maxLength:30, minLength: 3
          }}
          render={({field:{onChange, onBlur}})=>(
            
            <TextInput
              style={[styles.inpust, {
                borderColor: errors.nombre?.type == "required" || errors.nombre?.type == "pattern" || errors.nombre?.type
                  == "maxLength" || errors.nombre?.type == "minLength" ? 'red' : '#11A88C' }]}

              placeholder="Nombre"
              onChangeText={(nombre) => setNombre(nombre)}
              onChange={onChange}
              onBlur={onBlur}
              value={nombre}
            />
          )}
          name="nombre"

        />
        {errors.nombre?.type == "required" && <Text style={{ color: 'red' }}> El nombre es obligatorio</Text>}
        {errors.nombre?.type == "maxLength" && <Text style={{ color: 'red' }}> El nombre no puede exceder 30 caracteres</Text>}
        {errors.nombre?.type == "minLength" && <Text style={{ color: 'red' }}>El nombre minimo 3 caracteres</Text>}
        {errors.nombre?.type == "pattern" && <Text style={{ color: 'red' }}> El nombre solo con letras y espacios</Text>}

        {/* control del nombre FIN*/}

        <TextInput
          style={[styles.inpust]}
          placeholder="Asignatura"
          onChangeText={(asig) => setAsig(asig)}
          value={asig}
        />


        <Controller control={control}
          rules={{ required: true, pattern: /^[0-5]+$/g }}
          render={({field:{onChange, onBlur }})=>(

            <TextInput
              style={[styles.inpust, {borderColor: errors.nota1?.type=="required" || errors.nota1?.type == "pattern"? 'red' : '#11A88C'}]}
              placeholder="Nota 1"
              onChangeText={(nota1) => setNota1(nota1)}
              onChange={onChange}
              onBlur={onBlur}
              value={nota1}
              maxLength={1}
              minLength={1}
            />

          )}
          name="nota1"
        />
        {errors.nota1?.type == "required" && <Text style={{ color: 'red' }}> El Nota 1 es obligatoria</Text>}
        {errors.nota1?.type == "pattern" && <Text style={{ color: 'red' }}>Nota Maxima es 5, Solo numeros.</Text>}


        <Controller control={control}
          rules={{ required: true, pattern: /^[0-5]+$/g }}
          render={({field:{onChange, onBlur}})=>(
            <TextInput
              style={[styles.inpust, {borderColor: errors.nota1?.type=="required" || errors.nota2?.type == "pattern"? 'red' : '#11A88C'}]}
              placeholder="Nota 2"
              onChangeText={(nota2) => setNota2(nota2)}
              onChange={onChange}
              onBlur={onBlur}
              value={nota2}
              maxLength = {1} 
              minLength = {1}
            />
          )}
          name="nota2"
        />
        {errors.nota2?.type == "required" && <Text style={{ color: 'red' }}> El Nota 2 es obligatoria</Text>}
        {errors.nota2?.type == "pattern" && <Text style={{ color: 'red' }}>Nota Maxima es 5, Solo numeros.</Text>}


        <Controller control={control}
          rules={{ required: true, pattern: /^[0-5]+$/g }}
          render={({field:{onChange, onBlur}})=>(

            <TextInput
              style={[styles.inpust, {borderColor: errors.nota1?.type=="required" || errors.nota3?.type == "pattern" ? 'red' : '#11A88C'}]}
              placeholder="Nota 3"
              onChangeText={(nota3) => setNota3(nota3)}
              onChange={onChange}
              onBlur={onBlur}
              value={nota3}
              maxLength={1}
              minLength={1}
            />
          )}
          name="nota3"
        />
        {errors.nota3?.type == "required" && <Text style={{ color: 'red' }}> El Nota 3 es obligatoria</Text>}
        {errors.nota3?.type == "pattern" && <Text style={{ color: 'red' }}> Nota Maxima es 5, Solo numeros.</Text>}




        <TextInput
          style={[styles.inpust]}
          placeholder="Definitiva"
          onChangeText={(def) => setDefinitiva(def)}
          value={definitiva}
          editable={false}
        />
        <TextInput
          style={[styles.inpust]}
          placeholder="Observacion"
          onChangeText={(obv) => setObserv(obv)}
          value={observ}
          editable={false}
        />

      </View>
      {/* botones */}
      <View style={{ flexDirection: "row" }}>
        {/* Calcular */}
        <TouchableOpacity onPress={calcular} style={botones.boton}>
          <Text style={{ color: "white", padding: 5 }}>Calcular</Text>
        </TouchableOpacity>

        {/* Guardar */}
        <TouchableOpacity onPress={handleSubmit(onSubmit)} style={botones.boton}>
          <Text style={{ color: "white", padding: 5 }}>Guardar</Text>
        </TouchableOpacity>

        {/* BUSCAR */}
        <br></br>
        <TouchableOpacity onPress={buscar} style={botones.boton}>
          <Text style={{ color: "white", padding: 5 }}>Buscar</Text>
        </TouchableOpacity>

        {/* Limpiar */}
        <br></br>
        <TouchableOpacity onPress={limpiar} style={botones.boton}>
          <Text style={{ color: "white", padding: 5 }}>Limpiar</Text>
        </TouchableOpacity>
        
        {/*
          <br></br>
          <TouchableOpacity onPress={handleSubmit(onSubmit)} style={botones.boton}>
            <Text style={{color:"white", padding: 5}}>Validar Datos</Text>
          </TouchableOpacity>
        */}
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
  inpust: {
    padding: 10,
    borderRadius: 10,
    color: 'white',
    marginBottom: 5,
    borderWidth: 5,
    borderColor: '#11A88C'
  },
  Text:{
    justifyContent: 'center',
    textAlign: 'center',
    color: 'white',
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 30
  }
});

const botones= StyleSheet.create({
  boton: {
    backgroundColor:'green', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:5, 
    width:100, 
    margin: 2
  }
});


