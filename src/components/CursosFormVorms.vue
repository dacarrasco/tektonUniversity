<script setup lang="ts">
import { useForm } from "@vorms/core";

export type FormData = {
  Nombre: string;
  CodCurso: string;
  Profesor_Cargo: string;
};

const emit = defineEmits<{
  (event: "submit", formData: FormData): void;
}>();

const { register, errors, handleSubmit } = useForm({
  initialValues: {
    Nombre: "",
    CodCurso: "",
    Profesor_Cargo: "",
  },
  onSubmit(values) {
    emit("submit", values);
  },
});

const { value: Nombre, attrs: NombreAttrs } = register("Nombre", {
  validate(value) {
    if (!value) return "*campo obligatorio";
  },
});
const { value: CodCurso, attrs: CodCursoAttrs } = register("CodCurso", {
  validate(value) {
    if (!value) return "Codigo es necesario!";
    if (!value.includes("SKU_")) return "Debe iniciar con SKU_";
  },
});
const { value: Profesor_Cargo, attrs: Profesor_CargoAttrs } = register(
  "Profesor_Cargo",
  {
    validate(value) {
      if (!value) return "Campo Necesario!";
    },
  }
);
</script>

<template>
  <h1 class="text-2xl mb-4">Formulario Cursos</h1>
  <p id="comentario"></p>
  <form @submit="handleSubmit">
    <div class="field">
      <p id="aCodigo"></p>
      <input
        v-model="CodCurso"
        class="field__input"
        type="text"
        placeholder="Codigo"
        v-bind="CodCursoAttrs"
      />
      <div v-show="'CodCurso' in errors" class="field__error">
        {{ errors.CodCurso }}
      </div>
    </div>
    <div class="field">
      <p id="aNombre"></p>
      <input
        v-model="Nombre"
        class="field__input"
        type="text"
        placeholder="Nombre"
        v-bind="NombreAttrs"
      />
      <div v-show="'Nombre' in errors" class="field__error">
        {{ errors.Nombre }}
      </div>
    </div>
    <div class="field">
      <p id="aProfesor_Cargo"></p>
      <input
        v-model="Profesor_Cargo"
        class="field__input"
        type="text"
        placeholder="Nombres"
        v-bind="Profesor_CargoAttrs"
      />
      <div v-show="'Profesor_Cargo' in errors" class="field__error">
        {{ errors.Profesor_Cargo }}
      </div>
    </div>

    <div class="field">
      <input type="submit" value="Submit" />
    </div>
  </form>
</template>

<style>
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
