$(document).ready(function () {
  $("#agregarTituloEdit").click(function () {
    let listaAnt = $("#lista_titulos").val();
    // console.log(listaAnt);
    var indice = listaAnt;
    // console.log("Este es el indice: "+indice);
    let titulo = $("#titulosEdit").val();
    // console.log(titulo);
    if (titulo.length != 0) {
      let liaux = `<input type="text" id="titulos${indice}" name="titulos"
            class="form-control col-12 my-2" value="${titulo}">`;
      $("#lista_titulosEdit").append(liaux);
      $("#titulosEdit").val("");
      indice++;
      // console.log("ahora el indice es:"+indice);
      $("#lista_titulos").val(`${indice}`);
      // console.log("Este es el indice despues de añadir: "+indice);
    } else {
      let massage = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                  El campo de titulo esta vacio! Ingrese un titulo para agregar...
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button>
                  </div>`;
      $("#massageTitulos").append(massage);
    }
  });

  $("#agregarAreaEdit").click(function () {
    let listaAnt = $("#lista_areas").val();
    // console.log(listaAnt);
    var indice = listaAnt;
    // console.log("Este es el indice: "+indice);
    let area = $("#areasEdit").val();
    // console.log(titulo);
    if (area.length != 0) {
      let liaux = `<input type="text" id="areas${indice}" name="areas"
            class="form-control col-12 my-2" value="${area}">`;
      $("#lista_areasEdit").append(liaux);
      $("#areasEdit").val("");
      indice++;
      // console.log("ahora el indice es:"+indice);
      $("#lista_areas").val(`${indice}`);
      // console.log("Este es el indice despues de añadir: "+indice);
    } else {
      let massage = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                  El campo de titulo esta vacio! Ingrese un titulo para agregar...
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button>
                  </div>`;
      $("#massageAreas").append(massage);
    }
  });

  // funcion para crear nombres alearorios:
  const randomName = () => {
    const possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    let randomName = "";
    for (let i = 0; i < 16; i++) {
      randomName += possible.charAt(
        Math.floor(Math.random() * possible.length)
      );
    }
    return randomName;
  };

  // cargar foto de perfil desde modal:
  $(document).on("change", "#fotoPerfilEdit", function () {
    const image = document.querySelector("#fotoPerfilEdit").files[0];

    $("#btnCargarImgEdit").removeClass("d-none");

    var defaultNameEdit = $("#defaultNameEdit").val().toString();
    // console.log(defaultNameEdit);

    if (!image) {
      let massage = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        Inserte una imagen...
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>`;
      $("#massageFotoPerfilEdit").append(massage);
      $("#imgDefaultEdit").removeClass("d-none");
      $("#imgUploadEdit").addClass("d-none");
      var imgUrlEdit = document.getElementById("imgUrlEdit");
      imgUrlEdit.setAttribute("value", defaultNameEdit);
      $("#btnCargarImgEdit").addClass("d-none");
    } else {
      const supportedImages = ["image/jpeg", "image/jpg", "image/png"];
      var archivoNoValido = false;

      $("#btnCargarImgEdit").removeClass("d-none");

      if (supportedImages.indexOf(image.type) != -1) {
        $("#btnCargarImgEdit").click(function () {
          const nombreArchivo = randomName();
          const name = image.name;
          const ext = name.split(".").pop();

          const newName = nombreArchivo + "." + ext;

          $("#imgDefaultEdit").addClass("d-none");
          $("#imgUploadEdit").removeClass("d-none");
          var imgCodified = URL.createObjectURL(image);
          var img = document.getElementById("imgUploadEdit");
          img.setAttribute("src", imgCodified);
          var imgUrlEdit = document.getElementById("imgUrlEdit");
          imgUrlEdit.setAttribute("value", newName);
          $("#cerrarFPEdit").click();
        });
      } else {
        let massage = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
          El archivo ingresado no es valido...
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
          </button>
      </div>`;
        $("#massageFotoPerfilEdit").append(massage);
        $("#btnCargarImgEdit").addClass("d-none");
      }
    }
  });

  // Guardar edit de investigador:
  $("#btn-guardarEdit").click(function () {
    const frm = $("#formFPEdit");

    var formData = new FormData();
    var defaultName = $("#defaultNameEdit").val().toString();
    // console.log("el defaultName es: ", defaultName);
    var newName = $("#imgUrlEdit").val().toString();
    // console.log("el newName es: ", newName);

    if (newName !== defaultName) {
      formData.append("archivo", $("input[name=archivo]")[0].files[0], newName);

      $.ajax({
        url: frm.attr("action"),
        type: frm.attr("method"),
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
      });
    }

    let titulo = $("#titulosEdit").val();
    if (titulo.length != 0) {
      $("#agregarTitulo").click();
    }

    let area = $("#areasEdit").val();
    if (area.length != 0) {
      $("#agregarArea").click();
    }

    let titulosAux = "[";
    let totalTitulos = $("#lista_titulos").val();
    // console.log(totalTitulos);

    //For de Titulos:
    for (let i = 0; i < totalTitulos; i++) {
      var elemento = $(`#titulos${i}`).val();
      if (i == totalTitulos - 1) {
        titulosAux = `${titulosAux}"${elemento}"]`;
      } else {
        titulosAux = `${titulosAux}"${elemento}",`;
      }
    }
    // console.log(titulosAux);

    let areasAux = "[";
    let totalAreas = $("#lista_areas").val();
    // console.log("total Areas: "+totalAreas);

    //For de Areas:
    for (let i = 0; i < totalAreas; i++) {
      var elemento = $(`#areas${i}`).val();
      if (i == totalAreas - 1) {
        areasAux = `${areasAux}"${elemento}"]`;
      } else {
        areasAux = `${areasAux}"${elemento}",`;
      }
    }
    // console.log(areasAux);

    var nombre = $("#nombre").val();
    var imgUrl = $("#imgUrlEdit").val();
    var departamento = $("#departamento").val();
    var email = $("#email").val();
    var numero = $("#numero").val();
    var titulos = titulosAux;
    var areas = areasAux;

    if (titulos == "[") {
      titulos = "";
    }

    if (areas == "[") {
      areas = "";
    }

    if (
      nombre.length == 0 ||
      departamento.length == 0 ||
      titulos.length == 0 ||
      areas.length == 0 ||
      email.length == 0
    ) {
      // alert("campos vacios!");
      let massage = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
      (*) Complete los campos obligatorios...
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
      </button>
  </div>`;
      $("#massageErrorEdit").append(massage);
    } else {
      var json = `{"nombre": "${nombre}","departamento": "${departamento}","titulos": ${titulos},"areas": ${areas},"email": "${email}","numero": "${numero}", "imgUrl": "${imgUrl}"}`;
      // console.log(json);

      var id = $("#id").val();
      // console.log(id);

      $.ajax({
        type: "POST",
        url: `/admin/edit-invest/${id}?_method=PUT`,
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
      });

      const redirect = () => {
        location.href = "/admin/investigadores";
      };

      redirect();
    }
  });
});
