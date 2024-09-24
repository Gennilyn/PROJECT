import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
// import * as XLSX from 'https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js';

const firebaseConfig = {
    apiKey: "AIzaSyAkgpsJmPk1pw2MfR1-Nt-rEPDzuNz-2FQ",
    authDomain: "fir-9f2bb.firebaseapp.com",
    projectId: "fir-9f2bb",
    storageBucket: "fir-9f2bb.appspot.com",
    messagingSenderId: "529771935153",
    appId: "1:529771935153:web:69772464aca1f2f4357990",
    measurementId: "G-GDXGX5V3L8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const studentForm = document.getElementById("StudentForm");

studentForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const fullName = document.getElementById('FullName').value;
    const studentNumber = document.getElementById('StudentNumber').value;
    const campus = document.getElementById('Campus').value;
    const section = document.getElementById('Section').value;

    try {
        await addDoc(collection(db, 'Student information'), {
            Full_Name: fullName,
            Student_Number: studentNumber,
            Campus: campus,
            Section: section,
        });
        alert('Student information submitted successfully!');
        studentForm.reset();
    } catch (error) {
        console.error("Error adding document: ", error);
        alert('Error submitting student information. Please try again.');
    }
});

const downloadAllBtn = document.getElementById("downloadAllBtn");

downloadAllBtn.addEventListener('click', async () => {
    try {
        const studentsCollection = collection(db, 'Student information');
        const snapshot = await getDocs(studentsCollection);
        const studentsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const worksheet = XLSX.utils.json_to_sheet(studentsData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
        XLSX.writeFile(workbook, "students_data.xlsx");
    } catch (error) {
        console.error("Error downloading data: ", error);
        alert("Error downloading data. Please try again.");
    }
});
