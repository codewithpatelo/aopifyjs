import { v4 as uuid } from 'uuid';
import EventEmitter from 'events';
import { TransportEnvelope, TransportLayer } from './transportLayer';
import { FIPAMessage, FIPAPerformative } from './interfaces/commons';


class AopAgent extends EventEmitter {
    aid: string;
    name: string;
    isAwake: boolean = false;
    transportLayer: TransportLayer | null;
    birthday?: Date;
    directory?: string;
    private pausedListeners: Record<string | symbol, Array<(...args: any[]) => void>> = {};


    constructor(name: string, transportLayer: TransportLayer | null = null, directory?: string) {
        super();
        this.aid = uuid();
        this.name = name;
        this.transportLayer = transportLayer;
        this.directory = directory;

    }

    // Life-Cycle Acts //
    start(): boolean {
        this.birthday = new Date();
        this.isAwake = true;
        if (this.transportLayer) {
            this.transportLayer.connect();
        }
        return this.isAwake;
    }

    kill(): void {
        if (this.transportLayer) {
            this.transportLayer.disconnect();
        }
        this.removeAllListeners();
        // Liberar la instancia
        Object.keys(this).forEach(key => delete this[key]);
    }

    sleep(): void {
        if (this.transportLayer) {
            this.transportLayer.pause();
        }
        this.isAwake = false;

        this.pausedListeners = this.eventNames().reduce((acc, event) => {
            acc[event] = this.listeners(event) as Array<(...args: any[]) => void>;
            this.removeAllListeners(event);
            return acc;
        }, {} as Record<string | symbol, Array<(...args: any[]) => void>>);

    }

    wakeup(): void {
        if (this.transportLayer) {
            this.transportLayer.resume();
        }
        this.isAwake = true;

        for (const event in this.pausedListeners) {
            this.pausedListeners[event].forEach(listener => {
                // Aseguramos que cada listener es del tipo correcto.
                if (typeof listener === 'function') {
                    this.on(event, listener);
                }
            });
        }
        this.pausedListeners = {};

        console.log('Agent has been awakened.');
    }


    // Communication Acts //
    inform(event: Event, to: AopAgent, isOutsideInteraction: boolean = false): void {
        const eventId = uuid();
        if (this.isAwake) {
            // Si existe transportLayer y isOutsideInteraction es true
            if (this.transportLayer && isOutsideInteraction) {
                // Crear un TransportEnvelope con el mensaje
                const transportEnvelope: TransportEnvelope = {
                    message: {
                        payload: {
                            performative: FIPAPerformative.INFORM,
                            sender: this.aid,
                            receiver: [to.aid],
                            content: event,
                            conversationId: eventId
                        }
                    },
                    description: {
                        sender: {
                            transportType: this.transportLayer.getTransportType(),
                            transportAddress: this.directory || '',
                        },
                        receiver: {
                            transportType: this.transportLayer.getTransportType(),
                            transportAddress: to.directory || '',
                        }
                    }
                };

                // Enviar el mensaje utilizando el transporte
                this.transportLayer.sendMessage(transportEnvelope)
                    .then(() => console.log(`Message sent to ${to.name} via transportLayer`))
                    .catch((err) => console.error(`Error sending message: ${err}`));
            } else {
                // Si no hay transportLayer o isOutsideInteraction es false (interacción interna)
                const eventName = `${to.aid}_${eventId}`;
                // Emitir el evento localmente
                this.emit(eventName, event);
            }
        }
    }

    // 
    // propagate(): boolean {
    // }

    //subscribe(): void {
    //   
    //}


    // 
    // publish(): boolean {
    // }


    // 
    // acceptProposal(): boolean {
    // }


    // 
    // agree(): boolean {
    // }


    // 
    // cancel(): boolean {
    // }


    // 
    // callForProposal(): boolean {
    // }

    // 
    // confirm(): boolean {
    // }

    // 
    // disConfirm(): boolean {
    // }

    // 
    // failure(): boolean {
    // }

    // 
    // propose(): boolean {
    // }


    // 
    // proxy(): boolean {
    // }


    // 
    // refuse(): boolean {
    // }

    // 
    // query(): boolean {
    // }

    // 
    // rejectProposal(): boolean {
    // }

    // 
    // request(): boolean {
    // }

    // Perceptual Acts
    // 
    // perceive(environment): boolean {
    // }

    // 
    // reactTo(event): boolean {
    // }

    // 
    // getState(env): boolean {
    // }


    // Attention & Memory 
    // store(msg: any, evnt: string, from: string, to: string): Set<Interaction> {
    // }

    // Learning
    // 
    // learn(): boolean {
    // }

    // 
    // train(env): boolean {
    // }



    // Prespective Acts

    // 
    // plan(goal, restrictions): boolean {
    // }

    // 
    // excecutePlan(plan): boolean {
    // }


    // 
    // evaluate(planOutcome): boolean {
    // }



    decide(method: 'topsis' | 'ahp', data: any): any {
        switch (method) {
            case 'topsis':
                return topsis.getBest(data.m, data.w, data.ia);
            case 'ahp':
                const ahp = new AhpLite();
                ahp.import(data);
                return ahp.run();
            default:
                throw new Error('Unsupported decision method');
        }
    }
}

export { AopAgent };
