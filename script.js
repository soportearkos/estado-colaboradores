document.getElementById('numero_documentoForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const numero_documento = document.getElementById('numero_documento').value;
    const resultDiv = document.getElementById('result');

    Papa.parse('Data_Base/Base_Datos_Carnets.csv', {
        download: true,
        header: true,
        complete: function (results) {
            const data = results.data;
            const empleado = data.find(emp => emp.NUMERO_DOCUMENTO === numero_documento);

            if (empleado) {
                resultDiv.style.display = 'block'; // Mostrar el cuadro de resultados
                if (empleado.ESTADO.toLowerCase() === 'inactivo') {
                    resultDiv.innerHTML = `
                        <h2>Datos del Colaborador</h2>
                        <p><span class="campos-label">Estado:</span> <span class="estado-valor-inactivo">${empleado.ESTADO}</span></p>
                        <p><span class="campos-label">Nombre completo:</span> ${empleado.NOMBRES_APELLIDOS}</p>
                    `;
                } else {
                    resultDiv.innerHTML = `
                        <h2>Datos del Colaborador</h2>
                        <p><span class="campos-label">Estado:</span> <span class="estado-valor-activo">${empleado.ESTADO}</span></p>
                        <p><span class="campos-label">Nombre completo:</span> ${empleado.NOMBRES_APELLIDOS}</p>
                        <p><span class="campos-label">Cargo:</span> ${empleado.CARGO}</p>
                        <p><span class="campos-label">Sede:</span> ${empleado.SEDE}</p>
                        <p><span class="campos-label">ARL:</span> ${empleado.ARL}</p>
                    `;
                }
            } else {
                resultDiv.style.display = 'block'; // Mostrar el cuadro de resultados
                resultDiv.innerHTML = `<p>No se encontraron datos para el documento ingresado.</p>`;
            }
        }
    });
});

