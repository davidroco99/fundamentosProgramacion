document.addEventListener('DOMContentLoaded', function() {
    fetchUsers();

    document.getElementById('userForm').addEventListener('submit', function(e) {
        e.preventDefault();
        let id = document.getElementById('userId').value;
        let formData = new FormData(this);

        if (id) {
            formData.append('id', id);
            fetch('./update_user.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                alert(data);
                fetchUsers();
                clearForm();
            })
            .catch(error => console.error('Error:', error));
        } else {
            fetch('./insert_user.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                alert(data);
                fetchUsers();
                clearForm();
            })
            .catch(error => console.error('Error:', error));
        }
    });
});

function fetchUsers() {
    fetch('./get_users.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            let output = `<table class="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Email</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>`;
            if (Array.isArray(data) && data.length > 0) {
                data.forEach(user => {
                    output += `<tr>
                                <td>${user.nombre}</td>
                                <td>${user.apellido}</td>
                                <td>${user.email}</td>
                                <td>
                                    <button class="btn btn-warning btn-sm" onclick="editUser(${user.id}, '${user.nombre}', '${user.apellido}', '${user.email}', '')">Editar</button>
                                    <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Eliminar</button>
                                </td>
                               </tr>`;
                });
            } else {
                output += '<tr><td colspan="4" class="text-center">No se encontraron usuarios</td></tr>';
            }
            output += `</tbody>
                       </table>`;
            document.getElementById('user-list').innerHTML = output;
        })
        .catch(error => console.error('Error:', error));
}

function editUser(id, nombre, apellido, email) {
    document.getElementById('userId').value = id;
    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('email').value = email;
    document.getElementById('password').value = ''; // Opcionalmente, el campo de la contraseña puede quedar vacío
    console.log("Nombre: " + nombre + " Apellido: " + apellido + " Email: " + email + "Password" + password + "id" + id);
}

function clearForm() {
    document.getElementById('userId').value = '';
    document.getElementById('userForm').reset();
}
