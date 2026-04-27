let linkHasil = "";

function capitalizeNama(nama){
  return nama
    .toLowerCase()
    .replace(/\b\w/g, h => h.toUpperCase());
}

function generateLink(e){

  // cegah form submit/reload (sering bikin gagal di HP)
  if(e) e.preventDefault();

  const input = document.getElementById("nama");
  const hasil = document.getElementById("hasil");

  if(!input || !hasil){
    alert("Element nama / hasil tidak ditemukan");
    return;
  }

  let nama = input.value.trim();

  if(!nama){
    alert("Masukkan nama dulu!");
    return;
  }

  nama = capitalizeNama(nama);

  const formatNama = `YTH. ${nama}`;
  const encoded = encodeURIComponent(formatNama);

  linkHasil =
   `https://mufi-ramlan.github.io/wedding/?to=${encoded}`;

  // pakai textContent lebih aman
  hasil.textContent = linkHasil;
}



function copyLink(){
  if(!linkHasil){
    alert("Buat link dulu!");
    return;
  }

  if(navigator.clipboard && window.isSecureContext){
    navigator.clipboard.writeText(linkHasil)
      .then(()=>alert("Link berhasil disalin!"))
      .catch(()=>fallbackCopy(linkHasil));
  }else{
    fallbackCopy(linkHasil);
  }
}


function fallbackCopy(text){
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position="fixed";
  ta.style.opacity="0";

  document.body.appendChild(ta);

  ta.focus();
  ta.select();
  ta.setSelectionRange(0,999999);

  try{
    document.execCommand("copy");
    alert("Link berhasil disalin!");
  }catch{
    alert("Gagal menyalin.");
  }

  document.body.removeChild(ta);
}



document.addEventListener("DOMContentLoaded", ()=>{

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