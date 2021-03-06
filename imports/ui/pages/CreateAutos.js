import React, { PureComponent } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
  Snackbar,
  IconButton,
  Select,
  MenuItem,
  Box,
  Dialog,
  DialogContent,
  Divider,
  AppBar,
  Toolbar,
} from "@material-ui/core";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import validator from "validator";
import DashboardLayout from "../layouts/DashboardLayout";
import Piezas from "../../api/collections/Piezas/Piezas";
import { Estados, Traccion, Transmision, Tipo } from "../Constants";
import MaskedTextField from "../components/MaskedTextField";
import AutosFiles from "../../api/collections/AutosFiles/AutosFiles";
import ItemCard from "../components/ItemCard";
import Title from "../components/Title";
import Autos from "../../api/collections/Autos/Autos";

class CreateAutos extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      shouldOpen: false,
      marca: 0,
      modelo: 0,
      tipo: 0,
      transmision: 0,
      color: "",
      placa: "",
      traccion: 0,
      year: "",
      autoPiezas: [],
      estado: 0,
      open: false,
      showX: false,
      message: "",
      vin: "",
      files: [],
      nombresMarcas: [],
      nombreModelos: [],
      autosCompletos: [],
      uploaded: true,
    };

    fetch("https://private-anon-03fe86f6b5-carsapi1.apiary-mock.com/manufacturers")
      .then(res => res.json())
      .then(json => {
        const names = Object.values(json).map(manu => manu.name);
        names.sort((a, b) => a > b);
        this.setState({ nombresMarcas: names });
      });
    fetch("https://private-anon-03fe86f6b5-carsapi1.apiary-mock.com/cars")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ autosCompletos: data });
      });
  }

  getCarByManufacter = name => {
    const { autosCompletos } = this.state;
    const final = autosCompletos.filter(car => car.make === name);
    this.setState({ nombreModelos: final });
  };

  setFiles = event => {
    const { files } = event.target;
    let uploaded = 0;
    const fileIds = [];
    Object.keys(files).forEach(key => {
      const uploadFile = files[key];
      if (uploadFile) {
        // We upload only one file, in case
        // multiple files were selected
        const upload = AutosFiles.insert(
          {
            file: uploadFile,
            streams: "dynamic",
            chunkSize: "dynamic",
          },
          false
        );
        upload.on("start", () => {
          this.setState({
            uploaded: false,
          });
        });
        upload.on("end", (error, fileObj) => {
          if (error) {
            uploaded += 1;
            if (uploaded === files.length) {
              this.setState({
                uploaded: true,
              });
            }
            console.log(error);
          } else {
            uploaded += 1;
            fileIds.push(fileObj._id);
            if (uploaded === files.length) {
              this.setState({
                uploaded: true,
                files: fileIds,
              });
            }
          }
        });
        upload.start();
      }
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
      shouldOpen: false,
    });
  };

  render() {
    const { piezas } = this.props;
    const {
      marca,
      modelo,
      tipo,
      transmision,
      color,
      placa,
      traccion,
      shouldOpen,
      year,
      estado,
      message,
      open,
      uploaded,
      showX,
      autoPiezas,
      vin,
      nombresMarcas,
      nombreModelos,
    } = this.state;

    const handleTextChange = event => {
      event.persist();
      this.setState({
        [event.target.name]: event.target.value,
      });
    };

    const handleCreate = () => {
      const { files } = this.state;
      let alert;
      if (validator.isEmpty(nombresMarcas[marca])) {
        alert = "El campo marca es requerido";
      }

      if (validator.isEmpty(nombreModelos[modelo].model)) {
        alert = "El campo modelo es requerido";
      }

      if (validator.isEmpty(Tipo[tipo])) {
        alert = "El campo tipo es requerido";
      }

      if (validator.isEmpty(color)) {
        alert = "El campo color es requerido";
      }

      /* validator.isEmpty(placa) */
      if (false) {
        alert = "El campo placa es requerido";
      }

      if (validator.isEmpty(String(year))) {
        alert = "El campo año es requerido";
      }

      if (validator.isEmpty(vin)) {
        alert = "El campo vin es requerido";
      }

      if (year > new Date().getFullYear() + 1) {
        alert = "El año no puede ser mayor al año actual";
      }

      if (Autos.find({ placa }).count() > 0) {
        alert = "La placa debe ser unica para este auto";
      }

      if (alert) {
        this.setState({
          open: true,
          message: alert,
        });
      } else {
        piezas.map(pieza => {
          Meteor.call("updatePieza", {
            _id: pieza._id,
            $set: {
              cantidad: pieza.cantidad,
            },
          });
        });
        Meteor.call("addAuto", {
          marca: nombresMarcas[marca],
          modelo: nombreModelos[modelo].model,
          tipo,
          transmision,
          color,
          placa,
          traccion,
          year,
          estado,
          autoPiezas,
          vin,
          pictures: files,
          piezas,
        });
        this.setState({
          autoPiezas: [],
          shouldOpen: false,
          marca: 0,
          modelo: "",
          tipo: "",
          transmision: 0,
          color: "",
          placa: "",
          traccion: 0,
          year: "",
          estado: 0,
          open: true,
          vin: "",
          message: "Auto agregado exitosamente",
        });
      }
    };

    const shouldRenderCard = (label, list1, list2, pieza, index) => {
      return (
        <Grid item key={pieza.vendedor + pieza.tipo + index} xs={12} sm={6} md={4}>
          <ItemCard
            labelButton={label}
            showX={showX}
            title={`Tipo: ${pieza.tipo}`}
            body={`Vendedor: ${pieza.vendedor}`}
            description={`Cantidad: ${pieza.cantidad}`}
            action1={() => {}}
            action2={() => {
              let contains = false;
              let indexAuto = 0;
              for (let i = 0; i < list1.length; i += 1) {
                if (
                  list1[i].marca === pieza.marca &&
                  list1[i].vendedor === pieza.vendedor &&
                  list1[i].precio === pieza.precio &&
                  list1[i].numeroDeSerie === pieza.numeroDeSerie &&
                  list1[i].tipo === pieza.tipo
                ) {
                  contains = true;
                  indexAuto = i;
                }
              }
              if (contains) {
                pieza.cantidad -= 1;
                list1[indexAuto].cantidad += 1;
                if (pieza.cantidad === 0) {
                  if (index > -1) {
                    list2.splice(index, 1);
                  }
                }
              } else {
                list1.push({ ...pieza, cantidad: 1 });
                pieza.cantidad -= 1;
              }
              this.forceUpdate();
              this.setState({ showX: false });
            }}
            action3={() => {}}
          />
        </Grid>
      );
    };

    return (
      <DashboardLayout>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div>
            <Avatar>
              <i className="fas fa-car" />
            </Avatar>
            <Typography component="h1" variant="h5">
              Crear Autos
            </Typography>
            <form id="formUserLogin" noValidate>
              <Grid container spacing={2} style={{ marginBottom: "5px" }}>
                <Grid item xs={12} sm={6}>
                  <Select
                    fullWidth
                    value={marca}
                    name="marca"
                    onChange={e => {
                      this.setState({ [e.target.name]: e.target.value });
                      this.getCarByManufacter(nombresMarcas[e.target.value]);
                    }}
                    label="Marca"
                    variant="outlined">
                    {nombresMarcas.map((dato, index) => {
                      return <MenuItem value={index}>{dato}</MenuItem>;
                    })}
                  </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Select
                    fullWidth
                    value={modelo}
                    name="modelo"
                    onChange={e => {
                      this.setState({ [e.target.name]: e.target.value });
                    }}
                    label="Modelo"
                    variant="outlined">
                    {nombreModelos.map((dato, index) => {
                      return <MenuItem value={index}>{dato.model}</MenuItem>;
                    })}
                  </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Select
                    fullWidth
                    name="tipo"
                    value={tipo}
                    onChange={handleTextChange}
                    variant="outlined">
                    {Tipo.map((dato, index) => {
                      return <MenuItem value={index}>{dato}</MenuItem>;
                    })}
                  </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Select
                    fullWidth
                    name="transmision"
                    value={transmision}
                    onChange={handleTextChange}
                    variant="outlined">
                    {Transmision.map((dato, index) => {
                      return <MenuItem value={index}>{dato}</MenuItem>;
                    })}
                  </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="color"
                    variant="outlined"
                    required
                    fullWidth
                    label="Color"
                    autoFocus
                    value={color}
                    onInput={handleTextChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MaskedTextField
                    mask={[/[A-Z]/, /[A-Z]/, /[A-Z]/, " ", /\d/, /\d/, /\d/, /\d/]}
                    value={placa}
                    name="placa"
                    onChange={handleTextChange}
                    label="Placa"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Select
                    fullWidth
                    name="traccion"
                    value={traccion}
                    onChange={handleTextChange}
                    variant="outlined">
                    {Traccion.map((dato, index) => {
                      return <MenuItem value={index}>{dato}</MenuItem>;
                    })}
                  </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <MaskedTextField
                    mask={[/\d/, /\d/, /\d/, /\d/]}
                    value={year}
                    name="year"
                    onChange={handleTextChange}
                    label="Año"
                  />
                </Grid>
                <Grid item sm={12}>
                  <Select
                    fullWidth
                    name="estado"
                    value={estado}
                    onChange={handleTextChange}
                    variant="outlined">
                    {Estados.map((dato, index) => {
                      return <MenuItem value={index}>{dato}</MenuItem>;
                    })}
                  </Select>
                </Grid>
                <Grid item sm={12}>
                  <MaskedTextField
                    mask={[
                      /[A-Z1-9]/,
                      /[A-Z1-9]/,
                      /[A-Z1-9]/,
                      /[A-Z1-9]/,
                      /[A-Z1-9]/,
                      /[A-Z1-9]/,
                      /[A-Z1-9]/,
                      /[A-Z1-9]/,
                      /[A-Z1-9]/,
                      /[A-Z1-9]/,
                      /[A-Z1-9]/,
                      /[A-Z1-9]/,
                      /[A-Z1-9]/,
                      /[A-Z1-9]/,
                      /[A-Z1-9]/,
                      /[A-Z1-9]/,
                      /[A-Z1-9]/,
                    ]}
                    value={vin}
                    name="vin"
                    onChange={handleTextChange}
                    label="VIN"
                  />
                </Grid>
              </Grid>
              <Box paddingY="1rem">
                Imagenes del auto
                <br />
                <input type="file" onChange={this.setFiles} multiple />
              </Box>
              <Button
                onClick={() => {
                  this.setState({
                    shouldOpen: true,
                  });
                }}>
                Agregar piezas
              </Button>
              <Dialog fullScreen open={shouldOpen} onClose={this.handleClose}>
                <AppBar>
                  <Toolbar>
                    <IconButton
                      edge="start"
                      color="inherit"
                      onClick={this.handleClose}
                      aria-label="close">
                      <i className="fas fa-times-circle" />
                    </IconButton>
                    <Typography variant="h6">Piezas</Typography>
                    <Button autoFocus color="inherit" onClick={this.handleClose}>
                      Guardar
                    </Button>
                  </Toolbar>
                </AppBar>
                <DialogContent container>
                  <Title> </Title>
                  <Grid container spacing={4}>
                    {piezas.map((pieza, index) =>
                      pieza.cantidad > 0
                        ? shouldRenderCard("Agregar", autoPiezas, piezas, pieza, index)
                        : null
                    )}
                  </Grid>
                </DialogContent>
                <Divider />
                <DialogContent>
                  <Title>Piezas agregadas</Title>
                  <Grid container spacing={4}>
                    {autoPiezas.map((pieza, index) =>
                      pieza.cantidad > 0
                        ? shouldRenderCard("Eliminar", piezas, autoPiezas, pieza, index)
                        : null
                    )}
                  </Grid>
                </DialogContent>
              </Dialog>
              <Button
                disabled={!uploaded}
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleCreate}>
                Crear
              </Button>
            </form>
          </div>
        </Container>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          open={open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id",
          }}
          message={<span id="message-id">{message}</span>}
          action={[
            <IconButton key="close" aria-label="close" color="inherit" onClick={this.handleClose}>
              <i className="fas fa-times" />
            </IconButton>,
          ]}
        />
      </DashboardLayout>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("Piezas.all");
  Meteor.subscribe("Autos.all");
  return {
    piezas: Piezas.find().fetch(),
  };
})(CreateAutos);
