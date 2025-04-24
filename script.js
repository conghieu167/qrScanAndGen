function generateQR() {
  const input = document.getElementById("qr-input").value;
  const qrcodeDiv = document.getElementById("qrcode");
  qrcodeDiv.innerHTML = "";
  if (input.trim() === "") return;
  new QRCode(qrcodeDiv, {
    text: input,
    width: 200,
    height: 200,
  });
}

function scanImage(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      if (code) {
        document.getElementById("img-result").innerText = code.data;
      } else {
        document.getElementById("img-result").innerText =
          "Không tìm thấy mã QR trong ảnh.";
      }
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

const scanner = new Html5QrcodeScanner("reader", {
  fps: 10,
  qrbox: 250,
});

scanner.render((decodedText) => {
  document.getElementById("result").innerText = decodedText;
});
