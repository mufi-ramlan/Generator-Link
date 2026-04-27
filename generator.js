let linkHasil = "";

function capitalizeNama(nama) {
  return nama.toLowerCase().replace(/\b\w/g, huruf => huruf.toUpperCase());
}

function generateLink() {
  let nama = document.getElementById("nama").value.trim();

  if (!nama) {
    alert("Masukkan nama dulu!");
    return;
  }

  // user isi manual: Bapak Ahmad / Ibu Rina / Keluarga Bpk. Hasan
  nama = capitalizeNama(nama);

  const formatNama = `YTH. ${nama}`;
  const encoded = encodeURIComponent(formatNama);

  linkHasil = `https://zulfikar2208.github.io/wedding/?to=${encoded}`;

  document.getElementById("hasil").innerText = linkHasil;
}

function copyLink() {
  if (!linkHasil) {
    alert("Buat link dulu!");
    return;
  }

  if (navigator.clipboard) {
    navigator.clipboard.writeText(linkHasil)
      .then(() => alert("Link berhasil disalin!"))
      .catch(() => fallbackCopy(linkHasil));
  } else {
    fallbackCopy(linkHasil);
  }
}

function fallbackCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;

  textarea.style.position = "fixed";
  textarea.style.left = "0";
  textarea.style.top = "0";
  textarea.style.opacity = "0";
  textarea.setAttribute("readonly", "");

  document.body.appendChild(textarea);

  const range = document.createRange();
  range.selectNodeContents(textarea);

  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);

  textarea.setSelectionRange(0, 999999);

  const berhasil = document.execCommand("copy");

  document.body.removeChild(textarea);

  if (berhasil) {
    alert("Link berhasil disalin!");
  } else {
    alert("Gagal menyalin. Coba salin manual.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const nama = new URLSearchParams(window.location.search).get("to");
  const guestEl = document.getElementById("guestName");

  guestEl.textContent = nama
    ? decodeURIComponent(nama)
    : "Nama Tamu";
});