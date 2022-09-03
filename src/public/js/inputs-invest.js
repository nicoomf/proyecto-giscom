$(document).ready(function () {
  var arr_titulos = [];
  $("#agregarTitulo").click(function () {
    let titulo = $("#titulos").val();
    // console.log(arr_titulos);
    if (titulo.length != 0) {
      arr_titulos.push(titulo);
      let liaux = `<li class="list-group-item">${titulo}</li>`;
      $("#lista_titulos").append(liaux);
      $("#titulos").val("");
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

  var arr_areas = [];
  $("#agregarArea").click(function () {
    let area = $("#areas").val();
    if (area.length != 0) {
      arr_areas.push(area);
      let liaux = `<li class="list-group-item">${area}</li>`;
      $("#lista_areas").append(liaux);
      $("#areas").val("");
    } else {
      let massage = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
            El campo de area esta vacio! Ingrese un titulo para agregar...
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
  $(document).on("change", "#fotoPerfil", function () {
    const image = document.querySelector("#fotoPerfil").files[0];

    $("#btnCargarImg").removeClass("d-none");

    var defaultName = "user_default.png";

    if (!image) {
      let massage = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        Inserte una imagen...
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>`;
      $("#massageFotoPerfil").append(massage);
      $("#imgDefault").removeClass("d-none");
      $("#imgUpload").addClass("d-none");
      var imgUrl = document.getElementById("imgUrl");
      imgUrl.setAttribute("value", defaultName);
      $("#btnCargarImg").addClass("d-none");
    } else {
      const supportedImages = ["image/jpeg", "image/jpg", "image/png"];
      var archivoNoValido = false;

      $("#btnCargarImg").removeClass("d-none");

      if (supportedImages.indexOf(image.type) != -1) {
        $("#btnCargarImg").click(function () {
          const nombreArchivo = randomName();
          const name = image.name;
          const ext = name.split(".").pop();

          const newName = nombreArchivo + "." + ext;

          $("#imgDefault").addClass("d-none");
          $("#imgUpload").removeClass("d-none");
          var imgCodified = URL.createObjectURL(image);
          var img = document.getElementById("imgUpload");
          img.setAttribute("src", imgCodified);
          var imgUrl = document.getElementById("imgUrl");
          imgUrl.setAttribute("value", newName);
          $("#cerrarFP").click();
        });
      } else {
        let massage = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
          El archivo ingresado no es valido...
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
          </button>
      </div>`;
        $("#massageFotoPerfil").append(massage);
        $("#btnCargarImg").addClass("d-none");
      }
    }
  });

  // Guardar investigador:
  $("#btn-test").click(function () {
    const frm = $("#formFP");

    var formData = new FormData();
    var defaultName = "user_default.png";
    var newName = $("#imgUrl").val();

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

    let titulo = $("#titulos").val();
    if (titulo.length != 0) {
      $("#agregarTitulo").click();
    }

    let area = $("#areas").val();
    if (area.length != 0) {
      $("#agregarArea").click();
    }

    let contadorT = 1;
    let contadorA = 1;
    let titulosAux = "[";
    let areasAux = "[";
    let tamaño_arregloT = arr_titulos.length;
    let tamaño_arregloA = arr_areas.length;

    arr_titulos.forEach((element) => {
      if (contadorT == tamaño_arregloT) {
        titulosAux = `${titulosAux}"${element}"]`;
      } else {
        titulosAux = `${titulosAux}"${element}",`;
        contadorT = contadorT + 1;
      }
    });

    arr_areas.forEach((element) => {
      if (contadorA == tamaño_arregloA) {
        areasAux = `${areasAux}"${element}"]`;
      } else {
        areasAux = `${areasAux}"${element}",`;
        contadorA = contadorA + 1;
      }
    });

    var nombre = $("#nombre").val();
    var imgUrl = $("#imgUrl").val();
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
      $("#massageError").append(massage);
    } else {
      // alert("campos correctos!");
      var json = `{"nombre": "${nombre}","departamento": "${departamento}","titulos": ${titulos},"areas": ${areas},"email": "${email}","numero": "${numero}", "imgUrl": "${imgUrl}"}`;

      // console.log(json);

      $.ajax({
        type: "POST",
        url: "/admin/save-invest",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
          // location.href = "/admin/investigadores";

          (async () => {
            await Swal.fire({
              title: "Se envió correctamente!",
              icon: "success",
              allowOutsideClick: false,
              allowEscapeKey: false,
              allowEnterKey: false,
            });

            const redirect = () => {
              location.href = "/admin/investigadores";
            };

            setTimeout(function () {
              redirect();
            }, 200);
          })();
        },
        failure: function (response) {
          response.alert(mensaje);
        },
      });
    }
  });
});
