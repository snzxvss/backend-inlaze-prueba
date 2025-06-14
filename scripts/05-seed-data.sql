USE inlaze_db;

-- Insertar usuarios de ejemplo
INSERT INTO users (id, name, email, password, role, avatar) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Admin Usuario', 'admin@inlaze.com', 'admin123', 'admin', '/placeholder.svg?height=40&width=40'),
('550e8400-e29b-41d4-a716-446655440002', 'Usuario Regular', 'user@inlaze.com', 'user123', 'member', '/placeholder.svg?height=40&width=40'),
('550e8400-e29b-41d4-a716-446655440003', 'María García', 'maria@inlaze.com', 'maria123', 'member', '/placeholder.svg?height=40&width=40'),
('550e8400-e29b-41d4-a716-446655440004', 'Carlos López', 'carlos@inlaze.com', 'carlos123', 'member', '/placeholder.svg?height=40&width=40');

-- Insertar proyectos de ejemplo
INSERT INTO projects (id, name, description, status) VALUES
('550e8400-e29b-41d4-a716-446655440011', 'Plataforma de Apuestas Deportivas', 'Desarrollo de la nueva plataforma principal para apuestas deportivas en Colombia', 'active'),
('550e8400-e29b-41d4-a716-446655440012', 'Sistema de Gestión de Usuarios', 'Implementación de sistema completo de gestión y autenticación de usuarios', 'active'),
('550e8400-e29b-41d4-a716-446655440013', 'API de Integración de Pagos', 'Desarrollo de API para integrar múltiples métodos de pago', 'active'),
('550e8400-e29b-41d4-a716-446655440014', 'Dashboard de Analytics', 'Panel de control para análisis de datos y métricas de negocio', 'inactive');

-- Insertar tareas de ejemplo
INSERT INTO tasks (id, title, description, status, priority, project_id, assignee_id, due_date) VALUES
('550e8400-e29b-41d4-a716-446655440021', 'Diseñar interfaz de usuario principal', 'Crear mockups y prototipos para la interfaz principal de la plataforma de apuestas', 'completed', 'high', '550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440002', '2024-02-15'),
('550e8400-e29b-41d4-a716-446655440022', 'Implementar sistema de autenticación', 'Desarrollar el sistema de login y registro de usuarios con JWT', 'in-progress', 'high', '550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440003', '2024-03-01'),
('550e8400-e29b-41d4-a716-446655440023', 'Configurar base de datos', 'Configurar y optimizar la base de datos MySQL para el proyecto', 'completed', 'medium', '550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440004', '2024-02-10'),
('550e8400-e29b-41d4-a716-446655440024', 'Integrar pasarela de pagos', 'Implementar integración con PSE y tarjetas de crédito', 'todo', 'high', '550e8400-e29b-41d4-a716-446655440013', '550e8400-e29b-41d4-a716-446655440002', '2024-03-15'),
('550e8400-e29b-41d4-a716-446655440025', 'Crear dashboard de métricas', 'Desarrollar panel de control con gráficos y estadísticas en tiempo real', 'in-progress', 'medium', '550e8400-e29b-41d4-a716-446655440014', '550e8400-e29b-41d4-a716-446655440003', '2024-03-20');

-- Insertar comentarios de ejemplo
INSERT INTO comments (id, task_id, author_id, content) VALUES
('550e8400-e29b-41d4-a716-446655440031', '550e8400-e29b-41d4-a716-446655440021', '550e8400-e29b-41d4-a716-446655440001', 'Excelente trabajo en el diseño. Los mockups se ven muy profesionales.'),
('550e8400-e29b-41d4-a716-446655440032', '550e8400-e29b-41d4-a716-446655440021', '550e8400-e29b-41d4-a716-446655440002', 'Gracias! He incorporado el feedback del equipo de UX.'),
('550e8400-e29b-41d4-a716-446655440033', '550e8400-e29b-41d4-a716-446655440022', '550e8400-e29b-41d4-a716-446655440004', '¿Necesitas ayuda con la configuración de JWT? Tengo experiencia con eso.'),
('550e8400-e29b-41d4-a716-446655440034', '550e8400-e29b-41d4-a716-446655440022', '550e8400-e29b-41d4-a716-446655440003', 'Sí, por favor. Me vendría bien revisar las mejores prácticas de seguridad.');

-- Insertar notificaciones de ejemplo
INSERT INTO notifications (id, title, message, type, is_read, user_id, action_url) VALUES
('550e8400-e29b-41d4-a716-446655440041', 'Nueva tarea asignada', 'Se te ha asignado la tarea "Implementar sistema de autenticación"', 'info', FALSE, '550e8400-e29b-41d4-a716-446655440002', '/dashboard/tasks'),
('550e8400-e29b-41d4-a716-446655440042', 'Proyecto completado', 'El proyecto "Plataforma de Apuestas Deportivas" ha sido marcado como completado', 'success', FALSE, NULL, '/dashboard/projects'),
('550e8400-e29b-41d4-a716-446655440043', 'Fecha límite próxima', 'La tarea "Integrar pasarela de pagos" vence en 2 días', 'warning', TRUE, NULL, '/dashboard/tasks'),
('550e8400-e29b-41d4-a716-446655440044', 'Nuevo comentario', 'María García comentó en la tarea "Crear dashboard de métricas"', 'info', FALSE, NULL, '/dashboard/tasks');
