USE inlaze_db;

-- Procedimientos almacenados para COMENTARIOS

-- Obtener todos los comentarios
DELIMITER //
CREATE PROCEDURE sp_comments_get_all()
BEGIN
    SELECT 
        id,
        task_id as taskId,
        author_id as authorId,
        content,
        DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%sZ') as createdAt,
        DATE_FORMAT(updated_at, '%Y-%m-%dT%H:%i:%sZ') as updatedAt
    FROM comments 
    ORDER BY created_at DESC;
END //
DELIMITER ;

-- Obtener comentario por ID
DELIMITER //
CREATE PROCEDURE sp_comments_get_by_id(IN comment_id VARCHAR(36))
BEGIN
    SELECT 
        id,
        task_id as taskId,
        author_id as authorId,
        content,
        DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%sZ') as createdAt,
        DATE_FORMAT(updated_at, '%Y-%m-%dT%H:%i:%sZ') as updatedAt
    FROM comments 
    WHERE id = comment_id;
END //
DELIMITER ;

-- Obtener comentarios por tarea
DELIMITER //
CREATE PROCEDURE sp_comments_get_by_task(IN task_id VARCHAR(36))
BEGIN
    SELECT 
        id,
        task_id as taskId,
        author_id as authorId,
        content,
        DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%sZ') as createdAt,
        DATE_FORMAT(updated_at, '%Y-%m-%dT%H:%i:%sZ') as updatedAt
    FROM comments 
    WHERE task_id = task_id
    ORDER BY created_at ASC;
END //
DELIMITER ;

-- Obtener comentarios por autor
DELIMITER //
CREATE PROCEDURE sp_comments_get_by_author(IN author_id VARCHAR(36))
BEGIN
    SELECT 
        id,
        task_id as taskId,
        author_id as authorId,
        content,
        DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%sZ') as createdAt,
        DATE_FORMAT(updated_at, '%Y-%m-%dT%H:%i:%sZ') as updatedAt
    FROM comments 
    WHERE author_id = author_id
    ORDER BY created_at DESC;
END //
DELIMITER ;

-- Crear comentario
DELIMITER //
CREATE PROCEDURE sp_comments_create(
    IN task_id VARCHAR(36),
    IN author_id VARCHAR(36),
    IN comment_content TEXT
)
BEGIN
    DECLARE new_id VARCHAR(36);
    SET new_id = UUID();
    
    INSERT INTO comments (id, task_id, author_id, content)
    VALUES (new_id, task_id, author_id, comment_content);
    
    SELECT new_id as id;
END //
DELIMITER ;

-- Actualizar comentario
DELIMITER //
CREATE PROCEDURE sp_comments_update(
    IN comment_id VARCHAR(36),
    IN comment_content TEXT
)
BEGIN
    UPDATE comments 
    SET 
        content = COALESCE(comment_content, content),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = comment_id;
END //
DELIMITER ;

-- Eliminar comentario
DELIMITER //
CREATE PROCEDURE sp_comments_delete(IN comment_id VARCHAR(36))
BEGIN
    DELETE FROM comments WHERE id = comment_id;
END //
DELIMITER ;

-- Obtener comentarios recientes
DELIMITER //
CREATE PROCEDURE sp_comments_get_recent(IN comment_limit INT)
BEGIN
    SELECT 
        id,
        task_id as taskId,
        author_id as authorId,
        content,
        DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%sZ') as createdAt,
        DATE_FORMAT(updated_at, '%Y-%m-%dT%H:%i:%sZ') as updatedAt
    FROM comments 
    ORDER BY created_at DESC
    LIMIT comment_limit;
END //
DELIMITER ;
