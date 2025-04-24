function generateQR() {
  const input = document.getElementById("qr-input").value;
  const qrcodeDiv = document.getElementById("qrcode");
  qrcodeDiv.innerHTML = "";
  if (!input.trim()) return;
  new QRCode(qrcodeDiv, {
    text: input,
    width: 300,
    height: 300,
  });
}

function scanImage(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = () => {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(data.data, data.width, data.height);
      document.getElementById("img-result").innerText = code
        ? code.data
        : "Không tìm thấy mã QR trong ảnh.";
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

document.addEventListener("DOMContentLoaded", () => {
  const scanner = new Html5QrcodeScanner("reader", { fps: 5, qrbox: 250 });
  scanner.render((decoded) => {
    document.getElementById("result").innerText = decoded;
  });
});
