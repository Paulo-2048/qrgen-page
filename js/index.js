const contentText = document.querySelector(".gerenciar-text");

// Gereciar QR Codes
const options = {
  method: "GET",
  url: "https://qr-code-dynamic-and-static1.p.rapidapi.com/qrcode",
  headers: {
    "api-key":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGFuIjoidGVzdCIsImlhdCI6MTY3MDM3NTg5NX0.nWTkY28tRubuL1Tt4HwarmjAY6bMrgbZWdIf-2DDKsg",
    "X-RapidAPI-Key": "ffeafa5395msh9765a1f72ca3d52p1f7035jsn2a3c62157204",
    "X-RapidAPI-Host": "qr-code-dynamic-and-static1.p.rapidapi.com",
  },
};

window.axios
  .request(options)
  .then((response) => {
    setQrCode(response.data.data);
    downloadQrListener();
    deleteQrListener();
    clearStatusDiv();
    succefulDiv("QR Codes carregados com sucesso!");
  })
  .catch((error) => {
    console.error(error);
    if (error.response.status = 404){
      clearStatusDiv();
      failedDiv("Nenhum QR Code Foi encontrado!");
    }
  });

function setQrCode(qrCodes) {
  qrList = document.querySelector(".gerenciar-qr-cards");

  qrCodes.forEach((qrCode) => {
    let qrCard = document.createElement("div");
    qrCard.classList.add("card", "card-qrcode");
    qrCard.id = "qrcode_" + qrCode.reference;

    let qrCardBody = document.createElement("div");
    qrCardBody.classList.add(
      "card-body",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );

    let qrImgContentAround = document.createElement("div");
    qrImgContentAround.classList.add("content-around");

    let qrImg = document.createElement("img");
    qrImg.src = qrCode.qrCode;

    let qrTitleContentAround = document.createElement("div");
    qrTitleContentAround.classList.add("content-around");

    let qrTitle = document.createElement("h5");
    qrTitle.classList.add("card-title", "qr-title");
    qrTitle.textContent = qrCode.title;

    let qrButtonDiv = document.createElement("div");
    qrButtonDiv.classList.add("buttons", "d-flex");

    let qrButtonSaveContentAround = document.createElement("div");
    qrButtonSaveContentAround.classList.add("content-around");

    let qrButtonSave = document.createElement("a");
    qrButtonSave.classList.add("btn", "btn-outline", "btn-save");

    let qrButtonSaveIcon = document.createElement("i");
    qrButtonSaveIcon.classList.add("bi", "bi-download");

    let qrButtonDeleteContentAround = document.createElement("div");
    qrButtonDeleteContentAround.classList.add("content-around");

    let qrButtonDelete = document.createElement("a");
    qrButtonDelete.classList.add("btn", "btn-outline", "btn-delete");

    let qrButtonDeleteIcon = document.createElement("i");
    qrButtonDeleteIcon.classList.add("bi", "bi-x-circle");

    qrButtonSave.appendChild(qrButtonSaveIcon);
    qrButtonSaveContentAround.appendChild(qrButtonSave);

    qrButtonDelete.appendChild(qrButtonDeleteIcon);
    qrButtonDeleteContentAround.appendChild(qrButtonDelete);

    qrButtonDiv.appendChild(qrButtonSaveContentAround);
    qrButtonDiv.appendChild(qrButtonDeleteContentAround);

    qrTitleContentAround.appendChild(qrTitle);

    qrImgContentAround.appendChild(qrImg);

    qrCardBody.appendChild(qrImgContentAround);
    qrCardBody.appendChild(qrTitleContentAround);
    qrCardBody.appendChild(qrButtonDiv);

    qrCard.appendChild(qrCardBody);

    qrList.appendChild(qrCard);
  });
}

function downloadQrListener() {
  let downloadButtons = document.querySelectorAll(".btn-save");
  downloadButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      let qrCode =
        event.target.parentElement.parentElement.parentElement.parentElement.querySelector(
          "img"
        ).src;
      let a = document.createElement("a");
      a.href = qrCode;
      a.download = "qrCode.png";
      a.click();
      clearStatusDiv();
      succefulDiv("QR Code baixado com sucesso!");
    });
  });
}

function deleteQrListener() {
  let deleteButtons = document.querySelectorAll(".btn-delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      let qrCodeId =
        event.target.parentElement.parentElement.parentElement.parentElement
          .parentElement.id;

      let qrCode =
        event.target.parentElement.parentElement.parentElement.parentElement
          .parentElement;
      qrCode.remove();

      deleteQrCodeAPI(qrCodeId);
    });
  });
}

function deleteQrCodeAPI(qrCodeId) {
  let qrId = qrCodeId.split("_")[1];

  const options = {
    method: "DELETE",
    url: "https://qr-code-dynamic-and-static1.p.rapidapi.com/qrcode/" + qrId,
    headers: {
      "content-type": "application/json",
      "api-key":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGFuIjoidGVzdCIsImlhdCI6MTY3MDM3NTg5NX0.nWTkY28tRubuL1Tt4HwarmjAY6bMrgbZWdIf-2DDKsg",
      "X-RapidAPI-Key": "ffeafa5395msh9765a1f72ca3d52p1f7035jsn2a3c62157204",
      "X-RapidAPI-Host": "qr-code-dynamic-and-static1.p.rapidapi.com",
    },
    data: "{}",
  };

  axios
    .request(options)
    .then(function (response) {
      clearStatusDiv();
      succefulDiv("QR Code deletado com sucesso!");
    })
    .catch(function (error) {
      console.error(error);
      clearStatusDiv();
      failedDiv("Erro ao deletar QR Code!");
    });
}

function succefulDiv(showText) {
  let stronText = document.createElement("strong");
  stronText.innerHTML = " Success!";

  let icon = document.createElement("i");
  icon.classList.add("bi", "bi-check-circle-fill");
  icon.style.color = "green";

  const div = document.createElement("div");
  div.classList.add("succeful", "status");

  div.appendChild(stronText);

  div.appendChild(icon);
  div.appendChild(stronText);
  div.innerHTML += " " + showText;

  contentText.appendChild(div);
}

function failedDiv(showText) {
  let stronText = document.createElement("strong");
  stronText.innerHTML = " Fail!";

  let icon = document.createElement("i");
  icon.classList.add("bi", "bi-x-circle-fill");
  icon.style.color = "red";

  const div = document.createElement("div");
  div.classList.add("failed", "status");

  div.appendChild(stronText);

  div.appendChild(icon);
  div.appendChild(stronText);
  div.innerHTML += " " + showText;

  contentText.appendChild(div);
}

function clearStatusDiv() {
  const statusDiv = document.querySelector(".status");
  if (statusDiv) {
    statusDiv.remove();
  }
}
