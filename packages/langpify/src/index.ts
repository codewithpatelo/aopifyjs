
import { ChatOpenAI } from "langchain/chat_models";
import { AopAgent } from "../../core/src";

interface LangfyAgentOptions {
    name: string;
    llm: ChatOpenAI;
}

export class LangfyAgent extends AopAgent {
    private llm: ChatOpenAI;

    /**
     * Constructor del LangfyAgent.
     * @param options - Opciones para configurar el agente.
     */
    constructor(options: LangfyAgentOptions) {
        const { name, llm } = options;
        super(name);

        if (llm) {
            this.llm = llm;
        } else {
            throw new Error("A valid LLM instance must be provided.");
        }
    }

    /**
     * Procesar mensajes usando el modelo de lenguaje (LLM).
     * @param message - Mensaje a procesar.
     * @returns Respuesta generada por el modelo.
     */
    async processMessage(message: string): Promise<string> {
        if (!this.llm) {
            return `No LLM available to process message: ${message}`;
        }

        try {
            const response = await this.llm.call([{ role: "user", content: message }]);
            return response.content || "No response content";
        } catch (error) {
            console.error("Error processing message with LLM:", error);
            return "Error processing message";
        }
    }

    /**
     * Sobrescribir el método inform para usar processMessage con LLM.
     * @param event - Evento a informar.
     * @param toAgent - Agente destinatario.
     * @param isOutsideInteraction - Si es una interacción externa.
     */
    async inform(event: any, toAgent: string, isOutsideInteraction: boolean = false): Promise<void> {
        const processedMessage = await this.processMessage(event);
        const enhancedEvent = { ...event, processed: processedMessage };

        // Llamar al método inform del agente base
        await super.inform(enhancedEvent, toAgent, isOutsideInteraction);
    }
}
