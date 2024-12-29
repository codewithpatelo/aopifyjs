import { v4 as uuid } from 'uuid';
import topsis from 'topsis';
import AhpLite from 'ahp-lite';
import EventEmitter from 'events';
import { TransportLayer } from './transportLayer';
import { FIPAMessage } from './interfaces/commons';


class Agent extends EventEmitter {
    private aid: string;
    private name: string;
    private isAlive: boolean = false;
    private interactions: Set<FIPAMessage> = new Set();
    private transportLayer: TransportLayer | null;
    private birthday?: string;
    private deathday?: string;

    constructor(name: string, transportLayer: TransportLayer | null = null) {
        super();
        this.aid = uuid();
        this.name = name;
        this.transportLayer = transportLayer;

        if (this.transportLayer) {
            this.transportLayer.onMessage((message) => {
                if (message.to === this.aid) {
                    this.emit(message.evnt, message.msg);
                    this.store(message.msg, message.evnt, message.from, message.to);
                }
            });
        }
    }

    // Life-Cycle Acts //
    start(): boolean {
        this.birthday = moment().format();
        this.isAlive = true;
        if (this.transportLayer) {
            this.transportLayer.connect();
        }
        return this.isAlive;
    }

    kill(): [string | undefined, boolean] {
        this.deathday = moment().format();
        this.isAlive = false;
        return [this.deathday, this.isAlive];
    }

    // 
    // sleep(): boolean {
    // }


    // 
    // wakeup(): boolean {
    // }


    // Communication Acts //
    inform(evnt: { name: string; msg: any }, to: Agent): void {
        if (this.isAlive) {
            to.emit(evnt.name, evnt.msg);
            const interaction = new Interaction(evnt.msg, evnt.name, this.aid, to.aid);
            this.interactions.add(interaction);
            if (this.transportLayer) {
                this.transportLayer.sendMessage({
                    from: this.aid,
                    to: to.aid,
                    evnt: evnt.name,
                    msg: evnt.msg,
                });
            }
        } else {
            console.log(`Error. ${this.name} is not alive`);
        }
    }

    // 
    // propagate(): boolean {
    // }

    subscribe(eventName: string, callback: (message: any, from: string) => void): void {
        if (!this.isAlive) {
            console.log(`Error: ${this.name} is not alive.`);
            return;
        }

        this.on(eventName, (message) => {
            console.log(`${this.name} received event '${eventName}'.`);
            callback(message, this.aid);
        });

        console.log(`${this.name} subscribed to event '${eventName}'.`);
    }


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
    store(msg: any, evnt: string, from: string, to: string): Set<Interaction> {
        const interaction = new Interaction(msg, evnt, from, to);
        this.interactions.add(interaction);
        return this.interactions;
    }

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

export { Agent };
