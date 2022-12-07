const contentText = document.querySelector(".criar-text");

// Criar novos qr codes

const createQrButton = document.getElementById("btn-gerar-qr");

createQrButton.addEventListener("click", () => {
  let qrCodeTitle = document.getElementById("titleText-qr").value;
  let qrCodeContent = document.getElementById("contentText-qr").value;

  if (qrCodeContent != "" && qrCodeTitle != "") {
    qrData = {
      title: qrCodeTitle,
      link: qrCodeContent,
    };
    const options = {
      method: "POST",
      url: "https://qr-code-dynamic-and-static1.p.rapidapi.com/qrcode/static",
      headers: {
        "content-type": "application/json",
        "api-key":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGFuIjoidGVzdCIsImlhdCI6MTY3MDM3NTg5NX0.nWTkY28tRubuL1Tt4HwarmjAY6bMrgbZWdIf-2DDKsg",
        "X-RapidAPI-Key": "ffeafa5395msh9765a1f72ca3d52p1f7035jsn2a3c62157204",
        "X-RapidAPI-Host": "qr-code-dynamic-and-static1.p.rapidapi.com",
      },
      data: JSON.stringify(qrData),
    };

    axios
      .request(options)
      .then(function (response) {
        clearStatusDiv();
        succefulDiv("QR Code criado com sucesso!");
      })
      .catch(function (error) {
        console.error(error);
        clearStatusDiv();
        failedDiv("QR Code não foi criado!");
      });
  } else {
    clearStatusDiv();
    failedDiv("Preencha todos os campos!");
  }
});

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
