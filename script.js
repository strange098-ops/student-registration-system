document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.getElementById('studentForm');
    const studentsTableBody = document.querySelector('#studentsTable tbody');

    // Load students from localStorage
    // if no data in local storege return null
    const loadStudents = () => {
        const students = JSON.parse(localStorage.getItem('students')) || []; // converting string into js object 
        studentsTableBody.innerHTML = '';
        students.forEach((student, index) => addStudentToTable(student, index));
    };

    // Save students to localStorage
    const saveStudents = (students) => {
        localStorage.setItem('students', JSON.stringify(students));
    };

    // Add a student to the table
    const addStudentToTable = (student, index) => {
        const row = document.createElement('tr');
        // displayin the students into the tabe 
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            </td>
        `;
        studentsTableBody.appendChild(row);
    };

    // Form submission 
    studentForm.addEventListener('submit', (event) => {
        event.preventDefault(); // this function is used to stop the default form submition 
       // process the form inputs when the user submits the form
        const name = document.getElementById('studentName').value.trim(); // value is taken and stored in variables
        const id = document.getElementById('studentID').value.trim(); // the trim method removes the widespaces
        const email = document.getElementById('emailID').value.trim();
        const contact = document.getElementById('contactNumber').value.trim();
        
        // Checks if any field is empty or not
        if (!name || !id || !email || !contact) {
            alert('All fields are required.');
            return;
        }
        // condiction to check the valid e mail
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        const students = JSON.parse(localStorage.getItem('students')) || [];
        students.push({ name, id, email, contact }); // add new students to array
        saveStudents(students);
        addStudentToTable({ name, id, email, contact }, students.length - 1);

        studentForm.reset(); // reset form fields to their default value
    });

    // Events for Edit and Delete buttons
    studentsTableBody.addEventListener('click', (event) => {
        const target = event.target;
        const index = target.dataset.index;
        const students = JSON.parse(localStorage.getItem('students')) || [];
        
        if (target.classList.contains('edit-btn')) { // This checks if the clicked element has the class edit-btn,
            const student = students[index]; //retrieves the student data using the index 
            document.getElementById('studentName').value = student.name;
            document.getElementById('studentID').value = student.id;
            document.getElementById('emailID').value = student.email;
            document.getElementById('contactNumber').value = student.contact;
            students.splice(index, 1); // removes the student data from the array 
            saveStudents(students); // save the updatedlist to the local storage 
            loadStudents();
        } else if (target.classList.contains('delete-btn')) {
            students.splice(index, 1);
            saveStudents(students);
            loadStudents();
        }
    });

    // Initial load
    loadStudents();
});