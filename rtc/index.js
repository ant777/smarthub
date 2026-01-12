const configuration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun2.l.google.com:19302' }
      ]
    };
export class RTC { 
    
  constructor() {
    // Media elements
    this.localVideo = document.getElementById('localVideo');
    this.remoteVideo = document.getElementById('remoteVideo');

    // Control buttons
    this.startButton = document.getElementById('startButton');
    this.callButton = document.getElementById('callButton');
    this.hangupButton = document.getElementById('hangupButton');
    this.muteButton = document.getElementById('muteButton');
    this.videoToggle = document.getElementById('videoToggle');
    this.sendButton = document.getElementById('sendButton');

    // Chat elements
    this.messageInput = document.getElementById('messageInput');
    this.chatMessages = document.getElementById('chatMessages');

    // WebRTC objects
    this.localStream = null;
    this.remoteStream = null;
    this.peerConnection = null;
    this.dataChannel = null;

    // States
    this.isAudioMuted = false;
    this.isVideoEnabled = true;

    // Configuration
    this.configuration = configuration;

    // this.initializeEventListeners();
    // this.updateStatus('Disconnected');
  }

  initializeEventListeners() {
    this.startButton.addEventListener('click', () => this.startCamera());
    this.callButton.addEventListener('click', () => this.startCall());
    this.hangupButton.addEventListener('click', () => this.hangup());
    this.muteButton.addEventListener('click', () => this.toggleAudio());
    this.videoToggle.addEventListener('click', () => this.toggleVideo());
    this.sendButton.addEventListener('click', () => this.sendMessage());
    this.messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });
  }

  async startCamera() {
    console.log('Requesting local stream');
    this.updateStatus('Requesting camera access...');

    try {
      const constraints = {
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        },
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 }
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.localStream = stream;
      this.localVideo.srcObject = stream;

      console.log('Local stream obtained:', stream.getTracks());
      this.updateStatus('Camera ready');

      // Enable call button
      this.startButton.disabled = true;
      this.callButton.disabled = false;
      this.muteButton.disabled = false;
      this.videoToggle.disabled = false;

      // Log track information
      stream.getTracks().forEach(track => {
        console.log(`Track: ${track.kind}, ID: ${track.id}, Label: ${track.label}`);
      });

    } catch (error) {
      console.error('Error accessing media devices:', error);
      this.updateStatus('Camera access denied');
      alert('Could not access camera/microphone. Please grant permissions.');
    }
  }

  async startCall() {
    console.log('Starting call');
    this.updateStatus('Initiating call...');

    this.callButton.disabled = true;
    this.hangupButton.disabled = false;

    // Create peer connection
    this.createPeerConnection();

    // Add local stream tracks to peer connection
    this.localStream.getTracks().forEach(track => {
      console.log('Adding track to peer connection:', track.kind);
      this.peerConnection.addTrack(track, this.localStream);
    });

    // Create data channel for chat
    this.createDataChannel();

    // Create and send offer
    try {
      const offer = await this.peerConnection.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true
      });

      console.log('Created offer:', offer);
      await this.peerConnection.setLocalDescription(offer);
      console.log('Set local description');

      // Send offer via signaling server
      this.sendSignalingMessage({
        type: 'offer',
        sdp: offer.sdp
      });

      this.updateStatus('Calling...');

    } catch (error) {
      console.error('Error creating offer:', error);
      this.updateStatus('Call failed');
    }
  }

  createPeerConnection() {
    console.log('Creating peer connection with config:', this.configuration);
    this.peerConnection = new RTCPeerConnection(this.configuration);

    // Handle ICE candidates
    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('New ICE candidate:', event.candidate.candidate);
        this.sendSignalingMessage({
          type: 'ice-candidate',
          candidate: event.candidate
        });
      } else {
        console.log('All ICE candidates have been sent');
      }
    };

    // Handle ICE connection state changes
    this.peerConnection.oniceconnectionstatechange = () => {
      console.log('ICE connection state:', this.peerConnection.iceConnectionState);
      this.updateStatus(`ICE: ${this.peerConnection.iceConnectionState}`);

      if (this.peerConnection.iceConnectionState === 'disconnected' ||
          this.peerConnection.iceConnectionState === 'failed') {
        this.handleConnectionFailure();
      }
    };

    // Handle connection state changes
    this.peerConnection.onconnectionstatechange = () => {
      console.log('Connection state:', this.peerConnection.connectionState);

      switch (this.peerConnection.connectionState) {
        case 'connected':
          this.updateStatus('Connected');
          break;
        case 'disconnected':
          this.updateStatus('Disconnected');
          break;
        case 'failed':
          this.updateStatus('Connection failed');
          this.handleConnectionFailure();
          break;
        case 'closed':
          this.updateStatus('Connection closed');
          break;
      }
    };

    // Handle incoming tracks
    this.peerConnection.ontrack = (event) => {
      console.log('Received remote track:', event.track.kind);

      if (!this.remoteStream) {
        this.remoteStream = new MediaStream();
        this.remoteVideo.srcObject = this.remoteStream;
      }

      this.remoteStream.addTrack(event.track);
      console.log('Remote stream now has tracks:', this.remoteStream.getTracks());
    };

    // Handle data channel (for receiving peer)
    this.peerConnection.ondatachannel = (event) => {
      console.log('Data channel received');
      this.dataChannel = event.channel;
      this.setupDataChannelHandlers();
    };
  }

  createDataChannel() {
    console.log('Creating data channel');
    this.dataChannel = this.peerConnection.createDataChannel('chat', {
      ordered: true
    });
    this.setupDataChannelHandlers();
  }

  setupDataChannelHandlers() {
    this.dataChannel.onopen = () => {
      console.log('Data channel opened');
      this.messageInput.disabled = false;
      this.sendButton.disabled = false;
      this.addChatMessage('System', 'Chat connected', 'system');
    };

    this.dataChannel.onclose = () => {
      console.log('Data channel closed');
      this.messageInput.disabled = true;
      this.sendButton.disabled = true;
      this.addChatMessage('System', 'Chat disconnected', 'system');
    };

    this.dataChannel.onmessage = (event) => {
      console.log('Received message:', event.data);
      try {
        const message = JSON.parse(event.data);
        this.addChatMessage('Remote', message.text, 'received');
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    this.dataChannel.onerror = (error) => {
      console.error('Data channel error:', error);
    };
  }

  async handleSignalingMessage(message) {
    console.log('Received signaling message:', message.type);

    if (!this.peerConnection && message.type !== 'offer') {
      console.warn('Peer connection not initialized');
      return;
    }

    try {
      switch (message.type) {
        case 'offer':
          await this.handleOffer(message);
          break;
        case 'answer':
          await this.handleAnswer(message);
          break;
        case 'ice-candidate':
          await this.handleIceCandidate(message);
          break;
        default:
          console.warn('Unknown message type:', message.type);
      }
    } catch (error) {
      console.error('Error handling signaling message:', error);
    }
  }

  async handleOffer(message) {
    console.log('Handling offer');
    this.updateStatus('Receiving call...');

    // Create peer connection if not exists
    if (!this.peerConnection) {
      this.createPeerConnection();

      // Add local stream if available
      if (this.localStream) {
        this.localStream.getTracks().forEach(track => {
          this.peerConnection.addTrack(track, this.localStream);
        });
      }
    }

    // Set remote description
    await this.peerConnection.setRemoteDescription(
      new RTCSessionDescription({ type: 'offer', sdp: message.sdp })
    );
    console.log('Set remote description (offer)');

    // Create and send answer
    const answer = await this.peerConnection.createAnswer();
    console.log('Created answer');

    await this.peerConnection.setLocalDescription(answer);
    console.log('Set local description (answer)');

    this.sendSignalingMessage({
      type: 'answer',
      sdp: answer.sdp
    });

    this.hangupButton.disabled = false;
    this.updateStatus('In call');
  }

  async handleAnswer(message) {
    console.log('Handling answer');
    await this.peerConnection.setRemoteDescription(
      new RTCSessionDescription({ type: 'answer', sdp: message.sdp })
    );
    console.log('Set remote description (answer)');
    this.updateStatus('Connected');
  }

  async handleIceCandidate(message) {
    try {
      const candidate = new RTCIceCandidate(message.candidate);
      await this.peerConnection.addIceCandidate(candidate);
      console.log('Added ICE candidate');
    } catch (error) {
      console.error('Error adding ICE candidate:', error);
    }
  }

  toggleAudio() {
    if (this.localStream) {
      const audioTrack = this.localStream.getAudioTracks()[0];
      if (audioTrack) {
        this.isAudioMuted = !this.isAudioMuted;
        audioTrack.enabled = !this.isAudioMuted;
        this.muteButton.textContent = this.isAudioMuted ? 'Unmute Audio' : 'Mute Audio';
        console.log('Audio muted:', this.isAudioMuted);
      }
    }
  }

  toggleVideo() {
    if (this.localStream) {
      const videoTrack = this.localStream.getVideoTracks()[0];
      if (videoTrack) {
        this.isVideoEnabled = !this.isVideoEnabled;
        videoTrack.enabled = this.isVideoEnabled;
        this.videoToggle.textContent = this.isVideoEnabled ? 'Stop Video' : 'Start Video';
        console.log('Video enabled:', this.isVideoEnabled);
      }
    }
  }

  sendMessage() {
    const text = this.messageInput.value.trim();
    if (text && this.dataChannel && this.dataChannel.readyState === 'open') {
      const message = { text, timestamp: Date.now() };
      this.dataChannel.send(JSON.stringify(message));
      this.addChatMessage('You', text, 'sent');
      this.messageInput.value = '';
      console.log('Message sent:', text);
    }
  }

  addChatMessage(sender, text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${type}`;
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
    this.chatMessages.appendChild(messageDiv);
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
  }

  hangup() {
    console.log('Hanging up');
    this.updateStatus('Disconnected');

    // Close peer connection
    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }

    // Close data channel
    if (this.dataChannel) {
      this.dataChannel.close();
      this.dataChannel = null;
    }

    // Stop remote stream
    if (this.remoteStream) {
      this.remoteStream.getTracks().forEach(track => track.stop());
      this.remoteStream = null;
      this.remoteVideo.srcObject = null;
    }

    // Reset buttons
    this.callButton.disabled = false;
    this.hangupButton.disabled = true;
    this.messageInput.disabled = true;
    this.sendButton.disabled = true;

    console.log('Call ended');
  }

  handleConnectionFailure() {
    console.error('Connection failed');
    alert('Connection failed. Please try again.');
    this.hangup();
  }

  updateStatus(status) {
    document.getElementById('status').textContent = status;
    console.log('Status updated:', status);
  }

  sendSignalingMessage(message) {
    // This would connect to your signaling server
    console.log('Sending signaling message:', message);
    // Example: signalingSocket.send(JSON.stringify(message));
  }
}