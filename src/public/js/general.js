// TEXT AREA TRANSFORMADO A EDITOR DE TEXTO.
$(document).ready(function () {
  $("#summernote").summernote({
    placeholder: "Escriba su publicacion aqui...",
    tabsize: 2,
    height: 350,
    lang: "es-ES",
    toolbar: [
      ["style", ["style"]],
      ["font", ["bold", "italic", "underline", "clear"]],
      ["fontname", ["fontname"]],
      ["color", ["color"]],
      ["fontsize", ["fontsize"]],
      ["height", ["height"]],
      ["para", ["ul", "ol", "paragraph"]],
      ["table", ["table"]],
      ["insert", ["link", "picture", "video"]],
      ["view", ["codeview", "help", "undo", "redo"]],
    ],
    codemirror: {
      // codemirror options
      theme: "monokai",
    },
  });

  var texto = $("#descripcion").val();
  $("#summernote").summernote("code", texto);

  // ENVIA AL BACKEND LA PUBLICACION CREADA:
  $("#btn-guardarPublic").click(function () {
    var titulo = $("#titulo").val();
    var descripcion = `${$("#summernote").summernote("code")}`;
    var autor = $("#autor").val();
    var categoria = $("#categoria").val();
    var breveDescrip = $("#breveDescrip").val();

    // var json = `{"titulo": "${titulo}","descripcion": "${descripcion}"}`

    // console.log(json);
    // console.log(titulo);
    // console.log(descripcion);
    // console.log(autor);

    if (autor == 1) {
      let massage = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                      Seleccione un autor
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                      </div>`;
      $("#massagePublicacionAutor").append(massage);
    }

    if (categoria == 1) {
      let massage = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                      Seleccione una categoria
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                      </div>`;
      $("#massagePublicacionCateg").append(massage);
    } else {
      if (
        titulo.length == 0 ||
        breveDescrip.length == 0 ||
        autor.length == 0 ||
        categoria.length == 0 ||
        descripcion.length == 0
      ) {
        let massage = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                        Complete los campos obligatorios
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>`;
        $("#massagePublicacion").append(massage);
      } else {
        $.ajax({
          type: "POST",
          url: "/admin/save-public",
          data: {
            titulo: titulo,
            descripcion: descripcion,
            autor: autor,
            categoria: categoria,
            breveDescrip: breveDescrip,
          },
        });

        (async () => {
          await Swal.fire({
            title: "Se creó correctamente!",
            icon: "success",
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
          });

          const redirect = () => {
            location.href = "/admin/publicaciones";
          };

          setTimeout(function () {
            redirect();
          }, 200);
        })();
      }
    }
  });

  // ENVIA AL BACKEND LA PUBLICACION EDITADA:
  $("#btn-guardarEditPublic").click(function () {
    var titulo = $("#titulo").val();
    var descripcion = `${$("#summernote").summernote("code")}`;
    var autor = $("#autor").val();
    var categoria = $("#categoria").val();
    var breveDescrip = $("#breveDescrip").val();

    // var json = `{"titulo": "${titulo}","descripcion": "${descripcion}"}`

    // console.log(json);
    // console.log(titulo);
    // console.log(descripcion);
    // console.log(autor);

    var id = $("#id").val();

    if (autor == 1) {
      let massage = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                      Seleccione un autor
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                      </div>`;
      $("#massagePublicacionAutor").append(massage);
    }

    if (categoria == 1) {
      let massage = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                      Seleccione una categoria
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                      </div>`;
      $("#massagePublicacionCateg").append(massage);
    } else {
      if (
        titulo.length == 0 ||
        breveDescrip.length == 0 ||
        autor.length == 0 ||
        categoria.length == 0 ||
        descripcion.length == 0
      ) {
        let massage = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                        Complete los campos obligatorios
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>`;
        $("#massagePublicacion").append(massage);
      } else {
        $.ajax({
          type: "POST",
          url: `/admin/edit-public/${id}?_method=PUT`,
          data: {
            titulo: titulo,
            descripcion: descripcion,
            autor: autor,
            categoria: categoria,
            breveDescrip: breveDescrip,
          },
        });

        (async () => {
          await Swal.fire({
            title: "Se guardó correctamente!",
            icon: "success",
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
          });

          const redirect = () => {
            location.href = "/admin/publicaciones";
          };

          setTimeout(function () {
            redirect();
          }, 200);
        })();
      }
    }
  });

  // ENVIA EL EVENTO CREADO AL BACKEND:
  $("#btn-guardarEvento").click(function () {
    var titulo = $("#titulo").val();
    var descripcion = `${$("#summernote").summernote("code")}`;
    var fecha = $("#fecha").val();
    var hora = $("#hora").val();
    var breveDescrip = $("#breveDescrip").val();

    // var json = `{"titulo": "${titulo}","descripcion": "${descripcion}","fecha": "${fecha}"},"hora": "${hora}","breveDescrip": "${breveDescrip}"}`;

    // console.log(json);

    if (fecha == 0) {
      let massage = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                      Seleccione una fecha
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                      </div>`;
      $("#massageFechasEvento").append(massage);
    }

    if (hora == 0) {
      let massage = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                      Seleccione una hora
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                      </div>`;
      $("#massageFechasEvento").append(massage);
    }

    if (
      titulo.length == 0 ||
      descripcion.length == 0 ||
      fecha.length == 0 ||
      hora.length == 0 ||
      breveDescrip.length == 0
    ) {
      let massage = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                    Complete los campos obligatorios (*)
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>`;
      $("#massageEventos").append(massage);
    } else {
      $.ajax({
        type: "POST",
        url: "/admin/save-evento",
        data: {
          titulo: titulo,
          descripcion: descripcion,
          fecha: fecha,
          hora: hora,
          breveDescrip: breveDescrip,
        },
      });

      (async () => {
        await Swal.fire({
          title: "Se creó correctamente!",
          icon: "success",
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
        });

        const redirect = () => {
          location.href = "/admin/eventos";
        };

        setTimeout(function () {
          redirect();
        }, 300);
      })();
    }
  });

  // ENVIA EL EVENTO EDITADO AL BACKEND:
  $("#btn-guardarEditEvento").click(function () {
    var titulo = $("#titulo").val();
    var descripcion = `${$("#summernote").summernote("code")}`;
    var fecha = $("#fecha").val();
    var hora = $("#hora").val();
    var breveDescrip = $("#breveDescrip").val();
    var fechaG = $("#fechaGuardada").val();
    var horaG = $("#horaGuardada").val();

    // var json = `{"titulo": "${titulo}","descripcion": "${descripcion}","fecha": "${fecha}"},"hora": "${hora}","breveDescrip": "${breveDescrip}"}`;

    // console.log(json);

    if (fecha == 0) {
      let massage = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                      Seleccione una fecha
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                      </div>`;
      $("#massageFechasEvento").append(massage);
    }

    if (hora == 0) {
      let massage = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                      Seleccione una hora
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                      </div>`;
      $("#massageFechasEvento").append(massage);
    }

    if (
      titulo.length == 0 ||
      descripcion.length == 0 ||
      fecha.length == 0 ||
      hora.length == 0 ||
      breveDescrip.length == 0
    ) {
      let massage = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                    Complete los campos obligatorios (*)
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>`;
      $("#massageEventos").append(massage);
    } else {
      var id = $("#id").val();

      $.ajax({
        type: "POST",
        url: `/admin/edit-event/${id}?_method=PUT`,
        data: {
          titulo: titulo,
          descripcion: descripcion,
          fecha: fecha,
          hora: hora,
          breveDescrip: breveDescrip,
          fechaG: fechaG,
          horaG: horaG,
        },
      });

      (async () => {
        await Swal.fire({
          title: "Se guardó correctamente!",
          icon: "success",
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
        });

        const redirect = () => {
          location.href = "/admin/eventos";
        };

        setTimeout(function () {
          redirect();
        }, 300);
      })();
    }
  });

  // AÑADE LA CLASE ACTIVE AL SLIDER DE LA PAGINA PRINCIPAL:
  $("#sliderItem0").addClass("active");

  // AGREGA UNA CATEGORIA AL FORMULARIO DE PUBLICACIONES:
  $("#btnAddCategoria").click(function () {
    var categoria = $("#categoriaModal").val();
    categoria = categoria[0].toUpperCase() + categoria.substring(1);
    const selectOptions = document.getElementById("categoria");
    const categ = document.createElement("option");
    categ.textContent = categoria;
    categ.value = categoria;
    categ.selected = true;
    selectOptions.appendChild(categ);

    $.ajax({
      type: "POST",
      url: `/addCategoria`,
      data: {
        categoria: categoria,
      },
    });

    $("#categoriaModal").val("");
    $("#cerrarModalCateg").click();
  });

  // MUESTRA SI EL EVENTO ESTA VIGENTE O NO EN LA PAGINA DEL EVENTO:
  const vigente = $("#vigente").val();
  const fecha = $("#fechaFormat").val();

  if (vigente == "true") {
    let massage = `
    <h3 class="font-weight-normal text-center mt-3">Se realizará el: <span class="mb-1 text-muted">
    ${fecha} </span></h3>

    <div class="row justify-content-center">
            <div class="col-lg-8">
                <div class="row mx-4">
                    <div class="col-md-6 my-1">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text font-weight-bold" id="basic-addon1">Nombre</span>
                            </div>
                            <input type="text" class="form-control" id="nombreSub" name="nombre" placeholder="Nombre">
                        </div>
                    </div>
                    <div class="col-md-6 my-1">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text font-weight-bold" id="basic-addon1">Apellido</span>
                            </div>
                            <input type="text" class="form-control" id="apellidoSub" name="apellido"
                                placeholder="Apellido">
                        </div>
                    </div>
                    <div class="col-md-12 my-1">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text font-weight-bold" id="basic-addon1">Email</span>
                            </div>
                            <input type="email" class="form-control" id="emailSub" name="email" placeholder="email@ejemplo.com">
                            <div class="input-group-append">
                                <button type="button" class="btn btn-danger" id="btnSusEvento">Suscribirse</button>
                        </div>
                      </div>
                  </div>
              </div>
              <div class="form-group mt-2" id="card-massages">

              </div>
          </div>
      </div>
    

    `;
    $("#card-fechas").append(massage);
  } else {
    let massage = `<h3 class="font-weight-normal text-center mt-3">Se realizó el: <span class="mb-1 text-muted">
    ${fecha} </span></h3>`;
    $("#card-fechas").append(massage);
  }

  // PERMITE OCULTAR O VISIBILIZAR EL MENU LATERAL DEL PANEL DE ADMINISTRACION:
  window.addEventListener("DOMContentLoaded", (event) => {
    const sidebarToggle = document.body.querySelector("#sidebarToggle");
    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", (event) => {
        event.preventDefault();
        document.body.classList.toggle("sb-sidenav-toggled");
        localStorage.setItem(
          "sb|sidebar-toggle",
          document.body.classList.contains("sb-sidenav-toggled")
        );
      });
    }
  });

  
});
