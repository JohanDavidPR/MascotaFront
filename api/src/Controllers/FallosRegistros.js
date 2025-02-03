const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const db = require('../Database/db');

const app = express();
app.use(express.json());

// Funciones y configuraciones previas de log y autenticación se mantienen igual

// Modelos de Mongoose expandidos
const UserSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['active', 'suspended', 'deleted'], 
        default: 'active' 
    },
    role: { 
        type: String, 
        enum: ['user', 'admin', 'moderator'], 
        default: 'user' 
    },
    lastLogin: Date,
    failedLoginAttempts: {
        type: Number,
        default: 0
    }
});

const OrderSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    products: [{
        product: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product' 
        },
        quantity: Number
    }],
    total: Number,
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema);

const Order = mongoose.model('Order', OrderSchema);


async function logError(error, context = {}) {
    try {
        // Crear directorio de logs si no existe
        const logDir = path.join(__dirname, '..', 'logs');
        await fs.mkdir(logDir, { recursive: true });

        // Nombre de archivo con fecha
        const logFileName = path.join(logDir, `${new Date().toISOString().split('T')[0]}-error.log`);
        
        // Detalles del error
        const logEntry = JSON.stringify({
            timestamp: new Date().toISOString(),
            errorId: uuidv4(),
            name: error.name,
            message: error.message,
            stack: error.stack,
            context: context
        }) + '\n';

        // Escribir en archivo
        await fs.appendFile(logFileName, logEntry, 'utf8');
        
        // Opcional: también loguear en consola
        console.error('Error registrado:', logEntry);
    } catch (loggerError) {
        console.error('Error al registrar en log:', loggerError);
    }
}

const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            const error = new Error('Token de autenticación requerido');
            await logError(error, { 
                headers: req.headers,
                requestPath: req.path 
            });
            return res.status(401).json({ 
                error: 'Autenticación fallida', 
                message: 'No se proporcionó token de autorización' 
            });
        }

        // Verificación de token más estricta
        jwt.verify(token, process.env.TOKEN_SECRET || 'fallback_secret', async (err, decoded) => {
            if (err) {
                const authError = new Error('Token inválido');
                await logError(authError, { 
                    tokenError: err.message,
                    requestPath: req.path 
                });
                return res.status(403).json({ 
                    error: 'Token inválido', 
                    message: 'No se pudo autenticar el token proporcionado' 
                });
            }

            // Verificaciones adicionales del usuario
            const user = await User.findById(decoded.userId);
            if (!user || user.status !== 'active') {
                const userError = new Error('Usuario no activo o inexistente');
                await logError(userError, { 
                    userId: decoded.userId,
                    userStatus: user ? user.status : 'not found' 
                });
                return res.status(403).json({ 
                    error: 'Acceso denegado', 
                    message: 'El usuario no está activo o no existe' 
                });
            }

            req.user = user;
            next();
        });
    } catch (error) {
        await logError(error, { requestPath: req.path });
        res.status(500).json({ 
            error: 'Error interno de autenticación', 
            message: 'Ocurrió un error durante la autenticación' 
        });
    }
};

// Servicios adicionales para completar los 14
app.post('/user/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const user = await User.findOne({ username });
        
        if (!user) {
            const loginError = new Error('Usuario no encontrado');
            await logError(loginError, { 
                username,
                errorType: 'login_user_not_found' 
            });
            
            return res.status(404).json({ 
                error: 'Inicio de sesión fallido', 
                message: 'Credenciales inválidas' 
            });
        }

        // Bloqueo por intentos fallidos
        if (user.failedLoginAttempts >= 5) {
            user.status = 'suspended';
            await user.save();
            
            const suspensionError = new Error('Cuenta suspendida por múltiples intentos fallidos');
            await logError(suspensionError, { 
                username,
                errorType: 'login_account_suspended' 
            });
            
            return res.status(403).json({ 
                error: 'Cuenta suspendida', 
                message: 'Demasiados intentos fallidos. Contacte al soporte.' 
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            user.failedLoginAttempts += 1;
            await user.save();
            
            const passwordError = new Error('Contraseña incorrecta');
            await logError(passwordError, { 
                username,
                errorType: 'login_invalid_password' 
            });
            
            return res.status(401).json({ 
                error: 'Credenciales inválidas', 
                message: 'Nombre de usuario o contraseña incorrectos' 
            });
        }

        // Resetear intentos fallidos
        user.failedLoginAttempts = 0;
        user.lastLogin = new Date();
        await user.save();

        // Generar token
        const token = jwt.sign(
            { userId: user._id, role: user.role }, 
            process.env.TOKEN_SECRET || 'fallback_secret',
            { expiresIn: '2h' }
        );

        res.status(200).json({ 
            message: 'Inicio de sesión exitoso', 
            token 
        });
    } catch (error) {
        await logError(error, { 
            requestBody: req.body,
            errorType: 'login_process' 
        });
        
        res.status(500).json({ 
            error: 'Error de inicio de sesión', 
            message: 'No se pudo completar el inicio de sesión' 
        });
    }
});

app.post('/user/reset-password', async (req, res) => {
    try {
        const { email } = req.body;
        
        const user = await User.findOne({ email });
        
        if (!user) {
            const resetError = new Error('Usuario no encontrado');
            await logError(resetError, { 
                email,
                errorType: 'password_reset_user_not_found' 
            });
            
            return res.status(404).json({ 
                error: 'Reseteo de contraseña fallido', 
                message: 'No se encontró un usuario con este correo' 
            });
        }

        // Generar token de reseteo
        const resetToken = uuidv4();
        const resetTokenExpires = Date.now() + 3600000; // 1 hora

        // Simular envío de correo (en producción usar servicio real)
        const transporter = nodemailer.createTransport({
            // Configuración de servicio de correo
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        try {
            await transporter.sendMail({
                from: 'soporte@miempresa.com',
                to: email,
                subject: 'Reseteo de Contraseña',
                text: `Tu token de reseteo es: ${resetToken}`
            });
        } catch (emailError) {
            await logError(emailError, { 
                email,
                errorType: 'password_reset_email_failed' 
            });
            
            return res.status(500).json({ 
                error: 'Error de envío', 
                message: 'No se pudo enviar el correo de reseteo' 
            });
        }

        res.status(200).json({ 
            message: 'Correo de reseteo enviado', 
            resetToken 
        });
    } catch (error) {
        await logError(error, { 
            requestBody: req.body,
            errorType: 'password_reset_process' 
        });
        
        res.status(500).json({ 
            error: 'Error de reseteo', 
            message: 'No se pudo procesar el reseteo de contraseña' 
        });
    }
});

app.post('/order/create', authenticateToken, async (req, res) => {
    try {
        const { products } = req.body;
        const userId = req.user._id;

        if (!products || products.length === 0) {
            const orderError = new Error('Productos de orden inválidos');
            await logError(orderError, { 
                userId,
                products,
                errorType: 'order_invalid_products' 
            });
            
            return res.status(400).json({ 
                error: 'Orden inválida', 
                message: 'Debe incluir al menos un producto' 
            });
        }

        // Validar stock y calcular total
        let total = 0;
        const processedProducts = [];

        for (const item of products) {
            const product = await Product.findById(item.product);
            
            if (!product) {
                const productError = new Error('Producto no encontrado');
                await logError(productError, { 
                    productId: item.product,
                    errorType: 'order_product_not_found' 
                });
                
                return res.status(404).json({ 
                    error: 'Producto no encontrado', 
                    message: `Producto con ID ${item.product} no existe` 
                });
            }

            if (product.stock < item.quantity) {
                const stockError = new Error('Stock insuficiente');
                await logError(stockError, { 
                    productId: item.product,
                    requestedQuantity: item.quantity,
                    availableStock: product.stock,
                    errorType: 'order_insufficient_stock' 
                });
                
                return res.status(409).json({ 
                    error: 'Stock insuficiente', 
                    message: `No hay suficiente stock para ${product.name}` 
                });
            }

            // Reducir stock
            product.stock -= item.quantity;
            await product.save();

            total += product.price * item.quantity;
            processedProducts.push({
                product: product._id,
                quantity: item.quantity
            });
        }

        // Crear orden
        const order = new Order({
            user: userId,
            products: processedProducts,
            total
        });

        await order.save();

        res.status(201).json({ 
            message: 'Orden creada exitosamente', 
            orderId: order._id 
        });
    } catch (error) {
        await logError(error, { 
            requestBody: req.body,
            errorType: 'order_creation_process' 
        });
        
        res.status(500).json({ 
            error: 'Error de creación de orden', 
            message: 'No se pudo crear la orden' 
        });
    }
});

// Servicios adicionales simulando diferentes escenarios de error
app.get('/external-service-check', async (req, res) => {
    try {
        // Simular llamada a servicio externo con timeout
        const response = await axios.get('https://api.example.com/status', {
            timeout: 2000
        });

        res.status(200).json(response.data);
    } catch (error) {
        await logError(error, { 
            errorType: 'external_service_failure' 
        });
        
        res.status(503).json({ 
            error: 'Servicio externo no disponible', 
            message: 'No se puede conectar con el servicio solicitado' 
        });
    }
});

app.post('/payment-process', async (req, res) => {
    try {
        // Simular procesamiento de pago
        const { amount, paymentMethod } = req.body;

        if (!amount || !paymentMethod) {
            const validationError = new Error('Datos de pago incompletos');
            await logError(validationError, { 
                receivedData: req.body,
                errorType: 'payment_invalid_data' 
            });
            
            return res.status(400).json({ 
                error: 'Datos inválidos', 
                message: 'Se requieren monto y método de pago' 
            });
        }

        // Simular proveedor de pagos
        const paymentResult = await simulatePaymentGateway(amount, paymentMethod);

        if (!paymentResult.success) {
            const paymentError = new Error('Pago rechazado');
            await logError(paymentError, { 
                amount,
                paymentMethod,
                reason: paymentResult.reason,
                errorType: 'payment_gateway_rejection' 
            });
            
            return res.status(402).json({ 
                error: 'Pago rechazado', 
                message: paymentResult.reason 
            });
        }

        res.status(200).json({ 
            message: 'Pago procesado exitosamente', 
            transactionId: paymentResult.transactionId 
        });
    } catch (error) {
        await logError(error, { 
            requestBody: req.body,
            errorType: 'payment_process_failure' 
        });
        
        res.status(500).json({ 
            error: 'Error de procesamiento', 
            message: 'No se pudo procesar el pago' 
        });
    }
});

// Función simulada de pasarela de pagos
function simulatePaymentGateway(amount, method) {
    // Simular diferentes escenarios de pago
    if (amount > 10000) {
        return { 
            success: false, 
            reason: 'Monto excede límite de transacción' 
        };
    }

    if (method === 'creditcard' && Math.random() < 0.3) {
        return { 
            success: false, 
            reason: 'Tarjeta rechazada' 
        };
    }

    return { 
        success: true, 
        transactionId: uuidv4() 
    };
}

const ExternalServiceSchema = new mongoose.Schema({
    name: String,
    url: String,
    status: {
        type: String,
        enum: ['active', 'inactive', 'maintenance'],
        default: 'active'
    },
    lastChecked: Date
});
const ExternalService = mongoose.model('ExternalService', ExternalServiceSchema);

// Modelo de configuración
const ConfigSchema = new mongoose.Schema({
    key: { 
        type: String, 
        unique: true, 
        required: true 
    },
    value: String,
    type: {
        type: String,
        enum: ['string', 'number', 'boolean'],
        default: 'string'
    }
});
const Config = mongoose.model('Config', ConfigSchema);

// Servicio de verificación de servicios externos
app.get('/external-services/validate', async (req, res) => {
    try {
        const { serviceId } = req.query;

        if (!serviceId) {
            await logError(new Error('ID de servicio no proporcionado'), {
                errorType: 'external_service_validation_missing_id'
            });

            return res.status(400).json({
                error: 'Datos inválidos',
                message: 'Se requiere ID de servicio'
            });
        }

        const service = await ExternalService.findById(serviceId);

        if (!service) {
            await logError(new Error('Servicio externo no encontrado'), {
                serviceId,
                errorType: 'external_service_not_found'
            });

            return res.status(404).json({
                error: 'Servicio no encontrado',
                message: 'No existe un servicio con el ID proporcionado'
            });
        }

        // Simular verificación de servicio externo
        try {
            const response = await axios.get(service.url, { timeout: 3000 });
            
            service.status = 'active';
            service.lastChecked = new Date();
            await service.save();

            res.status(200).json({
                message: 'Servicio validado exitosamente',
                serviceStatus: service.status
            });
        } catch (connectionError) {
            service.status = 'inactive';
            service.lastChecked = new Date();
            await service.save();

            await logError(connectionError, {
                serviceId,
                serviceUrl: service.url,
                errorType: 'external_service_connection_failed'
            });

            res.status(503).json({
                error: 'Servicio no disponible',
                message: 'No se pudo establecer conexión con el servicio'
            });
        }
    } catch (error) {
        await logError(error, {
            requestQuery: req.query,
            errorType: 'external_service_validation_error'
        });

        res.status(500).json({
            error: 'Error de validación',
            message: 'No se pudo completar la validación del servicio'
        });
    }
});

// Servicio de configuración del sistema
app.post('/system/config', authenticateToken, async (req, res) => {
    try {
        // Verificar permisos de administrador
        if (req.user.role !== 'admin') {
            await logError(new Error('Acceso no autorizado'), {
                userId: req.user._id,
                userRole: req.user.role,
                errorType: 'system_config_unauthorized'
            });

            return res.status(403).json({
                error: 'Acceso denegado',
                message: 'No tienes permisos para modificar la configuración del sistema'
            });
        }

        const { key, value, type } = req.body;

        if (!key || !value) {
            await logError(new Error('Datos de configuración incompletos'), {
                receivedData: req.body,
                errorType: 'system_config_invalid_data'
            });

            return res.status(400).json({
                error: 'Datos inválidos',
                message: 'Se requiere clave y valor de configuración'
            });
        }

        // Validar tipo de configuración
        let parsedValue;
        switch (type) {
            case 'number':
                parsedValue = Number(value);
                if (isNaN(parsedValue)) {
                    throw new Error('Valor no numérico');
                }
                break;
            case 'boolean':
                parsedValue = value === 'true' || value === true;
                break;
            default:
                parsedValue = value;
        }

        const config = await Config.findOneAndUpdate(
            { key }, 
            { value: parsedValue, type: type || 'string' }, 
            { upsert: true, new: true }
        );

        res.status(200).json({
            message: 'Configuración actualizada',
            configKey: config.key
        });
    } catch (error) {
        await logError(error, {
            requestBody: req.body,
            errorType: 'system_config_update_error'
        });

        res.status(500).json({
            error: 'Error de configuración',
            message: 'No se pudo actualizar la configuración del sistema'
        });
    }
});

// Servicio de monitoreo de rendimiento
app.get('/performance/metrics', async (req, res) => {
    try {
        // Simular métricas de rendimiento
        const metrics = {
            cpuUsage: Math.random() * 100,
            memoryUsage: Math.random() * 100,
            diskUsage: Math.random() * 100,
            requestsPerSecond: Math.floor(Math.random() * 1000)
        };

        // Definir umbrales críticos
        if (metrics.cpuUsage > 90 || 
            metrics.memoryUsage > 90 || 
            metrics.diskUsage > 90) {
            
            await logError(new Error('Umbral de rendimiento crítico'), {
                metrics,
                errorType: 'performance_critical_threshold'
            });

            return res.status(500).json({
                error: 'Rendimiento crítico',
                message: 'Se han alcanzado umbrales críticos de rendimiento',
                metrics
            });
        }

        res.status(200).json({
            message: 'Métricas de rendimiento',
            metrics
        });
    } catch (error) {
        await logError(error, {
            errorType: 'performance_metrics_error'
        });

        res.status(500).json({
            error: 'Error de métricas',
            message: 'No se pudieron recuperar las métricas de rendimiento'
        });
    }
});

// Servicio de validación de datos críticos
app.post('/data/validate', async (req, res) => {
    try {
        const { data, type } = req.body;

        if (!data || !type) {
            await logError(new Error('Datos de validación incompletos'), {
                receivedData: req.body,
                errorType: 'data_validation_missing_parameters'
            });

            return res.status(400).json({
                error: 'Datos inválidos',
                message: 'Se requiere datos y tipo de validación'
            });
        }

        // Simular diferentes tipos de validación
        let validationResult;
        switch (type) {
            case 'email':
                validationResult = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data);
                break;
            case 'phone':
                validationResult = /^\+?[\d\s-]{10,}$/.test(data);
                break;
            case 'creditcard':
                validationResult = /^(?:\d{4}-){3}\d{4}$/.test(data);
                break;
            default:
                await logError(new Error('Tipo de validación no soportado'), {
                    type,
                    errorType: 'data_validation_unsupported_type'
                });

                return res.status(400).json({
                    error: 'Tipo de validación no soportado',
                    message: 'El tipo de validación proporcionado no es válido'
                });
        }

        if (!validationResult) {
            await logError(new Error('Validación de datos fallida'), {
                data,
                type,
                errorType: 'data_validation_failed'
            });

            return res.status(422).json({
                error: 'Validación fallida',
                message: `Los datos no cumplen con el formato de ${type}`
            });
        }

        res.status(200).json({
            message: 'Datos validados correctamente',
            type
        });
    } catch (error) {
        await logError(error, {
            requestBody: req.body,
            errorType: 'data_validation_error'
        });

        res.status(500).json({
            error: 'Error de validación',
            message: 'No se pudo completar la validación de datos'
        });
    }
});

app.get('/pet/get-pet', async (req, res) => {
    try {
        
        await db.authenticate();
        await db.sync()
        console.log("Base de datos conectada ")

        res.status(200).json({
            message: 'Datos validados correctamente',
            type
        });
    } catch (error) {
        await logError(error, {
            requestBody: req.body,
            errorType: 'data_validation_error'
        });

        res.status(500).json({
            error: 'Error de validación',
            message: 'No se pudo completar la validación de datos'
        });
    }
});

app.get('/auth-error', async (req, res) => {
    try {
        const client = new Client({
            user: 'postgres.gulpyxcmxjexjpnmhzex4', // Usuario sin permisos
            host: 'aws-0-us-west-1.pooler.supabase.com',
            database: 'postgres',
            password: 'postgres', // Contraseña incorrecta
            port: 6543,
        });

        await client.connect(); // Esto lanzará un error de autenticación
    } catch (error) {
        await logError(error, {
            errorType: 'auth_error'
        });
        res.status(401).json({ error: 'Error de autenticación', details: error.message });
    }
});

/* const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
 */
module.exports = app;