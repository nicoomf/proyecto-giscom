$(document).ready(function () {

  // SUSCRIBE A UN EVENTO:
  $("#btnSusEvento").click(function () {
    var email = $("#emailSub").val();
    var id = $("#idEvento").val();
    var nombre = $("#nombreSub").val();
    var apellido = $("#apellidoSub").val();

    if (email.length == 0 || nombre.length == 0 || apellido.length == 0) {
      let massage = `<div class="alert alert-danger text-left alert-dismissible fade show" role="alert">
                    Complete los campos
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>`;
      $("#card-massages").append(massage);
    } else {
      if (email.length !== 0) {
        var expReg =
          /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        var esValido = expReg.test(email);

        if (esValido == true) {
          const json = `{"nombre":"${nombre}","apellido":"${apellido}","email":"${email}","id":"${id}"}`;

          // console.log(json);

          $.ajax({
            type: "POST",
            url: `/evento/save-subs/:${id}?_method=PUT`,
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
          });

          $("#emailSub").val("");
          $("#nombreSub").val("");
          $("#apellidoSub").val("");
        } else {
          let massage = `<div class="alert alert-danger text-left alert-dismissible fade show" role="alert">
                    El email ingresado no es valido
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>`;
          $("#card-massages").append(massage);
        }
      }
    }
  });

  $("#btn-suscribirse").click(function () {
    var email = $("#emailSus").val();
    var id = $("#idEvent").val();
    var nombre = $("#nombreSus").val();
    var apellido = $("#apellidoSus").val();
    var index = 3;

    validarYEnviar(email, id, nombre, apellido, index);

    $("#emailSus").val("");
    $("#nombreSus").val("");
    $("#apellidoSus").val("");
  });

  $("#btn-suscribirse0").click(function () {
    var email = $("#emailSus0").val();
    var id = $("#idEvent0").val();
    var nombre = $("#nombreSus0").val();
    var apellido = $("#apellidoSus0").val();
    const index = 0;

    validarYEnviar(email, id, nombre, apellido, index);

    $("#emailSus0").val("");
    $("#nombreSus0").val("");
    $("#apellidoSus0").val("");
  });

  $("#btn-suscribirse1").click(function () {
    var email = $("#emailSus1").val();
    var id = $("#idEvent1").val();
    var nombre = $("#nombreSus1").val();
    var apellido = $("#apellidoSus1").val();
    const index = 1;

    validarYEnviar(email, id, nombre, apellido, index);

    $("#emailSus1").val("");
    $("#nombreSus1").val("");
    $("#apellidoSus1").val("");
  });

  $("#btn-suscribirse2").click(function () {
    var email = $("#emailSus2").val();
    var id = $("#idEvent2").val();
    var nombre = $("#nombreSus2").val();
    var apellido = $("#apellidoSus2").val();
    const index = 2;

    validarYEnviar(email, id, nombre, apellido, index);

    $("#emailSus2").val("");
    $("#nombreSus2").val("");
    $("#apellidoSus2").val("");
  });

  function validarYEnviar(email, id, nombre, apellido, index) {
    if (email.length == 0 || nombre.length == 0 || apellido.length == 0) {
      let massage = `<div class="alert alert-danger text-left alert-dismissible fade show" role="alert">
                    Complete los campos
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>`;
      $("#modalMassages").append(massage);
    } else {
      if (email.length !== 0) {
        var expReg =
          /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        var esValido = expReg.test(email);

        if (esValido == true) {
          const json = `{"nombre":"${nombre}","apellido":"${apellido}","email":"${email}","id":"${id}"}`;

          // console.log(json);

          $.ajax({
            type: "POST",
            url: `/evento/save-subs/:${id}?_method=PUT`,
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
          });

          if (index < 3) {
            $(`#cerrarModal${index}`).click();
            $(`#cerrarXModal${index}`).click();
          } else {
            $(`#cerrarModal`).click();
          }
        } else {
          let massage = `<div class="alert alert-danger text-left alert-dismissible fade show" role="alert">
                    El email ingresado no es valido
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>`;
          $("#modalMassages").append(massage);
        }
      } else {
        let massage = `<div class="alert alert-danger text-left alert-dismissible fade show" role="alert">
                    El email ingresado no es valido
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>`;
        $("#modalMassages").append(massage);
      }
    }
  }

  irAlEvento(0);
  irAlEvento(1);
  irAlEvento(2);
  irAlEvento(3);

  function irAlEvento(index) {
    if (index < 3) {
      $(`#btn-irEvent${index}`).click(function () {
        const id = $(`#idEvent${index}`).val();
        const redirect = () => {
          location.href = `/actividades/eventos/${id}`;
        };
        redirect();
      });
    } else {
      $(`#btn-irEvent`).click(function () {
        const id = $(`#idEvent`).val();
        const redirect = () => {
          location.href = `/actividades/eventos/${id}`;
        };
        redirect();
      });
    }
  }

  $("#btn-SubsGeneral").click(function () {
    var email = $("#emailNewsletter").val();

    if (email.length !== 0) {
      var expReg =
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
      var esValido = expReg.test(email);

      if (esValido == true) {
        const json = `{"email":"${email}"}`;

        $.ajax({
          type: "POST",
          url: `/subs/save-subs/`,
          data: json,
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function () {
            let massage = `<div class="alert alert-success alert-dismissible fade show text-left" role="alert">
                  Te has suscrito!
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button>
                  </div>`;
            $("#massageErrorSubsGeneral").append(massage);
            $("#emailNewsletter").val("");
          },
          error: function () {
            let massage = `<div class="alert alert-danger alert-dismissible fade show text-left" role="alert">
                  El email ingresado ya esta suscrito...
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button>
                  </div>`;
            $("#massageErrorSubsGeneral").append(massage);
            $("#emailNewsletter").val("");
          },
        });
      } else {
        let massage = `<div class="alert alert-danger alert-dismissible fade show text-left" role="alert">
                  El email ingresado no es valido...
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button>
                  </div>`;
        $("#massageErrorSubsGeneral").append(massage);
        $("#emailNewsletter").val("");
      }
    } else {
      let massage = `<div class="alert alert-danger alert-dismissible fade show text-left" role="alert">
                  Ingrese un email...
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button>
                  </div>`;
      $("#massageErrorSubsGeneral").append(massage);
      $("#emailNewsletter").val("");
    }
  });
});
