USE inlaze_db;

-- Procedimientos almacenados para TAREAS

-- Obtener todas las tareas
DELIMITER //
CREATE PROCEDURE sp_get_all_tasks()
BEGIN
    SELECT 
        id,
        title,
        description,
        status,
        priority,
        project_id as projectId,
        assignee_id as assigneeId,
        DATE_FORMAT(due_date, '%Y-%m-%d') as dueDate,
        DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%sZ') as createdAt,
        DATE_FORMAT(updated_at, '%Y-%m-%dT%H:%i:%sZ') as updatedAt
    FROM tasks 
    ORDER BY created_at DESC;
END //
DELIMITER ;

-- Obtener tarea por ID
DELIMITER //
CREATE PROCEDURE sp_get_task_by_id(IN task_id VARCHAR(36))
BEGIN
    SELECT 
        id,
        title,
        description,
        status,
        priority,
        project_id as projectId,
        assignee_id as assigneeId,
        DATE_FORMAT(due_date, '%Y-%m-%d') as dueDate,
        DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%sZ') as createdAt,
        DATE_FORMAT(updated_at, '%Y-%m-%dT%H:%i:%sZ') as updatedAt
    FROM tasks 
    WHERE id = task_id;
END //
DELIMITER ;

-- Obtener tareas por proyecto
DELIMITER //
CREATE PROCEDURE sp_get_tasks_by_project(IN project_id VARCHAR(36))
BEGIN
    SELECT 
        id,
        title,
        description,
        status,
        priority,
        project_id as projectId,
        assignee_id as assigneeId,
        DATE_FORMAT(due_date, '%Y-%m-%d') as dueDate,
        DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%sZ') as createdAt,
        DATE_FORMAT(updated_at, '%Y-%m-%dT%H:%i:%sZ') as updatedAt
    FROM tasks 
    WHERE project_id = project_id
    ORDER BY created_at DESC;
END //
DELIMITER ;

-- Obtener tareas por asignado
DELIMITER //
CREATE PROCEDURE sp_get_tasks_by_assignee(IN assignee_id VARCHAR(36))
BEGIN
    SELECT 
        id,
        title,
        description,
        status,
        priority,
        project_id as projectId,
        assignee_id as assigneeId,
        DATE_FORMAT(due_date, '%Y-%m-%d') as dueDate,
        DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%sZ') as createdAt,
        DATE_FORMAT(updated_at, '%Y-%m-%dT%H:%i:%sZ') as updatedAt
    FROM tasks 
    WHERE assignee_id = assignee_id
    ORDER BY created_at DESC;
END //
DELIMITER ;

-- Obtener tareas por estado
DELIMITER //
CREATE PROCEDURE sp_get_tasks_by_status(IN task_status VARCHAR(20))
BEGIN
    SELECT 
        id,
        title,
        description,
        status,
        priority,
        project_id as projectId,
        assignee_id as assigneeId,
        DATE_FORMAT(due_date, '%Y-%m-%d') as dueDate,
        DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%sZ') as createdAt,
        DATE_FORMAT(updated_at, '%Y-%m-%dT%H:%i:%sZ') as updatedAt
    FROM tasks 
    WHERE status = task_status
    ORDER BY created_at DESC;
END //
DELIMITER ;

-- Obtener tareas por prioridad
DELIMITER //
CREATE PROCEDURE sp_get_tasks_by_priority(IN task_priority VARCHAR(20))
BEGIN
    SELECT 
        id,
        title,
        description,
        status,
        priority,
        project_id as projectId,
        assignee_id as assigneeId,
        DATE_FORMAT(due_date, '%Y-%m-%d') as dueDate,
        DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%sZ') as createdAt,
        DATE_FORMAT(updated_at, '%Y-%m-%dT%H:%i:%sZ') as updatedAt
    FROM tasks 
    WHERE priority = task_priority
    ORDER BY created_at DESC;
END //
DELIMITER ;

-- Crear tarea
DELIMITER //
CREATE PROCEDURE sp_create_task(
    IN task_title VARCHAR(255),
    IN task_description TEXT,
    IN task_status VARCHAR(20),
    IN task_priority VARCHAR(20),
    IN project_id VARCHAR(36),
    IN assignee_id VARCHAR(36),
    IN due_date DATE
)
BEGIN
    DECLARE new_id VARCHAR(36);
    SET new_id = UUID();
    
    INSERT INTO tasks (id, title, description, status, priority, project_id, assignee_id, due_date)
    VALUES (new_id, task_title, task_description, task_status, task_priority, project_id, assignee_id, due_date);
    
    SELECT new_id as id;
END //
DELIMITER ;

-- Actualizar tarea
DELIMITER //
CREATE PROCEDURE sp_update_task(
    IN task_id VARCHAR(36),
    IN task_title VARCHAR(255),
    IN task_description TEXT,
    IN task_status VARCHAR(20),
    IN task_priority VARCHAR(20),
    IN project_id VARCHAR(36),
    IN assignee_id VARCHAR(36),
    IN due_date DATE
)
BEGIN
    UPDATE tasks 
    SET 
        title = COALESCE(task_title, title),
        description = COALESCE(task_description, description),
        status = COALESCE(task_status, status),
        priority = COALESCE(task_priority, priority),
        project_id = COALESCE(project_id, project_id),
        assignee_id = COALESCE(assignee_id, assignee_id),
        due_date = COALESCE(due_date, due_date),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = task_id;
END //
DELIMITER ;

-- Eliminar tarea
DELIMITER //
CREATE PROCEDURE sp_delete_task(IN task_id VARCHAR(36))
BEGIN
    DELETE FROM tasks WHERE id = task_id;
END //
DELIMITER ;

-- Buscar tareas
DELIMITER //
CREATE PROCEDURE sp_search_tasks(IN search_query VARCHAR(255))
BEGIN
    SELECT 
        id,
        title,
        description,
        status,
        priority,
        project_id as projectId,
        assignee_id as assigneeId,
        DATE_FORMAT(due_date, '%Y-%m-%d') as dueDate,
        DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%sZ') as createdAt,
        DATE_FORMAT(updated_at, '%Y-%m-%dT%H:%i:%sZ') as updatedAt
    FROM tasks 
    WHERE title LIKE search_query OR description LIKE search_query
    ORDER BY created_at DESC;
END //
DELIMITER ;
