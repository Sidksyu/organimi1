document.addEventListener("DOMContentLoaded", function () {
    const organization = document.getElementById("organization");
    const popup = document.getElementById("popup");
    const popupContent = popup.querySelector(".popup-content");

    // Загрузка JSON-файла
    fetch("data.json")
        .then((response) => response.json())
        .then((data) => {
            data.departments.forEach((department) => {
                // Создание div для подразделения
                const departmentDiv = document.createElement("div");
                departmentDiv.className = "department";
                departmentDiv.innerHTML = `<h2>${department.name}</h2>`;
                organization.appendChild(departmentDiv);

                // Создание div для руководителя
                const managerDiv = createEmployeeDiv(department.manager, "manager");
                departmentDiv.appendChild(managerDiv);

                // Создание div для сотрудников
                department.employees.forEach((employee) => {
                    const employeeDiv = createEmployeeDiv(employee, "employee");
                    departmentDiv.appendChild(employeeDiv);
                });
            });
        })
        .catch((error) => console.error("Ошибка загрузки JSON:", error));

    // Функция для создания div сотрудника
    function createEmployeeDiv(employee, className) {
        const div = document.createElement("div");
        div.className = className;
        div.innerHTML = `
      <img src="${employee.photo}" alt="${employee.name}">
      <p>${employee.name}</p>
    `;

        // Обработчик клика для открытия popup
        div.addEventListener("click", () => {
            document.getElementById("popup-photo").src = employee.photo;
            document.getElementById("popup-name").textContent = employee.name;
            document.getElementById("popup-position").textContent = employee.position;
            document.getElementById("popup-email").textContent = `Email: ${employee.email}`;
            document.getElementById("popup-phone").textContent = `Телефон: ${employee.phone}`;
            document.getElementById("popup-website").textContent = `Сайт: ${employee.website}`;
            document.getElementById("popup-comment").textContent = `Комментарий: ${employee.comment}`;
            popup.style.display = "block";
        });

        return div;
    }

    // Закрытие popup
    popup.querySelector(".close").addEventListener("click", () => {
        popup.style.display = "none";
    });

    // Закрытие popup при клике вне его
    window.addEventListener("click", (event) => {
        if (event.target === popup) {
            popup.style.display = "none";
        }
    });
});