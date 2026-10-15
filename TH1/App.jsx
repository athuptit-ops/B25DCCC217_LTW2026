import React, { useState } from "react";

const StudentItem = ({ student, onDelete }) => {

  const { id, name, score, className } = student;

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{score}</td>
      <td>{className}</td>
      <td>
        <button 
          onClick={() => onDelete(id)}
          style={{ 
            backgroundColor: "#ff4d4f", 
            color: "white", 
            border: "none", 
            padding: "5px 10px", 
            cursor: "pointer", 
            borderRadius: "4px" 
          }}
        >
          Xóa
        </button>
      </td>
    </tr>
  );
};

const StudentList = ({ students, onDelete }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Danh sách sinh viên</h3>
      {students.length === 0 ? (
        <p>Không có sinh viên nào phù hợp.</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th>ID</th>
              <th>Họ tên</th>
              <th>Điểm số</th>
              <th>Lớp</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            
            {students.map((student) => (
              <StudentItem key={student.id} student={student} onDelete={onDelete} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};


const StudentForm = ({ onAddStudent }) => {
  const [name, setName] = useState("");
  const [score, setScore] = useState("");
  const [className, setClassName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || score === "" || !className.trim()) {
      setError("Vui lòng điền đầy đủ tất cả các trường thông tin!");
      return;
    }

    const numericScore = parseFloat(score);
    if (isNaN(numericScore) || numericScore < 0 || numericScore > 10) {
      setError("Điểm số không hợp lệ! Điểm phải nằm trong khoảng từ 0 đến 10.");
      return;
    }

    setError("");
    onAddStudent({
      id: Date.now(),
      name: name.trim(),
      score: numericScore,
      className: className.trim(),
    });
    setName("");
    setScore("");
    setClassName("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px", padding: "15px", border: "1px solid #ccc", borderRadius: "6px" }}>
      <h4>Thêm sinh viên mới</h4>
      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
      
      <div style={{ marginBottom: "10px" }}>
        <label>Họ tên: </label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Nhập họ tên"
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Điểm số: </label>
        <input 
          type="number" 
          step="0.1" 
          value={score} 
          onChange={(e) => setScore(e.target.value)} 
          placeholder="Nhập điểm (0-10)"
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Lớp: </label>
        <input 
          type="text" 
          value={className} 
          onChange={(e) => setClassName(e.target.value)} 
          placeholder="Nhập tên lớp"
        />
      </div>

      <button type="submit" style={{ padding: "6px 15px", cursor: "pointer" }}>Thêm</button>
    </form>
  );
};

const StudentStats = ({ students }) => {
  const totalStudents = students.length;

  const averageScore = totalStudents > 0 
    ? (students.reduce((sum, student) => sum + student.score, 0) / totalStudents).toFixed(2) 
    : 0;

  return (
    <div style={{ margin: "20px 0", padding: "10px", backgroundColor: "#e6f7ff", borderRadius: "6px" }}>
      {}
      <p><strong>Tổng số lượng sinh viên:</strong> {`${totalStudents} sinh viên`}</p>
      <p><strong>Điểm trung bình toàn lớp:</strong> {`${averageScore} điểm`}</p>
    </div>
  );
};

const App = () => {

  const [students, setStudents] = useState([
    { id: 1, name: "Nguyễn Văn An", score: 8.5, className: "CNTT1" },
    { id: 2, name: "Trần Thị Bình", score: 4.2, className: "CNTT2" },
    { id: 3, name: "Lê Hoàng Cường", score: 9.0, className: "CNTT1" },
  ]);

  const [filterType, setFilterType] = useState("ALL"); 

  const handleAddStudent = (newStudent) => {
    setStudents((prevStudents) => [...prevStudents, newStudent]);
  };

  const handleDeleteStudent = (id) => {
    setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
  };

  const filteredStudents = students.filter((student) => {
    if (filterType === "GOOD") return student.score >= 8;
    if (filterType === "FAIL") return student.score < 5;
    return true; // "ALL"
  });

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Trang Web Quản Lý Điểm Sinh Viên</h2>

      {/* Form thêm sinh viên */}
      <StudentForm onAddStudent={handleAddStudent} />

      {/* Bộ lọc (Filter) */}
      <div style={{ marginBottom: "15px" }}>
        <label><strong>Bộ lọc danh sách: </strong></label>
        <button 
          onClick={() => setFilterType("ALL")} 
          style={{ marginRight: "5px", fontWeight: filterType === "ALL" ? "bold" : "normal" }}
        >
          Tất cả
        </button>
        <button 
          onClick={() => setFilterType("GOOD")} 
          style={{ marginRight: "5px", fontWeight: filterType === "GOOD" ? "bold" : "normal" }}
        >
          Sinh viên Giỏi (Điểm &gt;= 8)
        </button>
        <button 
          onClick={() => setFilterType("FAIL")} 
          style={{ fontWeight: filterType === "FAIL" ? "bold" : "normal" }}
        >
          Sinh viên Trượt môn (Điểm &lt; 5)
        </button>
      </div>

      {}
      <StudentStats students={students} />

      {}
      <StudentList students={filteredStudents} onDelete={handleDeleteStudent} />
    </div>
  );
};

export default App;
