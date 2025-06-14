USE inlaze_db;

-- Procedimientos almacenados para AUTENTICACIÓN

-- Login de usuario
DELIMITER //
CREATE PROCEDURE sp_auth_login(
    IN user_email VARCHAR(255),
    IN user_password VARCHAR(255)
)
BEGIN
    DECLARE user_exists INT DEFAULT 0;
    
    -- Verificar si existe el usuario con email y password correctos
    SELECT COUNT(*) INTO user_exists
    FROM users 
    WHERE email = user_email AND password = user_password;
    
    IF user_exists > 0 THEN
        SELECT 
            id,
            name,
            email,
            role,
            avatar,
            DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%sZ') as createdAt
        FROM users 
        WHERE email = user_email AND password = user_password;
    ELSE
        SELECT NULL as id;
    END IF;
END //
DELIMITER ;

-- Obtener usuario por ID para validación JWT
DELIMITER //
CREATE PROCEDURE sp_auth_get_user_by_id(IN user_id VARCHAR(36))
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

-- Obtener todos los usuarios para auth
DELIMITER //
CREATE PROCEDURE sp_auth_get_all_users()
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
