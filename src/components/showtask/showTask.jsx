import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const TaskListpage = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedTaskTitle, setSelectedTaskTitle] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/Task/upload/task');
        setTasks(response.data);
        setFilteredTasks(response.data);
      } catch (err) {
        setError('Error al obtener las tareas');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Filtrar tareas por curso y título de tarea
  useEffect(() => {
    let filtered = tasks;

    if (selectedCourse) {
      filtered = filtered.filter((taskSubmission) =>
        taskSubmission.task.course.name.toLowerCase().includes(selectedCourse.toLowerCase())
      );
    }

    if (selectedTaskTitle) {
      filtered = filtered.filter((taskSubmission) =>
        taskSubmission.task.title.toLowerCase().includes(selectedTaskTitle.toLowerCase())
      );
    }

    setFilteredTasks(filtered);
  }, [selectedCourse, selectedTaskTitle, tasks]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Tareas Subidas por los Estudiantes </h2>

      {/* Filtros */}
      <div className="filters mb-4">
        <div className="row">
         
          <div className="col-md-4">
            <label htmlFor="taskTitleFilter" className="form-label">Filtrar por Título de Tarea</label>
            <input
              type="text"
              id="taskTitleFilter"
              className="form-control"
              value={selectedTaskTitle}
              onChange={(e) => setSelectedTaskTitle(e.target.value)}
              placeholder="Buscar por título..."
            />
          </div>
        </div>
      </div>

      {/* Mostrar Tareas */}
      {filteredTasks.length === 0 ? (
        <p>No hay tareas que coincidan con los filtros aplicados.</p>
      ) : (
        <div className="row">
          {filteredTasks.map((taskSubmission) => (
            <div key={taskSubmission.id} className="col-md-4 mb-4">
              <div className="card shadow-lg border-0">
            
                <div className="card-body">
                  <h5 className="card-title">{taskSubmission.task.title}</h5>
                  <p className="card-text"><strong>Estudiante:</strong> {taskSubmission.student.name}</p>
                  <p className="card-text"><strong>Contenido:</strong> {taskSubmission.task.content}</p>
                  <a href={`http://localhost:3000${taskSubmission.fileUrl}`} download className="btn btn-primary">
                    Descargar archivo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
