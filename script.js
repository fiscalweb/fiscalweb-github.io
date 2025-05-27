function openIframe(url) {
  document.getElementById('home').style.display = 'none';
  document.getElementById('voteForm').style.display = 'none';
  document.getElementById('iframeView').style.display = 'block';
  document.getElementById('iframeBox').src = url;
}

function goHome() {
  document.getElementById('home').style.display = 'block';
  document.getElementById('iframeView').style.display = 'none';
  document.getElementById('voteForm').style.display = 'none';
  document.getElementById('errorMsg').textContent = '';
}

function showForm() {
  document.getElementById('home').style.display = 'none';
  document.getElementById('iframeView').style.display = 'none';
  document.getElementById('voteForm').style.display = 'block';
}

function calcularTotal() {
  const campos = ['mdf', 'lla', 'ucr', 'vecinal', 'pro', 'blanco', 'nulo', 'impugnado'];
  let total = 0;
  campos.forEach(id => {
    const val = parseInt(document.getElementById(id).value) || 0;
    total += val;
  });
  document.getElementById('total').textContent = total;
}

['mdf', 'lla', 'ucr', 'vecinal', 'pro', 'blanco', 'nulo', 'impugnado'].forEach(id => {
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById(id).addEventListener('input', calcularTotal);
  });
});

function generarMensaje() {
  const encabezado = "🗳️ SE INFORMA EL CIERRE DE MESA CON LOS SIGUIENTES RESULTADOS CONTABILIZADOS POR PARTIDO";
  const mesa = document.getElementById('mesa').value;
  const mdf = document.getElementById('mdf').value;
  const lla = document.getElementById('lla').value;
  const ucr = document.getElementById('ucr').value;
  const vecinal = document.getElementById('vecinal').value;
  const pro = document.getElementById('pro').value;
  const blanco = document.getElementById('blanco').value;
  const nulo = document.getElementById('nulo').value;
  const impugnado = document.getElementById('impugnado').value;

  const total = [mdf, lla, ucr, vecinal, pro, blanco, nulo, impugnado].reduce((sum, val) => sum + parseInt(val || 0), 0);
  document.getElementById('total').textContent = total;

  return (
    `${encabezado}\n\n` +
    `📌 Mesa N°: ${mesa}\n` +
    `🏛️ Concejales:\n` +
    `🟢 MDF: ${mdf}\n` +
    `🟡 LLA: ${lla}\n` +
    `🔵 UCR: ${ucr}\n` +
    `🟣 Vecinalismo: ${vecinal}\n` +
    `🟠 PRO: ${pro}\n\n` +
    `⬜ En blanco: ${blanco}\n` +
    `❌ Nulos: ${nulo}\n` +
    `⚠️ Impugnados: ${impugnado}\n\n` +
    `🔢 Total de votos: ${total}`
  );
}

function enviarWhatsApp() {
  const campos = ['mesa', 'mdf', 'lla', 'ucr', 'vecinal', 'pro', 'blanco', 'nulo', 'impugnado'];
  const errorMsg = document.getElementById('errorMsg');

  if (campos.some(id => !document.getElementById(id).value)) {
    errorMsg.textContent = 'Por favor, completá todos los campos.';
    return;
  }

  const mensaje = generarMensaje();
  const numero = "542245477140";
  window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`, '_blank');

  campos.forEach(id => {
    document.getElementById(id).value = '';
  });

  errorMsg.textContent = '';
  document.getElementById('total').textContent = '0';
}

function copiarMensaje() {
  const campos = ['mesa', 'mdf', 'lla', 'ucr', 'vecinal', 'pro', 'blanco', 'nulo', 'impugnado'];

  if (campos.some(id => !document.getElementById(id).value)) {
    alert("Por favor, completá todos los campos antes de copiar.");
    return;
  }

  const mensaje = generarMensaje();
  navigator.clipboard.writeText(mensaje).then(() => {
    alert("Mensaje copiado al portapapeles. Ahora podés pegarlo en el grupo.");
  }).catch(() => {
    alert("No se pudo copiar el mensaje. Copialo manualmente.");
  });
}
