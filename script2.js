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
            });
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
            });
        }
    });
});

function fetchUsers() {
    fetch('./get_users.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new TypeError("Response is not JSON");
            }
            return response.json();
        })
        .then(data => {
            let output = '<ul>';
            if (Array.isArray(data) && data.length > 0) {
                data.forEach(user => {
                    output += `<li>
                                ${user.nombre} ${user.apellido} (${user.email})
                                <button onclick="editUser(${user.id}, '${user.nombre}', '${user.apellido}', '${user.email}', '${user.contraseña}')">Editar</button>
                                <button onclick="deleteUser(${user.id})">Eliminar</button>
                               </li>`;
                });
            } else {
                output += '<li>No users found</li>';
            }
            output += '</ul>';
            document.getElementById('user-list').innerHTML = output;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}


function editUser(id, nombre, apellido, email, password) {
    document.getElementById('userId').value = id;
    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('email').value = email;
    document.getElementById('password').value = password;
}

function deleteUser(id) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
        let formData = new FormData();
        formData.append('id', id);
        fetch('./delete_user.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            fetchUsers();
        });
    }
}

function clearForm() {
    document.getElementById('userId').value = '';
    document.getElementById('userForm').reset();
}
