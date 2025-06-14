USE inlaze_db;

-- Procedimientos almacenados para PROYECTOS

-- Obtener todos los proyectos
DELIMITER //
CREATE PROCEDURE sp_get_all_projects()
BEGIN
    SELECT 
        id,
        name,
        description,
        status,
        DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%sZ') as createdAt,
        DATE_FORMAT(updated_at, '%Y-%m-%dT%H:%i:%sZ') as updatedAt
    FROM projects 
    ORDER BY created_at DESC;
END //
DELIMITER ;

-- Obtener proyecto por ID
DELIMITER //
CREATE PROCEDURE sp_get_project_by_id(IN project_id VARCHAR(36))
BEGIN
    SELECT 
        id,
        name,
        description,
        status,
        DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%sZ') as createdAt,
        DATE_FORMAT(updated_at, '%Y-%m-%dT%H:%i:%sZ') as updatedAt
    FROM projects 
    WHERE id = project_id;
END //
DELIMITER ;

-- Obtener proyectos por estado
DELIMITER //
CREATE PROCEDURE sp_get_projects_by_status(IN project_status VARCHAR(20))
BEGIN
    SELECT 
        id,
        name,
        description,
        status,
        DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%sZ') as createdAt,
        DATE_FORMAT(updated_at, '%Y-%m-%dT%H:%i:%sZ') as updatedAt
    FROM projects 
    WHERE status = project_status
    ORDER BY created_at DESC;
END //
DELIMITER ;

-- Crear proyecto
DELIMITER //
CREATE PROCEDURE sp_create_project(
    IN project_name VARCHAR(255),
    IN project_description TEXT,
    IN project_status VARCHAR(20)
)
BEGIN
    DECLARE new_id VARCHAR(36);
    SET new_id = UUID();
    
    INSERT INTO projects (id, name, description, status)
    VALUES (new_id, project_name, project_description, project_status);
    
    SELECT new_id as id;
END //
DELIMITER ;

-- Actualizar proyecto
DELIMITER //
CREATE PROCEDURE sp_update_project(
    IN project_id VARCHAR(36),
    IN project_name VARCHAR(255),
    IN project_description TEXT,
    IN project_status VARCHAR(20)
)
BEGIN
    UPDATE projects 
    SET 
        name = COALESCE(project_name, name),
        description = COALESCE(project_description, description),
        status = COALESCE(project_status, status),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = project_id;
END //
DELIMITER ;

-- Eliminar proyecto
DELIMITER //
CREATE PROCEDURE sp_delete_project(IN project_id VARCHAR(36))
BEGIN
    DELETE FROM projects WHERE id = project_id;
END //
DELIMITER ;

-- Buscar proyectos
DELIMITER //
CREATE PROCEDURE sp_search_projects(IN search_query VARCHAR(255))
BEGIN
    SELECT 
        id,
        name,
        description,
        status,
        DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%sZ') as createdAt,
        DATE_FORMAT(updated_at, '%Y-%m-%dT%H:%i:%sZ') as updatedAt
    FROM projects 
    WHERE name LIKE search_query OR description LIKE search_query
    ORDER BY created_at DESC;
END //
DELIMITER ;
