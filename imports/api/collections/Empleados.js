import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

Empleados = new Mongo.Collection("Empleados");

Empleados.schema = new SimpleSchema({
  nombre: { type: String },
  fechaDeNacimiento: { type: Date },
});

export default Empleados;