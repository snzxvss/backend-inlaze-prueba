USE inlaze_db;

-- Procedimientos almacenados para USUARIOS

-- Obtener todos los usuarios
DELIMITER //
CREATE PROCEDURE sp_users_get_all()
BEGIN
    SELECT 
        id,
        name,
        email,
        role,
        avatar,
        DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%sZ') as createdAt
    FROM users 
    ORDER BY created_at DESC;
END //
DELIMITER ;

-- Obtener usuario por ID
DELIMITER //
CREATE PROCEDURE sp_users_get_by_id(IN user_id VARCHAR(36))
BEGIN
    SELECT 
        id,
        name,
        email,
        role,
        avatar,
        DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%sZ') as createdAt
    FROM users 
    WHERE id = user_id;
END //
DELIMITER ;

-- Obtener usuarios por rol
DELIMITER //
CREATE PROCEDURE sp_users_get_by_role(IN user_role VARCHAR(20))
BEGIN
    SELECT 
        id,
        name,
        email,
        role,
        avatar,
        DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%sZ') as createdAt
    FROM users 
    WHERE role = user_role
    ORDER BY created_at DESC;
END //
DELIMITER ;

-- Crear usuario
DELIMITER //
CREATE PROCEDURE sp_users_create(
    IN user_name VARCHAR(255),
    IN user_email VARCHAR(255),
    IN user_password VARCHAR(255),
    IN user_role VARCHAR(20),
    IN user_avatar VARCHAR(500)
)
BEGIN
    DECLARE new_id VARCHAR(36);
    SET new_id = UUID();
    
    INSERT INTO users (id, name, email, password, role, avatar)
    VALUES (new_id, user_name, user_email, user_password, user_role, user_avatar);
    
    SELECT new_id as id;
END //
DELIMITER ;

-- Actualizar usuario
DELIMITER //
CREATE PROCEDURE sp_users_update(
    IN user_id VARCHAR(36),
    IN user_name VARCHAR(255),
    IN user_email VARCHAR(255),
    IN user_password VARCHAR(255),
    IN user_role VARCHAR(20),
    IN user_avatar VARCHAR(500)
)
BEGIN
    UPDATE users 
    SET 
        name = COALESCE(user_name, name),
        email = COALESCE(user_email, email),
        password = COALESCE(user_password, password),
        role = COALESCE(user_role, role),
        avatar = COALESCE(user_avatar, avatar),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = user_id;
END //
DELIMITER ;

-- Eliminar usuario
DELIMITER //
CREATE PROCEDURE sp_users_delete(IN user_id VARCHAR(36))
BEGIN
    DELETE FROM users WHERE id = user_id;
END //
DELIMITER ;
