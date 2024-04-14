document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('student-form');
    const studentList = document.getElementById('student-list');

    // Load existing student records from local storage
    const existingStudents = JSON.parse(localStorage.getItem('students')) || [];

    // Function to display students in the list
    function displayStudents() {
        studentList.innerHTML = '';
        existingStudents.forEach((student, index) => {
            const div = createStudentDiv(student, index);
            studentList.appendChild(div);
        });
    }

    // Function to create a div for each student
    function createStudentDiv(student, index) {
        const div = document.createElement('div');
        div.classList.add('student-item');
        div.innerHTML = `
            <p><strong>Name:</strong> ${student.name}</p>
            <p><strong>Student ID:</strong> ${student.studentId}</p>
            <p><strong>Email:</strong> ${student.email}</p>
            <p><strong>Contact Number:</strong> ${student.contact}</p>
            <button class="edit-btn" data-index="${index}">Edit</button>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        return div;
    }

    // Function to handle form submission
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(form);
        const newStudent = {
            name: formData.get('name'),
            studentId: formData.get('student-id'),
            email: formData.get('email'),
            contact: formData.get('contact')
        };

        // Validate the input fields
        if (validateFormData(newStudent)) {
            existingStudents.push(newStudent);
            localStorage.setItem('students', JSON.stringify(existingStudents));
            displayStudents();
            form.reset();
        } else {
            alert('Please enter valid data in all fields.');
        }
    });

    // Function to validate form data
function validateFormData(student) {
    const nameRegex = /^[a-zA-Z\s]+$/;
    const studentIdRegex = /^\d+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contactRegex = /^\d{10}$/;

    if (!nameRegex.test(student.name)) {
        alert('Please enter a valid name.');
        return false;
    }

    if (!studentIdRegex.test(student.studentId)) {
        alert('Please enter a valid student ID.');
        return false;
    }

    if (!emailRegex.test(student.email)) {
        alert('Please enter a valid email.');
        return false;
    }

    if (!contactRegex.test(student.contact)) {
        alert('Please enter a valid contact number.');
        return false;
    }

    return true;
}

// Function to handle edit button click
studentList.addEventListener('click', function (e) {
    if (e.target.classList.contains('edit-btn')) {
        const index = e.target.dataset.index;
        const student = existingStudents[index];
        const newName = prompt('Enter new name:', student.name);
        const newStudentId = prompt('Enter new student ID:', student.studentId);
        const newEmail = prompt('Enter new email:', student.email);
        const newContact = prompt('Enter new contact number:', student.contact);

        const updatedStudent = {
            name: newName,
            studentId: newStudentId,
            email: newEmail,
            contact: newContact
        };

        if (validateFormData(updatedStudent)) {
            existingStudents[index] = updatedStudent;
            localStorage.setItem('students', JSON.stringify(existingStudents));
            displayStudents();
        }
    }
    // Function to handle delete button click
    studentList.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.dataset.index;
            existingStudents.splice(index, 1);
            localStorage.setItem('students', JSON.stringify(existingStudents));
            displayStudents();
        }
    });
});

// Initial display of students
displayStudents();
});