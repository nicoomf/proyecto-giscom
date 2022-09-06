$(document).ready(function () {
  // ENVIA AL BACKEND EL MENSAJE DEL EMAIL QUE SE QUIERE ENVIAR A LOS SUBS DEL EVENTO:
  for (let i = 0; i < 10; i++) {
    $(`#btnSendMail${i}`).click(function () {
      const mensaje = $(`#mensaje${i}`).val();
      const id = $(`#idEvent${i}`).val();

      if (mensaje.length == 0) {
        let massage = `<div class="alert alert-danger text-left alert-dismissible fade show" role="alert">
                    Agregue un mensaje para enviar...
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>`;
        $(`#massageSendMail${i}`).append(massage);
      } else {
        const json = `{"id":"${id}","mensaje":"${mensaje}"}`;

        // console.log(json);

        $.ajax({
          type: "POST",
          url: `/admin/evento/send-mail`,
          data: json,
          contentType: "application/json; charset=utf-8",
          dataType: "json",
        });

        $(`#mensaje${i}`).val("");
        $(`#cerrarModalSendMail${i}`).click();

        (async () => {
          await Swal.fire({
            title: "Se envió correctamente!",
            icon: "success",
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
          });
        })();
      }
    });
  }

  // BUSCA CONSTANTEMENTE CUANDO A UN EVENTO LE QUEDA MENOS DE UN DIA Y ENVIA UN RECORDATORIO:
  (async () => {
    $.ajax({
      type: "POST",
      url: `/admin/evento/send-reminder`,
    });
  })();

});
