const router = require('express').Router();
const connectMySQL = require('../app/database/db')

router.get('/', (req, resp) => {
    resp.render('home')
})

// router.get('/data',(req,resp)=>{
//     resp.render('data')
// })


// *****************************  Student Record ********************//
router.get('/data', (req, resp) => {
    // Fetch student data from the database and pass it to the template
    const sql = 'SELECT * FROM students';
    connectMySQL.query(sql, (err, studentData) => {
        if (err) {
            console.error('Error fetching student data:', err);
            resp.status(500).send('Error fetching student data');
        } else {
            // const  studentData= results; // Get all student records
            // resp.send(studentData); // Pass studentData to the template
            resp.render('data', { studentData: studentData });
        }
    });
});

router.post('/register', (req, resp) => {
    const { name, email, password } = req.body
    console.log(name, email, password);
    const sql = 'insert into students (name,email,password) values(?,?,?)';
    connectMySQL.query(sql, [name, email, password], (err, result) => {
        if (err) {
            console.log('Error inserting student:', err)
            resp.status(500).send('Error registering student');
        }
        else {
            console.log('Student registered:', result);
            resp.redirect('/data')
        }
    })
})

// ********** Update a route to display student data *************//
router.get('/students/update/:id', (req, resp) => {
    const studentId = req.params.id;
    // Fetch student data from the database based on the ID
    const sql = 'SELECT * FROM students WHERE id = ?';
    connectMySQL.query(sql, [studentId], (err, results) => {
        if (err) {
            console.error('Error fetching student data:', err);
            resp.status(500).send('Error fetching student data');
        } else {
            const studentData = results[0]; // Assuming the result contains a single student record
            // Render an EJS template to display the student data
            resp.render('studentUpdate', { studentData });
        }
    })
})

// ********** Update a  student data  & Save Database  *************//
router.post('/students/update/:id', (req, res) => {
    const studentId = req.params.id;
    const { name, email } = req.body; // Assuming you want to update name and email
  
    const sql = 'UPDATE students SET name = ?, email = ? WHERE id = ?';
  
    connectMySQL.query(sql, [name, email, studentId], (err, result) => {
      if (err) {
        console.log('Error updating student:', err);
        res.status(500).send('Error updating student');
      } else {
        console.log('Student updated:', result);
        res.redirect('/data'); 
      }
    });
  });
// ******************  Delete Student Record ************//
router.post('/students/delete/:id', (req, res) => {
    const studentId = req.params.id;

    const sql = 'DELETE FROM students WHERE id = ?';

    connectMySQL.query(sql, [studentId], (err, result) => {
        if (err) {
            console.log('Error deleting student:', err);
            res.status(500).send('Error deleting student');
        } else {
            console.log('Student deleted:', result);
            res.redirect('/data');
        }
    });
});









module.exports = router;