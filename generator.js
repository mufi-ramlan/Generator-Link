let linkHasil = "";

// Kapital awal tiap kata
function capitalizeNama(nama) {
  return nama
    .toLowerCase()
    .replace(/\b\w/g, huruf => huruf.toUpperCase());
}

// Generate link undangan
function generateLink() {
  let nama = document.getElementById("nama").value.trim();

  if (!nama) {
    alert("Masukkan nama dulu!");
    return;
  }

  // user isi manual contoh:
  // Bapak Ahmad
  // Ibu Rina
  // Keluarga Bpk. Hasan
  nama = capitalizeNama(nama);

  const formatNama = ` ${nama}`;
  const encoded = encodeURIComponent(formatNama);

  linkHasil =
    `https://mufi-ramlan.github.io/wedding/?to=${encoded}`;

  document.getElementById("hasil").innerText = linkHasil;
}


// Copy link
function copyLink() {
  if (!linkHasil) {
    alert("Buat link dulu!");
    return;
  }

  if (navigator.clipboard) {
    navigator.clipboard.writeText(linkHasil)
      .then(() => {
        alert("Link berhasil disalin!");
      })
      .catch(() => {
        fallbackCopy(linkHasil);
      });

  } else {
    fallbackCopy(linkHasil);
  }
}


// Fallback copy untuk browser lama / iOS
function fallbackCopy(text) {

  const textarea = document.createElement("textarea");
  textarea.value = text;

  textarea.style.position = "fixed";
  textarea.style.left = "0";
  textarea.style.top = "0";
  textarea.style.opacity = "0";

  textarea.setAttribute("readonly","");

  document.body.appendChild(textarea);

  textarea.focus();
  textarea.select();
  textarea.setSelectionRange(0,999999);

  let berhasil = false;

  try{
    berhasil = document.execCommand("copy");
  } catch(e){
    berhasil = false;
  }

  document.body.removeChild(textarea);

  if(berhasil){
    alert("Link berhasil disalin!");
  } else{
    alert("Gagal menyalin. Coba salin manual.");
  }

}


// Ambil nama tamu dari parameter ?to=
document.addEventListener("DOMContentLoaded", function(){

  const nama = new URLSearchParams(
    window.location.search
  ).get("to");

  const guestEl = document.getElementById("guestName");

  if(guestEl){
    guestEl.textContent = nama
      ? decodeURIComponent(nama)
      : "Nama Tamu";
  }

});