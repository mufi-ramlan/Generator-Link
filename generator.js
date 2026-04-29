let linkHasil = "";
let waLink = "";

// Kapital awal tiap kata
function capitalizeNama(nama){
  return nama
    .toLowerCase()
    .replace(/\b\w/g, h => h.toUpperCase());
}

function generateLink(){

  let nama = document.getElementById("nama").value.trim();

  if(!nama){
    alert("Masukkan nama dulu!");
    return;
  }

  nama = capitalizeNama(nama);

  const encodedNama = encodeURIComponent(nama);

  // LINK UNDANGAN
  linkHasil =
  `https://mufi-ramlan.github.io/wedding/?to=${encodedNama}`;


  // TEMPLATE PESAN
  const pesan =

`Kepada Yth.  
${nama}

_Assalamualaikum Warahmatullahi Wabarakaatuh_

Bismillahirrahmanirrahim,  
dengan memohon rahmat dan ridho Allah SWT,
Kami pernah berjalan sendiri-sendiri, hingga Allah mempertemukan kami di satu arah yang sama.  
Lalu kami memilih bukan karena segalanya mudah, tetapi karena ingin tetap tinggal, dalam ikatan yang halal.

*Mufi Uswatun Hasanah Nur Fauzi, S.H.*
dengan  
*Ramlan Abdul Wasi, M.Pd.*

Untuk informasi detail acara, silakan kunjungi:  
${linkHasil}

Dengan segala kerendahan hati, kami memohon maaf karena undangan ini hanya dapat kami sampaikan melalui pesan ini.

Jika berkenan, hadir dan doakan kami agar yang sederhana ini, Allah cukupkan menjadi selamanya.

_Wassalamualaikum Warahmatullahi Wabarakaatuh_

Hormat kami,  
Mufi & Ramlan`;



  // TAMPILKAN LINK
  document.getElementById("hasil").innerText = linkHasil;


  // TAMPILKAN PESAN
  document.getElementById("templatePesan").value = pesan;


  // GENERATE LINK WA
  waLink =
  `https://wa.me/?text=${encodeURIComponent(pesan)}`;

}


// Tombol buka WhatsApp
function kirimWhatsapp(){

 if(!waLink){
   alert("Generate dulu!");
   return;
 }

 window.open(waLink,"_blank");
}


// Copy pesan
function copyPesan(){

 const pesan =
 document.getElementById("templatePesan").value;

 navigator.clipboard.writeText(pesan)
 .then(()=>alert("Pesan disalin!"));

}

function copyPesan(){

 const pesan =
 document.getElementById("templatePesan").value;

 if(!pesan){
   alert("Pesan belum dibuat!");
   return;
 }

 if(navigator.clipboard){

   navigator.clipboard.writeText(pesan)
   .then(()=>{
      alert("Pesan berhasil disalin!");
   })
   .catch(()=>{
      fallbackCopyPesan(pesan);
   });

 }else{
   fallbackCopyPesan(pesan);
 }

}


// Fallback copy untuk HP/iPhone/browser lama
function fallbackCopyPesan(text){

 const textarea =
 document.createElement("textarea");

 textarea.value = text;

 textarea.style.position="fixed";
 textarea.style.left="0";
 textarea.style.top="0";
 textarea.style.opacity="0";

 textarea.setAttribute("readonly","");

 document.body.appendChild(textarea);

 textarea.focus();
 textarea.select();
 textarea.setSelectionRange(0,999999);

 let berhasil=false;

 try{
   berhasil=document.execCommand("copy");
 }catch(e){
   berhasil=false;
 }

 document.body.removeChild(textarea);

 if(berhasil){
   alert("Pesan berhasil disalin!");
 }else{
   alert("Gagal menyalin, copy manual ya.");
 }

}