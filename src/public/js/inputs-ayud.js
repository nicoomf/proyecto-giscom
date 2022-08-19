$(document).ready(function () {
  let contadorP = 0;

  $("#agregarProfesor").click(function () {
    $("#profesor option[value='default'").attr("selected", false);

    let profesor = $("#profesor").val();
    let defaultOption = "default";

    if (profesor != defaultOption) {
      if (profesor.length != 0) {
        let liaux = `<input type="text" id="profesor${contadorP}" name="profesor"
                class="form-control col-12 my-2" value="${profesor}" disabled>`;
        $("#lista_profesores").append(liaux);
        $("#profesor option[value='default'").attr("selected", "");
        contadorP++;
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

  $(document).on("change", "#fotoPerfilAyud", function () {
    const image = document.querySelector("#fotoPerfilAyud").files[0];

    $("#btnCargarImgAyud").removeClass("d-none");

    var defaultName = "user_default.png";

    if (!image) {
      let massage = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        Inserte una imagen...
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>`;
      $("#massageFotoPerfilAyud").append(massage);
      $("#imgDefaultAyud").removeClass("d-none");
      $("#imgUploadAyud").addClass("d-none");
      var imgUrl = document.getElementById("imgUrlAyud");
      imgUrl.setAttribute("value", defaultName);
      $("#btnCargarImgAyud").addClass("d-none");
    } else {
      const supportedImages = ["image/jpeg", "image/jpg", "image/png"];
      var archivoNoValido = false;

      $("#btnCargarImgAyud").removeClass("d-none");

      if (supportedImages.indexOf(image.type) != -1) {
        $("#btnCargarImgAyud").click(function () {
          const nombreArchivo = randomName();
          const name = image.name;
          const ext = name.split(".").pop();

          const newName = nombreArchivo + "." + ext;

          $("#imgDefaultAyud").addClass("d-none");
          $("#imgUploadAyud").removeClass("d-none");
          var imgCodified = URL.createObjectURL(image);
          var img = document.getElementById("imgUploadAyud");
          img.setAttribute("src", imgCodified);
          var imgUrl = document.getElementById("imgUrlAyud");
          imgUrl.setAttribute("value", newName);
          $("#cerrarFPAyud").click();
        });
      } else {
        let massage = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
          El archivo ingresado no es valido...
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
          </button>
      </div>`;
        $("#massageFotoPerfilAyud").append(massage);
        $("#btnCargarImgAyud").addClass("d-none");
      }
    }
  });

  $("#btn-GuardarAyud").click(function () {
    const frm = $("#formFPAyud");

    var formData = new FormData();
    var defaultName = "user_default.png";
    var newName = $("#imgUrlAyud").val();

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
      $("#agregarProfesor").click();
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
    var imgUrl = $("#imgUrlAyud").val();
    var profesores = profesoresAux;

    // console.log(profesores);

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
      $("#massageErrorAyud").append(massage);
    } else {
      var json = `{"nombre": "${nombre}","carrera": "${carrera}","proyecto": "${proyecto}","email": "${email}","imgUrl": "${imgUrl}","profesor": ${profesores}}`;

      console.log(json);

      $.ajax({
        type: "POST",
        url: "/admin/save-ayud",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
          // location.href = "/admin/ayudantes";
          const redirect = () => {
            location.href = "/admin/ayudantes";
          };

          setTimeout(function () {
            redirect();
          }, 200);
        },
        failure: function (response) {
          response.alert(mensaje);
        },
      });
    }
  });
});
