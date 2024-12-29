export enum FIPAPerformative {
    INFORM = 'inform',         // Informative message
    REQUEST = 'request',       // Requesting information or action
    CONFIRM = 'confirm',       // Acknowledging a request or action
    REJECT = 'reject',         // Rejecting a request or action
    PROPOSE = 'propose',       // Proposing an action or suggestion
    QUERY_IF = 'query-if',     // Asking if something is true
    QUERY_REF = 'query-ref',   // Asking for information
    CANCEL = 'cancel',         // Cancelling a previous request
    FAILURE = 'failure',       // Indicating a failure or error
    AGREE = 'agree',           // Agreeing with a proposal
    DISAGREE = 'disagree',     // Disagreeing with a proposal
    NOTIFY = 'notify',         // Notifying about something
    ERROR = 'error',           // Sending an error message
    INFORM_IF = 'inform-if',   // Providing information with a condition
    INFORM_REF = 'inform-ref'  // Providing information by reference
  }


export interface FIPAMessage<TContent = any> {
    performative: FIPAPerformative;  // Use the enum for performative
    sender: string; // Unique identifier for the sending agent
    receiver: string[]; // List of receivers
    replyTo?: string; // Optional: where replies should be sent
    content: TContent; // The message content
    language?: string; // Optional: language of the content (e.g., 'sl')
    encoding?: string; // Optional: content encoding (e.g., 'UTF-8')
    ontology?: string; // Optional: ontology used to define terms
    protocol?: string; // Optional: interaction protocol
    conversationId: string; // Optional: unique conversation ID
    replyWith?: string; // Optional: tag for correlating responses
    inReplyTo?: string; // Optional: ID of the message this replies to
    replyBy?: string; // Optional: deadline for reply
  }