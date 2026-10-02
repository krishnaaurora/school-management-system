import { 
  ConversationAgent, 
  AgentState, 
  InteractionType,
  BrowserAudioInterface 
} from 'sarvam-conv-ai-sdk';

/**
 * SarvamSession Client-Side SDK Wrapper
 * Provides clean event-driven interface for Sarvam Voice Agents
 */
export class SarvamSession {
  constructor(options = {}) {
    this.apiKey = options.apiKey || import.meta.env.VITE_SARVAM_EMBED_KEY || '';
    this.orgId = options.orgId || "019e90ca-b3c9-79f3-9722-9b051c1e9794";
    this.workspaceId = options.workspaceId || "019e90ca-b3fb-7068-87b1-86581ef98843";
    this.appId = options.appId || "GIS-Voice-A-13665fa2-61ad";
    this.userId = options.userId || "demo_user";
    this.userIdentifierType = options.userIdentifierType || "custom";
    this.interactionType = options.interactionType === 'chat' ? InteractionType.CHAT : InteractionType.CALL;
    this.agentVariables = options.agentVariables || { 
      call_summary: "General school admissions, academic curriculum, fee structure, and campus facilities inquiry", 
      user_name: "Parent / Student" 
    };
    
    this.agent = null;
    this.audioInterface = null;
    this.state = 'idle'; // 'idle' | 'connecting' | 'listening' | 'speaking' | 'ending' | 'error' | 'disconnected'
    this.listeners = {
      statechange: [],
      transcript: [],
      error: [],
      level: []
    };
  }

  /**
   * Subscribe to session events
   * Supported events: 'statechange', 'transcript', 'error', 'level'
   */
  on(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event].push(callback);
    }
    return this;
  }

  /**
   * Unsubscribe from session events
   */
  off(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }
    return this;
  }

  /**
   * Emit event to listeners
   */
  emit(event, data) {
    const handlers = this.listeners[event] || [];
    handlers.forEach(handler => {
      try {
        handler(data);
      } catch (err) {
        console.error(`[SarvamSession] Error in ${event} event handler:`, err);
      }
    });
  }

  /**
   * Update and emit state changes
   */
  setState(newState, extra = {}) {
    this.state = newState;
    this.emit('statechange', { state: newState, ...extra });
  }

  /**
   * Map SDK AgentState to simplified UI state
   */
  mapSdkState(sdkState) {
    switch (sdkState) {
      case AgentState.CONNECTING:
        return 'connecting';
      case AgentState.LISTENING:
        return 'listening';
      case AgentState.SPEAKING:
        return 'speaking';
      case AgentState.IDLE:
        return 'idle';
      case AgentState.DISCONNECTED:
        return 'disconnected';
      case AgentState.ERROR:
        return 'error';
      default:
        return 'listening';
    }
  }

  /**
   * Start the Sarvam voice conversation session
   */
  async start() {
    try {
      this.setState('connecting', { message: 'Initializing Greenfield Voice Assistant...' });

      // 1. Verify and request Microphone Permission in the browser
      if (typeof navigator !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          // Stop initial test stream so the SDK audio worklet can attach cleanly
          micStream.getTracks().forEach(track => track.stop());
        } catch (micErr) {
          const isDenied = micErr.name === 'NotAllowedError' || micErr.name === 'PermissionDeniedError';
          const errMsg = isDenied
            ? 'Microphone access was denied. Please allow microphone permissions in your browser to speak with the GIS Assistant.'
            : 'Unable to access your microphone. Please check your audio input device.';
          
          this.setState('error', { 
            error: errMsg, 
            code: 'MIC_PERMISSION_DENIED',
            originalError: micErr 
          });
          this.emit('error', { message: errMsg, error: micErr });
          throw new Error(errMsg);
        }
      }

      // 2. Initialize Browser Audio Interface
      this.audioInterface = new BrowserAudioInterface(16000, {
        outputLevelCallback: (level) => {
          this.emit('level', level);
        }
      });

      // 3. Initialize Conversation Agent
      const config = {
        org_id: this.orgId,
        workspace_id: this.workspaceId,
        app_id: this.appId,
        user_identifier_type: this.userIdentifierType || 'custom',
        user_identifier: this.userId || 'demo_user',
        interaction_type: this.interactionType,
        input_sample_rate: 16000,
        output_sample_rate: 16000,
        agent_variables: this.agentVariables,
      };

      this.agent = new ConversationAgent({
        apiKey: this.apiKey,
        config: config,
        audioInterface: this.audioInterface,
        stateCallback: (sdkState) => {
          const mapped = this.mapSdkState(sdkState);
          this.setState(mapped);
        },
        transcriptCallback: async (transcriptMsg) => {
          this.emit('transcript', transcriptMsg);
        },
        startCallback: async () => {
          this.setState('listening', { message: 'Greenfield Voice Assistant is ready and listening.' });
        },
        endCallback: async () => {
          this.setState('disconnected', { message: 'Conversation ended.' });
        },
      });

      // 4. Connect to Sarvam backend
      await this.agent.start();
      this.setState('listening');

    } catch (err) {
      console.warn('[SarvamSession] Error starting session:', err);
      if (this.state !== 'error') {
        let errorMsg = err.message || 'Unable to establish connection with Sarvam Voice Agent.';
        
        if (errorMsg.includes('Invalid API key format') || errorMsg.includes('401')) {
          errorMsg = 'Invalid Embed Key format: Please make sure you are using the Embed-Scoped Key from your Sarvam Dashboard (Agent > Embed tab).';
        } else if (errorMsg.includes('WebSocket connection error') || errorMsg.includes('403')) {
          errorMsg = 'Agent Connection Refused (403): Please ensure your agent "GIS-Voice-A-13665fa2-61ad" is Published / Deployed in your Sarvam Dashboard, has active ConvAI credits, and allows localhost connections in Embed Security settings.';
        }

        this.setState('error', { 
          error: errorMsg, 
          code: 'CONNECTION_FAILED',
          originalError: err 
        });
        this.emit('error', { message: errorMsg, error: err });
      }
      throw err;
    }
  }

  /**
   * Stop / End the conversation session
   */
  async stop() {
    try {
      this.setState('ending', { message: 'Closing voice conversation...' });
      if (this.agent) {
        await this.agent.stop();
        this.agent = null;
      }
      if (this.audioInterface) {
        await this.audioInterface.stop();
        this.audioInterface = null;
      }
      this.setState('idle', { message: 'Assistant is idle.' });
    } catch (err) {
      console.error('[SarvamSession] Error stopping session:', err);
      this.setState('idle');
    }
  }

  /**
   * Alias for stop()
   */
  async end() {
    return this.stop();
  }

  /**
   * Get current state
   */
  getState() {
    return this.state;
  }
}

export default SarvamSession;
