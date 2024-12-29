import { AopAgent } from "..";
import { TransportEnvelope } from "../transportLayer";

export const createTransportEnvelope: TransportEnvelope(event: Event, fromAgent: AopAgent, toAgent: AopAgent) => {
    return {
        message: event,
        description: {
            sender: fromAgent.name,
            receiver: toAgent.name,
        },
    };
}