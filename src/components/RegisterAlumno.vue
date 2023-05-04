<script setup lang="ts">
import { useForm } from "@vorms/core";

export type FormData = {
  DNI: number | string;
  LastName: string;
  FirstName: string;
  direccion: string;
  FNacimiento: string;
};

const emit = defineEmits<{
  (event: "submit", formData: FormData): void;
}>();

const { register, errors, handleSubmit } = useForm({
  initialValues: {
    DNI: 0,
    LastName: "",
    FirstName: "",
    direccion: "",
    FNacimiento: "",
  },
  onSubmit(values) {
    emit("submit", values);
  },
});

const { value: DNI, attrs: DNIAttrs } = register("DNI", {
  validate(value) {
    if (!value) return "DNI *campo obligatorio";
    if (value.toString().length != 8) return "Debe contener 8 digitos";
    if (isNaN(value)) return "No debe contener Letras";
  },
});
const { value: LastName, attrs: LastNameAttrs } = register("LastName", {
  validate(value) {
    if (!value) return "Apellido es necesario!";
  },
});
const { value: FirstName, attrs: FirstNameAttrs } = register("FirstName", {
  validate(value) {
    if (!value) return "Nombre es Necesario!";
  },
});
const { value: direccion, attrs: direccionAttrs } = register("direccion", {
  validate(value) {
    if (!value) return "Profesion es Necesario!";
  },
});
const { value: FNacimiento, attrs: FNacimientoAttrs } = register(
  "FNacimiento",
  {
    validate(value) {
      if (!value) return "Campo Necesario!";
    },
  }
);
</script>

<template>
  <form class="form_form" @submit="handleSubmit">
    <h1 class="text-2xl mb-4">Registro de Nuevo Alumno</h1>
    <p id="comentario"></p>
    <div class="field">
      <p id="aDni">DNI</p>
      <input
        v-model="DNI"
        class="field__input"
        type="text"
        placeholder="DNI"
        v-bind="DNIAttrs"
      />
      <div v-show="'DNI' in errors" class="field__error">
        {{ errors.DNI }}
      </div>
    </div>
    <div class="field">
      <p id="aLastName">Apellidos</p>
      <input
        v-model="LastName"
        class="field__input"
        type="text"
        placeholder="Apellido"
        v-bind="LastNameAttrs"
      />
      <div v-show="'LastName' in errors" class="field__error">
        {{ errors.LastName }}
      </div>
    </div>
    <div class="field">
      <p id="aFirstName">Nombres</p>
      <input
        v-model="FirstName"
        class="field__input"
        type="text"
        placeholder="Nombres"
        v-bind="FirstNameAttrs"
      />
      <div v-show="'FirstName' in errors" class="field__error">
        {{ errors.FirstName }}
      </div>
    </div>
    <div class="field">
      <p id="aProfesion">Direccion</p>
      <input
        v-model="direccion"
        class="field__input"
        type="text"
        placeholder="direccion"
        v-bind="direccionAttrs"
      />
      <div v-show="'Profesion' in errors" class="field__error">
        {{ errors.direccion }}
      </div>
    </div>
    <div class="field">
      <p id="nacimientoText">Fecha de Nacimiento</p>
      <input
        v-model="FNacimiento"
        class="field__input"
        type="date"
        placeholder="Fecha de Nacimiento"
        v-bind="FNacimientoAttrs"
      />
      <div v-show="'FNacimiento' in errors" class="field__error">
        {{ errors.FNacimiento }}
      </div>
    </div>

    <div class="field">
      <input type="submit" value="Registrarse como Almuno" />
    </div>
  </form>
</template>

<style scooped>
.form_form {
  max-width: 50%;
  margin-left: 25%;
  background-color: lightgray;
  margin-top: 10%;
  padding: 10px;
  border-radius: 10px;
}
.form_form h1 {
  margin-left: 30%;
}
.field + .field {
  margin-top: 15px;
}

.field__input,
input[type="submit"] {
  box-sizing: border-box;
  width: 100%;
  border-radius: 4px;
  border: 1px solid white;
  padding: 4px 16px 4px 4px;
}

.field__error {
  color: red;
  margin-top: 2px;
}

.checkbox {
  display: flex;
  align-items: center;
}

.field__checkbox {
  accent-color: #41b883;
}

.field__checkbox + label {
  margin-left: 4px;
}

input[type="submit"] {
  background: #41b883;
  border: 1px solid #41b883;
  cursor: pointer;
}
</style>
