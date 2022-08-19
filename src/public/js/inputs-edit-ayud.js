$(document).ready(function () {
  let contadorP = 1;

  $("#agregarProfesorEdit").click(function () {
    $("#profesor option[value='default'").attr("selected", false);

    let profesor = $("#profesor").val();
    indice = $("#lista_profesoresEdit").val();
    let defaultOption = "default";

    if (profesor != defaultOption) {
      if (profesor.length != 0) {
        let liaux = `<input type="text" id="profesor${indice}" name="profesor"
                class="form-control col-12 my-2" value="${profesor}" disabled>`;
        $("#lista_profesores").append(liaux);
        $("#profesor option[value='default'").attr("selected", "");
        contadorP++;
        indice++;
        $("#lista_profesoresEdit").val(indice);
      } else {
        let massage = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                      El campo seleccionado no es valido!
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                      </div>`;
        $("#massageProfesores").append(massage);
      }
    } else {
      let massage = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                      Seleccione un profesor...
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                      </div>`;
      $("#massageProfesores").append(massage);
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

  $(document).on("change", "#fotoPerfilAyudEdit", function () {
    const image = document.querySelector("#fotoPerfilAyudEdit").files[0];

    $("#imgDefaultAyudEdit").removeClass("d-none");

    var defaultNameEdit = $("#defaultNameAyudEdit").val().toString();

    if (!image) {
      let massage = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        Inserte una imagen...
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>`;
      $("#massageFotoPerfilAyudEdit").append(massage);
      $("#imgDefaultAyudEdit").removeClass("d-none");
      $("#imgUploadAyudEdit").addClass("d-none");
      var imgUrl = document.getElementById("imgUrlAyudEdit");
      imgUrl.setAttribute("value", defaultNameEdit);
      $("#btnCargarImgAyudEdit").addClass("d-none");
    } else {
      const supportedImages = ["image/jpeg", "image/jpg", "image/png"];
      var archivoNoValido = false;

      $("#btnCargarImgAyudEdit").removeClass("d-none");

      if (supportedImages.indexOf(image.type) != -1) {
        $("#btnCargarImgAyudEdit").click(function () {
          const nombreArchivo = randomName();
          const name = image.name;
          const ext = name.split(".").pop();

          const newName = nombreArchivo + "." + ext;

          $("#imgDefaultAyudEdit").addClass("d-none");
          $("#imgUploadAyudEdit").removeClass("d-none");
          var imgCodified = URL.createObjectURL(image);
          var img = document.getElementById("imgUploadAyudEdit");
          img.setAttribute("src", imgCodified);
          var imgUrl = document.getElementById("imgUrlAyudEdit");
          imgUrl.setAttribute("value", newName);
          $("#cerrarFPAyudEdit").click();
        });
      } else {
        let massage = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
          El archivo ingresado no es valido...
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
          </button>
      </div>`;
        $("#massageFotoPerfilAyudEdit").append(massage);
        $("#btnCargarImgAyudEdit").addClass("d-none");
      }
    }
  });

  // Guardar edit del ayudante:
  $("#btn-GuardarAyudEdit").click(function () {
    const frm = $("#formFPAyudEdit");

    var formData = new FormData();
    var defaultName = $("#defaultNameAyudEdit").val().toString();
    var newName = $("#imgUrlAyudEdit").val();

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

    let defaultOption = "default";
    let profesor = $("#profesor").val();
    if (profesor != defaultOption) {
      $("#agregarProfesorEdit").click();
    }

    let profesoresAux = "[";
    // console.log("El contadorP es: " + contadorP);

    //For de Profesores:
    for (let i = 0; i < contadorP; i++) {
      var elemento = $(`#profesor${i}`).val();
      if (i == contadorP - 1) {
        profesoresAux = `${profesoresAux}"${elemento}"]`;
      } else {
        profesoresAux = `${profesoresAux}"${elemento}",`;
      }
    }
    // console.log(profesoresAux);

    var nombre = $("#nombreAyud").val();
    var carrera = $("#carreraAyud").val();
    var proyecto = $("#proyectoAyud").val();
    var email = $("#emailAyud").val();
    var imgUrl = $("#imgUrlAyudEdit").val();
    var profesores = profesoresAux;

    if (profesores == "[") {
      profesores = "";
    }

    if (
      nombre.length == 0 ||
      carrera.length == 0 ||
      proyecto.length == 0 ||
      email.length == 0 ||
      profesores.length == 0
    ) {
      let massage = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        (*) Complete los campos obligatorios...
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>`;
      $("#massageErrorAyudEdit").append(massage);
    } else {
      var json = `{"nombre": "${nombre}","carrera": "${carrera}","proyecto": "${proyecto}","email": "${email}","imgUrl": "${imgUrl}","profesor": ${profesores}}`;
      console.log(json);

      var id = $("#id").val();
      console.log(id);

      $.ajax({
        type: "POST",
        url: `/admin/edit-ayud/${id}?_method=PUT`,
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
      });

      const redirect = () => {
        location.href = "/admin/ayudantes";
      };

      setTimeout(function () {
        redirect();
      }, 200);
    }
  });
});
