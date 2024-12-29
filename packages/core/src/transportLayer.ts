import { FIPAMessage } from "./interfaces/commons";




export abstract class TransportLayer {
    protected isConnected: boolean = false;
    protected transportType: TransportType;

    constructor(transportType: TransportType) {
        this.transportType = transportType;
    }

    // Obtener el tipo de transporte
    getTransportType(): TransportType {
        return this.transportType;
    }

    // Conectar al sistema
    abstract connect(): Promise<void>;

    // Escuchar mensajes entrantes
    abstract onMessage(handler: (act: TransportEnvelope) => void): void;

    // Enviar un mensaje (acto de comunicación)
    abstract sendMessage(act: TransportEnvelope): Promise<void>;

    // Desconectar la capa de transporte
    abstract disconnect(): Promise<void>;

    // Pausar la conexión (opcional)
    abstract pause(): Promise<void>;

    // Reanudar la conexión (opcional)
    abstract resume(): Promise<void>;

    // Obtener el estado de la conexión
    getConnectionStatus(): boolean {
        return this.isConnected;
    }
}


export enum TransportType {
    HTTP = 'HTTP',
    WS = 'WebSocket',
    MQTT = 'MQTT',
    AMQP = 'AMQP',
    CUSTOM = 'Custom', // Para transportes definidos por el usuario
}


export interface TransportAdditionalAttributes<T = any> {
    contentType: 'application/json' | 'application/xml' | 'text/plain' | string; // MIME Types
    attributes?: T; // Atributos adicionales definidos por el transporte
}


export interface TransportEndpoint {
    transportType: TransportType; // Tipo de transporte
    transportAddress: string;     // Dirección (URL, IP, etc.)
    transportProperties?: Record<string, any>; // Propiedades específicas del transporte
}


export interface TransportMessage<TPayload = FIPAMessage> {
    payload: TPayload; // Tipo genérico para permitir otros payloads además de FIPA
}

export interface TransportDescription {
    sender: TransportEndpoint; // Reutiliza la misma interfaz para sender/receiver
    receiver: TransportEndpoint;
    additionalAttributes?: TransportAdditionalAttributes; // Ahora es opcional y extensible
}


export interface TransportEnvelope {
    message: TransportMessage;
    description: TransportDescription;
}

