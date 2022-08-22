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

  // Guardar publicaciones:
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

        const redirect = () => {
          location.href = "/admin/publicaciones";
        };

        setTimeout(function () {
          redirect();
        }, 200);
      }
    }
  });

  // Guardar publicaciones editadas

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
          // contentType: 'application/json; charset=utf-8',
          // dataType: 'json'
        });

        const redirect = () => {
          location.href = "/admin/publicaciones";
        };

        setTimeout(function () {
          redirect();
        }, 200);
      }
    }
  });

  // Eventos:
  $("#btn-guardarEvento").click(function () {
    var titulo = $("#titulo").val();
    var descripcion = `${$("#summernote").summernote("code")}`;
    var fecha = $("#fecha").val();
    var hora = $("#hora").val();
    var breveDescrip = $("#breveDescrip").val();

    var json = `{"titulo": "${titulo}","descripcion": "${descripcion}","fecha": "${fecha}"},"hora": "${hora}","breveDescrip": "${breveDescrip}"}`;

    console.log(json);

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

      const redirect = () => {
        location.href = "/admin/eventos";
      };

      setTimeout(function () {
        redirect();
      }, 300);
    }
  });

  // Editar evento:
  $("#btn-guardarEditEvento").click(function () {
    var titulo = $("#titulo").val();
    var descripcion = $("#descripcion").val();
    var fecha = $("#fecha").val();
    var hora = $("#hora").val();
    // var descripcion = `${$('#summernote').summernote('code')}`;

    // var json = `{"titulo": "${titulo}","descripcion": "${descripcion}"}`

    // console.log(json);
    // console.log(titulo);
    // console.log(descripcion);
    // console.log("la fecha es: ", fecha);

    var id = $("#id").val();

    $.ajax({
      type: "POST",
      url: `/admin/edit-event/${id}?_method=PUT`,
      data: {
        titulo: titulo,
        descripcion: descripcion,
        fecha: fecha,
        hora: hora,
      },
      // contentType: 'application/json; charset=utf-8',
      // dataType: 'json'
    });

    const redirect = () => {
      location.href = "/admin/eventos";
    };

    setTimeout(function () {
      redirect();
    }, 200);
  });

  // slider active
  $("#sliderItem0").addClass("active");

  // btn Agregar categoria...
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
});
