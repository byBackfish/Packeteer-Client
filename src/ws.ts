import { WebSocket } from 'ws';
import { Console } from './console';

export class WS {
  console: Console;
  socket: WebSocket;

  // CHANGE THIS
  BASE_URL = 'ws://185.2.102.91:3001';

  queue: Map<string, any> = new Map();

  constructor() {
    this.console = new Console('Packeteer Client');
    this.socket = new WebSocket(this.BASE_URL);

    this.socket.on('open', () => {
      this.console.log('Connected to websocket server');
    });
    this.socket.on('message', (raw) => {
      let packet = raw.toString();
      let parsed = JSON.parse(packet);
      if (!parsed.inbound) return;
      let id = parsed.inbound.random;
      if (this.queue.has(id)) {
        this.queue.get(id)(parsed.data);
        this.queue.delete(id);
      }
    });
  }

  async send(options): Promise<any> {

    let random = this.makeRandom(50);
    options.random = random;
    this.socket.send(JSON.stringify(options));
    return new Promise((resolve, reject) => {
      this.queue.set(random, resolve);
    });
  }

  public makeRandom(length: number): string {
		const characters =
			'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		const makeRandom = (len: number) => {
			let str = '';
			for (let i = 0; i < len; i++)
				str += characters.charAt(Math.floor(Math.random() * characters.length));
			return str;
		};
		const punid = makeRandom(length);
		return punid;
	}
}
