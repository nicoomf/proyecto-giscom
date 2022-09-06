$(document).ready(function () {

  // VALIDA LAS CONTRASEÑAS Y EL AUTORIZA EL CAMBIO DE CONTRASEÑAS DE ADMINISTRADOR:
  $("#btnChangePassword").click(function () {
    // alert("Entro a validar!");

    var id = $("#idadmin").val();
    var password = $("#password").val();
    var confirm_password = $("#confirm_password").val();
    var actualPassword = $("#actualPassword").val();
    var email = $("#email").val();

    // console.log(id);
    // console.log(password);
    // console.log(confirm_password);
    // console.log(actualPassword);
    // console.log(email);

    if (password != confirm_password) {
      let massage = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        Las contraseñas nuevas no coinciden
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>`;
      $("#massageEditAdmin").append(massage);
    } else {
      if (password.length < 6) {
        let massage = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
              La contraseña nueva debe ser superior a 6 caracteres
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
              </button>
          </div>`;
        $("#massageEditAdmin").append(massage);
      } else {
        const json = `{"password": "${password}", "actualPassword": "${actualPassword}", "email": "${email}"}`;

        console.log(json);

        $.ajax({
          type: "POST",
          url: `/admin/edit-admin/${id}?_method=PUT`,
          data: json,
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function () {
            let massage = `<div class="alert alert-success alert-dismissible fade show text-left" role="alert">
                  La contraseña se ha actualizado correctamente
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button>
                  </div>`;
            $("#massageEditAdminResponse").append(massage);
            $("#password").val("");
            $("#confirm_password").val("");
            $("#actualPassword").val("");
          },
          error: function () {
            let massage = `<div class="alert alert-danger alert-dismissible fade show text-left" role="alert">
                  La contraseña actual es incorrecta
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button>
                  </div>`;
            $("#massageEditAdminResponse").append(massage);
          },
        });
      }
    }
  });
});
