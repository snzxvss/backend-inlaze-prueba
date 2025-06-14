USE inlaze_db;

-- Procedimientos almacenados para NOTIFICACIONES

-- Obtener todas las notificaciones
DELIMITER //
CREATE PROCEDURE sp_notifications_get_all()
BEGIN
    SELECT 
        id,
        title,
        message,
        type,
        is_read as `read`,
        user_id as userId,
        action_url as actionUrl,
        DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%sZ') as createdAt
    FROM notifications 
    ORDER BY created_at DESC;
END //
DELIMITER ;

-- Obtener notificación por ID
DELIMITER //
CREATE PROCEDURE sp_notifications_get_by_id(IN notification_id VARCHAR(36))
BEGIN
    SELECT 
        id,
        title,
        message,
        type,
        is_read as `read`,
        user_id as userId,
        action_url as actionUrl,
        DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%sZ') as createdAt
    FROM notifications 
    WHERE id = notification_id;
END //
DELIMITER ;

-- Obtener cantidad de notificaciones no leídas
DELIMITER //
CREATE PROCEDURE sp_notifications_get_unread_count()
BEGIN
    SELECT COUNT(*) as count
    FROM notifications 
    WHERE is_read = FALSE;
END //
DELIMITER ;

-- Obtener notificaciones por usuario
DELIMITER //
CREATE PROCEDURE sp_notifications_get_by_user(IN user_id VARCHAR(36))
BEGIN
    SELECT 
        id,
        title,
        message,
        type,
        is_read as `read`,
        user_id as userId,
        action_url as actionUrl,
        DATE_FORMAT(created_at, '%Y-%m-%dT%H:%i:%sZ') as createdAt
    FROM notifications 
    WHERE user_id IS NULL OR user_id = user_id
    ORDER BY created_at DESC;
END //
DELIMITER ;

-- Marcar notificación como leída
DELIMITER //
CREATE PROCEDURE sp_notifications_mark_as_read(IN notification_id VARCHAR(36))
BEGIN
    UPDATE notifications 
    SET is_read = TRUE
    WHERE id = notification_id;
END //
DELIMITER ;

-- Marcar todas las notificaciones como leídas
DELIMITER //
CREATE PROCEDURE sp_notifications_mark_all_as_read()
BEGIN
    UPDATE notifications 
    SET is_read = TRUE;
END //
DELIMITER ;

-- Eliminar notificación
DELIMITER //
CREATE PROCEDURE sp_notifications_delete(IN notification_id VARCHAR(36))
BEGIN
    DELETE FROM notifications WHERE id = notification_id;
END //
DELIMITER ;

-- Crear notificación
DELIMITER //
CREATE PROCEDURE sp_notifications_create(
    IN notification_title VARCHAR(255),
    IN notification_message TEXT,
    IN notification_type VARCHAR(20),
    IN user_id VARCHAR(36),
    IN action_url VARCHAR(500)
)
BEGIN
    DECLARE new_id VARCHAR(36);
    SET new_id = UUID();
    
    INSERT INTO notifications (id, title, message, type, user_id, action_url)
    VALUES (new_id, notification_title, notification_message, notification_type, user_id, action_url);
    
    SELECT new_id as id;
END //
DELIMITER ;
